import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YearsOfExperienceBar from '../charts/YearsOfExperienceBar'
import SalariesBar from '../charts/SalariesBar'
import { yearsOfExperienceKeys, colorScale } from '../../constants'
import Legends from '../elements/Legends'
import Averages from '../elements/Averages'

const legends = yearsOfExperienceKeys.map((key, index) => ({
    label: key,
    color: colorScale[index],
}))

const fakeData = ['4 years', '5 years', '4 years', '5 years', '4 years', '5 years', '4 years', '5 years', '4 years', '5 years', '3 years']

export default class ExperienceBlock extends Component {
    static propTypes = {
        title: PropTypes.string,
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
            <div className="block block--chart block--experience">
                <h3 className="block__title">Years of Experience</h3>
                <div className="block__description">
                    <p>
                        Per-library breakdown of developers according to years of experience.
                    </p>
                </div>
                <Legends legends={legends} modifier="horizontal" />
                <Averages data={fakeData}/>
                <YearsOfExperienceBar data={yearsOfExperienceData} />
            </div>
        )
    }
}
