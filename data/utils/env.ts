import {loadEnv as viteLoadEnv} from 'vite';
import {execSync} from 'child_process';
import dayjs from 'dayjs';
import fs from 'fs';
import {resolve} from 'path';
import env from '../../env';
import packageJson from '../../package.json';

export const parseBoolean = (data?: string): boolean => {
  const a = String(data).toLowerCase().trim();

  return !(
    a === 'null' ||
    a === 'undefined' ||
    a === 'false' ||
    a === '0' ||
    a === 'no' ||
    a === 'off' ||
    a === '' ||
    a === 'disabled' ||
    a === 'disable'
  );
};

export const loadEnv = ({
  mode = 'development',
  envDir = process.cwd(),
  prefixes,
}: {
  mode?: string;
  envDir?: string | false;
  prefixes?: string | string[];
}) => {
  const initEnv = viteLoadEnv(mode, envDir, prefixes);
  const env: Record<string, string> = {};

  if (prefixes) {
    Object.keys(initEnv).forEach((key) => {
      let newKey = key;

      if (Array.isArray(prefixes)) {
        prefixes.forEach((prefix) => {
          newKey = newKey.replace(prefix, '');
        });
      } else {
        newKey = newKey.replace(prefixes, '');
      }

      env[newKey] = initEnv[key];
    });
  }

  return env;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedAppEnv: Record<string, any> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedBuildEnv: Record<string, any> | null = null;

export function getEnvs(mode: string) {
  const rootDir = process.cwd();
  const envJsonPath = resolve(rootDir, 'env.ts');

  if (!fs.existsSync(envJsonPath)) {
    console.error(`[env] Missing "env.ts" in ${rootDir}`);
    process.exit(1);
  }

  if (cachedAppEnv && cachedBuildEnv) {
    return {appEnv: cachedAppEnv, buildEnv: cachedBuildEnv};
  }

  const _appEnv = loadEnv({prefixes: 'FRONT_'});
  const _buildEnv = loadEnv({prefixes: 'BUILD_'});

  const buildDate = dayjs().format('YYYY-MM-DD HH:mm:ss Z');

  let branch = '';
  let commit = '';

  try {
    commit = execSync('git rev-parse --short HEAD').toString().trim();
  } catch (error) {
    console.error(error);
  }

  try {
    branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (error) {
    console.error(error);
  }

  cachedAppEnv = {
    ..._appEnv,
    BUILD_MODE: mode,
    VERSION: packageJson.version,
    BRANCH: branch,
    COMMIT: commit,
    BUILD_DATE: buildDate,
  };

  cachedBuildEnv = _buildEnv;

  // Validate required keys from root env.ts after env is built.
  const requiredKeys = Object.keys(env);
  const missingKeys = requiredKeys.filter((key) => !(key in cachedAppEnv!));

  const keysWithMissingValue = requiredKeys.filter((key) => {
    const value = cachedAppEnv?.[key];

    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }

    return false;
  });

  if (missingKeys.length > 0 || keysWithMissingValue.length > 0) {
    console.error('[env] ❌ Invalid app environment configuration:');

    if (missingKeys.length > 0) {
      console.error('Missing keys:');
      missingKeys.forEach((key) => console.error(`    • ${key}`));
    }

    if (keysWithMissingValue.length > 0) {
      console.error('Keys with empty values:');
      keysWithMissingValue.forEach((key) => console.error(`    • ${key}`));
    }

    process.exit(1);
  }

  return {appEnv: cachedAppEnv, buildEnv: cachedBuildEnv};
}
