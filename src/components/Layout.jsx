import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import OrangeJuiceCursor from './OrangeJuiceCursor';
import '../styles/index.scss';

/** Keep in sync with `$page-entrance-stagger` in `_home.scss`. */
const PAGE_ENTRANCE_STAGGER_S = 0.28;

const Layout = ({ children }) => {
  const blockCount = React.Children.toArray(children).filter(Boolean).length;
  const footerDelay = `${Math.max(blockCount, 1) * PAGE_ENTRANCE_STAGGER_S}s`;

  return (
    <>
      <OrangeJuiceCursor />
      <Header />
      <div
        className="page-entrance-shell"
        style={{ '--page-entrance-footer-delay': footerDelay }}
      >
        <main className="page-entrance">{children}</main>
        <div className="page-entrance-footer-wrap">
          <Footer />
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
