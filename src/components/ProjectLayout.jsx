import React, { Component } from 'react';
import Layout from './Layout';
import { PageQuery, graphql, Link } from 'gatsby';

// Static query can be used anywhere. Doesn't accept variables, can't use context.

// Page query, must be used on pages

export default class ProjectLayout extends Component {
  render() {
    const { markdownRemark } = this.props.data;
    const { location } = this.props;
    console.log(location);
    return (
      <Layout location={location}>
        <section className="intro">
          <span className="meta-data code">{markdownRemark.frontmatter.tags} - {markdownRemark.frontmatter.timePeriod}</span>
          <h2><b>{markdownRemark.frontmatter.title}</b> — {markdownRemark.frontmatter.description}</h2>

        </section>
        <section className="content" dangerouslySetInnerHTML={{
          __html: markdownRemark.html
        }} />
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
        tags
        timePeriod
      }
    }
  }
`;