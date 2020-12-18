import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Col, Row, Collapse, Button } from 'react-bootstrap'

import { UUID } from '../Utils/UUID'

const SectionNav = ({ subSections }) => {
  const uuid = new UUID()

  const [subSectionsWithKeys] = useState(uuid.addKeys(subSections))

  const [open, setOpen] = useState({});

  const toggleOpen = (key) => {
    setOpen({ ...open, [key]: !open[key] })
  }

  return (
    <>
      {subSectionsWithKeys.map(({ key, item }) => (
        <Row>
          <Col md={5} className="nav-item" key={key}>
            <Button
              onClick={() => toggleOpen(key)}
              aria-controls={key}
              aria-expanded={!!open[key]}
            >
              {item.title}
            </Button>
          </Col>
          <Col md={7}>
            <Collapse in={!!open[key]}>
              <div id={key}>
                {item.exercise}
              </div>
            </Collapse>
          </Col>
        </Row>
      ))
      }
    </>
  )
}

export default SectionNav

SectionNav.propTypes = {
  sectionId: PropTypes.number.isRequired,
  moduleId: PropTypes.number.isRequired,
  subSections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      exercise: PropTypes.object
    })
  ).isRequired
}
