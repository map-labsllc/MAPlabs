import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import InfluenceGroup from './InfluenceGroup'
import {
  GROUP_PERSONAL,
  GROUP_SOCIAL,
  GROUP_WIDER, 
} from './InfluencesConstants.js'
import { UUID } from '../../Utils/UUID'


/* **************************************************
   Influences component

   Displays three sections for entering an influence
     -- three sections
     -- Save button

   state:
    isDirty -- decide if we need to persist to db
    influencesWithKeys -- 
      { key: 3,
        item: {
          personal: [ { relationship:'brother', name:"Tim", belief:"Charity", impact:"supportive", selected:'selected'}, {...} ]
          social:   [ { relationship:'friend',name:"Tim", belief:"Charity", impact:"supportive", selected:'selected'}, {...} ]
          wider:    [ { nrelationship:'coach',ame:"Tim", belief:"Charity", impact:"supportive", selected:'selected'}, {...} ]
        }
      }

   props:
     userId
     question -- { code: 50, text: "Question 50" }
     instructions
     beliefs -- staticdata -- [ 'belief1', 'belief2', ... ]
     relationships -- staticdata -- ['brother',...]
     influences --  see above
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onPersistCB() -- callback to update the store and persist data
     onCloseModalCB -- when user clicks Close button
***************************************************** */
export default class Influences extends React.Component {

  uuid = new UUID() // provides unique keys for <ShortAnswer> components

  state = {
    isDirty: false,
    influencesWithKeys: {
      [GROUP_PERSONAL]: this.uuid.addKeys(this.props.influences[GROUP_PERSONAL]),
      [GROUP_SOCIAL]:   this.uuid.addKeys(this.props.influences[GROUP_SOCIAL]),
      [GROUP_WIDER]:    this.uuid.addKeys(this.props.influences[GROUP_WIDER]),
    }
  }

  // **********************************************
  componentDidMount = () => {
  }

  // **********************************************
  onclickClose = () => {
    console.log( "Influences::onclickClose()" )

    const { userId, onPersistCB, onCloseModalCB } = this.props
    const { isDirty, influencesWithKeys } = this.state

    if (isDirty)
      onPersistCB(
        userId,
        {
          [GROUP_PERSONAL]: this.uuid.stripKeys(influencesWithKeys[GROUP_PERSONAL]),
          [GROUP_SOCIAL]:   this.uuid.stripKeys(influencesWithKeys[GROUP_SOCIAL]),
          [GROUP_WIDER]:    this.uuid.stripKeys(influencesWithKeys[GROUP_WIDER]),
        }
      )

    onCloseModalCB()
  }

  // **********************************************
  // groupId is the key into influencesWithKeys
  deleteInfluence = (groupId, keyToDelete) => {
    console.log(`Influences::deleteInfluence(${groupId}, ${keyToDelete})`)

    const { influencesWithKeys } = this.state

    const newGroupInfluencesWithKeys = influencesWithKeys[groupId].filter((influenceWithKey) =>
      keyToDelete !== influenceWithKey.key)

    this.setState({
        isDirty: true,
        influencesWithKeys:  {
        ...this.state.influencesWithKeys,
        [groupId]: newGroupInfluencesWithKeys,
      }
    })
  }

  // **********************************************
  // groupId is the key into influencesWithKeys
  addInfluence = (groupId) => {
    console.log(`Influences::addInfluence(${groupId})`)

    const { influencesWithKeys } = this.state

    let previousName = ''
    let previousRelationship = ''
    
    if (influencesWithKeys[groupId].length) {
      previousRelationship = influencesWithKeys[groupId][influencesWithKeys[groupId].length - 1].item.relationship
      previousName         = influencesWithKeys[groupId][influencesWithKeys[groupId].length - 1].item.name
    }

    const newGroupInfluencesWithKeys = influencesWithKeys[groupId].concat(this.uuid.getNewItemWithKey({
      relationship: previousRelationship,
      name: previousName,
      belief: '',
      impact:'',
      selected: '',
    }))

    this.setState({
      isDirty: true,
      influencesWithKeys:  {
        ...this.state.influencesWithKeys,
        [groupId]: newGroupInfluencesWithKeys,
      }
    })
  }

  // **********************************************
  updateInfluence = (groupId, keyToUpdate, newInfluence) => {
    console.log(`Influences::updateData()`)

    const { influencesWithKeys } = this.state

    const newGroupInfluencesWithKeys = influencesWithKeys[groupId].map((influenceWithKey) =>
      (influenceWithKey.key === keyToUpdate) ? { key: keyToUpdate, item: newInfluence } : influenceWithKey)

    this.setState({
      isDirty: true,
      influencesWithKeys:  {
        ...this.state.influencesWithKeys,
        [groupId]: newGroupInfluencesWithKeys,
      }
    })
  }

  // **********************************************
  // render!
  render() {
    console.log("Influences::render()")
    console.log("this.props.influences", this.props.influences)

    const { question, beliefs, relationships, instructions, influences, isDynamic } = this.props

    const { influencesWithKeys } = this.state

    return (
      <>
        {isDynamic &&
          <p>{instructions}</p>
        }
        <InfluenceGroup
          heading="Personal Relationships"
          beliefs={beliefs}
          relationships={relationships}
          isDynamic={isDynamic}
          influencesWithKeys={influencesWithKeys[GROUP_PERSONAL]}
          groupId={GROUP_PERSONAL}
          updateInfluenceCB={this.updateInfluence}
          deleteInfluenceCB={this.deleteInfluence}
          addInfluenceCB={this.addInfluence}
        />
        <InfluenceGroup
          heading="Social Groups and Ideologies"
          beliefs={beliefs}
          relationships={relationships}
          isDynamic={isDynamic}
          influencesWithKeys={influencesWithKeys[GROUP_SOCIAL]}
          groupId={GROUP_SOCIAL}
          updateInfluenceCB={this.updateInfluence}
          deleteInfluenceCB={this.deleteInfluence}
          addInfluenceCB={this.addInfluence}
        />
        <InfluenceGroup
          heading="Wider Communities and Cultural Groups"
          beliefs={beliefs}
          relationships={relationships}
          isDynamic={isDynamic}
          influencesWithKeys={influencesWithKeys[GROUP_WIDER]}
          groupId={GROUP_WIDER}
          updateInfluenceCB={this.updateInfluence}
          deleteInfluenceCB={this.deleteInfluence}
          addInfluenceCB={this.addInfluence}
        />

        {isDynamic &&
          <Button type="button" onClick={this.onclickClose}>Close</Button>
        }
        
        {!isDynamic &&
          <br></br>
        }
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Influences.propTypes = {
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
