import React from 'react'
import { Card } from 'react-bootstrap'
import { PropTypes } from 'prop-types'

const Summary = ({ subComponents }) => (
  <>
    {subComponents.map( ( subComponent, idx ) => (
      <div className="background text-left" key={idx}>
        <Card>
          <Card.Header>
            <Card.Title><h4>{subComponent.props.summaryTitle}</h4></Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="container-fluid contain">
              {subComponent}
            </div>
          </Card.Body>
        </Card>
      </div>
    ) )}
  </>
)

export default Summary

Summary.propTypes = {
  subComponents: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
}
