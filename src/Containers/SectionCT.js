import { connect } from 'react-redux'
import Section from '../Components/Section'
import { getUser } from '../store/user/reducer'

/* *****************************************
   mapStateToProps()

   passedProps:
     moduleNum -- integer, the module this section is in (1-based)
     sectionNum -- integer, the section (1-based)
     sectionTitle -- title of the section
     exercise -- component user will interact with
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "SectionCT::mapStateToProps()" )

  const { moduleNum, sectionNum, sectionTitle, exercise } = passedProps

  // get user
  const user = getUser( state.userRD )

  return {
    user,
    moduleNum,
    sectionNum,
    sectionTitle,
    exercise,
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

  return {
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Section )
