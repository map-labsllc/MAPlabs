import React from 'react'
import PropTypes from 'prop-types'

const SectionId = ( props ) => (
  <>
  { `${props.sectionId}`.split('').join('.') }
  </>
)

export default SectionId

SectionId.propTypes = {
  sectionId: PropTypes.number.isRequired,
} 