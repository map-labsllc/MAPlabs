import React from 'react'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'
import { listIdToValue } from '../../../store/lists/actions'

/* **************************************************
   Strength component

   Displays a single question with:
     -- Selection list of strengths (ex: 'honesty')
***************************************************** */
export default class Strength extends React.Component {
  state = {
    number: this.props.number, // display number
    strength: this.props.strength
  }

  // **********************************************
  // tell parent to update data to store
  updateData = () => {
    const { onUpdateStoreCB } = this.props
    onUpdateStoreCB(this.state.number, this.state.strength)
  }

  handleChange = async (e) => {
    await this.setState({ strength: e.target.value })
    this.updateData() // update parent state
  }

  render() {
    const { strength } = this.state
    const { isDynamic, strengthOptions } = this.props

    const strengthValue = listIdToValue(strengthOptions, strength)
    if (!isDynamic) {
      return (
        <>
          {strengthValue}
        </>
      )
    }

    return (
      <>
        <FormControl
          as="select"
          onChange={this.handleChange}
          value={strength}
        >
          <option>-- select --</option>
          {strengthOptions.map(option => (
            <option key={option.id} value={option.id}>
              { option.value }
            </option>
          ))}
        </FormControl>
      </>
    )
  }
}

Strength.propTypes = {
  number: PropTypes.number.isRequired, // number 1-5
  strength: PropTypes.string.isRequired, // selected strength
  isDynamic: PropTypes.bool,
  strengthOptions: PropTypes.array, // options for list
  onUpdateStoreCB: PropTypes.func // call back to save
}
