import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CountryBubble from '../charts/CountryBubble'

const BubbleImplementation = ({ countries, tools, currentTool, setCurrentTool }) => (
    <div className="worldwide__grid">
        {countries.filter(({ key }) => key !== 'undefined').map(country => (
            <div key={country.key} className="worldwide__grid__item">
                <div className="worldwide__chart">
                    <CountryBubble
                        keys={tools}
                        data={country}
                        currentTool={currentTool}
                        setCurrentTool={setCurrentTool}
                    />
                </div>
                <h4 style={{ textAlign: 'center' }}>{country.key}</h4>
            </div>
        ))}
    </div>
)

export default class WorldwideBlock extends Component {
    static propTypes = {
        title: PropTypes.string,
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            tool: null,
        }
    }

    setTool = tool => {
        this.setState({ tool })
    }

    render() {
        const { title, countries, tools } = this.props
        const { tool } = this.state

        return (
            <div className="block block--chart block--worldwide">
                <div className="block__description">
                    <p>
                        Tool usage by country (usage defined as respondents who picked
                        “have used before and would use again”). Red indicates higher compared to average, blue indicates lower
                        usage compared to average. 
                    </p>
                    <p>
                        Note: only countries which received over 200 total entries are shown. 
                    </p>
                </div>
                <BubbleImplementation
                    countries={countries}
                    tools={tools}
                    currentTool={tool}
                    setCurrentTool={this.setTool}
                />
            </div>
        )
    }
}
