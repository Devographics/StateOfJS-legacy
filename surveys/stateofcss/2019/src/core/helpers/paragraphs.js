import replaceAll from '../helpers/replaceAll'

const addParagraphs = s => `<p>${replaceAll(s, '\n\n', '</p><p>')}</p>`

export default addParagraphs
