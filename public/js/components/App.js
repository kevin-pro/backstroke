import React from 'react'
import {connect} from 'react-redux';
import RouteMethod from './route';
import {Link} from 'react-router';

import {Navbar, Nav, NavItem} from 'react-bootstrap';

export function App({user, children}) {
  return <div className="app-container-parent">
    <MainNav user={user} transparent={children.type.transparentNavBar} />
    <div className="app-container">{children}</div>
  </div>
}

export function MainNav({user, transparent}) {
  return <Navbar className={transparent ? "navbar-inverse" : null}>
    <Navbar.Header>
      <Link to="/">
        {
          transparent ?
          <img className="navbar-mark" src="/assets/img/inverse.png" alt="Backstroke" />:
          <img className="navbar-mark" src="/assets/img/logo.png" alt="Backstroke" />
        }
      </Link>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={2} href="#/pricing">Pricing</NavItem>
        {user && user._auth ? <NavItem eventKey={2} href="#/links">Links</NavItem> : null}
        {user && user._auth ? <NavItem eventKey={3} href="#/settings">Settings</NavItem> : null}
      </Nav>
      <UserNav user={user} transparent={transparent} />
    </Navbar.Collapse>
  </Navbar>;
}

export function Index() {
  return <div className="index-page">
    <div className="container">
      <h1>A pipeline for changes</h1>
      <p>
        With Backstroke, always keep your repository's forks up to date.<br/>
        <span>Open source maintainers</span> can merge contributor's code with one click.<br/>
        <span>Contributors</span> don't have to worry about hefty merge conflicts.
      </p>

      <div className="row">
        <div className="button-section">
          <a href="/setup/login" className="btn btn-success btn-block btn-cta">Sign in with Github</a>
        </div>
        <div className="button-section">
          <a
            href="https://github.com/1egoman/backstroke#readme"
            className="btn btn-default btn-block btn-outline btn-outline-primary btn-cta"
          >
            To the README
          </a>
        </div>
      </div>
    </div>
  </div>;
}
Index.transparentNavBar = true;

export function Pricing() {
  return <div className="pricing-page">
    <div className="container">
      <h1>Pricing</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              Free
              <span className="pull-right">Use for free</span>
            </div>
            <ul className="list-group">
              <li className="list-group-item">Sync changes from upstream to forks</li>
              <li className="list-group-item">Sync changes between two repositories</li>
              <li className="list-group-item">Sync between arbitrary branches of each repository</li>
              <li className="list-group-item">Changes are proposed as pull requests</li>
            </ul>
            <div className="panel-footer">
              <h3 style={{color: "#333", textAlign: "center", marginBottom: 20}}>Use for free</h3>
              <a href="/setup/login" className="btn btn-default btn-block btn-lg">Sign up</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel panel-success">
            <div className="panel-heading">
              Premium
              <span className="pull-right">$1.00 per premium link per month</span>
            </div>
            <ul className="list-group">
              <li className="list-group-item">Sync changes from upstream to forks</li>
              <li className="list-group-item">Sync changes between two repositories</li>
              <li className="list-group-item">Sync between arbitrary branches of each repository</li>
              <li className="list-group-item">Changes are proposed as pull requests</li>
              <li className="list-group-item">
                <span className="label label-success">Premium</span>
                Sync changes to private repositories on Github
              </li>
              <li className="list-group-item">
                <span className="label label-success">Premium</span>
                Premium support
              </li>
              <li className="list-group-item">
                <span className="label label-success">Premium</span>
                Less than the price of a lunch per year
              </li>
            </ul>
            <div className="panel-footer">
              <h3 style={{color: "#333", textAlign: "center", marginBottom: 20}}>$1.00 per premium link per month</h3>
            <a href="/setup/login" className="btn btn-success btn-block btn-lg">
              Sign up for Premium
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

function UserNav({user, transparent}) {
  // Login status
  if (user && user._auth) {
    return <Nav pullRight>
      <NavItem eventKey={2} href="/logout" className="user-nav">
        <img src={user.picture} />
        Logout {user.user}
      </NavItem>
    </Nav>;
  } else if (!transparent) {
    return <Navbar.Form pullRight>
      <a href="/setup/login" className="btn btn-primary btn-outline">Login with Github</a>
    </Navbar.Form>;
  } else {
    return null;
  }
}

export default connect((state, props) => {
  return {user: state.user, children: props.children};
}, dispatch => new Object)(App)
