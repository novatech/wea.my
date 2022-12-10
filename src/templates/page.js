import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Pagination from '../components/Pagination';

class BlogPage extends React.Component {
  render() {
    const { nodes, page, total, prev, next } = this.props.pageContext;
    const pageTitle = page > 1 ? `wea.my - page ${page}/${total}` : 'wea.my';
    return (
      <Layout location={this.props.location}>
        <div className="container is-desktop">
          <Helmet title={pageTitle} />
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
                            src="/avatar.png"
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
                          <p className="tag is-info">{post.date}</p>
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
