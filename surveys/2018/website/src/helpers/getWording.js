import wording from '../data/wording.yml'

const getWording = (type, id, values) => {
    let s = wording[type][id]
    if (values && s) {
        Object.keys(values).forEach(keyword => {
            s = s.replace(`{${keyword}}`, values[keyword])
        })
    }
    return s
}

export default getWording
