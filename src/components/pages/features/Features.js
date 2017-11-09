import React, { Component } from 'react'
import { featureKeys, featureColors } from '../../../constants'
import featuresData from '../../../data/features.json'
import Legends from '../../Legends'
import FeatureBar from '../../charts/FeatureBar'

const legends = featureKeys.map(key => ({
    label: key,
    color: featureColors[key],
}))

export default class Features extends Component {
    render() {
        return (
            <div className="Section">
                <h2 className="SectionTitle">
                    <span>Features</span>
                </h2>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        className="description"
                        style={{
                            width: '47%',
                            marginBottom: 50,
                        }}
                    >
                        <p>
                            If you want to find out how the JavaScript ecosystem will evolve, it can
                            be interesting to know which features and tools are most valued.
                        </p>
                        <p>
                            So for each of the following features, I asked developers to pick the
                            option that they felt applied best:
                        </p>
                        <Legends
                            legends={legends}
                            style={{ marginTop: 20, flexWrap: 'wrap' }}
                            itemStyle={{
                                fontSize: '16px',
                                width: '48%',
                                marginLeft: 0,
                            }}
                        />
                    </div>
                    {featuresData.keys.map(feature => (
                        <div
                            key={feature}
                            style={{
                                width: '47%',
                                marginBottom: 50,
                            }}
                        >
                            <h3 className="SubSectionTitle">{feature}</h3>
                            <FeatureBar feature={feature} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
