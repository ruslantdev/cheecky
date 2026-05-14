import {Plugin, UserConfig} from 'vite';

interface TEnvBuilderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appEnv: Record<string, any>;
}

export default ({appEnv}: TEnvBuilderProps): Plugin => {
  return {
    name: 'vite-plugin-app-env',
    config: (config) => {
      return {
        ...config,
        define: {
          ...config.define,
          env: JSON.stringify(appEnv),
        },
      } as UserConfig;
    },
  };
};
