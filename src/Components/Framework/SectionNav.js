import React from 'react'
import { NavLink } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { getUser } from '../../store/user/reducer'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { useRouteMatch } from "react-router-dom"

const SectionNav = ({ subSections }) => {
  const match = useRouteMatch();
  let { subSectionId = 0 } = match.params
  subSectionId = +subSectionId
  
  const { moduleId, sectionId } = match.params

  console.log(moduleId, sectionId)
  console.log('>> sectionId', subSectionId)
  const subSectionLink = (subSectionId, title) => (
    <NavLink to={`/modules/${moduleId}/section/${sectionId}/subsection/${subSectionId}`}>{title}</NavLink>
  )

  const displaySubSection = (subSectionId) => {
    let selected = subSections.filter((section, idx) => section.id === subSectionId).shift() 
    return selected && selected.exercise ? selected.exercise : ''
  }

  return (
    <Row>
      <Col md={4}>
        <ul className="nav ml-auto">
          {subSections.map((subSection, idx) => (
            <li className="nav-item" key={idx}>
              {subSectionLink(subSection.id, subSection.title)}
            </li>
            ))
          }       
        </ul>
      </Col>
      <Col md={8}>
        { displaySubSection(subSectionId) }
      </Col>
    </Row>

  )
}

const mapStateToProps = ( state, passedProps ) => {
  const user = getUser(state.userRD)

  return {
    moduleId: +(user.curr_module),
    sectionId:+(user.curr_section)
  }
}

export default connect( mapStateToProps, null)(SectionNav)

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