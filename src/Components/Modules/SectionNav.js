import React from 'react'
import { NavLink } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { getUser } from '../../store/user/reducer'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { useRouteMatch } from "react-router-dom"

const SectionNav = ({  moduleId, sectionId, subSections }) => {

  let match = useRouteMatch();

  const subSectionLink = (subSectionId, title) => (
    <NavLink to={`/modules/${moduleId}/section/${sectionId}/subsection/${subSectionId}`}>{title}</NavLink>
  )

  console.log('subSections', subSections)

  const links = subSections.map((subSection, idx) => {
    return {
      id: idx,
      title: subSection.props.summaryTitle
    }
  })

  // const Module = moduleList[props.match.params.moduleId || 1]

  // return <Module moduleId={props.match.params.moduleId} sectionId={props.match.params.sectionId} />

  const subSectionId = match.params || 0
  
  return (
    <Row>
      <Col md={4}>
        <ul className="nav ml-auto">
          {links.map((subSection, idx) => (
            <li className="nav-item" key={idx}>
              <h4>
                {subSectionLink(subSection.id, subSection.title)}
              </h4>
            </li>
            ))
          }       
        </ul>
      </Col>
      <Col md={8}>
        SubSection Goes here: {subSectionId}
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
      title: PropTypes.string
    })
  ).isRequired
}