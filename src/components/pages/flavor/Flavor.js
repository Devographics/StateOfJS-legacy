import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import FlavorExperience from './FlavorExperience'
import FlavorAffinity from './FlavorAffinity'
import FlavorWorldwide from './FlavorWorldwide'
import FlavorUsers from './FlavorUsers'

export default class Flavor extends Component {
    render() {
        return (
            <div>
                <div className="SubNav">
                    <NavLink to="/flavors" exact activeClassName="isActive">
                        experience
                    </NavLink>
                    <NavLink to="/flavors/affinity" activeClassName="isActive">
                        affinity
                    </NavLink>
                    <NavLink to="/flavors/worldwide" activeClassName="isActive">
                        worldwide usage
                    </NavLink>
                    <NavLink to="/flavors/users" activeClassName="isActive">
                        users facts
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/flavors" exact component={FlavorExperience} />
                    <Route path="/flavors/affinity" component={FlavorAffinity} />
                    <Route path="/flavors/worldwide" component={FlavorWorldwide} />
                    <Route path="/flavors/users" component={FlavorUsers} />
                </Switch>
            </div>
        )
    }
}
