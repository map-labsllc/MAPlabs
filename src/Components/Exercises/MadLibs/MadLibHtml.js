/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';

export const MadLibHtml = (madlib, isSupportive) => {
  const {
    name,
    belief,
    impact,
    change,
  } = madlib;

  const BLANK = '_____';

  return (
    <p>
      My influence, <span className="madlib">{name || BLANK}</span>, has{isSupportive ? ' supported ' : ' inhibited '}my sense of{' '}
      <span className="madlib">{belief || BLANK}</span>. The effect of this influence is that{' '}
      <span className="madlib">{impact || BLANK}</span>. In order to keep growing, I would like to{' '}
      <span className="madlib">{change || BLANK}</span>.
    </p>
  );
};

MadLibHtml.propTypes = {
  madlib: PropTypes.object.isRequired,
};
