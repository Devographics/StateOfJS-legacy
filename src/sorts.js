import sortBy from 'lodash/sortBy'
import {
    experience,
    experienceKeys,
    experienceInterestKeys,
    experienceSatisfactionKeys,
    experienceColors,
} from './constants'

export const sortDataBy = (_data, indexBy, key) =>
    sortBy(
        _data.map(d => {
            const column = experienceKeys.reduce(
                (result, key) => {
                    result[key] = d[key]
                    // if (!experienceSatisfactionKeys.includes(key)) {
                    //     result[key] *= -1
                    // }
                    return result
                },
                { [indexBy]: d[indexBy] }
            )

            return column
        }),
        d => d[key]
    )
