import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YearsOfExperienceBar from '../charts/YearsOfExperienceBar'
import SalariesBar from '../charts/SalariesBar'
import { salaryKeys, colorScale } from '../../constants'
import Legends from '../elements/Legends'
import Averages from '../elements/Averages'

const legends = salaryKeys.map((key, index) => ({
    label: key,
    color: colorScale[index],
}))

const fakeData = ['56000', '45000', '52300', '65000', '46000', '64900', '56000', '45000', '52300']

// see https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
export const formatMoney = n => {
  const figure = n.toString().replace(/./g, function(c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
  return `$${figure}`
}

const fakeDataFormatted = fakeData.map(formatMoney)

export default class SalariesBlock extends Component {
    static propTypes = {
        title: PropTypes.string,
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        defaultTool: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    }

    render() {
        const { title, data, tools } = this.props

        const salariesData = tools.map(tool => {
            const toolSalaries = { tool }
            const totalUserCount = data[tool].doc_count
            const buckets = data[tool].by_salary.buckets
            salaryKeys.forEach(salaryKey => {
                const bucket = buckets.find(({ key }) => key === salaryKey)
                toolSalaries[salaryKey] = Math.round(
                    (bucket ? bucket.doc_count : 0) / totalUserCount * 100
                )
            })

            return toolSalaries
        })

        return (
            <div className="block block--chart block--salaries">
                <h3 className="block__title">Salary Ranges</h3>
                <div className="block__description">
                    <p>
                        Per-library breakdown of developers according to salary 
                        range (restrict to <a className="salaries__selector" href="#">United States</a>). 
                    </p>
                </div>
                <div className="capture">
                    <Legends legends={legends} modifier="horizontal" />
                    <Averages data={fakeDataFormatted}/>
                    <SalariesBar data={salariesData} />
                </div>
            </div>
        )
    }
}
