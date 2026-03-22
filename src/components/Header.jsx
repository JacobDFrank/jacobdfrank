import { Link } from 'gatsby';
import React from 'react';
import { useLocation } from '@gatsbyjs/reach-router';

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '';

  return (
    <header>
      {!isHome && <Link to="/">Home</Link>}
    </header>
  );
};

export default Header;