const replaceAll = function(s, search, replacement) {
    const target = s

    return target.replace(new RegExp(search, 'g'), replacement)
}

export default replaceAll
