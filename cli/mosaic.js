const puppeteer = require('puppeteer')

;(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1000 })
    const page = await browser.newPage()
    await page.goto('http://localhost:3018/mosaic')
    await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 8})
    await page.screenshot({ path: 'mosaic.png' })

    await browser.close()
})()
