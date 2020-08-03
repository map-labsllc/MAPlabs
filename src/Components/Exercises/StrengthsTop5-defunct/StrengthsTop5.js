import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import {
  SELECTED,
} from '../Influences/InfluencesConstants.js'
import StrengthTop5 from './StrengthTop5'
import { UUID } from '../../Utils/UUID'

/* **************************************************
   StrengthsTop5 component

   Displays three sections for entering an influence
     -- three sections
     -- Save button

   state:
    isDirty -- decide if we need to persist to db
    strengths --

   props:
     userId
     question -- { code: 50, text: "Question 50" }
     instructions
     strengthOptions -- list of strengths to choose from
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onPersistCB() -- callback to update the store and persist data
     onCloseModalCB -- when user clicks Close button
***************************************************** */
export default class StrengthsTop5 extends React.Component {
  

  state = {
    isDirty: false,
    strengths: this.uuid.addKeys(this.props.allInfluences),
  }

  // **********************************************
  componentDidMount = () => {
  }

  // **********************************************
  onclickClose = () => {
    console.log( "Influences::onclickClose()" )

    const { userId, onPersistCB, onCloseModalCB } = this.props
    const { isDirty, strengths } = this.state

    if (isDirty)
      onPersistCB(
        userId,
        this.uuid.stripKeys(strengths)
      )

    onCloseModalCB()
  }

  // **********************************************
  updateInfluence = (keyToUpdate, newInfluence) => {
    console.log(`StrengthsTop5::updateData()`)

    const { strengths } = this.state

    const newstrengths = strengths.map((influenceWithKey) =>
      (influenceWithKey.key === keyToUpdate) ? { key: keyToUpdate, item: newInfluence } : influenceWithKey)

    this.setState({
      isDirty: true,
      strengths: newstrengths,
    })
  }

  // **********************************************
  // render!
  render() {
    console.log("StrengthsTop5::render()")
    console.log("this.props.influences", this.props.influences)

    const { question, impactFilter, instructions, isDynamic } = this.props

    const { strengths } = this.state

    // filter to just the influences matching the impactFilter
    const impactInfluencesWithKeys = strengths.filter(influenceWithKey =>
      influenceWithKey.item.impact === impactFilter
    )

    // static render
    if (!isDynamic) {
      const selectedInfluencesWithKeys = impactInfluencesWithKeys.filter(influenceWithKey =>
        influenceWithKey.item.selected === SELECTED
      )
      if (selectedInfluencesWithKeys.length === 0)
        return <p>&nbsp;&nbsp;&nbsp;&nbsp;no data</p>

      return (
        <>
          <table>
            <tbody>
              {selectedInfluencesWithKeys.map(influenceWithKey =>
                <StrengthTop5 
                    key={influenceWithKey.key}
                    id={influenceWithKey.key}
                    influence={influenceWithKey.item}
                    isDynamic={isDynamic}
                    updateInfluenceCB={this.updateInfluence}
                />
              )}
            </tbody>
          </table>
          <br></br>
        </>
      )
    }

    // dynamic render
    return (
      <>
        <p>{instructions}</p>
        {impactInfluencesWithKeys.map(influenceWithKey =>
          <StrengthTop5 
            key={influenceWithKey.key}
            id={influenceWithKey.key}
            influence={influenceWithKey.item}
            isDynamic={isDynamic}
            updateInfluenceCB={this.updateInfluence}
          />
        )}
        <br/>
        <Button type="button" onClick={this.onclickClose}>Close</Button>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// StrengthsTop5.propTypes = {
//   question: PropTypes.shape( {
//     code: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//   } ).isRequired,
//   influences: PropTypes.object.isRequired,
//   isDynamic: PropTypes.bool,
//   onUpdateAnswerCB: PropTypes.func,  // required, injected by <Popup>
// }

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
