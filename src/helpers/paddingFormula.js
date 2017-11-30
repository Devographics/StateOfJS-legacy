const paddingFormula = numberOfBars => {
    const numberOfColumns = numberOfBars * 2 + 1
    const singleColumnWidth = `100%/${numberOfColumns}`
    const paddingWidth = `${singleColumnWidth}/2`
    return `0 calc(${paddingWidth})`
}

export default paddingFormula
