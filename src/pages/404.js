import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';

function NotFound() {
  return (
    <Layout>
      <div className="container">
        <div className="column is-8 is-offset-2">
          <Helmet title="404 - Page Not Found" />
          <section className="articles">
            <div className="card article">
              <div className="card-content">
                <div className="media">
                  <div className="media-content has-text-centered">
                    <p className="title article-title is-capitalized has-text-link">
                      Ooops! You weren&apos;t supposed to see this.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
