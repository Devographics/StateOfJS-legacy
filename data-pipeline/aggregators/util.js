exports.computeTotalForKeys = (obj, keys) =>
    keys.reduce((acc, key) => acc + obj[key], 0)

exports.computePercentageForKeys = (obj, keys) => {
    obj.total = exports.computeTotalForKeys(obj, keys)
    if (obj.total === 0) {
        keys.forEach(key => {
            obj[key] = { val: 0, percent: 0 }
        })

        return obj
    }

    let totalPercentage = 0
    keys.forEach(key => {
        const val = obj[key]
        const percent = Math.round(val / obj.total * 100)
        obj[key] = { val, percent }
        totalPercentage += percent
    })

    return obj
}