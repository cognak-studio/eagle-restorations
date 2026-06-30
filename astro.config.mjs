import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eagle-restorations.com',
  output: 'static',
  build: {
    format: 'directory',
  },
});
