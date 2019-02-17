import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Spring } from 'react-spring/renderprops';
import Header from './Header';
import Footer from './Footer';
import './layout.css';

const Layout = ({ children, location }) => (
  <StaticQuery
  // how would i make that regex dynamic???
  // https://www.leveluptutorials.com/tutorials/pro-gatsby-2/gatsby-image used this video for the code
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
          file(relativePath : {
            regex: "/bg/"
          }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
      }
    `}
    render={data =>
      (
        <React.Fragment>
          <Header siteTitle={data.site.siteMetadata.title} />
          {/* {location.pathname == '/' && 
            <Img fluid={data.file.childImageSharp.fluid} />
          } */}
          <Spring
            from={{ height: location.pathname === '/' ? 100 : 200 }}
            to={{ height: location.pathname === '/' ? 200 : 100 }}
          >
            {styles => (
              <div style={{ overflow: 'hidden', ...styles }}>
                <Img fluid={data.file.childImageSharp.fluid} />
              </div>
            )}
          </Spring>
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
            }}
          >
            {children}
            <Footer />
          </div>
        </React.Fragment>
      )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  location: {}
};

export default Layout;
