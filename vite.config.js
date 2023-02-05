import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import legacy from '@vitejs/plugin-legacy';

import pages from './vitejs/pages.config';

const pagesInput = {};

pages.forEach((page) => {
  pagesInput[page.name] = page.path;
});

export default defineConfig({
  build: {
    target: 'es2017',
    outDir: 'build',
    rollupOptions: {
      input: {
        ...pagesInput,
      },
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
              return 'assets/images/[name]-[hash][extname]';
          }
          
          if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';   
          }
  
          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: true,
  },
  plugins: [
    ViteAliases(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ]
});
