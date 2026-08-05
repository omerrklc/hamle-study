import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/.tmp-edge-check/**', '**/.tmp-chrome-check/**']
    }
  }
});
