'use strict'
const puppeteer = require('puppeteer')
const chalk = require('chalk')
const Path = require('path')
const { isDirectory } = require('./fs')

const capture = async (page, baseUrl, { path, selector, filename: _filename }, outputDir) => {
    const url = `${baseUrl}${path}`

    console.log(chalk`{yellow Capturing {white ${path}}} {dim (selector: ${selector})}`)

    await page.goto(url)

    const element = await page.$(selector)
    if (element === null) {
        throw new Error(`Unable to find element matching selector: '${selector}' (url: ${url})`)
    }

    const clip = await element.boundingBox()
    clip.x = clip.x - 20
    clip.y = clip.y - 20
    clip.width = clip.width + 40
    clip.height = clip.height + 40

    const filename = `${_filename}.png`
    const fullPath = Path.join(outputDir, filename)

    await page.screenshot({ path: fullPath, clip })

    console.log(chalk`  {green saved to {white ${filename}}} {dim (${fullPath})}`)
    console.log('')
}

const getPageConfig = ({ sectionId, pageId, chartId }) => ({
    path: pageId ? `/${sectionId}/${pageId}/?capture` : `/${sectionId}/?capture`,
    selector: `#${chartId}`,
    filename: pageId ? `${sectionId}_${pageId}_${chartId}` : `${sectionId}_${chartId}`
})

module.exports = async ({ baseUrl, outputDir, nav, charts }) => {
    console.log(chalk`{yellow {white ${nav.length}} section(s) to capture}`)
    console.log(chalk`  {dim baseUrl:   {white ${baseUrl}}}`)
    console.log(chalk`  {dim outputDir: {white ${outputDir}}}`)
    console.log('')

    const isDir = await isDirectory(outputDir)
    if (!isDir) {
        throw new Error(`'${outputDir}' is not a valid directory`)
    }

    const browser = await puppeteer.launch({ headless: false, slowMo: 150 })
    const page = await browser.newPage()
    await page.setViewport({ width: 1400, height: 10000, deviceScaleFactor: 2 })
    await page.emulateMedia('screen')

    for (let section of nav) {
        const sectionId = section.id
        console.log(chalk`  {dim section: {blue ${sectionId}}}`)
        if (section.subPages) {
            for (let pageId of section.subPages) {
                console.log(chalk`    {dim page: {green ${pageId}}}`)
                const pageCharts = charts[pageId] || charts.tool
                if (pageCharts) {
                    for (let chartId of pageCharts) {
                        const pageConfig = getPageConfig({ sectionId, pageId, chartId })
                        console.log(chalk`      {dim filename: {white ${pageConfig.filename}}}`)
                        await capture(page, baseUrl, pageConfig, outputDir)
                    }
                }
            }
        } else {
            const pageCharts = charts[section.id]
            if (pageCharts) {
                for (let chartId of pageCharts) {
                    const pageConfig = getPageConfig({ sectionId, chartId })
                    console.log(chalk`      {dim filename: {white ${pageConfig.filename}}}`)
                    await capture(page, baseUrl, pageConfig, outputDir)
                }
            }
        }
    }

    await browser.close()
}
