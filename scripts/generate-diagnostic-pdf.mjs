import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HTML_PATH = path.join(__dirname, '..', 'public', 'downloads', 'diagnostic.html')
const PDF_PATH = path.join(__dirname, '..', 'public', 'downloads', 'diagnostic-automatisation.pdf')

async function main() {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto(`file://${HTML_PATH}`, { waitUntil: 'networkidle0' })

    // diagnostic.html defines its own running footer via CSS
    // (@page { @bottom-center }), so displayHeaderFooter stays off here
    // to avoid rendering it a second time through Puppeteer's own template.
    await page.pdf({
      path: PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' },
    })
  } finally {
    await browser.close()
  }

  console.log(`PDF genere : ${PDF_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
