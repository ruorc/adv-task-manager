import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/**
 * Core application bundling pipeline architecture.
 * Configures optimal SWC compilation graphs and maps absolute deployment subdirectories.
 */
export default defineConfig({
  /** Adjusts egress asset resolution paths to match the target GitHub Pages project subdirectory repository structure */
  base: '/adv-task-manager/',
  plugins: [
    /** Instantiates fast Rust-based transform layers for the React 19 execution lifecycle */
    react(),
  ],
  resolve: {
    /** Leverages native Vite 8.x path mapping capabilities to resolve compiler target shortcuts without third-party plugins */
    tsconfigPaths: true,
  },
});
