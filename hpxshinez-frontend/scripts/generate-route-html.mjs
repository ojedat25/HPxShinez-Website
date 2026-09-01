// Generates a static dist/<route>/index.html per route below, with correct
// per-route <title>/description/canonical/OG/Twitter tags baked into the
// initial HTML (not just patched client-side after JS runs). Runs after
// `vite build`. Keep this list in sync with src/data/legal.ts and the
// title/description props passed to LegalPageLayout in each *Page.tsx.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const siteUrl = 'https://hpxshinez.com'

const routes = [
  {
    path: '/privacy-policy',
    title: 'HPxShinez Detailz: Privacy Policy',
    description:
      'How HPxShinez Detailz collects and uses information when you book mobile auto detailing in the Twin Cities metro.',
  },
  {
    path: '/liability-disclaimer',
    title: 'HPxShinez Detailz: Liability Disclaimer',
    description:
      'Terms and liability limitations that apply when you book mobile auto detailing service with HPxShinez Detailz.',
  },
  {
    path: '/cancellation-policy',
    title: 'HPxShinez Detailz: Cancellation Policy',
    description:
      'Rescheduling and cancellation terms for mobile auto detailing appointments booked with HPxShinez Detailz.',
  },
]

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function renderRouteHtml(baseHtml, route) {
  const url = `${siteUrl}${route.path}`
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)

  return baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${url}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${url}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
}

async function main() {
  const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8')

  for (const route of routes) {
    const outDir = path.join(distDir, route.path)
    await mkdir(outDir, { recursive: true })
    await writeFile(
      path.join(outDir, 'index.html'),
      renderRouteHtml(baseHtml, route),
      'utf8',
    )
    console.log(`Generated ${route.path}/index.html`)
  }
}

main()
