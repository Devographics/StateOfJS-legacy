import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import BuildExperience from './BuildExperience'
import BuildOthers from './BuildOthers'
import BuildAffinity from './BuildAffinity'
import BuildWorldwide from './BuildWorldwide'
import BuildUsers from './BuildUsers'

const Build = () => (
    <div>
        <div className="SubNav">
            <NavLink to="/build" exact activeClassName="isActive">
                experience
            </NavLink>
            <NavLink to="/build/others" exact activeClassName="isActive">
                others
            </NavLink>
            <NavLink to="/build/affinity" exact activeClassName="isActive">
                affinity
            </NavLink>
            <NavLink to="/build/worldwide" activeClassName="isActive">
                worldwide usage
            </NavLink>
            <NavLink to="/build/users" activeClassName="isActive">
                users facts
            </NavLink>
        </div>
        <Switch>
            <Route path="/build" exact component={BuildExperience} />
            <Route path="/build/others" component={BuildOthers} />
            <Route path="/build/affinity" component={BuildAffinity} />
            <Route path="/build/worldwide" component={BuildWorldwide} />
            <Route path="/build/users" component={BuildUsers} />
        </Switch>
    </div>
)

export default Build
