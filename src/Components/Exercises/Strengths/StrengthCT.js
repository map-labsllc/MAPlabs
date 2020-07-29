import { connect } from 'react-redux'
import Strength from './Strength'

/* *****************************************
   mapStateToProps()

   passedProps:
     isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log('passedProps', passedProps)
  const {
    number,
    question,
    isDynamic,
    strength
  } = passedProps

  return {
    number,
    question,
    strength,
    isDynamic,
    strengthOptions: state.staticdataRD.strengths
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
    onUpdateStoreCB: passedProps.onUpdateStoreCB
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Strength )
