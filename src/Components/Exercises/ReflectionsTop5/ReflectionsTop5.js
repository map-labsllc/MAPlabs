import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import {  SELECTED } from '../../../constants'
import ReflectionTop5 from './ReflectionTop5'
import { UUID } from '../../Utils/UUID'


/* **************************************************
   ReflectionsTop5 component

   Displays three sections for entering an reflection
     -- three sections
     -- Save button

   state:
    isDirty -- decide if we need to persist to db
    reflectionsWithKeys --
      [ key: 1,
        item: { 
          strength: '1234'
          strengthValue: 'Bravery',
          phrase: 'I was young and dumb',
          effect: 'embodiment'
          selected:'selected'}, 
        {...},
      ]

   props:
     userId
     question -- { code: 50, text: "Question 50" }
     instructions
     filter -- user iull select from strength reflections
     reflections --  see above
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onPersistCB() -- callback to update the store and persist data
     onCloseModalCB -- when user clicks Close button
***************************************************** */
export default class ReflectionsTop5 extends React.Component {

  uuid = new UUID() // provides unique keys for <ShortAnswer> components

  state = {
    isDirty: false,
    reflectionsWithKeys: this.uuid.addKeys(this.props.reflections || []),
  }

  onclickClose = () => {

    const { userId, onPersistCB, onCloseModalCB } = this.props
    const { isDirty, reflectionsWithKeys } = this.state

    if (isDirty)
      onPersistCB(
        userId,
        this.uuid.stripKeys(reflectionsWithKeys)
      )

    onCloseModalCB()
  }

  updateReflection = (keyToUpdate, newInfluence) => {

    const { reflectionsWithKeys } = this.state

    const newReflectionsWithKeys = reflectionsWithKeys.map((reflectionWithKey) =>
      (reflectionWithKey.key === keyToUpdate) ? { key: keyToUpdate, item: newInfluence } : reflectionWithKey)

    this.setState({
      isDirty: true,
      reflectionsWithKeys: newReflectionsWithKeys,
    })
  }

  render() {
    const { question, filter, instructions, isDynamic } = this.props
    const { reflectionsWithKeys } = this.state

    // filter to just the StrengthEmIm matching the filter
    const filteredWithKeys = reflectionsWithKeys.filter(reflectionWithKey =>
      reflectionWithKey.item.effect === filter
    )

    // static render
    if (!isDynamic) {
      const selectedReflectionsWithKeys = filteredWithKeys
        .filter(reflectionWithKey => reflectionWithKey.item.selected === SELECTED)

      if (selectedReflectionsWithKeys.length === 0)
        return <p>Not started.</p>

      return (
        <>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th scope="col" className="text-left">Strength</th>
                <th scope="col" className="text-left">Phrase</th>
                <th scope="col" className="text-left">Effect</th>
              </tr>
            </thead>
            <tbody>
              {selectedReflectionsWithKeys.map(reflection =>
                <ReflectionTop5 
                    key={reflection.key}
                    id={reflection.key}
                    reflection={reflection.item}
                    isDynamic={isDynamic}
                    updateReflectionCB={this.updateReflection}
                />
              )}
            </tbody>
          </table>
        </>
      )
    }

    // dynamic render
    return (
      <>
        <p>{instructions}</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-left"></th>
              <th scope="col" className="text-left">Strength</th>
              <th scope="col" className="text-left">Phrase</th>
              <th scope="col" className="text-left">Effect</th>
            </tr>
          </thead>
          <tbody>
            {filteredWithKeys.map(reflectionWithKey =>
              <ReflectionTop5 
                key={reflectionWithKey.key}
                id={reflectionWithKey.key}
                reflection={reflectionWithKey.item}
                isDynamic={isDynamic}
                updateReflectionCB={this.updateReflection}
              />
            )}
          </tbody>
        </table>
        
        <Button type="button" onClick={this.onclickClose}>Save</Button>
      </>
    )
  }
}


ReflectionsTop5.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  reflections: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func,
}

