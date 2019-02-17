import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

const LISTING_QUERY = graphql`
query ListingQuery {
  allMarkdownRemark(limit: 6, sort: {
    order: DESC,
    fields: [frontmatter___date]
  }) {
    edges {
      node {
        excerpt
        frontmatter {
          title
          URLpath
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}
`;

// how to do this is shown in video 15 https://www.youtube.com/watch?v=9VosY2-dyf0

const Listing = () => (
  <React.Fragment>
    <StaticQuery
      query={LISTING_QUERY}
      render={({ allMarkdownRemark }) => (
        allMarkdownRemark.edges.map(({node}) => (
          <article key={node.frontmatter.URLpath}>
            <h2>{node.frontmatter.title}</h2>
            <p>
              {node.excerpt}
            </p>
            <p>
              {node.frontmatter.date}
            </p>
            <Link to={`/projects${node.frontmatter.URLpath}`} >Read More</Link>
          </article>
        ))
      )}
    />
  </React.Fragment>
);

export default Listing;
