import React from 'react'
import Nav from './Nav'
import Logo from './Logo'
import ShareSite from '../share/ShareSite'

const Close = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="Outline_Icons_1_">
            <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                id="Outline_Icons"
            >
                <line x1=".5" y1=".5" x2="23.5" y2="23.5" />
                <line x1="23.5" y1=".5" x2=".5" y2="23.5" />
            </g>
        </g>
    </svg>
)

const Sidebar = ({ sidebarClassName, closeSidebar, rest }) => (
    <div className={`Sidebar ${sidebarClassName}`}>
        <div className="Sidebar__Fixed">
            <h1 className="Logo__Wrapper">
                <span className="Logo--mobile">
                    <Logo />
                    <span className="Sidebar__Close">
                        <button onClick={closeSidebar}>
                            <Close />
                        </button>
                    </span>
                </span>
                <div className="Logo--desktop">
                    <Logo />
                </div>
            </h1>
            <div className="Sidebar__Inner">
                <Nav {...rest} closeSidebar={closeSidebar} />
            </div>
            <div className="Sidebar__Footer">
                <ShareSite />
            </div>
        </div>
    </div>
)

export default Sidebar
