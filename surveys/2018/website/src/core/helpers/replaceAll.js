const replaceAll = function(s, search, replacement) {
    const newString = s.replace(new RegExp(search, 'g'), replacement)
    return newString
}

export default replaceAll
