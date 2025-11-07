import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import compressor from 'astro-compressor'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site:
    process.env.ENV !== 'development'
      ? 'https://www.nanostudio.pro/'
      : 'https://nano-studio-red.vercel.app/',
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  adapter: vercel(),
  integrations: [
    compressor(),
    sitemap(),
    robotsTxt({
      sitemap: 'https://www.nanostudio.pro/sitemap-0.xml',
      host: 'www.nanostudio.pro'
    })
  ]
})
