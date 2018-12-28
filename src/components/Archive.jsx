import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

const Archive = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data =>
      (
        <section className="projects grid">
          {
            data.allMarkdownRemark.edges.map(post => (
              <div className="project grid__col grid__col--1-of-3" key={post.node.id}>
                <span className="meta-data code">{post.node.frontmatter.tags}</span>
                <Link to={post.node.frontmatter.path} href={post.node.frontmatter.path} className="faux-link">
                  <span>{post.node.frontmatter.description}</span>
                </Link>
              </div>
            ))
          }
        </section>
      )
    }
  />
);

export default Archive;


export const pageQuery = graphql`
  query IndexQuery { allMarkdownRemark(
    limit: 10,
    sort: { fields:[ frontmatter___date], order: DESC }
    filter:{ frontmatter: { published: { eq: true } } }
  ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            published
            date
            description
            tags
            timePeriod
          }
        }
      }
    }
  }
`;