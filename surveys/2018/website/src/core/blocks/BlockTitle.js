import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import ShareBlock from '../share/ShareBlock'
import TransText from '../i18n/TransText'
import Trans from '../i18n/Trans'
import { PageContextConsumer } from '../pages/pageContext'
import { getBlockTitle, getBlockDescription } from './blockHelpers'

class BlockTitle extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        showDescription: PropTypes.bool.isRequired,
        isShareable: PropTypes.bool.isRequired
    }

    static defaultProps = {
        showDescription: true,
        isShareable: true
    }

    state = {
        showOptions: false
    }

    toggleClass = () => {
        this.setState({
            showOptions: !this.state.showOptions
        })
    }

    render() {
        const { id, showDescription, isShareable, values } = this.props
        const { showOptions } = this.state

        return (
            <PageContextConsumer>
                {context => (
                    <Trans>
                        {translate => {
                            const title = getBlockTitle(id, context, translate, { values })
                            let description = ''
                            if (showDescription === true) {
                                description = getBlockDescription(id, context, translate, {
                                    values
                                })
                            }

                            return (
                                <div className={`Block__Heading Block__Heading--${id}`}>
                                    <div
                                        className={`Block__Title Block__Title--${
                                            showOptions ? 'open' : 'closed'
                                        }`}
                                    >
                                        <h3 className="Block__Title__Text Block__Title__Text--short">
                                            {title}
                                        </h3>
                                        <h3 className="Block__Title__Text Block__Title__Text--full">
                                            {title || (
                                                <TransText
                                                    id={`fullcharts.${id}`}
                                                    values={values}
                                                />
                                            )}
                                        </h3>
                                        {isShareable && (
                                            <ShareBlock
                                                id={id}
                                                className="Block__Title__Share"
                                                values={values}
                                                toggleClass={this.toggleClass}
                                            />
                                        )}
                                    </div>
                                    {showDescription && (
                                        <div className="Block__Description">
                                            <ReactMarkdown source={description} />
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                    </Trans>
                )}
            </PageContextConsumer>
        )
    }
}

export default BlockTitle
