import React, { Component } from 'react'
import PropTypes from 'prop-types'
import maxBy from 'lodash/maxBy'
import { HelpCircle } from 'react-feather'
import Filters from './Filters'
import YearsOfExperienceBar from './charts/YearsOfExperienceBar'
import SalariesBar from './charts/SalariesBar'
import AllUsagesBar from './charts/AllUsagesBar'
import usersData from '../data/users.json'

export default class UsersFacts extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        defaultTool: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            tool: props.defaultTool,
            mode: 'absolute',
            salaryRange: null,
            yearsOfExperience: null,
        }
    }

    setTool = tool => {
        this.setState({ tool })
    }

    setMode = mode => {
        this.setState({ mode })
    }

    setSalaryRange = salaryRange => {
        this.setState({
            salaryRange,
            yearsOfExperience: null,
        })
    }

    setYearsOfExperience = yearsOfExperience => {
        this.setState({
            yearsOfExperience,
            salaryRange: null,
        })
    }

    render() {
        const { title, data, tools } = this.props
        const { tool, mode, yearsOfExperience, salaryRange } = this.state

        let allUsagesData
        let allUsagesDataAbsolute
        let allUsagesDataRelative
        let mostUsedAbsolute
        let mostUsedRelative
        if (yearsOfExperience !== null) {
            allUsagesDataAbsolute = tools.map(key => {
                const bucket = data[key].by_experience.buckets.find(
                    ({ key }) => key === yearsOfExperience
                )
                return {
                    id: key,
                    users: bucket ? bucket.doc_count : 0,
                }
            })

            const allUsers = usersData['Years of Experience'][yearsOfExperience]
            allUsagesDataRelative = allUsagesDataAbsolute.map(({ id, users }) => ({
                id,
                users: Math.round(users / allUsers * 100),
            }))

            mostUsedAbsolute = maxBy(allUsagesDataAbsolute, 'users')
            mostUsedRelative = maxBy(allUsagesDataRelative, 'users')
        } else if (salaryRange !== null) {
            allUsagesDataAbsolute = tools.map(key => {
                const bucket = data[key].by_salary.buckets.find(({ key }) => key === salaryRange)
                return {
                    id: key,
                    users: bucket ? bucket.doc_count : 0,
                }
            })

            const allUsers = usersData['Yearly Salary'][salaryRange]
            allUsagesDataRelative = allUsagesDataAbsolute.map(({ id, users }) => ({
                id,
                users: Math.round(users / allUsers * 100),
            }))

            mostUsedAbsolute = maxBy(allUsagesDataAbsolute, 'users')
            mostUsedRelative = maxBy(allUsagesDataRelative, 'users')
        }
        allUsagesData = mode === 'absolute' ? allUsagesDataAbsolute : allUsagesDataRelative

        const stats = data[tool]
        let experienceBuckets = stats.by_experience.buckets
        let salaryBuckets = stats.by_salary.buckets
        if (mode !== 'absolute') {
            experienceBuckets = experienceBuckets.map(({ key, doc_count }) => ({
                key,
                doc_count: Math.round(doc_count / usersData['Years of Experience'][key] * 100),
            }))
            salaryBuckets = salaryBuckets.map(({ key, doc_count }) => ({
                key,
                doc_count: Math.round(doc_count / usersData['Yearly Salary'][key] * 100),
            }))
        }

        return (
            <div className="Section">
                <h3 className="SectionTitle">
                    <span>{title}</span>
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Filters filters={tools} filter={tool} onChange={this.setTool} />
                    <Filters
                        filters={['absolute', 'relative (%)']}
                        filter={mode}
                        onChange={this.setMode}
                    />
                </div>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}
                    className="description"
                >
                    <div style={{ width: '48%' }}>
                        Years of experience and salary ranges of users who have used{' '}
                        <strong>{tool}</strong> and are willing to continue to do so. Most users are
                        in the <strong>{stats.by_salary.buckets[0].key}</strong> salary range and
                        have <strong>{stats.by_experience.buckets[0].key}</strong> of experience.
                    </div>
                    <div style={{ width: '48%' }}>
                        <strong>relative</strong> mode weights counts according to total number of
                        responses in each segment. It gives an overview of the proportions instead
                        of absolute counts.
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                    <div style={{ width: '48%' }}>
                        <h4 className="SubSectionTitle">Years of experience</h4>
                        <div className="Help">
                            <HelpCircle size={18} /> click on a bar to see all usages for given
                            years of experience.
                        </div>
                        <YearsOfExperienceBar
                            yearsOfExperience={experienceBuckets}
                            mode={mode}
                            onSelect={this.setYearsOfExperience}
                        />
                    </div>
                    <div style={{ width: '48%' }}>
                        <h4 className="SubSectionTitle">Salary <select><option>United States</option></select></h4>
                        <div className="Help">
                            <HelpCircle size={18} /> click on a bar to see all usages for a given
                            salary range.
                        </div>
                        <SalariesBar
                            salaries={salaryBuckets}
                            mode={mode}
                            onSelect={this.setSalaryRange}
                        />
                    </div>
                </div>
                <div style={{ marginBottom: 60 }}>
                    {yearsOfExperience === null && salaryRange === null && (
                        <div className="user-facts-placeholder">
                            <h3>Please click a bar above</h3>
                        </div>
                    )}
                    {yearsOfExperience !== null && (
                        <div>
                            <h4 className="SubSectionTitle">
                                All usages for users who have <strong>{yearsOfExperience}</strong>{' '}
                                of experience
                            </h4>
                            <p className="description">
                                <strong>{mostUsedAbsolute.id}</strong> is the most used tool for
                                users having <strong>{yearsOfExperience}</strong> of experience with{' '}
                                <strong>{mostUsedAbsolute.users}</strong> happy users ({mostUsedRelative.users}%).
                            </p>
                        </div>
                    )}
                    {salaryRange !== null && (
                        <div>
                            <h4 className="SubSectionTitle">
                                All usages in the <strong>{salaryRange}</strong> salary range
                            </h4>
                            <p className="description">
                                <strong>{mostUsedAbsolute.id}</strong> is the most used tool in the{' '}
                                <strong>{salaryRange}</strong> salary range with{' '}
                                <strong>{mostUsedAbsolute.users}</strong> happy users (<strong>{mostUsedRelative.users}%</strong>).
                            </p>
                        </div>
                    )}
                    {allUsagesData && <AllUsagesBar data={allUsagesData} mode={mode} />}
                </div>
            </div>
        )
    }
}
