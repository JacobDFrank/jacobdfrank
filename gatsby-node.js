const path = require('path');

/** Home content (`src/content/*.md`) uses these fields; project markdown does not, so they must be declared or inference omits them. */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    extend type MarkdownRemarkFrontmatter {
      intro: String
      about1: String
      about2: String
    }
  `);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const results = await graphql(`
    {
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "\/projects/"}}) {
        edges {
          node {
            html
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
  `);

  if (results.errors) {
    throw results.errors;
  }

  results.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/projects${node.frontmatter.URLpath}`,
      component: path.resolve('./src/components/ProjectLayout.jsx'),
      context: {
        URLpath: node.frontmatter.URLpath,
      }
    });
  });
};
