import React from 'react'
import PropTypes from 'prop-types'
import { UUID } from '../../Utils/UUID'
import {
  GROUP_PERSONAL,
  GROUP_SOCIAL,
  GROUP_WIDER
} from '../../../constants'
import { QUESTION_TYPE_INFLUENCES } from '../../../store/answers/constants'
import InfluenceGroup from './InfluenceGroup'
import QuestionsCT from '../../Framework/QuestionsCT'

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
    isDynamic: this.props.isDynamic,
    isDirty: false,
    influencesWithKeys: {
      [GROUP_PERSONAL]: this.uuid.addKeys(this.props.influences[GROUP_PERSONAL]),
      [GROUP_SOCIAL]: this.uuid.addKeys(this.props.influences[GROUP_SOCIAL]),
      [GROUP_WIDER]: this.uuid.addKeys(this.props.influences[GROUP_WIDER]),
    }
  }

  onSave = () => {
    const { userId, onPersistCB, onCloseModalCB } = this.props
    const { isDirty, influencesWithKeys } = this.state

    console.log("+++onclickClose")
    if (isDirty) {
      const data = {
        [GROUP_PERSONAL]: this.uuid.stripKeys(influencesWithKeys[GROUP_PERSONAL]),
        [GROUP_SOCIAL]: this.uuid.stripKeys(influencesWithKeys[GROUP_SOCIAL]),
        [GROUP_WIDER]: this.uuid.stripKeys(influencesWithKeys[GROUP_WIDER]),
      }

      console.log("data", isDirty, data)

      onPersistCB(userId, data)
    }

    console.log(">>>>calling onCloseModalCB")
    onCloseModalCB()
    this.setState({ isDynamic: false })
  }

  // **********************************************
  // groupId is the key into influencesWithKeys
  deleteInfluence = (groupId, keyToDelete) => {
    // console.log(`Influences::deleteInfluence(${groupId}, ${keyToDelete})`)

    const { influencesWithKeys } = this.state

    const newGroupInfluencesWithKeys = influencesWithKeys[groupId].filter((influenceWithKey) => keyToDelete !== influenceWithKey.key)

    this.setState({
      isDirty: true,
      influencesWithKeys: {
        ...this.state.influencesWithKeys,
        [groupId]: newGroupInfluencesWithKeys,
      }
    })
  }

  // **********************************************
  // groupId is the key into influencesWithKeys
  addInfluence = (groupId) => {
    const { influencesWithKeys } = this.state

    let previousName = ''
    let previousRelationship = ''

    if (influencesWithKeys[groupId].length) {
      previousRelationship = influencesWithKeys[groupId][influencesWithKeys[groupId].length - 1].item.relationship
      previousName = influencesWithKeys[groupId][influencesWithKeys[groupId].length - 1].item.name
    }

    const newGroupInfluencesWithKeys = influencesWithKeys[groupId].concat(this.uuid.getNewItemWithKey({
      relationship: previousRelationship,
      name: previousName,
      belief: '',
      impact: '',
      selected: '',
    }))

    this.setState({
      isDirty: true,
      influencesWithKeys: {
        ...this.state.influencesWithKeys,
        [groupId]: newGroupInfluencesWithKeys,
      }
    })
  }

  // **********************************************
  updateInfluence = (groupId, keyToUpdate, newInfluence) => {
    console.log(`>>>Influences::updateData()`, newInfluence)

    const { influencesWithKeys } = this.state

    const newGroupInfluencesWithKeys = influencesWithKeys[groupId].map((influenceWithKey) =>
      ((influenceWithKey.key === keyToUpdate) ? { key: keyToUpdate, item: newInfluence } : influenceWithKey))

    this.setState({
      isDirty: true,
      influencesWithKeys: {
        ...this.state.influencesWithKeys,
        [groupId]: newGroupInfluencesWithKeys,
      }
    })
  }

  render() {
    const { beliefs, relationships, social_influences, wider_influences, question, description, onSubComponentChange } = this.props
    const { isDynamic, influencesWithKeys } = this.state

    const groups = [
      {
        id: GROUP_PERSONAL,
        heading: 'Personal Relationships',
        relationships: relationships
      },
      {
        id: GROUP_SOCIAL,
        heading: 'Social Groups and Ideologies',
        relationships: social_influences
      },
      {
        id: GROUP_WIDER,
        heading: 'Wider Communities and Cultural Groups',
        relationships: wider_influences
      }
    ]

    const subComponents = groups.map(group => (
      <InfluenceGroup
        question={question}
        heading={group.heading}
        beliefs={beliefs}
        relationships={group.relationships}
        isDynamic={isDynamic}
        influencesWithKeys={influencesWithKeys[group.id]}
        groupId={group.id}
        updateInfluenceCB={this.updateInfluence}
        deleteInfluenceCB={this.deleteInfluence}
        addInfluenceCB={this.addInfluence}
        onSubComponentChange={onSubComponentChange}
      />
    ))

    return (
      <QuestionsCT
        question = { question }
        questionType = { QUESTION_TYPE_INFLUENCES }
        subComponents = { subComponents }
        description = { description }
        onCloseModalCB={this.onSave}
        isDynamic={isDynamic}
      />
    )
  }
}

Influences.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  relationships: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func
}
