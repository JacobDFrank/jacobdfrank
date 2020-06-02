import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

const POST_ARCHIVE_QUERY = graphql`
      query ArchiveQuery {
        allMarkdownRemark(
          limit: 6,
          filter: { fileAbsolutePath: {regex : "\/projects/"}, frontmatter: { published: { ne: false } } },
          sort: {
            order: DESC,
            fields: [frontmatter___date],
            
        }) {
          edges {
            node {
              frontmatter {
                title
                URLpath
                published
                date
                description
              }
            }
          }
        }
      }
    `;

const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({ allMarkdownRemark }) =>
      (
        <React.Fragment>
          <section className="projects grid">
            <div className="projectListing--title sans-serif">Projects</div>
            {
              allMarkdownRemark.edges.map(project => (
                <div className="grid__col grid__col--1-of-3 grid__col--m-1-of-2" key={project.node.frontmatter.URLpath}>
                  <div className="project">
                    <Link to={`/projects${project.node.frontmatter.URLpath}`}>
                      <div className="projectListing--project-title sans">{project.node.frontmatter.title}</div>
                      <span className="projectListing--project-text sans-serif">{project.node.frontmatter.description}</span>
                    </Link>  
                  </div>
                  
                </div>
              ))
            }
          </section>
        </React.Fragment>
      )
    }
  />
);

export default Archive;