import React from 'react'
import PropTypes from 'prop-types'

export default class Bracket extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            prompts: props.prompts ? props.prompts.slice() : ['', '']
        }
    }

    updateStore = prompt => {
        this.props.onUpdateStoreCB( this.props.userId, this.props.question.code, prompt )
    }

    promptClick = index => e => {
        const newPrompts = this.state.prompts.slice()

        this.updateStore( this.state.prompts[index === 1 ? 0 : 1] )
        
        newPrompts.splice( index, 1 )

        return this.setState( {
            prompts: newPrompts 
        } )
    }

    render() {
        const { question: { code, text } } = this.props
        return (
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
            </div>
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