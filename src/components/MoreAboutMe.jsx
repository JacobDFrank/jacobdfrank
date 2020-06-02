import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const MoreAbout_QUERY = graphql`
query MoreAboutPageQuery {
  allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "\/content/" } },
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

const Intro = () => (
  <React.Fragment>
    <StaticQuery
      query={MoreAbout_QUERY}
      render={({ allMarkdownRemark }) => (
        allMarkdownRemark.edges.map(({ node }) => (
          <section key='title'>
            <div className="projectListing--title sans-serif">More about me</div>
            <code className="about--text mono"
              dangerouslySetInnerHTML={{
                __html:
                  node.frontmatter.about2
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