import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import '../stylesheets/screen.scss'
import Animation from './components/Animation'
import Pagination from './pages/Pagination'
import Sidebar from './components/Sidebar'
import Head from './components/Head'
import { PageContextProvider } from './pages/pageContext'
import { mergePageContext } from './pages/pageHelpers'
import { I18nContextProvider } from './i18n/i18nContext'
import PageMetaDebug from './pages/PageMetaDebug'
import LangSelector from './i18n/LangSelector'

export default class Layout extends PureComponent {
    static propTypes = {
        showPagination: propTypes.bool.isRequired
    }

    static defaultProps = {
        showPagination: true
    }

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
        const { showPagination, location, currentPage, pageContext } = this.props
        const { showAnim, showSidebar } = this.state
        const sidebarClassName = showSidebar ? 'Sidebar--shown' : 'Sidebar--hidden'
        const context = mergePageContext(pageContext, location)

        return (
            <PageContextProvider value={context}>
                <I18nContextProvider>
                    <div
                        className={classNames(
                            'pageLayout',
                            `PageLayout--${currentPage && currentPage.section.id}`,
                            {
                                'PageLayout--sidebar': showSidebar,
                                'PageLayout--nosidebar': !showSidebar,
                                'PageLayout--anim': showAnim,
                                'PageLayout--noanim': !showAnim,
                                capture: context.isCapturing,
                                nocapture: !context.isCapturing
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
                                {showPagination && (
                                    <Pagination toggleSidebar={this.toggleSidebar} position="top" />
                                )}
                                <div className="pagelayout__main">
                                    <PageMetaDebug />
                                    {this.props.children}
                                </div>
                                {showPagination && (
                                    <Pagination
                                        toggleSidebar={this.toggleSidebar}
                                        position="bottom"
                                    />
                                )}
                            </div>
                        </div>
                        Disabled until we validate en-US is working as expected
                        <LangSelector />
                    </div>
                </I18nContextProvider>
            </PageContextProvider>
        )
    }
}
