import PropTypes from 'prop-types';
import React from 'react';

const Pagination = props => (
  <nav className="level" aria-label="pagination">
    {props.prevPath && (
      <div className="level-left">
        <div className="level-item">
          <a className="button is-info" rel="prev" title={props.prevTitle} href={props.prevPath}>
            <span aria-hidden="true">← {props.prevTitle}</span>
          </a>
        </div>
      </div>
    )}
    {props.nextPath && (
      <div className="level-right">
        <div className="level-item">
          <a className="button is-info" rel="prev" title={props.nextTitle} href={props.nextPath}>
            <span aria-hidden="true">{props.nextTitle} →</span>
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
