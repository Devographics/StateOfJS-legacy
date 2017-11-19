'use strict'

const config = require('@ekino/config')
const capture = require('./lib/capture')

const run = async () => {
    try {
        await capture(config.get('capture'))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

run()
