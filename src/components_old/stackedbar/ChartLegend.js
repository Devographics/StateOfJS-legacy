import React from 'react'
import _, { includes } from 'lodash'

export default class ChartLegend extends React.Component {
    constructor() {
        super()
        this.getFill = this.getFill.bind(this)
        this.renderItem = this.renderItem.bind(this)
    }

    // get the fill color for a given response according to the current active filter
    getFill(responseName) {
        const response = this.props.responses[responseName]
        return includes(response.filters, this.props.filter) ? response.onColor : response.offColor
    }

    renderItem({ string }, key) {
        const fill = this.getFill(key)
        return (
            <li key={key}>
                <span className="legend-key" style={{ backgroundColor: fill }} />
                <span className="legend-label">{string}</span>
            </li>
        )
    }

    render() {
        return <ul className="legend">{_.map(this.props.responses, this.renderItem)}</ul>
    }
}

ChartLegend.propTypes = {
    responses: React.PropTypes.object,
    filter: React.PropTypes.string,
}
