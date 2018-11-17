import React, { PureComponent } from 'react'
import classNames from 'classnames'
import '../../stylesheets/screen.scss'
import Animation from '../elements/Animation'
import PageTitle from './PageTitle'
import Sidebar from './Sidebar'
import Head from './Head'
import withPageData from '../../helpers/withPageData'

class Layout extends PureComponent {
    constructor() {
        super()
        this.state = {
            showSidebar: false,
            showAnim: false
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

    showAnim = () => {
        this.setState({
            showAnim: true
        })
    }

    render() {
        const { showPagination = true, location, currentPage } = this.props
        const { showAnim, showSidebar } = this.state
        const sidebarClassName = showSidebar ? 'Sidebar--shown' : 'Sidebar--hidden'
        const isCapturing = location && location.search && location.search.indexOf('capture') !== -1
        return (
            <div
                className={classNames(
                    'pageLayout',
                    `PageLayout--${currentPage && currentPage.section.id}`,
                    {
                        'PageLayout--sidebar': showSidebar,
                        'PageLayout--nosidebar': !showSidebar,
                        'PageLayout--anim': showAnim,
                        'PageLayout--noanim': !showAnim,
                        capture: isCapturing,
                        nocapture: !isCapturing
                    }
                )}
            >
                <Head />
                {showAnim && <Animation showStart={false} variant="simple" size={70} />}

                <div className="pagelayout__inner">
                    <Sidebar
                        {...this.props}
                        sidebarClassName={sidebarClassName}
                        closeSidebar={this.closeSidebar}
                        showAnim={this.showAnim}
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

export default withPageData(Layout)
