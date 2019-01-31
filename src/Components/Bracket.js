import React from 'react'
import PropTypes from 'prop-types'

export default class Bracket extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            prompts: props.prompts ? 
                     Array.isArray( props.prompts ) ?
                     props.prompts : 
                     [props.prompts] :
                     []
        }
    }

    updateStore = prompts => {
        const promptsToDispatch = this.props.question.code === 330 ? prompts.map( prompt => prompt.slice( 0, prompt.indexOf( ':' ) ) ) : prompts

        this.props.onUpdateStoreCB( this.props.userId, this.props.question.promptCode, promptsToDispatch )
    }

    promptClick = index => e => {
        if ( this.state.prompts.length === 1 ) return

        const newPrompts = this.state.prompts.slice()
        
        newPrompts.splice( index, 1 )

        this.updateStore( newPrompts )

        return this.setState( {
            prompts: newPrompts 
        } )
    }

    render() {
        const { question: { code, text }, isDynamic } = this.props
        return ( isDynamic ? 
            <div>
                <p id={'question' + code}>{text}</p>
                <p>Compare the desires and make a tradeoff between each set of two, choosing one to carry into the next round. 
                    Click a desire to choose it</p>
                {this.state.prompts[1] ? 
                <p className='prompts'>
                    <button
                        id='prompt1' 
                        onClick={this.promptClick( 1 )}
                        >{this.state.prompts[0]}</button>
                        <button 
                            id='prompt2'
                            onClick={this.promptClick( 0 )}
                        >{this.state.prompts[1]}</button> 
                    
                </p> : 
                ( this.state.prompts.length > 0 && <p>You desire: {this.state.prompts[0]}. 
                 Click 'Next' to continue the exercise, or 'Close' to save your work.   
                </p> )
            }
            </div> : <span>{this.state.prompts.map( ( prompt, index ) => (
                <p key={index}>{prompt}</p>
            ) )}</span>
        )
    } 
} 

Bracket.propTypes = {
    prompts: PropTypes.arrayOf( PropTypes.string ).isRequired,
    question: PropTypes.shape( {
        code: PropTypes.number.isRequired, 
        text: PropTypes.string.isRequired,
        promptCode: PropTypes.number.isRequired
    } ).isRequired,
    onUpdateStoreCB: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
}