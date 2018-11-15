import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getWording } from '../../helpers/wording'
import BlockTitle from '../elements/BlockTitle'
import ToolsSubAggsHeatMapChart from '../charts/ToolsSubAggsHeatMapChart'

export default class ToolsSubAggsDistributionBlock extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        aggsType: PropTypes.string.isRequired,
        formatValue: PropTypes.func,
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                tool: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                average: PropTypes.number.isRequired,
                ranges: PropTypes.arrayOf(
                    PropTypes.shape({
                        range: PropTypes.string.isRequired,
                        count: PropTypes.number.isRequired,
                        percentage: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }

    render() {
        const { section, aggsType, formatValue, keys, data } = this.props
        const chartId = `tools_${aggsType}`

        return (
            <div className="block block--chart">
                <BlockTitle chartId={chartId} />
                <div className="block__description">
                    <p>
                        {getWording(`block_intro.tools_${aggsType}`, {
                            section: getWording(`nav.${section}`)
                        })}
                    </p>
                </div>
                <ToolsSubAggsHeatMapChart
                    keys={keys}
                    i18nNamespace={aggsType}
                    averageLabel={getWording(`tools_${aggsType}_average`)}
                    formatValue={formatValue}
                    data={data}
                />
            </div>
        )
    }
}
