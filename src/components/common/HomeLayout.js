import React from 'react'
import TextBlock from '../blocks/TextBlock.js'

import Nav from './Nav'

import footerContents from '../../../data/footer.md'

const HomeLayout = (props) =>
    <div className="home-layout">
		{props.children}
        <TextBlock contents={footerContents} className="footer home-footer" />
    </div>

export default HomeLayout
