import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumbersOfLibrariesPie from '../charts/NumbersOfLibrariesPie'

export default class NumberOfLibrariesBlock extends Component {
    static propTypes = {
        keys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.number.isRequired,
                doc_count: PropTypes.number.isRequired,
            })
        ).isRequired,
    }

    render() {
        const { keys, data } = this.props

        return (
            <div className="block block--chart block--numberoflibs">
                <h3 className="block__title">Number of Libraries Used</h3>
                <div className="block__description">
                    <p>
                        How many different libraries are developers using (defined as respondents
                        who picked “have used before and would use again”)?
                    </p>
                </div>
                <div style={{ height: '500px' }}>
                    <NumbersOfLibrariesPie keys={keys} data={data} />
                </div>
            </div>
        )
    }
}
