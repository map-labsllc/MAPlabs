import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { SELECTED } from '../../../constants.js'
import Top5 from './Top5'
import { UUID } from '../../Utils/UUID'


/* **************************************************
   ThemesTop5 component

   Displays three sections for entering an influence
     -- three sections
     -- Save button

   state:
    isDirty -- decide if we need to persist to db
    data --
      [ key: 1,
        item: { 
          relationship:'brother', 
          name:"Tim", 
          belief:"Charity", 
          impact:"supportive",
          selected:'selected'}, 
        {...},
      ]

   props:
     userId
     question -- { code: 50, text: "Question 50" }
     instructions
     previousAnswers
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onPersistCB() -- callback to update the store and persist data
     onCloseModalCB -- when user clicks Close button
***************************************************** */
export default class ThemesTop5 extends React.Component {
  uuid = new UUID() // provides unique keys for <ShortAnswer> components

  state = {
    isDirty: false,
    previousAnswers: this.uuid.addKeys(this.props.previousAnswers),
  }

  // **********************************************
  componentDidMount = () => {
  }

  // **********************************************
  onclickClose = () => {
    const { userId, onPersistCB, onCloseModalCB } = this.props
    const { isDirty, allThemesWithKeys } = this.state

    if (isDirty)
      onPersistCB(
        userId,
        this.uuid.stripKeys(allThemesWithKeys)
      )

    onCloseModalCB()
  }

  // **********************************************
  update = (keyToUpdate, data) => {
    // console.log(`ThemesTop5::updateData()`)

    const { allThemesWithKeys } = this.state

    const newAllThemesWithKeys = allThemesWithKeys.map((influenceWithKey) =>
      (influenceWithKey.key === keyToUpdate) ? { key: keyToUpdate, item: data } : influenceWithKey)

    this.setState({
      isDirty: true,
      allInfluencesWithKeys: newAllInfluencesWithKeys,
    })
  }

  render() {
    const { question, impactFilter, instructions, isDynamic, title } = this.props

    const { allInfluencesWithKeys } = this.state

    // static render
    if (!isDynamic) {
      const selectedInfluencesWithKeys = impactInfluencesWithKeys.filter(influenceWithKey =>
        influenceWithKey.item.selected === SELECTED
      )
      if (selectedInfluencesWithKeys.length === 0)
        return <p>Not started.</p>

      return (
        <>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th scope="col" className="text-left">{title}</th>
              </tr>
            </thead>
            <tbody>
              {selectedInfluencesWithKeys.map(influenceWithKey =>
                <Top5 
                    key={influenceWithKey.key}
                    id={influenceWithKey.key}
                    data={influenceWithKey.item}
                    isDynamic={isDynamic}
                    updateCB={this.update}
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
              <th scope="col" className="text-left">Theme</th>
            </tr>
          </thead>
          <tbody>
            {impactInfluencesWithKeys.map(influenceWithKey =>
              <ThemeTop5 
                key={influenceWithKey.key}
                id={influenceWithKey.key}
                influence={influenceWithKey.item}
                isDynamic={isDynamic}
                updateInfluenceCB={this.updateInfluence}
              />
            )}
          </tbody>
        </table>
        
        <Button type="button" onClick={this.onclickClose}>Save</Button>
      </>
    )
  }
}

ThemesTop5.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  Themes: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func
}

