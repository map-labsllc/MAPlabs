import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { SELECTED } from '../../../constants.js'
import Top5 from './Top5'
import { UUID } from '../../Utils/UUID'


/* **************************************************
   Top5List component

   Displays selections for top 5
     -- selections
     -- Save button

   state:
    isDirty -- decide if we need to persist to db
    data --
      [ key: 1,
        item: { 
          field: 'field',  // different for each one
          selected:'selected'}, 
        {...},
      ]

   props:
     userId
     question -- { code: 50, text: "Question 50" }
     instructions
     previousAnswers
     title
     prompts
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onSave() -- callback to update the store and persist data
     onCloseModalCB -- when user clicks Close button
***************************************************** */
export default class Top5List extends React.Component {
  uuid = new UUID()

  state = {
    isDirty: false,
    allItemsWithKeys: this.uuid.addKeys(this.props.prompts || []),
  }
  
  onclickClose = async () => {
    const { userId, onSaveCB, onCloseModalCB } = this.props
    const { isDirty, allItemsWithKeys } = this.state

    if (isDirty) {
      let selectedData = this.filterSelected(allItemsWithKeys)
      let newSelections = this.uuid.stripKeys(allItemsWithKeys)

      await onSaveCB(newSelections)
      await onCloseModalCB()
    }
  }

  filterSelected = (allItemsWithKeys) => allItemsWithKeys.filter(itemWithKey =>
    itemWithKey.item.selected === SELECTED
  )

  update = (key, data) => {
    console.log("update", key, data)
    const { allItemsWithKeys } = this.state

    const newAllItemsWithKeys = allItemsWithKeys.map((item) =>
      (item.key === key) ? { key: key, item: data } : item)

    this.setState({
      isDirty: true,
      allItemsWithKeys: newAllItemsWithKeys
    })
  }

  render() {
    const { question, instructions, isDynamic, fields, headings, prompts } = this.props
    
    const { allItemsWithKeys } = this.state

    console.log("renderin'", allItemsWithKeys)

    const headingsToTh = () => {
      return headings.map((heading, idx) => (
        <th scope="col" className="text-left" key={idx}>{heading}</th>
      ))
    }

    // static render
    if (!isDynamic) {
      const selectedItemsWithKeys = this.filterSelected(allItemsWithKeys)

      if (selectedItemsWithKeys.length === 0) {
        return <p>Not started.</p>
      }

      return (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              { headingsToTh(headings) }
            </tr>
          </thead>
          <tbody>
            {selectedItemsWithKeys.map(item =>
              <Top5 
                key={item.key}
                id={item.key}
                data={item.item}
                fields={fields}
                isDynamic={isDynamic}
                updateCB={this.update}
              />
            )}
          </tbody>
        </table>
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
              { headingsToTh(headings) }
            </tr>
          </thead>
          <tbody>
            {allItemsWithKeys.map(item =>
              <Top5 
                key={item.key}
                id={item.key}
                data={item.item}
                fields={fields}
                selected={item.seleted}
                isDynamic={isDynamic}
                updateCB={this.update}
              />
            )}
          </tbody>
        </table>
        
        <Button type="button" onClick={this.onclickClose}>Save</Button>
      </>
    )
  }
}

Top5List.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  selectedAnswers: PropTypes.array.isRequired,
  prompts: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  headings: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onCloseModalCB: PropTypes.func,
  onSaveCB: PropTypes.func
}

