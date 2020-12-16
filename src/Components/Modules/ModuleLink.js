import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const ModuleLink = ({user, moduleId, sectionId, title}) => {
  const currentModule = +(user.curr_module) || 0
  const currentSection = +(user.curr_section) || 0

  moduleId = +(moduleId)

  const show =
    // previous module
    moduleId < currentModule ||

    // intro
    (moduleId === currentModule && sectionId === 'intro') ||

    // OR current module and current or previous section
    (moduleId === currentModule && sectionId <= currentSection)

  return show ? <Link to={`/modules/${moduleId}/section/${sectionId}`}>{title}</Link>
    : <div>{title}</div>
}

/* redux, connect user */
const mapStateToProps = state => {
  const { user } = state.userRD
  return {
    user
  }
}

export default connect(
  mapStateToProps,
  null
)(ModuleLink)
