import React from 'react'
import OtherToolBar from '../../components/charts/OtherToolBar'
import otherToolsData from '../../data/otherTools.json'
import TextBlock from '../../components/blocks/TextBlock'
import getPageTitle from '../../helpers/getPageTitle'
import DocumentTitle from 'react-document-title'

const text = `
Other tools that didn't quite fit in any other category. 
`

const OtherTools = () => (
    <DocumentTitle title={getPageTitle('Other Tools')}>
        <div className="page">
            <TextBlock text={text} />
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
    </DocumentTitle>
)

export default OtherTools
