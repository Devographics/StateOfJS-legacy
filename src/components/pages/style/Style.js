import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import StyleExperience from './StyleExperience'
import StyleOthers from './StyleOthers'
import StyleAffinity from './StyleAffinity'
import StyleWorldwide from './StyleWorldwide'
import StyleUsers from './StyleUsers'

export default class Style extends Component {
    render() {
        return (
            <div>
                <div className="SubNav">
                    <NavLink to="/style" exact activeClassName="isActive">
                        experience
                    </NavLink>
                    <NavLink to="/style/others" activeClassName="isActive">
                        others
                    </NavLink>
                    <NavLink to="/style/affinity" activeClassName="isActive">
                        affinity
                    </NavLink>
                    <NavLink to="/style/worldwide" activeClassName="isActive">
                        worldwide usage
                    </NavLink>
                    <NavLink to="/style/users" activeClassName="isActive">
                        users facts
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/style" exact component={StyleExperience} />
                    <Route path="/style/others" component={StyleOthers} />
                    <Route path="/style/affinity" component={StyleAffinity} />
                    <Route path="/style/worldwide" component={StyleWorldwide} />
                    <Route path="/style/users" component={StyleUsers} />
                </Switch>
            </div>
        )
    }
}
