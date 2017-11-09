import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import FrontendExperience from './FrontendExperience'
import FrontendOthers from './FrontendOthers'
import FrontendAffinity from './FrontendAffinity'
import FrontendWorldwide from './FrontendWorldwide'
import FrontendUsers from './FrontendUsers'

export default class Frontend extends Component {
    render() {
        return (
            <div>
                <div className="SubNav">
                    <NavLink to="/frontend" exact activeClassName="isActive">
                        experience
                    </NavLink>
                    <NavLink to="/frontend/others" exact activeClassName="isActive">
                        others
                    </NavLink>
                    <NavLink to="/frontend/affinity" activeClassName="isActive">
                        affinity
                    </NavLink>
                    <NavLink to="/frontend/worldwide" activeClassName="isActive">
                        worldwide usage
                    </NavLink>
                    <NavLink to="/frontend/users" activeClassName="isActive">
                        users facts
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/frontend" exact component={FrontendExperience} />
                    <Route path="/frontend/others" exact component={FrontendOthers} />
                    <Route path="/frontend/affinity" component={FrontendAffinity} />
                    <Route path="/frontend/worldwide" component={FrontendWorldwide} />
                    <Route path="/frontend/users" component={FrontendUsers} />
                </Switch>
            </div>
        )
    }
}
