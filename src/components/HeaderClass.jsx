import React, { Fragment } from "react";

class Header extends React.Component {
  render() {
    return (
      <Fragment>
        <h1 className="headline">What to do?</h1>
        <span className="tagline">{this.props.tagline}</span>
      </Fragment>
    );
  }
}

export default Header;
