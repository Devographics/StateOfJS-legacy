import _ from 'lodash'

const parseCSV = csv => csv.map(row => {
  const parsedRow = row
  _.keys(parsedRow).forEach(key => {
    const int = parseInt(parsedRow[key], 10)
    if (!isNaN(int)) {
      parsedRow[key] = int
    }
  })
  return parsedRow
})

export default parseCSV
