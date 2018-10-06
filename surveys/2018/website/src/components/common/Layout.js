import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from './Nav'
import PageTitle from './PageTitle'
import Logo from './Logo'

const Spacer = () => <div className="pagelayout__spacer" />

const Close = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="Outline_Icons_1_">
            <g
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                id="Outline_Icons"
            >
                <line x1=".5" y1=".5" x2="23.5" y2="23.5" />
                <line x1="23.5" y1=".5" x2=".5" y2="23.5" />
            </g>
        </g>
        <rect fill="none" width="24" height="24" id="Invisible_Shape" />
    </svg>
)

const Menu = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="Outline_Icons_1_">
            <g id="Outline_Icons">
                <line
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    x1="19"
                    y1="5.5"
                    x2="4.043"
                    y2="5.5"
                />
                <line
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    x1="19"
                    y1="9.5"
                    x2="4.043"
                    y2="9.5"
                />
                <line
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    x1="19"
                    y1="13.5"
                    x2="4.043"
                    y2="13.5"
                />
                <line
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    x1="19"
                    y1="17.5"
                    x2="4.043"
                    y2="17.5"
                />
            </g>
        </g>
        <rect fill="none" width="24" height="24" id="Invisible_Shape" />
    </svg>
)

export default class Layout extends PureComponent {
    constructor() {
        super()
        this.state = {
            showSidebar: false
        }
    }

    openSidebar = () => {
        this.setState({
            showSidebar: true
        })
    }

    closeSidebar = () => {
        this.setState({
            showSidebar: false
        })
    }

    render() {
        const title = this.props.title
        const description = 'A short survey about current popular JavaScript technologies.'
        const url = 'http://stateofjs.com'
        const image = 'http://stateofjs.com/images/javascript2017-white.png'

        const meta = [
            { charset: 'utf-8' },
            { name: 'description', content: description },
            // responsive
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            // facebook
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: url },
            { property: 'og:image', content: image },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            // twitter
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image:src', content: image },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },

            // eslint-disable-next-line react/jsx-key
            <script src="//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js" type="text/javascript" />
        ]

        const sidebarClassName = this.state.showSidebar ? 'sidebar--shown' : 'sidebar--hidden'

        return (
            <div className={`pagelayout ${sidebarClassName}`}>
                <Helmet meta={meta}>
                    <script
                        src="//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js"
                        type="text/javascript"
                    />
                </Helmet>
                <link
                    href="https://fonts.googleapis.com/css?family=Space+Mono:400,400i|Roboto+Slab:300,400,700"
                    rel="stylesheet"
                />
                <div className="pagelayout__header">
                    <Spacer />
                    <h1 className="pagelayout__logo">
                        <Link to="/">
                            <Logo width={150} />
                        </Link>
                    </h1>
                    <Spacer />
                </div>
                <div className="pagelayout__inner">
                    <button
                        className="sidebar__toggle"
                        onClick={this.openSidebar}
                    >
                        <span>
                            <Menu />
                        </span>
                    </button>
                    <div className={`sidebar ${sidebarClassName}`}>
                        <button
                            className="sidebar__close"
                            onClick={this.closeSidebar}
                        >
                            <Close />
                        </button>
                        <Nav {...this.props} closeSidebar={this.closeSidebar} />
                    </div>
                    <div className="content">
                        <PageTitle {...this.props} />
                        {this.props.children}
                        <PageTitle {...this.props} mode="pagination" />
                    </div>
                </div>
            </div>
        )
    }
}
