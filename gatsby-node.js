// The purpose of this file is to give control and what's being registered in Gatsby

const path = require('path');

exports.createPages = ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions;
  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              html
              frontmatter {
                title
                URLpath
                published
                date(formatString: "MMMM DD, YYYY")
                description
                tags
              }
            }
          }
        }
      }
    `).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({
        node
      }) => {
        createPage({
          path: `/projects${node.frontmatter.URLpath}`,
          component: path.resolve('./src/components/ProjectLayout.jsx'),
          context: {
            URLpath: node.frontmatter.URLpath, //takes the path that is in the markdown and stores the file there
          }
        });
      });
      resolve();
    });
  });
};

// create new 'createPages things to form new queries
