import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ModuleConclusion = ({
  user,
  sectionCompletedCB,
  moduleNum,
  firstSectionHref,
  showLink = true,
}) => {
  const advanceSection = () => {
    // console.log("advancing section", user.curr_module, +moduleNum, +user.curr_section)
    if (+user.curr_module === +moduleNum && +user.curr_section === 0) {
      // console.log("calling sectionCompletedCB", user, moduleNum, 0)
      sectionCompletedCB(user, moduleNum, 0);
    }
  };

  return (
    <div className="text-center">
      {showLink && (
        <div className="text-center">
          <Link to={firstSectionHref} className="btn btn-primary" onClick={advanceSection}>
            Next &rarr;
          </Link>
        </div>
      )}
    </div>
  );
};

export default ModuleConclusion;

ModuleConclusion.propTypes = {
  user: PropTypes.object,
  sectionCompletedCB: PropTypes.func,
  description: PropTypes.string.isRequired,
  firstSectionHref: PropTypes.string,
  showLink: PropTypes.bool,
};
