import React, { Component } from 'react'
import { Location } from '@reach/router'
import getPrevNextPages from './getPages'

function withPageData(WrappedComponent) {
    const hoc = class extends Component {
        render() {
            return (
                <Location>
                    {({ location }) => {
                        const path = location.pathname
                        const pages = getPrevNextPages(path)
                        return <WrappedComponent path={path} {...pages} {...this.props} />
                    }}
                </Location>
            )
        }
    }
    hoc.displayName = `withPageData(${WrappedComponent.displayName})`
    return hoc
}

export default withPageData
