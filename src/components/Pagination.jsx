import PropTypes from 'prop-types';
import React from 'react';

const Pagination = ({ prevPath, prevTitle, nextPath, nextTitle }) => (
  <nav className="level" aria-label="pagination">
    {prevPath && (
      <div className="level-left">
        <div className="level-item">
          <a className="button is-info" rel="prev" title={prevTitle} href={prevPath}>
            <span aria-hidden="true">
              &#8592;
              {prevTitle}
            </span>
          </a>
        </div>
      </div>
    )}
    {nextPath && (
      <div className="level-right">
        <div className="level-item">
          <a className="button is-info" rel="prev" title={nextTitle} href={nextPath}>
            <span aria-hidden="true">
              {nextTitle}
              &#8594;
            </span>
          </a>
        </div>
      </div>
    )}
  </nav>
);

Pagination.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
  prevTitle: PropTypes.string,
  nextTitle: PropTypes.string,
};

Pagination.defaultProps = {
  prevPath: null,
  nextPath: null,
  prevTitle: 'Previous',
  nextTitle: 'Next',
};

export default Pagination;
