import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CountryBubble from '../charts/CountryBubble'
// import CountryTreeMap from '../charts/CountryTreeMap'

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

// const TreeMapImplementation = ({ countries, tools, currentTool, setCurrentTool }) => (
//     <div className="worldwide__grid">
//         {countries.filter(({ key }, i) => key !== 'undefined').map(country => (
//             <div key={country.key} className="worldwide__grid__item">
//                 <div className="worldwide__chart">
//                     <CountryTreeMap
//                         keys={tools}
//                         data={country}
//                         currentTool={currentTool}
//                         setCurrentTool={setCurrentTool}
//                     />
//                 </div>
//                 <h4 style={{ textAlign: 'center' }}>{country.key}</h4>
//             </div>
//         ))}
//     </div>
// )

export default class WorldwideBlock extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
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
            <div className="Section">
                <h3 className="SectionTitle">
                    <span>{title}</span>
                </h3>
                <div className="description">
                    <p>
                        Locations where tools have been used & people are willing to continue to do
                        so.<br />
                        Please be aware that those stats only take in account responses we were able
                        to locate.
                    </p>
                </div>
                {/*

                    @todo

                    You can test bubble or treemap implementation for now,
                    for testing purpose, but once we decide which one we want to use,
                    the other should be removed.

                    Simply use `BubbleImplementation` or `TreeMapImplementation`.

                */}
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
