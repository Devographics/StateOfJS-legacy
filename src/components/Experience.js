import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExperienceLegends from './ExperienceLegends'
import ExperienceBar from './charts/ExperienceBar'

export default class Experience extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
    }

    state = {
        tool: 'all',
    }

    setTool = tool => {
        this.setState({ tool })
    }

    render() {
        const { title, data, description } = this.props
        const { tool } = this.state

        return (
            <div className="Section">
                <h3 className="SectionTitle">
                    <span>{title}</span>
                </h3>
                <div style={{ marginBottom: 40 }}>{description !== undefined && description}</div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <div style={{ width: '28%', paddingBottom: 50 }}>
                        <ExperienceLegends />
                        {/*data.map(item => (
                            <div className="PieRow" key={item.tool}>
                                <Pie
                                    width={36}
                                    height={36}
                                    margin={{
                                        top: 2,
                                        right: 2,
                                        bottom: 2,
                                        left: 2,
                                    }}
                                    innerRadius={0}
                                    borderWidth={1}
                                    borderColor="inherit:darker(0.2)"
                                    colors={colorRange}
                                    data={pieData(item)}
                                    enableRadialLabels={false}
                                    enableSlicesLabels={false}
                                    isInteractive={false}
                                />
                                {item.tool}
                            </div>
                        ))*/}
                    </div>
                    <div style={{ width: '70%' }}>
                        {/*
                        <Filters
                            filters={['all', 'interest', 'satisfaction']}
                            filter={tool}
                            onChange={this.setTool}
                            className="Filters--experience"
                        />
                        */}
                        <ExperienceBar facet={tool} data={data} indexBy="tool" />
                    </div>
                </div>
            </div>
        )
    }
}
