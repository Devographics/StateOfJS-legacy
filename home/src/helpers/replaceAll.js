const replaceAll = function(s, search, replacement) {
    var target = s
    return target.replace(new RegExp(search, 'g'), replacement)
}

export default replaceAll
