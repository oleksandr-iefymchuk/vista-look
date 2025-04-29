import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createHash } from 'crypto';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    modules: {
      generateScopedName: (name, filename, css) => {
        const componentName = path.basename(filename).replace(/\.module\.\w+$/, '');
        const relativePath = path.relative(process.cwd(), filename);
        const hashInput = `${relativePath}:${name}:${css}`;
        const hash = createHash('sha256')
          .update(hashInput)
          .digest('base64')
          .replace(/[^a-zA-Z0-9]/g, '')
          .substring(0, 7);

        return `${componentName}_${name}_${hash}`;
      }
    }
  }
});
