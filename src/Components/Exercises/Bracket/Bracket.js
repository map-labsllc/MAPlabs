import React from 'react'
import PropTypes from 'prop-types'
import '../../../CSS/ModalNavButtons.css'
import { Button } from 'react-bootstrap'


/* **************************************************
   Bracket component

   Bracket the short answers from the prompotQuestionCode to get a single
   winning short answer.

   state:
     maintain the list of prompts being whittled down to a single winner.


   props:
     question -- {
         code: 50,
         text: "Make trade-offs between your Financial/Material desires"
         }
     prompts -- array of strings to bracket to a single winner.
     previousAnswers -- array of previous answers (will be a single value if they completed bracketing)
     isDynamic -- undefined or true
            undefined: render static version in Popup
            true: render dynamic/interactive verison in Modal
     onUpdateStoreCB() -- this is a function in BracketCT to update the Store with winner
***************************************************** */
export default class Bracket extends React.Component {
  state = {
    prompts: this.props.prompts,
    promptSet: false
  }

  componentDidMount() {
    if (!this.state.promptSet && this.state.prompts.length === 1) {
      // add first prompt to store if only one
      const firstPrompt = this.state.prompts[0]
      this.updateStore([ firstPrompt ])
      this.setState({promptSet: true})
    }
  }

  updateStore = prompts => {
    this.props.onUpdateStoreCB(this.props.question.code, prompts)
  }

  promptClick = index => e => {
    const newPrompts = this.state.prompts.slice()
    newPrompts.splice(index, 1)

    this.updateStore(newPrompts)

    return this.setState({
      prompts: newPrompts
    })
  }


  render() {
    const { question: { code, text }, isDynamic } = this.props

    // render static content
    if (!isDynamic) {
      return (
        <>
          {this.props.previousAnswers.map((prompt, index) => (
            <p key={index}>{prompt}</p>
          ))}
        </>
      )
    }

    // render dynamic content
    return (
      <div>
        <p id={'question' + code}>{text}</p>
        <p>Compare the desires and make a tradeoff between each set of two, choosing one to carry into the next round.
          Click a desire to choose it</p>
        {this.state.prompts[1] ?
          <div className='prompts text-center'>
            <Button className="bracketing" id='prompt1' onClick={this.promptClick(1)} >
              {this.state.prompts[0]}
            </Button>
            {" versus "}
            <Button className="bracketing" id='prompt2' onClick={this.promptClick(0)} >
              {this.state.prompts[1]}
            </Button>
          </div>
          :
          (this.state.prompts.length > 0 && <p>You desire: <b>{this.state.prompts[0]}</b>.
          </p>)
        }
      </div>
    )
  }
}


Bracket.propTypes = {
  prompts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateStoreCB: PropTypes.func.isRequired,
}
