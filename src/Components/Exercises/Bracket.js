import React from 'react'
import PropTypes from 'prop-types'


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
  constructor( props ) {
    super( props )
    this.state = {
      prompts: props.prompts
    }
  }

  updateStore = prompts => {
    this.props.onUpdateStoreCB( this.props.question.code, prompts )
  }

  promptClick = index => e => {

    const newPrompts = this.state.prompts.slice()
    newPrompts.splice( index, 1 )

    this.updateStore( newPrompts )

    return this.setState( {
      prompts: newPrompts
    } )
  }


  render() {
    const { question: { code, text }, isDynamic } = this.props

    // render static content
    if ( !isDynamic ) {
      return (
        <>
          {this.props.previousAnswers.map( ( prompt, index ) => (
            <p key={index}>{prompt}</p>
          ) ) }
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
          <p className='prompts'>

            <button id='prompt1' onClick={this.promptClick( 1 )} >
              {this.state.prompts[0]}
            </button>

            <button id='prompt2' onClick={this.promptClick( 0 )} >
              {this.state.prompts[1]}
            </button>

          </p>
        :
          ( this.state.prompts.length > 0 && <p>You desire: {this.state.prompts[0]}.
           Click 'Next' to continue the exercise, or 'Close' to save your work.
          </p> )
      }
      </div>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

Bracket.propTypes = {
  prompts: PropTypes.arrayOf( PropTypes.string ).isRequired,
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  onUpdateStoreCB: PropTypes.func.isRequired,
}
