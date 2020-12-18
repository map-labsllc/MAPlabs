import React, { useState } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import { getUser } from '../../store/user/reducer'
import { UUID } from '../Utils/UUID'

const SectionNav = ({ subSections }) => {
  const match = useRouteMatch();
  const uuid = new UUID()

  const [subSectionsWithKeys] = useState(uuid.addKeys(subSections))

  let { subSectionId = 0 } = match.params

  const { moduleId, sectionId } = match.params

  const subSectionLink = (subSectionId, title) => (
    <NavLink to={`/modules/${moduleId}/section/${sectionId}/subsection/${subSectionId}`}>{title}</NavLink>
  )

  const displaySubSection = (subSectionId) => {
    console.log("displaying", subSectionId, subSectionsWithKeys)
    const selected = subSectionsWithKeys.filter(({ key, item }) => key === subSectionId)
      .map(({ key, item }) => item)
      .shift()
    console.log("attempting to display", selected)
    return selected && selected.exercise ? selected.exercise : ''
  }

  return (
    <Row>
      <Col md={4}>
        <Row>
          <Col>
            <ul className="nav ml-auto">
              {subSectionsWithKeys.map(({ key, item }) => (
                <li className="nav-item" key={key}>
                  {subSectionLink(key, item.title)}
                </li>
              ))
              }
            </ul>
          </Col>
        </Row>
      </Col>
      <Col md={8}>
        { displaySubSection(subSectionId) }
      </Col>
    </Row>

  )
}

const mapStateToProps = (state, passedProps) => {
  const user = getUser(state.userRD)

  return {
    moduleId: +(user.curr_module),
    sectionId: +(user.curr_section)
  }
}

export default connect(mapStateToProps, null)(SectionNav)

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
