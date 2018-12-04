export const computePeriodicTableElement = size => ({
    padding: Math.round(size * 0.1),
    centerX: size * 0.5,

    indexFontSize: Math.round(size / 8),
    indexSize: Math.round(size / 8),

    symbolFontSize: Math.round(size / 3),
    symbolY: size * 0.43 - Math.round(size / 3) / 2,
    symbolHeight: Math.round(size / 3),

    labelFontSize: Math.round(size / 8),
    labelY: size * 0.7,
    labelHeight: Math.round(size / 10)
})
