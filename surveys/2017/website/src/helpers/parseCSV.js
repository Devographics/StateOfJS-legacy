import _ from 'lodash'

const parseCSV = csv =>
    csv.map(row => {
        const parsedRow = row
        _.keys(parsedRow).forEach(key => {
            const number = parseFloat(parsedRow[key], 10)
            if (!isNaN(number) && key !== 'Option') {
                // never parse the option label
                parsedRow[key] = number
            }
        })
        return parsedRow
    })

export default parseCSV
