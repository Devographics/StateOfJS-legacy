import React, { Component } from 'react'
import { getWording } from '../../helpers/wording'
import ShareChart from '../common/ShareChart'
import ReactMarkdown from 'react-markdown'

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
        const { title, description, chartId, values } = this.props
        const { showOptions } = this.state
        const shortTitle = title || getWording(`charts.${chartId}`, values)
        const blockDescription =
            description || getWording(`charts_descriptions.${chartId}`, values, null)

        return (
            <div className={`Block__Heading Block__Heading--${chartId}`}>
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
                {blockDescription && (
                    <div className="Block__Description">
                        <ReactMarkdown source={blockDescription} />
                    </div>
                )}
            </div>
        )
    }
}

export default BlockTitle
