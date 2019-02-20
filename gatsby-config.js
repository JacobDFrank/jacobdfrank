module.exports = {
  siteMetadata: {
    title: 'site title in the gatsby config',
    description: 'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@gatsbyjs',
    siteUrl: 'https://folio-gatsby2.netlify.com/'
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
        name: 'projects',
        path: `${__dirname}/src/projects`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest', // customize this so that when the site is saved in a bookmark, etc that the icon, color, and information can be stored on someone's device correctly
      // https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/
      // options: {
      //   name: 'gatsby-starter-default',
      //   short_name: 'starter',
      //   start_url: '/',
      //   background_color: '#663399',
      //   theme_color: '#663399',
      //   display: 'minimal-ui',
      //   icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      // },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
  ],
};
