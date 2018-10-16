import React from 'react'
import opinionsData from '../data/opinions.json'
import OpinionBar from '../components/charts/OpinionBar'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'

const Opinions = props => (
    <Layout {...props}>
        <div>
            <SectionHeader />
            {opinionsData.keys.map(opinion => (
                <div className="block block--chart" key={opinion}>
                    <h3 className="block__title">“{opinion}”</h3>
                    <OpinionBar opinion={opinion} />
                </div>
            ))}
        </div>
    </Layout>
)

export default Opinions
