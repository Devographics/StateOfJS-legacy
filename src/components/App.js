import React, { Component } from 'react'
import { HashRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Flavor from './pages/flavor/Flavor'
import Frontend from './pages/frontend/Frontend'
import State from './pages/state/State'
import Style from './pages/style/Style'
import Backend from './pages/backend/Backend'
import Testing from './pages/testing/Testing'
import Mobile from './pages/mobile/Mobile'
import Build from './pages/build/Build'
import OtherTools from './pages/other-tools/OtherTools'
import Features from './pages/features/Features'
import Opinions from './pages/opinions/Opinions'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="OuterWrapper">
                    <div className="Nav">
                        <NavLink to="/" exact activeClassName="isActive">
                            home
                        </NavLink>
                        <NavLink to="/flavors" activeClassName="isActive">
                            flavors
                        </NavLink>
                        <NavLink to="/frontend" activeClassName="isActive">
                            front-end
                        </NavLink>
                        <NavLink to="/state" activeClassName="isActive">
                            state
                        </NavLink>
                        <NavLink to="/backend" activeClassName="isActive">
                            full-stack
                        </NavLink>
                        <NavLink to="/testing" activeClassName="isActive">
                            testing
                        </NavLink>
                        <NavLink to="/style" activeClassName="isActive">
                            CSS
                        </NavLink>
                        <NavLink to="/build" activeClassName="isActive">
                            build
                        </NavLink>
                        <NavLink to="/mobile" activeClassName="isActive">
                            mobile
                        </NavLink>
                        <NavLink to="/others" activeClassName="isActive">
                            others
                        </NavLink>
                        <NavLink to="/features" activeClassName="isActive">
                            features
                        </NavLink>
                        <NavLink to="/opinions" activeClassName="isActive">
                            opinions
                        </NavLink>
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/frontend" component={Frontend} />
                        <Route path="/flavors" component={Flavor} />
                        <Route path="/state" component={State} />
                        <Route path="/style" component={Style} />
                        <Route path="/backend" component={Backend} />
                        <Route path="/testing" component={Testing} />
                        <Route path="/mobile" component={Mobile} />
                        <Route path="/build" component={Build} />
                        <Route path="/others" component={OtherTools} />
                        <Route path="/features" component={Features} />
                        <Route path="/opinions" component={Opinions} />
                        <Route path="*" render={() => <div>404</div>} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
