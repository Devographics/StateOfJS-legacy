'use strict'
const fs = require('fs')
const { promisify } = require('util')
const stat = promisify(fs.stat)

exports.writeFile = promisify(fs.writeFile)

exports.isDirectory = async dir => {
    try {
        const stats = await stat(dir)
        return stats.isDirectory()
    } catch (err) {
        return false
    }
}
