import _ from 'lodash'

const parseCSV = csv => csv.map(row => {
  const parsedRow = row
  _.keys(parsedRow).forEach(key => {
    const number = parseFloat(parsedRow[key], 10)
    if (!isNaN(number)) {
      parsedRow[key] = number
    }
  })
  return parsedRow
})

export default parseCSV
