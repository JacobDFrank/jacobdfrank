const gaMeasurementId = process.env.GATSBY_GA_MEASUREMENT_ID;

module.exports = {
  siteMetadata: {
    title: 'Jacob D Frank',
    description: 'Designer, Developer and aspiring manager focusing on civic tech. Incoming experience designer on the design systems tooling team at Adobe.',
    author: '@JacobDFrank',
    siteUrl: 'https://jacobdfrank.com/'
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'slash-div', 'if-function'],
        },
      },
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
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'JacobDFrank portfolio site',
        short_name: 'Jacob Frank',
        start_url: '/',
        background_color: '#095aba',
        theme_color: '#095aba',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-decap-cms',
    ...(gaMeasurementId
      ? [
          {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
              trackingIds: [gaMeasurementId],
              gtagConfig: {
                anonymize_ip: true,
              },
              pluginConfig: {
                head: true,
                respectDNT: true,
              },
            },
          },
        ]
      : []),
    'gatsby-plugin-netlify',
  ],
};
