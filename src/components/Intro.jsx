import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const HOMEPAGE_QUERY = graphql`
query HomePageQuery {
  allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "\/content/" } },
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          intro
          subIntro
        }
      }
    }
  }
}
`;

const Intro = () => (
  <React.Fragment>
    <StaticQuery
      query={HOMEPAGE_QUERY}
      render={({ allMarkdownRemark }) => (
        allMarkdownRemark.edges.map(({ node }) => (
          <section>
            <h2 style={{ paddingBottom: 8 + 'px' }}>
              <b>{node.frontmatter.intro}
              </b>
            </h2>
            <code className="meta-data code" style={{ fontSize: 0.7 + 'em' }}>
              
            </code>
            {node.frontmatter.subIntro}
          </section>
        ))
      )}
    />
  </React.Fragment>
);

export default Intro;