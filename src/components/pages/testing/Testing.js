import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import TestingExperience from './TestingExperience'
import TestingOthers from './TestingOthers'
import TestingAffinity from './TestingAffinity'
import TestingWorldwide from './TestingWorldwide'
import TestingUsers from './TestingUsers'

const Testing = () => (
    <div>
        <div className="SubNav">
            <NavLink to="/testing" exact activeClassName="isActive">
                experience
            </NavLink>
            <NavLink to="/testing/others" activeClassName="isActive">
                others
            </NavLink>
            <NavLink to="/testing/affinity" activeClassName="isActive">
                affinity
            </NavLink>
            <NavLink to="/testing/worldwide" activeClassName="isActive">
                worldwide usage
            </NavLink>
            <NavLink to="/testing/users" activeClassName="isActive">
                users facts
            </NavLink>
        </div>
        <Switch>
            <Route path="/testing" exact component={TestingExperience} />
            <Route path="/testing/others" component={TestingOthers} />
            <Route path="/testing/affinity" component={TestingAffinity} />
            <Route path="/testing/worldwide" component={TestingWorldwide} />
            <Route path="/testing/users" component={TestingUsers} />
        </Switch>
    </div>
)

export default Testing
