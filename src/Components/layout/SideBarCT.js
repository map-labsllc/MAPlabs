import { connect } from 'react-redux'
import { isLoggedIn } from '../../store/user/reducer'
import SideBar from './SideBar'

const mapStateToProps = state => {
  const { user } = state.userRD

  return {
    user,
    isLoggedIn: isLoggedIn(state.userRD),
    curr_module: +user.curr_module,
    curr_section: +user.curr_section
  }
}

export default connect(
  mapStateToProps,
  null
)(SideBar)
