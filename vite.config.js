import { defineConfig } from 'vite';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import fs from 'fs';

const configs = {
  pageData: {},
};

const readConfigJSONFile = (filePath) => {
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    console.warn('Failed to load pageData.json:', error.message);
    return {};
  }
};

export default defineConfig(() => {
  configs.pageData = readConfigJSONFile('./src/configs/pageData.json');

  return {
    root: './src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: path.resolve(process.cwd(), 'src/index.html'),
          thanks: path.resolve(process.cwd(), 'src/thanks.html'),
          404: path.resolve(process.cwd(), 'src/404.html'),
        },
      },
    },
    plugins: [
      handlebars({
        partialDirectory: [
          path.resolve(process.cwd(), 'src/includes/common'),
          path.resolve(process.cwd(), 'src/includes/components'),
          path.resolve(process.cwd(), 'src/includes/modules'),
        ],
        context: (pagePath) => {
          return {
            ...configs.pageData,
            page: configs.pageData[pagePath] || {},
            pagePath: pagePath,
          };
        },
      }),
      ViteMinifyPlugin(),
      ViteImageOptimizer(configs.pageData.image?.optimization || {}),
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src/assets/scss'),
        '@js': path.resolve(process.cwd(), 'src/assets/js'),
      },
    },
  };
});
