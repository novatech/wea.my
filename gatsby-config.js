module.exports = {
  siteMetadata: {
    title: 'wea.my',
    siteUrl: 'https://wea.my',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'wea.my',
        short_name: 'wea.my',
        start_url: '/',
        background_color: '#ff9a00',
        theme_color: '#ff9a00',
        display: 'minimal-ui',
        icon: 'static/wea.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
        ],
      },
    },
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify',
  ],
};
