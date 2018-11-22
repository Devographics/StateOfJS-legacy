import React from 'react'
import T from '../helpers/translator'

export default class ViewResults extends React.Component {

    render() {
        return (
            <div className="view-results">
                <a
                    className="button large-button"
                    href="https://2018.stateofjs.com"
                >
                    {T.translate('components.viewresult.link')}
                </a>
            </div>
        )
    }
}
