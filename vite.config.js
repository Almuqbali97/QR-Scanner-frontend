import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore specific warnings that are non-critical
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        warn(warning);
      },
    },
  },
});
