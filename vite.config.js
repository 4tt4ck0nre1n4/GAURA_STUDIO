import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import fs from 'fs';

const configs = {
  pageData: {},
};

const readConfigJSONFile = async (filePath) => {
  return new Promise(async (resolve) => {
    try {
      const file = fs.readFileSync(filePath, 'utf-8');
      resolve(JSON.parse(file));
    } catch (error) {
      console.warn('Failed to load pageData.json:', error.message);
      resolve({});
    }
  });
};

const root = resolve(process.cwd(), './src/pages');

export default defineConfig(async () => {
  configs.pageData = await readConfigJSONFile('./src/configs/pageData.json');

  return {
    root: root,
    base: '/',
    publicDir: resolve(process.cwd(), 'public'),
    server: {
      port: 8080,
    },
    build: {
      outDir: resolve(process.cwd(), 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: resolve(process.cwd(), './src/pages/index.html'),
          thanks: resolve(process.cwd(), './src/pages/thanks.html'),
          404: resolve(process.cwd(), './src/pages/404.html'),
        },
      },
    },
    assetsInclude: [resolve(process.cwd(), 'public')],
    plugins: [
      ViteMinifyPlugin(),
      handlebars({
        partialDirectory: [
          resolve(process.cwd(), 'src/includes/common'),
          resolve(process.cwd(), 'src/includes/components'),
          resolve(process.cwd(), 'src/includes/modules'),
        ],
        context: (pagePath) => {
          return {
            ...configs.pageData,
            page: configs.pageData[pagePath] || {},
            pagePath: pagePath,
          };
        },
      }),
      ViteImageOptimizer(configs.pageData.image?.optimization || {}),
    ],
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src/assets/scss'),
        '@js': resolve(process.cwd(), 'src/assets/js'),
      },
    },
  };
});
