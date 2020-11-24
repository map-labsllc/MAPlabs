import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ModuleIntro from './ModuleIntro'
import { getUser } from '../../store/user/reducer'
import { sectionCompletedAC } from '../../store/user/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
     moduleNum -- integer
     sectionNum -- integer
     sectionTitle -- title of the section for redisplay in modal
     exercise -- component user will interact with
******************************************** */
const mapStateToProps = (state, passedProps) => {
  const { moduleNum } = passedProps

  // get user
  const user = getUser(state.userRD)

  return {
    moduleNum,
    user
  }
}

/// /////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = (dispatch, passedProps) => ({
  sectionCompletedCB: bindActionCreators(sectionCompletedAC, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleIntro)
