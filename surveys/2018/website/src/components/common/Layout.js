import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import PageTitle from './PageTitle'
import '../../stylesheets/screen.scss'
import Sidebar from './Sidebar'

export default class Layout extends PureComponent {
    constructor() {
        super()
        this.state = {
            showSidebar: false
        }
    }

    toggleSidebar = () => {
        this.setState({
            showSidebar: !this.state.showSidebar
        })
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

        const { showPagination = true } = this.props
        const sidebarClassName = this.state.showSidebar ? 'Sidebar--shown' : 'Sidebar--hidden'

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
                <div className="pagelayout__inner">
                    <Sidebar
                        {...this.props}
                        sidebarClassName={sidebarClassName}
                        closeSidebar={this.closeSidebar}
                    />
                    <div className="pagelayout__content">
                        <PageTitle
                            {...this.props}
                            toggleSidebar={this.toggleSidebar}
                            mode="pagination"
                            position="top"
                        />
                        <div className="pagelayout__main">{this.props.children}</div>
                        {showPagination && (
                            <PageTitle
                                {...this.props}
                                toggleSidebar={this.toggleSidebar}
                                mode="pagination"
                                position="bottom"
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
