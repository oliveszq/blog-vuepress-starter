import { path } from '@vuepress/utils';
import { createRequire } from 'node:module';
import type { Plugin } from 'vuepress';

type SakuraOptions = {
  sakura_num?: number;
  sakura_img?: string;
  sakura_show?: boolean;
  sakura_zindex?: number;
};

const require = createRequire(import.meta.url);
const sakuraClientConfig = path.resolve(
  path.dirname(require.resolve('@anyfork/vuepress-plugin-sakura-next/package.json')),
  'lib/client/config.js'
);

export const sakuraFixed = (options: SakuraOptions = {}): Plugin => {
  return (app) => ({
    name: '@anyfork/vuepress-plugin-sakura-next (esm-bridge)',
    define() {
      return {
        SAKURA_NUM: options.sakura_num ?? 20,
        SAKURA_IMG: options.sakura_img ?? '',
        SAKURA_SHOW: options.sakura_show ?? true,
        SAKURA_ZINDEX: options.sakura_zindex ?? 100,
      };
    },
    clientConfigFile: sakuraClientConfig,
  });
};

