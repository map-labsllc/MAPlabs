import { connect } from 'react-redux'
import StrengthsTop5 from './StrengthsTop5'
 
/* *****************************************
   mapStateToProps()
******************************************** */
const mapStateToProps = ( state, passedProps ) => ({
    strengthOptions: state.listsRD.lists.strengths
  })

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( StrengthsTop5 )
