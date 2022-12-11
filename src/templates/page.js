import { Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import Pagination from '../components/Pagination';

class BlogPage extends React.Component {
  render() {
    const { nodes, page, total, prev, next } = this.props.pageContext;
    const pageTitle = page > 1 ? `wea.my - page ${page}/${total}` : 'wea.my';
    return (
      <Layout location={this.props.location}>
        <title>{pageTitle}</title>
        <div className="container is-desktop">
          <div className="column is-8 is-offset-2">
            <section className="articles">
              {nodes.map(({ node }) => {
                const post = node.frontmatter;
                return (
                  <div className="card article" key={node.fields.slug}>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-center">
                          <img
                            src="/avatar.jpeg"
                            className="author-image"
                            alt=""
                            width="41"
                            height="50"
                          />
                        </div>
                        <div className="media-content has-text-centered">
                          <p className="title article-title is-capitalized">
                            <Link to={node.fields.slug}>{post.title}</Link>
                          </p>
                          <div className="tags is-justify-content-center">
                            <span className="tag is-brutal is-info">{post.date}</span>
                            {post.categories &&
                              post.categories.map((item) => (
                                <span className="tag is-brutal is-link" key={item}>
                                  {item}
                                </span>
                              ))}
                            {post.tags &&
                              post.tags.map((item) => (
                                <span className="tag is-brutal is-success" key={item}>
                                  {item}
                                </span>
                              ))}
                          </div>{' '}
                        </div>
                      </div>
                      <div
                        className="content article-body has-text-justified"
                        dangerouslySetInnerHTML={{ __html: node.html }}
                      />
                    </div>
                  </div>
                );
              })}
            </section>
            <Pagination prevPath={next} nextPath={prev} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPage;
