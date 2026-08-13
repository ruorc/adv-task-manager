import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { APPLICATION_NAME } from './src/config/appConfig.ts';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react({
        // Provides support for Emotion css-props and component names
        jsxImportSource: '@emotion/react',
      }),
      {
        name: 'html-title-transform',
        /**
         * Native Vite HTML transformation hook.
         * Automatically replaces the placeholder string inside the index.html template during compilation.
         */
        transformIndexHtml(html: string): string {
          return html.replace(
            /<title>(.*?)<\/title>/,
            `<title>${APPLICATION_NAME}</title>`
          );
        },
      },
    ],
    resolve: {
      // Enables native support for paths from tsconfig.app.json (Vite 8)
      tsconfigPaths: true,
    },
    build: {
      sourcemap: !isProd,
      cssMinify: true,
      rollupOptions: {
        output: {
          // Optimal chunk splitting of heavy libraries for efficient browser caching
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-router')) {
                return 'react-vendor';
              }

              if (id.includes('@mui') || id.includes('@emotion')) {
                return 'mui-vendor';
              }

              if (id.includes('firebase')) {
                return 'firebase-vendor';
              }

              // All other dependencies (tanstack, hook-form, joi, dompurify)
              return 'utils-vendor';
            }
          },
        },
      },
    },
  };
});
