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

        const yearsOfExperienceData = tools.map(tool => {
            const toolYearsOfExperience = { tool }
            const totalUserCount = data[tool].doc_count
            const buckets = data[tool].by_experience.buckets
            yearsOfExperienceKeys.forEach(yearsOfExperienceKey => {
                const bucket = buckets.find(({ key }) => key === yearsOfExperienceKey)
                toolYearsOfExperience[yearsOfExperienceKey] = Math.round(
                    (bucket ? bucket.doc_count : 0) / totalUserCount * 100
                )
            })

            return toolYearsOfExperience
        })

        return (
            <div className="block developers-block">
                <h4 className="SubSectionTitle">Years of experience</h4>
                <YearsOfExperienceBar data={yearsOfExperienceData} />
            </div>
        )
    }
}
