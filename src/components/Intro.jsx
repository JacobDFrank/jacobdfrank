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
          about1
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
          <section key='title'>
            <div className="sans-serif about--intro" >{node.frontmatter.intro}
            </div>
            <code className="about--text mono"
              dangerouslySetInnerHTML={{
                __html:
                  node.frontmatter.about1
              }}
            >
            </code>
          </section>
        ))
      )}
    />
  </React.Fragment>
);

export default Intro;