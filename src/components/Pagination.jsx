import PropTypes from 'prop-types';
import React from 'react';

function Pagination({ prevPath, prevTitle, nextPath, nextTitle, fromPost }) {
  return (
    <nav className={`level is-mobile ${fromPost ? 'is-hidden-touch' : ''}`} aria-label="pagination">
      <div className="level-left">
        <div className="level-item">
          {prevPath && (
            <a className="button is-brutal" rel="prev" title={prevTitle} href={prevPath}>
              <span aria-hidden="true">
                &#8592;&nbsp;
                {prevTitle.substring(0, 30)}
                {prevTitle.length >= 30 && '...'}
              </span>
            </a>
          )}
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          {nextPath && (
            <a className="button is-brutal" rel="next" title={nextTitle} href={nextPath}>
              <span aria-hidden="true">
                {nextTitle.length >= 30 && '...'}
                {nextTitle.substring(0, 30)}
                &nbsp;&#8594;
              </span>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

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
