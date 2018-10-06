import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import getPageTitle from '../helpers/getPageTitle'
import featuresData from '../data/features.json'
import FeatureBar from '../components/charts/FeatureBar'
import Layout from '../components/common/Layout'

const text = `
Which features do developers value the most in a JavaScript
app?
`

const Features = () => (
    <Layout title={getPageTitle('Features')}>
        <div>
            <TextBlock text={text} />
            {featuresData.keys.map(feature => (
                <div className="block block--chart" key={feature}>
                    <h3 className="block__title">{feature}</h3>
                    <FeatureBar feature={feature} />
                </div>
            ))}
        </div>
    </Layout>
)

export default Features
