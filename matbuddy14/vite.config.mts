import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { rwsdk } from 'rwsdk/vite'

export default defineConfig({
  plugins: [react()], // remove rwsdk() for now
})
