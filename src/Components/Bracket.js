import React from 'react'
import PropTypes from 'prop-types'

export default function Bracket() {

} 

Bracket.propTypes = {
    prompts: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.shape({
        code: PropTypes.number.isRequired, 
        text: PropTypes.string.isRequired
    }).isRequired,
}