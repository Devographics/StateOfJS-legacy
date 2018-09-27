import sortBy from 'lodash/sortBy'
import { experienceKeys } from './constants'

export const sortDataBy = (_data, indexBy, key) =>
    sortBy(
        _data.map(d => {
            const column = experienceKeys.reduce(
                (result, key) => {
                    result[key] = d[key]

                    return result
                },
                { [indexBy]: d[indexBy] }
            )

            return column
        }),
        d => d[key]
    )
