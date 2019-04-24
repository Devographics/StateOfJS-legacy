import React from 'react'
import blockRegistry from '../helpers/blockRegistry'

const DefaultComponent = ({ block }) => (
    <p>
        Missing Block Component! Block ID: {block.id} | type: {block.type}
    </p>
)

const BlockSwitcher = ({ data, block }) => {
    if (!data) {
        return (
            <div>
                No available data for block {block.id} | type: {block.type}
            </div>
        )
    }
    const { type } = block
    const BlockComponent = blockRegistry[type] ? blockRegistry[type] : DefaultComponent
    return <BlockComponent block={block} data={data} />
}

export default BlockSwitcher
