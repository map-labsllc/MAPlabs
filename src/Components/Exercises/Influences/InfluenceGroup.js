import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import '../../../CSS/ModalNavButtons.css'
import Influence from './Influence'

/* **************************************************
   InfluenceGroup component

   Displays a section of influences, map array of <Influences>

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
export default function InfluenceGroup( props ) {

  // **********************************************
  const updateInfluence = (keyToUpdate, newInfluence) => {
    console.log(`InfluenceGroup::updateInfluence(${keyToUpdate}, ${newInfluence})`)
    const { groupId, updateInfluenceCB } = props
    updateInfluenceCB(groupId, keyToUpdate, newInfluence)
  }

  // **********************************************
  const deleteInfluence = (keyToDelete) => {
    // console.log(`InfluenceGroup::deleteInfluence(${keyToDelete})`)
    const { groupId, deleteInfluenceCB } = props
    deleteInfluenceCB(groupId, keyToDelete)
  }

  // **********************************************
  const onclickAdd = () => {
    // console.log(`InfluenceGroup::onclickAdd()`)
    const { groupId, addInfluenceCB } = props
    addInfluenceCB(groupId)
  }

  // **********************************************
  // render!
  // console.log("InfluenceGroup::render()")

  const { heading, beliefs, relationships, isDynamic, influencesWithKeys } = props

  // static render
  if (!isDynamic) {
    return (
      <>
        <h4>{heading}</h4>
        {influencesWithKeys.length === 0 &&
          <p>Not started.</p>
        }
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-left">Relationship</th>
              <th scope="col" className="text-left">Individual</th>
              <th scope="col" className="text-left">Belief/Value</th>
              <th scope="col" className="text-left">Impact</th>
            </tr>
          </thead>
          <tbody>
            {influencesWithKeys.map((influenceWithKey) =>
              <Influence
                key={influenceWithKey.key}
                id={influenceWithKey.key}
                beliefs={beliefs}
                relationships={relationships}
                influence={influenceWithKey.item}
                isDynamic={isDynamic}
                updateInfluenceCB={updateInfluence}
                deleteInfluenceCB={deleteInfluence}
              />
            )}
          </tbody>
        </table>

        {isDynamic &&
          <>
            &nbsp;&nbsp;&nbsp;<Button className="addAnswerButton" type="button" onClick={onclickAdd}>+ Add</Button>
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
        <p>No data provided.</p>
      }
        {influencesWithKeys.map((influenceWithKey) =>
          <Influence
            key={influenceWithKey.key}
            id={influenceWithKey.key}
            beliefs={beliefs}
            relationships={relationships}
            influence={influenceWithKey.item}
            isDynamic={isDynamic}
            updateInfluenceCB={updateInfluence}
            deleteInfluenceCB={deleteInfluence}
          />
        )}

        <>
          &nbsp;&nbsp;&nbsp;<Button className="addAnswerButton" type="button" onClick={onclickAdd}>+ Add</Button>
          <p>&nbsp;</p>
        </>
    </>
  )

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
