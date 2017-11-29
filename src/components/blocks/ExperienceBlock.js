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

const fakeData = ['4 years', '5 years', '4 years', '5 years', '4 years', '5 years', '4 years', '5 years']

export default class ExperienceBlock extends Component {
    static propTypes = {
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.object.isRequired,
    }

    render() {
        const { data, tools } = this.props

        const yearsOfExperienceData = ['Aggregated', ...tools].map(tool => {
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

        const averages = ['Aggregated', ...tools].map(tool => data[tool].by_experience.average).map(avg => `${avg} years`)

        return (
            <div className="block block--chart block--experience">
                <h3 className="block__title">Years of Experience</h3>
                <div className="block__description">
                    <p>
                        Per-library breakdown of developers according to years of experience.
                    </p>
                </div>
                <div className="block__contents">
                    <div className="block__contents__inner">
                        <Legends legends={legends} modifier="horizontal" />
                        <Averages data={averages}/>
                        <YearsOfExperienceBar data={yearsOfExperienceData} />
                    </div>
                </div>
            </div>
        )
    }
}
