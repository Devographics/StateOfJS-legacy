import React from 'react'
import otherToolsData from '../data/otherTools.json'
import Layout from '../components/common/Layout'
import SectionHeader from '../components/elements/SectionHeader'
import BarBlock from '../components/blocks/BarBlock'

const OtherTools = props => (
    <Layout {...props}>
        <div className="page">
            <SectionHeader />
            {otherToolsData.keys.map(otherTool => {
                const data = otherToolsData.aggs[otherTool].buckets
                console.log(data)
                return (
                    <div className="Block Block--chart block block--chart" key={otherTool}>
                        <BarBlock data={data} title={otherTool} />
                    </div>
                )
            })}
        </div>
    </Layout>
)

export default OtherTools
