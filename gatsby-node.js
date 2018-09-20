const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { createPaginationPages, createLinkedPages } = require('gatsby-pagination');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPage = path.resolve('./src/templates/page.js');
    const blogPost = path.resolve('./src/templates/post.js');
    resolve(
      graphql(`
        {
          allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
            totalCount
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  date(formatString: "D MMMM YYYY")
                  categories
                  tags
                }
                html
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        createPaginationPages({
          createPage,
          edges: result.data.allMarkdownRemark.edges,
          component: blogPage,
          limit: 5,
        });

        createLinkedPages({
          createPage,
          edges: result.data.allMarkdownRemark.edges,
          component: blogPost,
          edgeParser: edge => ({
            path: edge.node.fields.slug,
            context: {
              slug: edge.node.fields.slug,
            },
          }),
          circular: false,
        });
      }),
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({
      node,
      getNode,
    }).replace(/^\/?\d{4}-\d{2}-\d{2}-/gi, '/');
    createNodeField({ name: 'slug', node, value });
  }
};
