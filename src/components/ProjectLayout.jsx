import React from 'react';
import Layout from './Layout';
import SEO from './Seo';
import CaseStudyNav from './CaseStudyNav';
import { graphql, Link } from 'gatsby';

const ProjectLayout = ({ data, location }) => {
  const { markdownRemark } = data;
  return (
    <Layout location={location}>
      <div className="casestudy-container">
        <div className="markdown-body">
          <div id="cs-page-header">
            <p className="text-projects">
              <Link to="/#projects">Past projects:</Link>
            </p>
            <h1>{markdownRemark.frontmatter.title}</h1>
            <p>{markdownRemark.frontmatter.description}</p>
          </div>
          <CaseStudyNav />
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
};

export default ProjectLayout;

export const Head = ({ data }) => (
  <SEO title={data.markdownRemark.frontmatter.title} description={data.markdownRemark.frontmatter.description} />
);

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
