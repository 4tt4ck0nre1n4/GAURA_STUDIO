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

const root = resolve(__dirname, './src/pages');

export default defineConfig(async () => {
  configs.pageData = await readConfigJSONFile('./src/configs/pageData.json');

  return {
    root: root,
    base: '/',
    publicDir: resolve(__dirname, 'public'),
    server: {
      port: 8080,
    },
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, './src/pages/index.html'),
          thanks: resolve(__dirname, './src/pages/thanks.html'),
          404: resolve(__dirname, './src/pages/404.html'),
        },
      },
    },
    assetsInclude: [resolve(__dirname, 'public')],
    plugins: [
      ViteMinifyPlugin(),
      handlebars({
        partialDirectory: [
          resolve(__dirname, 'src/includes/common'),
          resolve(__dirname, 'src/includes/components'),
          resolve(__dirname, 'src/includes/modules'),
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
        '@': resolve(__dirname, 'src/assets/scss'),
        '@js': resolve(__dirname, 'src/assets/js'),
      },
    },
  };
});
