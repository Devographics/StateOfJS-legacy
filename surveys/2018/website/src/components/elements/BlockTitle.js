import React, { Component } from 'react'
import { getWording } from '../../helpers/wording'
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
        const { title, chartId, values } = this.props
        const { showOptions } = this.state
        const shortTitle = title || getWording(`charts.${chartId}`, values)
        return (
            <div className={`Block__Title Block__Title--${showOptions ? 'open' : 'closed'}`}>
                <h3 className="Block__Title__Text Block__Title__Text--short">{shortTitle}</h3>
                <h3 className="Block__Title__Text Block__Title__Text--full">
                    {title || getWording(`fullcharts.${chartId}`, values, shortTitle)}
                </h3>
                {chartId && (
                    <ShareChart
                        className="Block__Title__Share"
                        chartId={chartId}
                        values={values}
                        toggleClass={this.toggleClass}
                    />
                )}
            </div>
        )
    }
}

export default BlockTitle
