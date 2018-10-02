import replaceAll from './replaceAll'

const addParagraphs = s => `<p>${replaceAll(s, '\n\n', '</p><p>')}</p>`

export default addParagraphs
