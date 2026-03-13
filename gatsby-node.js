const path = require('path');

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
