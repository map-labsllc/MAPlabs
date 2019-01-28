import { connect } from 'react-redux'
import Section from '../Components/Section'
import {
  getUser,
  isFirstSection } from '../store/user/reducer'


/* *****************************************
   canUserView()

   check that user has gotten up to this module and section
******************************************** */
const canUserView = ( state, moduleNum, sectionNum ) => {

  const user = getUser( state.userRD )

  console.log('----------------------------------------');
  console.log('----------------------------------------');
  console.log('----------------------------------------');
  console.log(`moduleNum: ${moduleNum}, sectionNum: ${sectionNum}, user.curr_module: ${user.curr_module}, user.curr_section: ${user.curr_section}`);

  if ( moduleNum < user.curr_module ) return true
  if ( user.curr_module < moduleNum ) return false

  if ( user.curr_section === 0 ) {
    return ( isFirstSection( state.userRD, moduleNum, sectionNum ) )
  }
  return sectionNum <= user.curr_section
}

/* *****************************************
   mapStateToProps()

   passedProps:
     moduleNum -- integer, the module this section is in (1-based)
     sectionNum -- integer, the section (1-based)
     sectionTitle -- title of the section
     exercise -- component user will interact with
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( `SectionCT::mapStateToProps()` )

  const { moduleNum, sectionNum, sectionTitle, exercise } = passedProps

  // get user
  const user = getUser( state.userRD )

  return {
    user,
    isVisible: canUserView( state, moduleNum, sectionNum ),
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
