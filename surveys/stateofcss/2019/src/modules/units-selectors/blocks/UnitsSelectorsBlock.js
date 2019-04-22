import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Block from 'core/blocks/Block'
import { PageContext } from 'core/pages/pageContext'
import { I18nContext } from 'core/i18n/i18nContext'

const UnitsSelectorsBlock = ({ block }) => {
    const context = useContext(PageContext)
    const { translate } = useContext(I18nContext)

    return (
        <Block id={block.id} showDescription={false}>
            <div className="UnitsSelectors">
                <div>
                    <div style={{ height: 260 }}>
                        {/* <BarChart /> */}
                    </div>
                </div>
            </div>
        </Block>
    )
}

UnitsSelectorsBlock.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
}

export default UnitsSelectorsBlock
