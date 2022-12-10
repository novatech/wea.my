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
              <div className="card article" key={slug}>
                <div className="card-content">
                  <div className="media">
                    <div className="media-center">
                      <img
                        src="/avatar.png"
                        className="author-image"
                        alt=""
                        width="41"
                        height="50"
                      />
                    </div>
                    <div className="media-content has-text-centered">
                      <p className="title article-title is-capitalized has-text-link">
                        {post.title}
                      </p>
                      <div className="tags is-justify-content-center">
                        <span className="tag is-brutal is-info">{post.date}</span>
                        {post.categories &&
                          post.categories.map((item) => (
                            <span className="tag is-brutal is-link">{item}</span>
                          ))}
                        {post.tags &&
                          post.tags.map((item) => (
                            <span className="tag is-brutal is-success">{item}</span>
                          ))}
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
              fromPost
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
