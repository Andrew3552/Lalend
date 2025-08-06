import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Экспорт конфига
export default defineConfig({
  plugins: [react()],
  base: './', // относительные пути, чтобы билд работал в любой папке
  build: {
    outDir: 'dist', // куда складывается билд
    assetsDir: 'assets', // директория для js/css
    emptyOutDir: true, // очищать dist перед билдом
  },
  server: {
    port: 3000,
    open: true, // автооткрытие в браузере при npm run dev
  },
});
