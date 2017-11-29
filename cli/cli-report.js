'use strict'

const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const program = require('commander')
const ora = require('ora')
const reporter = require('./lib/collector/reporter')

const writeReport = async (type, report) =>
    fs.outputFile(
        path.join(__dirname, '..', 'src', 'data', `${type}.json`),
        JSON.stringify(report, null, '    ')
    )

const types = [
    'frontend',
    'state',
    'flavor',
    'style',
    'backend',
    'testing',
    'build',
    'mobile',
    'features',
    'opinion',
    'otherTools',
    'allToolsPairing',
    'users',
    'survey',
    'comments',
]
const reports = types.reduce((methods, type) => {
    methods[type] = async () => {
        const loader = ora(chalk.yellow(`computing report for ${chalk.white(type)}`)).start()
        const report = await reporter[type]()
        loader.succeed(chalk.green(`computed ${chalk.white(type)} report`))
        await writeReport(type, report)
    }

    return methods
}, {})

reports.all = async () => {
    for (let type in reports) {
        if (type === 'all') continue
        await reports[type]()
    }
}

program
    .arguments('<type>')
    .action(async type => {
        try {
            if (!reports[type]) {
                console.error(
                    chalk.red(
                        `'${type}' is not a valid report type, must be one of: '${types.join(
                            `', '`
                        )}' or 'all'`
                    )
                )
                process.exit(1)
            }

            await reports[type]()
        } catch (err) {
            console.error(err)
            process.exit(1)
        }
    })
    .parse(process.argv)
