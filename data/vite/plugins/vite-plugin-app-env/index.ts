import {Plugin, UserConfig} from 'vite';

interface TEnvBuilderProps {
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
