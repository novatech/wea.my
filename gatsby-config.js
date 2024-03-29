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
        icon: 'static/wea-logo.png',
      },
    },
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        mode: 'async',
        enableListener: true,
        preconnect: ['https://fonts.gstatic.com'],
        web: [
          {
            name: 'PT Serif',
            file: 'https://fonts.googleapis.com/css2?family=PT+Serif',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
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
    'gatsby-plugin-sharp',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-postbuild`,
      options: {
        purgecss: {
          enabled: true,
        },
        'http-headers': {
          enabled: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg'],
      },
    },
  ],
};
