const replaceAll = function(s, search, replacement) {
    var target = s;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const addParagraphs = s => `<p>${replaceAll(s, '\n\n', '</p><p>')}</p>`

export default addParagraphs