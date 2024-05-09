import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({

// })

const dotEnvConfig = dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
    "process.env.VITE_FIREBASE_API_KEY": `"${process.env.VITE_FIREBASE_API_KEY}"`,
    "process.env.VITE_FIREBASE_DB_URL": `"${process.env.VITE_FIREBASE_DB_URL}"`,
    "process.env.VITE_FIREBASE_PROJECT_ID": `"${process.env.VITE_FIREBASE_PROJECT_ID}"`,
    "process.env.VITE_FIREBASE_STORAGE_BUCKET": `"${process.env.VITE_FIREBASE_STORAGE_BUCKET}"`,
    "process.env.VITE_FIREBASE_AUTH_DOMAIN": `"${process.env.VITE_FIREBASE_AUTH_DOMAIN}"`
  },
  
)};