import React, { Component } from 'react'
import OtherToolBar from '../../../components/charts/OtherToolBar'
import OtherToolBubble from '../../../components/charts/OtherToolBubble'
import otherToolsData from '../../../data/otherTools.json'

export default class OtherTools extends Component {
    render() {
        return (
            <div className="Section">
                <h2 className="SectionTitle">
                    <span>Other tools</span>
                </h2>
                {otherToolsData.keys.map(otherTool => (
                    <div key={otherTool} style={{ marginBottom: 80 }}>
                        <h3 className="SubSectionTitle">{otherTool}</h3>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ width: '58%', height: 460 }}>
                                <OtherToolBar
                                    data={otherToolsData.aggs[otherTool].buckets
                                        .map(d => d)
                                        .reverse()}
                                />
                            </div>
                            <div style={{ width: '38%', height: 460 }}>
                                <OtherToolBubble
                                    tool={otherTool}
                                    data={otherToolsData.aggs[otherTool].buckets}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
