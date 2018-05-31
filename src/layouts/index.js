import React from 'react';
import './all.scss';

class Template extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="../">
                <img src="/wea.png" alt="wea.my" width="91" height="24" />
              </a>
              <span className="navbar-burger burger" data-target="navbarMenu">
                <span />
                <span />
                <span />
              </span>
            </div>
            <div id="navbarMenu" className="navbar-menu">
              <div className="navbar-end">
                <a className="navbar-item" href="/">
                  Home
                </a>
                <a className="navbar-item" href="/">
                  About
                </a>
              </div>
            </div>
          </div>
        </nav>

        <section className="hero is-info is-medium is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">acknowledge failure as first class citizen</h1>
            </div>
          </div>
        </section>
        {children()}
      </div>
    );
  }
}
export default Template;
