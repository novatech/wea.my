module.exports = {
  siteMetadata: {
    title: 'wea.my',
    siteUrl: 'https://wea.my',
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-react-next',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-purify-css',
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [
          // eslint-disable-next-line global-require
          require('postcss-import')(),
          // eslint-disable-next-line global-require
          require('autoprefixer')(),
        ],
      },
    },
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
