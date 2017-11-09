import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import MobileExperience from './MobileExperience'
import MobileWorldwide from './MobileWorldwide'
import MobileUsers from './MobileUsers'

const Mobile = () => (
    <div>
        <div className="SubNav">
            <NavLink to="/mobile" exact activeClassName="isActive">
                experience
            </NavLink>
            <NavLink to="/mobile/worldwide" activeClassName="isActive">
                worldwide usage
            </NavLink>
            <NavLink to="/mobile/users" activeClassName="isActive">
                users facts
            </NavLink>
        </div>
        <Switch>
            <Route path="/mobile" exact component={MobileExperience} />
            <Route path="/mobile/worldwide" component={MobileWorldwide} />
            <Route path="/mobile/users" component={MobileUsers} />
        </Switch>
    </div>
)

export default Mobile
