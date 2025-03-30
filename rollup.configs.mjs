import { rollupGenerateConfig } from 'rumious-builder/helpers/rollup.js';
import path from 'path';
import fs from 'fs';
import postcss from 'rollup-plugin-postcss';
import alias from "@rollup/plugin-alias";


const isProduction = process.env.NODE_ENV === 'production';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const CACHE_FILE = path.join(__dirname, '.rollup.cache.json');


let cache = fs.existsSync(CACHE_FILE) ?
  JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) :
  null;

export default {
  ...rollupGenerateConfig(path.join(__dirname, 'rumious.configs.json'), (configs) => {
    configs.plugins.push(
      postcss({
        modules: {
          generateScopedName: '[local]',
        },
        minimize: isProduction,
        extract: 'bundles.css',
      })
    );
    
    configs.plugins.push(alias({
      entries: [
        { find: "@services", replacement: path.resolve(__dirname, "ui/services") },
        { find: "@utils", replacement: path.resolve(__dirname, "ui/utils") },
        { find: "@components", replacement: path.resolve(__dirname, "ui/components") },
      ],
    }))
    
    configs.treeshake = true;
    configs.cache = cache;
    return configs;
  }),
};

process.on('exit', () => {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
});