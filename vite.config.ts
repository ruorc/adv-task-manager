import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react({
      // Настройка для корректной работы стилей Emotion
      jsxImportSource: '@emotion/react',
    }),
  ],
  resolve: {
    // Включаем нативную поддержку путей из tsconfig.json / tsconfig.app.json
    tsconfigPaths: true,
  },
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        // Заменяем объект на функцию-разделитель
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

            // Все остальные тяжелые утилиты (tanstack, hook-form, joi, dompurify)
            return 'utils-vendor';
          }
        },
      },
    },
  },
  server: {
    open: true,
  },
});
