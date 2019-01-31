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
                     ['', '']
        }
    }

    updateStore = prompts => {
        this.props.onUpdateStoreCB( this.props.userId, this.props.question.promptCode, prompts )
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
                <p className='prompts'>
                    <span
                        id='prompt1' 
                        onClick={this.promptClick( 1 )}
                        >{this.state.prompts[0]}</span>
                    <span 
                        id='prompt2'
                        onClick={this.promptClick( 0 )}
                        >{this.state.prompts[1]}</span>
                </p>
            </div> : <span>{this.state.prompts.map( ( prompt, index ) => (
                <p key={index}>{prompt} <br></br></p>
            ) )}</span>
        )
    } 
} 

Bracket.propTypes = {
    prompts: PropTypes.arrayOf( PropTypes.string ).isRequired,
    question: PropTypes.shape( {
        code: PropTypes.number.isRequired, 
        text: PropTypes.string.isRequired
    } ).isRequired,
    onUpdateStoreCB: PropTypes.func.isRequired
}