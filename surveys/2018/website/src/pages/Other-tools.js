import React from 'react'
import OtherToolBar from '../components/charts/OtherToolBar'
import otherToolsData from '../data/otherTools.json'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'

const OtherTools = props => (
    <Layout {...props}>
        <div className="page">
            <SectionHeader />
            {otherToolsData.keys.map(otherTool => (
                <div className="block block--chart" key={otherTool}>
                    <h3 className="block__title">{otherTool}</h3>
                    <div className="block__description">
                        <p>Library usage counts.</p>
                    </div>
                    <div style={{ height: 460 }}>
                        <OtherToolBar
                            data={otherToolsData.aggs[otherTool].buckets.map(d => d).reverse()}
                        />
                    </div>
                </div>
            ))}
        </div>
    </Layout>
)

export default OtherTools
