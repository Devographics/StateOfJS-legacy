import React, { useContext } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import theme from 'nivoTheme'
import { opinionKeysFull, opinionKeys, opinionColors } from '../../../constants'
import { I18nContext } from 'core/i18n/i18nContext'

const bucketsMapping = {}
opinionKeysFull.forEach((key, i) => {
    bucketsMapping[key] = opinionKeys[i]
})

const ToolOpinionsChart = ({ buckets, keys = opinionKeys }) => {
    const { translate } = useContext(I18nContext)

    // const data = keys.map(key => ({
    //     id: key,
    //     label: translate(`features.usage.${key}`),
    //     value: feature.usage[key] || 0
    // }))

    // convert array into object
    const data = {}
    buckets.forEach(({ id, count }) => {
        const shortKey = bucketsMapping[id]
        data[shortKey] = count
    })
    console.log(data)
    console.log(keys)

    return (
        <ResponsiveBar
            layout="horizontal"
            theme={theme}
            // columns={8}
            // rows={12}
            // padding={5}
            // total={feature.total}
            // margin={{
            //     bottom: 5
            // }}
            // cellComponent={Cell}
            colors={opinionColors}
            // emptyColor="#ffffff"
            data={[data]}
            indexBy="country"
            keys={keys}
        />
    )
}

export default ToolOpinionsChart
