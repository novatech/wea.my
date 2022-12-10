import React from 'react';
import './layout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <p className="is-capitalized">wea.my</p>
              </a>
              <span
                id="burger-button"
                className={`burger navbar-burger ${this.state.active ? 'is-active' : ''}`}
                onClick={this.toggle}
                onKeyPress={() => {}}
                role="button"
                tabIndex="0">
                <span />
                <span />
                <span />
              </span>
            </div>
            <div id="navbarMenu" className={`navbar-menu ${this.state.active ? 'is-active' : ''}`}>
              <div className="navbar-end">
                <a className="navbar-item is-active" href="/">
                  Home
                </a>
                <a className="navbar-item" href="/">
                  About
                </a>
              </div>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">...</h1>
            </div>
          </div>
        </section>
        {children}
      </>
    );
  }
}
export default Layout;
