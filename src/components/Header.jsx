import { Link } from 'gatsby';
import React from 'react';

const Header = function statelessFunctionComponentClass() {
  return (<header>
    <Link to="/" className="faux-link"> <span id="channeled-text">Jacob Frank</span></Link>
  </header>);
};

export default Header;