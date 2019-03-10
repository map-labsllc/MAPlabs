import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import '../../../CSS/ModalNavButtons.css'
import Influence from './Influence'

/* **************************************************
   InfluenceGroup component

   Displays a section of influences, map array of <Influence>s

   state:
     todo: fill this in

   props:
     heading
     influencesWithKeys -- array of influence objects with keys:
        [
          {
            key: 3,
            item: { relationship:'brother', name:"Tim", belief:"Chartiy", impact:"supportive", selected:'selected' }
          },
          { ... }
        ]
     beliefs -- statcdata -- [ 'belief1', 'belief2', ... ]
     relationships -- staticdata -- ['brother',...]
     isDynamic -- not defined or true
     groupId -- the key into the parent control's data structure -- personal, social, wider
     updateInfuenceCB -- onChange
     deleteInfluenceCB -- click trash can
     addInfluenceCB -- click add button
***************************************************** */
export default class InfluenceGroup extends React.Component {

  // **********************************************
  componentDidMount = () => {
  }

  // **********************************************
  updateInfluence = (keyToUpdate, newInfluence) => {
    console.log(`InfluenceGroup::updateInfluence(${keyToUpdate}, ${newInfluence})`)
    const { groupId, updateInfluenceCB } = this.props
    updateInfluenceCB(groupId, keyToUpdate, newInfluence)
  }

  // **********************************************
  deleteInfluence = (keyToDelete) => {
    console.log(`InfluenceGroup::deleteInfluence(${keyToDelete})`)
    const { groupId, deleteInfluenceCB } = this.props
    deleteInfluenceCB(groupId, keyToDelete)
  }

  // **********************************************
  onclickAdd = () => {
    console.log(`InfluenceGroup::onclickAdd()`)
    const { groupId, addInfluenceCB } = this.props
    addInfluenceCB(groupId)
  }

  // **********************************************
  // render!
  render() {
    console.log("InfluenceGroup::render()")

    const { heading, beliefs, relationships, isDynamic, influencesWithKeys } = this.props

    // static render
    if (!isDynamic) {
      return (
        <>
          <h4>{heading}</h4>
          {influencesWithKeys.length === 0 &&
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;no data</p>
          }
          <table>
            <tbody>
              {influencesWithKeys.map((influenceWithKey) =>
                <Influence
                  key={influenceWithKey.key}
                  id={influenceWithKey.key}
                  beliefs={beliefs}
                  relationships={relationships}
                  influence={influenceWithKey.item}
                  isDynamic={isDynamic}
                  updateInfluenceCB={this.updateInfluence}
                  deleteInfluenceCB={this.deleteInfluence}
                />
              )}
            </tbody>
          </table>

          {isDynamic &&
            <>
              &nbsp;&nbsp;&nbsp;<Button className="addAnswerButton" type="button" onClick={this.onclickAdd}>+ Add</Button>
              <p>&nbsp;</p>
            </>
          }
        </>
      )
    }
    
    // dynamic render
    return (
      <>
        <h4>{heading}</h4>
        {influencesWithKeys.length === 0 &&
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;no data</p>
        }
          {influencesWithKeys.map((influenceWithKey) =>
            <Influence
              key={influenceWithKey.key}
              id={influenceWithKey.key}
              beliefs={beliefs}
              relationships={relationships}
              influence={influenceWithKey.item}
              isDynamic={isDynamic}
              updateInfluenceCB={this.updateInfluence}
              deleteInfluenceCB={this.deleteInfluence}
            />
          )}

          <>
            &nbsp;&nbsp;&nbsp;<Button className="addAnswerButton" type="button" onClick={this.onclickAdd}>+ Add</Button>
            <p>&nbsp;</p>
          </>
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
