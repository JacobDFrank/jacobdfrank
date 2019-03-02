import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';

const HOMEPAGE_QUERY = graphql`
query HomePageQuery {
  allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "\/content/" } },
  ) {
    edges {
      node {
        html
        frontmatter {
          title
          intro
        }
      }
    }
  }
}
`;

export default class Intro extends Component {
  render() {
    
    return (
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
                <code className="meta-data code" style={{ fontSize: 0.7 + 'em' }}
                  dangerouslySetInnerHTML={{
                    __html: node.markdownRemark.html

                  }} />
                <p>{node.frontmatter.subIntro}</p>
              </section>
            ))
          )}
        />
      </React.Fragment>
    );
  }
}
