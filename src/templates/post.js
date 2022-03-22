import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Pagination from '../components/Pagination';

class BlogPost extends React.Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    const { slug, prev, next } = this.props.pageContext;
    const prevTitle = this.props.data.prev.frontmatter.title;
    const nextTitle = this.props.data.next.frontmatter.title;
    return (
      <Layout location={this.props.location}>
        <div className="container">
          <div className="column is-8 is-offset-2">
            <Helmet title={`${post.title}`} />
            <section className="articles" key={slug}>
              <div className="card article">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <p className="title article-title is-capitalized has-text-link">
                        {post.title}
                      </p>
                      <div className="tags has-addons level-item">
                        <span className="tag is-rounded is-info">
                          {post.categories && `${post.categories.join()}`}
                        </span>
                        <span className="tag is-rounded is-info">
                          {post.tags && `${post.tags.join()}`}
                        </span>
                        <span className="tag is-rounded is-link">{post.date}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content article-body has-text-justified"
                    dangerouslySetInnerHTML={{ __html: postNode.html }}
                  />
                </div>
              </div>
            </section>
            <Pagination
              prevPath={next}
              prevTitle={nextTitle}
              nextPath={prev}
              nextTitle={prevTitle}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPost;

export const pageQuery = graphql`
  query ($slug: String!, $next: String, $prev: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
        categories
        tags
      }
      html
    }
    prev: markdownRemark(fields: { slug: { eq: $prev } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    next: markdownRemark(fields: { slug: { eq: $next } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;
