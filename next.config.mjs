/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  basePath: '/CultureFun', 
  
  // PERBAIKAN 2: Tambahkan konfigurasi images ini agar foto muncul di cPanel
  images: {
    unoptimized: true, 
  },

  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;