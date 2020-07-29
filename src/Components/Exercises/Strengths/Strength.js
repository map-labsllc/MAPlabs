import React from "react"
import PropTypes from "prop-types"
import { Form, FormControl } from "react-bootstrap"


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
    number: this.props.number,
    isDirty: false,
    strength: this.props.strength
  }

  options = this.props.strengthOptions.map((s, key) => ({ key, text: s, value: s }))

  // **********************************************
  componentDidMount = () => {
    console.log(this.props)
    // add an initial blank entry if there are no previous entries
    // const { previousData } = this.props
  }

  // **********************************************
  // tell parent to update data to store
  updateData = () => {
    console.log(`Strength::updateData()`)

    const { onUpdateStoreCB } = this.props

    const newData = {}
    newData.strength = this.state.strength
    onUpdateStoreCB(this.state.number, newData)
  }

  onBlur = () => {
    const { isDirty } = this.state
    if (isDirty) {
      this.updateData()
      this.setState({
        isDirty: false
      })
    }
  }

  handleDropChange = (e) => this.setState({ strength: e.target.value })


  render() {
    const { strength } = this.state
    const { isDynamic, strengthOptions } = this.props

    if (!isDynamic) {
      return (
        <>
          {strength}
        </>
      )
    }

    return (
      <>
        <Form onSubmit={this.onSubmit} >
          <FormControl
            as="select"
            placeholder="Select Strength"
            onChange={this.handleDropChange}
            value={strength}
            onBlur={this.onBlur}
          >
            {strengthOptions.map((value, key) => (
              <option key={key} value={value}>
                { value }
              </option>
              )
            )}
          </FormControl>
        </Form>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

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