import React, { Component } from 'react'
import { WaffleCanvas } from '@nivo/waffle'
import MapChart from './MapChart'
import theme from '../../nivoTheme'

export default class GenderMapChart extends Component {
    render() {
        const { data } = this.props

        const continentsData = data.by_continent.reduce((acc, continent) => {
            const surveyAggs = continent.by_survey.find(s => s.survey === '2018')
            const genderAgg = surveyAggs.gender
                .filter(b => b.id !== 'prefer not to say')
                .map(b => ({
                    ...b,
                    value: b.count,
                    label: b.id
                }))

            return {
                ...acc,
                [continent.continent]: {
                    total: genderAgg.reduce((t, b) => t + b.value, 0),
                    data: genderAgg
                }
            }
        }, {})

        return (
            <MapChart
                height={400}
                renderContinentOverlay={({ continent, centroid }) => {
                    const continentData = continentsData[continent]

                    return (
                        <div
                            style={{
                                position: 'absolute',
                                top: centroid[1] - 60,
                                left: centroid[0] - 40
                            }}
                        >
                            <WaffleCanvas
                                total={continentData.total}
                                width={50}
                                height={70}
                                columns={10}
                                rows={14}
                                padding={1}
                                isInteractive={true}
                                colors={theme.genderColors}
                                data={continentData.data}
                                colorBy={d => theme.genderColors[d.id]}
                            />
                            <div
                                style={{
                                    textAlign: 'center',
                                    width: 110,
                                    marginLeft: -30,
                                    fontSize: 13
                                }}
                            >
                                {continent}
                            </div>
                        </div>
                    )
                }}
            />
        )
    }
}
