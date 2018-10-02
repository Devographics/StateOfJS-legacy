import React from 'react'
import DocumentTitle from 'react-document-title'
import TextBlock from '../../components/blocks/TextBlock'
import getPageTitle from '../../helpers/getPageTitle'
import featuresData from '../../data/features.json'
import FeatureBar from '../../components/charts/FeatureBar'

const text = `
Which features do developers value the most in a JavaScript
app?
`

const Features = () => (
    <DocumentTitle title={getPageTitle('Features')}>
        <div>
            <TextBlock text={text} />
            {featuresData.keys.map(feature => (
                <div className="block block--chart" key={feature}>
                    <h3 className="block__title">{feature}</h3>
                    <FeatureBar feature={feature} />
                </div>
            ))}
        </div>
    </DocumentTitle>
)

export default Features
