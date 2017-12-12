import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import SalariesBar from '../charts/SalariesBar'
import { salaryKeys, colorScale } from '../../constants'
import Legends from '../elements/Legends'
import Averages from '../elements/Averages'
import ShareChart from '../common/ShareChart'

const legends = salaryKeys.map((key, index) => ({
    label: key,
    color: colorScale[index],
}))

// see https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
export const formatMoney = n => {
    const figure = n.toString().replace(/./g, function(c, i, a) {
        return i && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c
    })
    return `$${figure}`
}

export default class SalariesBlock extends Component {
    static propTypes = {
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.object.isRequired,
    }

    render() {
        const { data, tools, section } = this.props

        const allKeys = sortBy(['Aggregated', ...tools], key => data[key].by_salary.average)
        const averages = allKeys.map(tool => ({
            tool,
            value: formatMoney(data[tool].by_salary.average * 1000),
        }))

        const salariesData = allKeys.map(tool => {
            const toolSalaries = { tool }
            const buckets = data[tool].by_salary.buckets
            salaryKeys.forEach(salaryKey => {
                const bucket = buckets.find(({ key }) => key === salaryKey)
                toolSalaries[salaryKey] = bucket.percentage
            })

            return toolSalaries
        })

        return (
            <div className="block block--chart block--salaries">
                <h3 className="block__title">Salary Ranges</h3>
                <div className="block__description">
                    <p>
                        Per-library breakdown of developers according to salary range (aggregated value
                        over all libraries highlighted)
                        {/*
                        (restrict to{' '}
                        <a className="salaries__selector" href="#">
                            United States
                        </a>)
                        */}
                        .
                    </p>
                </div>
                <div className="block__contents capture">
                    <div className="block__contents__inner">
                        <Legends legends={legends} modifier="horizontal" />
                        <Averages data={averages} />
                        <SalariesBar data={salariesData} />
                    </div>
                </div>
                <ShareChart section={section} subSection="developers" />
            </div>
        )
    }
}
