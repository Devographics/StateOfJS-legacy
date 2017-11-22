import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YearsOfExperienceBar from '../charts/YearsOfExperienceBar'
import SalariesBar from '../charts/SalariesBar'
import { salaryKeys, yearsOfExperienceKeys } from '../../constants'

export default class DevelopersBlock extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
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
            <div className="block developers-block">
                <div className="capture">
                    <h4 className="SubSectionTitle">Salary range</h4>
                    <SalariesBar data={salariesData} />
                </div>
            </div>
        )
    }
}
