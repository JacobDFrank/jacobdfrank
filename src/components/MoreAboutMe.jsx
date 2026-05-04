import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const MoreAbout_QUERY = graphql`
  query MoreAboutPageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            about2
          }
        }
      }
    }
  }
`;

const MoreAboutMe = () => (
  <React.Fragment>
    <StaticQuery
      query={MoreAbout_QUERY}
      render={({ allMarkdownRemark }) =>
        allMarkdownRemark.edges.map(({ node }) => (
          <section key="more-about" className="more-about-section">
            <h2 className="projectListing--title">More about me</h2>
            <code
              className="about--text mono"
              dangerouslySetInnerHTML={{ __html: node.frontmatter.about2 }}
            />
          </section>
        ))
      }
    />
  </React.Fragment>
);

export default MoreAboutMe;
