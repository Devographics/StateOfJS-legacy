import React, { PureComponent } from 'react'
import PageTitle from './PageTitle'
import '../../stylesheets/screen.scss'
import Sidebar from './Sidebar'
import Animation from '../elements/Animation'
import Head from './Head'

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
       
        const { showPagination = true } = this.props
        const { showAnim, showSidebar } = this.state
        const sidebarClassName = showSidebar ? 'Sidebar--shown' : 'Sidebar--hidden'

        return (
            <div
                className={`pagelayout PageLayout--${
                    showSidebar ? 'sidebar' : 'nosidebar'
                } PageLayout--${showAnim ? 'anim' : 'noanim'}`}
            >
                <Head/>
                {this.state.showAnim && <Animation showStart={false} variant="simple" size={70} />}

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

export default Layout
