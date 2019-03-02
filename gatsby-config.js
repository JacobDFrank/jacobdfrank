module.exports = {
  siteMetadata: {
    title: 'Jacob D Frank',
    description: 'Designer, Developer and aspiring manager focusing on civic tech. Incoming experience designer on the design systems tooling team at Adobe.',
    author: '@JacobDFrank',
    siteUrl: 'https://jacobdfrank.com/'
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-preset-env')({
          stage: 0
        })],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/src/projects`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'team',
        path: `${__dirname}/src/team`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest', // customize this so that when the site is saved in a bookmark, etc that the icon, color, and information can be stored on someone's device correctly
      // https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/
      options: {
        name: 'JacobDFrank portfolio site',
        short_name: 'Jacob Frank',
        start_url: '/',
        background_color: '#C61A3B',
        theme_color: '#C61A3B',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
  ],
};
