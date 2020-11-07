import React from 'react'
import { Card } from 'react-bootstrap'
import { PropTypes } from 'prop-types'
import SectionNav from '../../Modules/SectionNav'

const Mappers = ({ subSections }) => {
  return (
    <SectionNav subSections={subSections} />
  )


    //   return (
    //       {subComponents.map( (subComponent, idx ) => 

    //       {
    //         return (
    //           <div className="text-left" key={idx}>    
    //             <div className="container-fluid contain"> 
    //               {subComponent}
    //             </div>
    //           </div>
    //         ) )}
    //       }
    //   )
    // }
}

export default Mappers

Mappers.propTypes = {
  subComponents: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
}
