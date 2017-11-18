'use strict'

const puppeteer = require('puppeteer')
const chalk = require('chalk')
const _ = require('lodash')
const Path = require('path')

const capture = async (page, baseUrl, { path, selector }, outputDir) => {
    const url = `${baseUrl}${path}`

    console.log(chalk`{yellow Capturing {white ${path}}} {dim (selector: ${selector})}`)

    await page.goto(url);

    const element = await page.$(selector)
    if (element === null) {
        throw new Error(`Unable to find element matching selector: '${selector}' (url: ${url})`)
    }

    const clip = await element.boundingBox()

    const filename =`${_.snakeCase(_.deburr(path))}.png`

    await page.screenshot({
        path:  Path.join(outputDir, filename),
        clip
    })

    console.log(chalk`  {green saved to {white ${filename}}}`)
    console.log('')
}

module.exports = async config => {
    console.log(chalk`{yellow Starting capture for ${config.pages.length} page(s)}`)
    console.log(chalk`  {dim baseUrl:   {white ${config.baseUrl}}}`)
    console.log(chalk`  {dim outputDir: {white ${config.outputDir}}}`)
    console.log('')

    try {
        const browser = await puppeteer.launch()
        const page    = await browser.newPage()
        await page.setViewport({ width: 1400, height: 4000 })

        for (let pageConfig of config.pages) {
            await capture(page, config.baseUrl, pageConfig, config.outputDir)
        }

        await browser.close()

        console.log(chalk`  {green done!}`)
    } catch (error) {
        console.log('')
        console.error(chalk`{red oops, something went wrong :(}`)

        throw error
    }
}