import React from 'react'
import PropTypes from 'prop-types'

export default class Bracket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prompts: this.props.prompts.slice()
        }
    }

    updateStore = prompt => {
        this.props.onUpdateStoreCB(prompt)
    }

    promptClick = index => e => {
        if (this.state.prompts.length === 2) {
            return this.updateStore(this.state.prompts[index])
        }
        
        const newPrompts = this.state.prompts.slice()
        
        newPrompts.splice(index, 1)

        return this.setState({
            prompts: newPrompts 
        })
    }

    render() {
        const { question: {code, text} } = this.props
        return (
            <div>
                <p id={'question' + code}>{text}</p>
                <p className='prompts'>
                    <span 
                        onClick={this.promptClick(1)}
                        value={this.state.prompts[0]}>{this.state.prompts[0]}</span>
                    <span 
                        onClick={this.promptClick(0)}
                        value={this.state.prompts[1]}>{this.state.prompts[1]}</span>
                </p>
            </div>
        )
    } 
} 

Bracket.propTypes = {
    prompts: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.shape({
        code: PropTypes.number.isRequired, 
        text: PropTypes.string.isRequired
    }).isRequired,
    onUpdateStoreCB: PropTypes.func.isRequired
}