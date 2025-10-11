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

const readConfigJSONFile = async (filePath) => {
  return new Promise((resolve) => {
    const file = fs.readFileSync(filePath, 'utf-8');
    resolve(JSON.parse(file));
  });
};

export default defineConfig(async () => {
  try {
    configs.pageData = await readConfigJSONFile('./src/configs/pageData.json');
  } catch (error) {
    console.warn('Failed to load pageData.json:', error.message);
    configs.pageData = {};
  }

  return {
    root: './src',
    publicDir: '../public',
    server: {
      port: 8080,
      strictPort: false, // ポートが使用中の場合は別のポートを自動選択
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: './src/index.html',
          thanks: './src/thanks.html',
          404: './src/404.html',
        },
        output: {
          assetFileNames: (assetInfo) => {
            if (/\.(jpg|jpeg|png|svg|ico|gif|webp)$/.test(assetInfo.name)) {
              return 'assets/images/[name].[ext]';
            }
            if (/\.(ttf|otf|eot|woff|woff2)$/.test(assetInfo.name)) {
              return 'assets/fonts/[name].[hash].[ext]';
            }
            if (/\.css$/.test(assetInfo.name)) {
              return 'assets/css/[name].[hash].[ext]';
            }
            return `assets/${assetInfo}/[name].[hash].[ext]`;
          },
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/main.[hash].js',
        },
      },
      assetsInlineLimit: 0,
      css: {
        devSourcemap: true,
        postcss: {
          plugins: [autoprefixer()],
        },
      },
    },
    assetsInclude: ['../public'],
    plugins: [
      handlebars({
        partialDirectory: [
          './src/includes/common',
          './src/includes/components',
          './src/includes/modules',
        ],
        context: async (pagePath) => {
          return {
            ...configs.pageData,
            page: typeof configs.pageData[pagePath] !== 'undefined' && configs.pageData[pagePath],
            pagePath: pagePath,
          };
        },
      }),
      ViteMinifyPlugin(),
      ViteImageOptimizer(configs.pageData.image?.optimization || {}),
    ],
    resolve: {
        alias: {
          '@': 'src/assets/scss',
          '@js': 'src/assets/js',
        },
    },
  };
});
