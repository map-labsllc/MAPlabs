import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import '../../CSS/ModalNavButtons.css'
import { UUID } from '../Utils/UUID'
import Influence from './Influence'


// legal values for an impact
export const IMPACT_SUPPORTIVE = 'supportive'
export const IMPACT_INHIBITING = 'inhibiting'
export const IMPACT_BOTH       = 'both'

/* **************************************************
   InfluenceGroup component

   Displays a section of influences, map array of <Influence>s

   state:
     todo: fill this in

   props:
     heading
     influences -- array of { name:"Tim", belief:"Chartiy", impact:"supportive"}
     isDynamic -- not defined or true
     groupId -- the key into the parent control's data structure -- personal, social, wider
     updateInfuencesCB
***************************************************** */
export default class InfluenceGroup extends React.Component {

  uuid = new UUID() // provides unique keys for <ShortAnswer> components

  state = {
    isDirty: false,
    influencesWithKeys: this.uuid.addKeys(this.props.influences)
  }

  // **********************************************
  componentDidMount = () => {
  }

  // **********************************************
  // tell parent to update data to store
  // updateData = () => {
  //   console.log(`InfluenceGroup::updateData()`)

    // const { onUpdateStoreCB } = this.props
    //
    // const newData = {}
    // newData.strength    = this.state.strength
    // newData.broadly     = this.state.broadly
    // newData.reflections = this.uuid.stripKeys(this.state.reflectionsWithKeys)
    //
    // onUpdateStoreCB(newData)
  // }


  // **********************************************
  // tell parent to update array of influences to store
  updateInfluence = (key, newInfluence) => {
    console.log(`InfluenceGroup::updateInfluence(${key}, ${newInfluence})`)

    // const { onUpdateStoreCB } = this.props
    const { influencesWithKeys } = this.state

    const newInfluencesWithKeys = influencesWithKeys.map(influenceWithKey =>
      (influenceWithKey.key === key) ? { key: key, item: newInfluence } : influenceWithKey)

    // onUpdateStoreCB(this.uuid.stripKeys(newTransitionsWithKeys))
    this.setState({ influencesWithKeys: newInfluencesWithKeys })
  }
  // **********************************************
  // tell parent to update array of influences to store
  deleteInfluence = (keyToDelete) => {
    console.log(`InfluenceGroup::deleteInfluence(${keyToDelete})`)

    const { influencesWithKeys } = this.state

    const newInfluencesWithKeys = influencesWithKeys.filter((influenceWithKey) =>
      keyToDelete !== influenceWithKey.key)

    // onUpdateStoreCB(this.uuid.stripKeys(newTransitionsWithKeys))
    this.setState({ influencesWithKeys: newInfluencesWithKeys })
  }

  // **********************************************
  onclickAdd = () => {
    const { influencesWithKeys } = this.state
    const newInfluencesWithKeys = influencesWithKeys.concat(this.uuid.getNewItemWithKey({ name: '', belief: '', impact:'' }))
    this.setState({ influencesWithKeys: newInfluencesWithKeys })
  }

  // **********************************************
  // render!
  render() {
    console.log("InfluenceGroup::render()")

    const { heading, isDynamic } = this.props
    const { influencesWithKeys } = this.state

    // if ( !isDynamic ) {
    //   return (
    //     <>
    //       <h4>{heading}</h4>
    //       {influencesWithKeys.map((influenceWithKey) =>
    //         <Influence
    //           key={influenceWithKey.key}
    //           id={influenceWithKey.key}
    //           influence={influenceWithKey.item}
    //           isDynamic={isDynamic}/>
    //       )}
    //     </>
    //   )
    // }

    return (
      <>
        <h4>{heading}</h4>
        {influencesWithKeys.map((influenceWithKey) =>
          <Influence
            key={influenceWithKey.key}
            id={influenceWithKey.key}
            influence={influenceWithKey.item}
            isDynamic={isDynamic}
            updateInfluenceCB={this.updateInfluence}
            deleteInfluenceCB={this.deleteInfluence}
          />
        )}
        &nbsp;&nbsp;&nbsp;<Button className="addAnswerButton" type="button" onClick={this.onclickAdd}>+ Add</Button>
        <p>&nbsp;</p>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// InfluenceGroup.propTypes = {
//   question: PropTypes.shape( {
//     code: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//   } ).isRequired,
//   previousData: PropTypes.object.isRequired,
//   isDynamic: PropTypes.bool,
//   onUpdateAnswerCB: PropTypes.func,  // required, injected by <Popup>
// }

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
