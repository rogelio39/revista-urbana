import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";


export default defineConfig({
  plugins: [react({
    fastRefresh: true, // Deshabilitar Fast Refresh temporalmente
  })],
  
  base: '/', // Asegúrate de que esto esté configurado correctamente
  server: {
    port: 5173, // Ajusta el puerto si es necesario
    open: true, // Abre el navegador automáticamente
    cors: true, // Habilita CORS
  },
  resolve: {
    alias: {
      '@': '/src' // Ajusta las rutas relativas si es necesario
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});
