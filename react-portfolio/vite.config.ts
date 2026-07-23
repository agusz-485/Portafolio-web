import { defineConfig } from 'vite'

export default defineConfig(async () => {
  // Cargar dinámicamente el plugin React para evitar errores ESM vs CJS
  const mod = await import('@vitejs/plugin-react')
  const reactPlugin = (mod && (mod as any).default) || mod

  return {
    root: './',
    plugins: [reactPlugin()],
  }
})
