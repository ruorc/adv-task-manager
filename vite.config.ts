import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  base: '/adv-task-manager/',
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
});
