import { connect } from 'react-redux'
import Popup from './Popup'
import { getUser } from '../../store/user/reducer'

/* *****************************************
   mapStateToProps()

   passedProps:
     moduleNum -- integer
     sectionNum -- integer
     sectionTitle -- title of the section for redisplay in modal
     exercise -- component user will interact with
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  // console.log( "PopupCT::mapStateToProps()" )

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
)( Popup )
