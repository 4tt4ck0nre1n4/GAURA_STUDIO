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
  configs.pageData = await readConfigJSONFile('./src/configs/pageData.json');

  return {
    root: path.resolve(__dirname, './src'),
    publicDir: path.resolve(__dirname, 'public'),
    server: {
      port: 8080,
      strictPort: false, // ポートが使用中の場合は別のポートを自動選択
    },
    build: {
      outDir: path.resolve(__dirname, './dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, './src/index.html'),
          thanks: path.resolve(__dirname, './src/thanks.html'),
          404: path.resolve(__dirname, './src/404.html'),
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
    assetsInclude: [path.resolve(__dirname, 'public')],
    plugins: [
      handlebars({
        partialDirectory: [
          path.resolve(__dirname, './src/includes/common'),
          path.resolve(__dirname, './src/includes/components'),
          path.resolve(__dirname, './src/includes/modules'),
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
      ViteImageOptimizer(configs.pageData.image.optimization),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/assets/scss'),
        '@js': path.resolve(__dirname, 'src/assets/js'),
      },
    },
  };
});
