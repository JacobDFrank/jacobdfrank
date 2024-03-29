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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-96615084-1',
        // Setting this parameter is optional
        anonymize: false
      }
    },
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
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-manifest', // customize this so that when the site is saved in a bookmark, etc that the icon, color, and information can be stored on someone's device correctly
      // https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/
      options: {
        name: 'JacobDFrank portfolio site',
        short_name: 'Jacob Frank',
        start_url: '/',
        background_color: '#095aba', // Color background
        theme_color: '#095aba', // Color background
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
  ],
};
