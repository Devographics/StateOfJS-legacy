import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import BackendExperience from './BackendExperience'
import BackendOthers from './BackendOthers'
import BackendWorldwide from './BackendWorldwide'
import BackendUsers from './BackendUsers'

const Backend = () => (
    <div>
        <div className="SubNav">
            <NavLink to="/backend" exact activeClassName="isActive">
                experience
            </NavLink>
            <NavLink to="/backend/others" exact activeClassName="isActive">
                others
            </NavLink>
            <NavLink to="/backend/worldwide" activeClassName="isActive">
                worldwide usage
            </NavLink>
            <NavLink to="/backend/users" activeClassName="isActive">
                users facts
            </NavLink>
        </div>
        <Switch>
            <Route path="/backend" exact component={BackendExperience} />
            <Route path="/backend/others" exact component={BackendOthers} />
            <Route path="/backend/worldwide" component={BackendWorldwide} />
            <Route path="/backend/users" component={BackendUsers} />
        </Switch>
    </div>
)

export default Backend
