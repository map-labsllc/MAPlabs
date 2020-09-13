import React from "react"
import PropTypes from "prop-types"
import { Form, FormControl } from "react-bootstrap"
import { listIdToValue } from "../../../store/lists/actions"

/* **************************************************
   Strength component

   Displays a single question with:
     -- Selection list of strengths (ex: 'honesty')
   state:
     Manage the strength

   props:
     number -- number of the question in <Questions> when isDynamic, 1-based
     question -- { code: 50, text: "Question 50" }
     previousData --  {
                        strength: "honest",
  
                      }
     isDynamic -- undefined - render static version
                  true - render dynamic version
     onUpdateStoreCB() -- callback to update the store
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

    let strengthValue = listIdToValue(strengthOptions, strength)
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
            )
          )}
        </FormControl>
      </>
    )
  }
}

Strength.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  number: PropTypes.number.isRequired,
  strength: PropTypes.string.isRequired,
  isDynamic: PropTypes.bool,
  strengthOptions: PropTypes.array,
  onUpdateStoreCB: PropTypes.func
}