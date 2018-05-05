import React from "react";

const Header = props => (
  <header className="header">
    <h1 className="headline">What to do?</h1>
    <span className="tagline">{props.tagline}</span>
  </header>
);

export default Header;
