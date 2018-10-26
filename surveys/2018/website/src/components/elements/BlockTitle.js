import React, { Component } from 'react'
import { getWording, getToolName } from '../../helpers/wording'
import ShareChart from '../common/ShareChart'

class BlockTitle extends Component {
    state = {
        showOptions: false
    }

    toggleClass = () => {
        this.setState({
            showOptions: !this.state.showOptions
        })
    }

    render() {
        const { title, chart, tool } = this.props
        const { showOptions } = this.state

        return (
            <div className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}>
                <h3 className="Block__Title__Text">
                    {title || getWording(`charts.${chart}`, { tool: getToolName(tool) })}
                </h3>
                <ShareChart
                    className="Block__Title__Share"
                    chart={chart}
                    toggleClass={this.toggleClass}
                />
            </div>
        )
    }
}

export default BlockTitle
