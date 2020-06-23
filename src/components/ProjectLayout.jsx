import React, { Component } from 'react';
import Layout from './Layout';
import { graphql, Link } from 'gatsby';

// Static query can be used anywhere. Doesn't accept variables, can't use context.

// Page query, must be used on pages
// this page takes in the data from gatsby node and style the pages accordingly
// which means you'd have a different template for eaach for speakers and events

export default class ProjectLayout extends Component {
  render() {
    const { markdownRemark } = this.props.data;
    const { location } = this.props;
    return (
      <Layout location={location}>
        <div className="casestudy-container">
          <div className="markdown-body">
            <div>
              <p className="text-projects">
                <Link to="/#projects">Past projects:</Link>
              </p>
              <h1>{markdownRemark.frontmatter.title}</h1>
              <p>{markdownRemark.frontmatter.description}</p>

            </div>
            <div className="content" dangerouslySetInnerHTML={{
              __html: markdownRemark.html
            }} />
          </div>
          <p className="text-projects">
            <Link to="/#projects">Go to other projects</Link>
          </p>
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
    query PostQuery($URLpath: String!) {
      markdownRemark(frontmatter: {
      URLpath: {
        eq: $URLpath
        }
      }) {
      html
      frontmatter {
        title
        date
        URLpath
        timePeriod
        description
      }
    }
  }
`;