import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import StateExperience from './StateExperience'
import StateOthers from './StateOthers'
import StateAffinity from './StateAffinity'
import StateWorldwide from './StateWorldwide'
import StateUsers from './StateUsers'

export default class State extends Component {
    render() {
        return (
            <div>
                <div className="SubNav">
                    <NavLink to="/state" exact activeClassName="isActive">
                        experience
                    </NavLink>
                    <NavLink to="/state/others" activeClassName="isActive">
                        others
                    </NavLink>
                    <NavLink to="/state/affinity" activeClassName="isActive">
                        affinity
                    </NavLink>
                    <NavLink to="/state/worldwide" activeClassName="isActive">
                        worldwide usage
                    </NavLink>
                    <NavLink to="/state/users" activeClassName="isActive">
                        users facts
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/state" exact component={StateExperience} />
                    <Route path="/state/others" component={StateOthers} />
                    <Route path="/state/affinity" component={StateAffinity} />
                    <Route path="/state/worldwide" component={StateWorldwide} />
                    <Route path="/state/users" component={StateUsers} />
                </Switch>
            </div>
        )
    }
}
