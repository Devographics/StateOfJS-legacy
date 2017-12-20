import sum from 'lodash/sum'

const sumObject = o => sum(Object.keys(o).map(k => o[k]))

export default sumObject