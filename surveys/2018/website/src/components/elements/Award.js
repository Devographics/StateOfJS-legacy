import React, { Component } from 'react'
import PeriodicElement from './PeriodicElement'
import { getToolName } from '../../helpers/wording'
import periodicTableData from '../../data/periodic_table.yml'
import ReactMarkdown from 'react-markdown'
import ShareChart from '../common/ShareChart'
import slugify from '../../helpers/slugify'

class Award extends Component {
    state = {
        show: false
    }

    handleClick = () => {
        this.setState({ show: true })
    }

    render() {
        const { heading, description, tool, comment, runnerups } = this.props
        const { show } = this.state
        return (
            <div className={`Award Award--${show ? 'show' : 'hide'}`} id={slugify(heading)}>
                <h3 className="Award__Heading">{heading}</h3>
                <div className="Award__Description">{description}</div>
                <div className="Award__Element__Container">
                    <div className="Award__Element" onClick={this.handleClick}>
                        <PeriodicElement
                            className="Award__Element__Face Award__Element__Face--front"
                            symbol="?"
                            name={null}
                            number={null}
                            size={150}
                        />
                        <PeriodicElement
                            className="Award__Element__Face Award__Element__Face--back"
                            symbol={periodicTableData.tools[tool]}
                            name={getToolName(tool)}
                            number={1}
                            size={150}
                        />
                    </div>
                </div>

                <div className="Award__Comment">
                    <ReactMarkdown source={comment} />
                    <ShareChart
                        title={`${heading} Award`}
                        chart={slugify(heading)}
                        className="Award__Share"
                    />
                </div>
                <div className="Awards__RunnerUps">
                    <h4 className="Awards__RunnerUps__Heading">Runner-Ups</h4>
                    {runnerups.map(({ tool, figure }, i) => (
                        <div
                            key={tool}
                            className={`Awards__RunnerUps__Item Awards__RunnerUps__Item--${i}`}
                        >
                            {i + 2}. {getToolName(tool)} {figure && `(${figure})`}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default Award
