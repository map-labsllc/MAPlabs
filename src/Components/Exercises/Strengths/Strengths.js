import React from 'react'
import PropTypes from 'prop-types'
import {
  Button, ListGroup, ListGroupItem
} from 'react-bootstrap'
import StrengthCT from './StrengthCT'

const STRENGTH_LIMIT = 5

/* **************************************************
   Stengths component

   Displays top strengths

   state:
    isDirty -- decide if we need to persist to db
    strengths -- 
      { key: 3,
        item: {
          personal: [ { relationship:'brother', name:"Tim", belief:"Charity", impact:"supportive", selected:'selected'}, {...} ]
          social:   [ { relationship:'friend',name:"Tim", belief:"Charity", impact:"supportive", selected:'selected'}, {...} ]
          wider:    [ { nrelationship:'coach',ame:"Tim", belief:"Charity", impact:"supportive", selected:'selected'}, {...} ]
        }
      }

   props:
     userId
     question -- { code: 50, text: "Question 50" }
     instructions
     stengths --  see above
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onPersistCB() -- callback to update the store and persist data
     onCloseModalCB -- when user clicks Close button
***************************************************** */
class Strengths extends React.Component {

  state = {
    isDirty: false,
    strengths: []
  }

  // **********************************************
  componentDidMount = () => {
  }

  // **********************************************
  onclickClose = () => {
    console.log( "Strengths::onclickClose()" )

    const { userId, onPersistCB, onCloseModalCB } = this.props
    const { isDirty, strengths } = this.state

    if (isDirty)
      onPersistCB(
        userId,
        {
          strengths
        }
      )

    onCloseModalCB()
  }

  addStrength = () => {
    this.setState({
      isDirty: true, 
      strengths: [...this.state.strengths, '']
    })
  }

  // update individual strength in list of strengths
  updateStrengthCB = (key, value) => {
    let strengths = [...this.state.strength.slice(0, key), value, ...this.state.strength(key + 1)]
    console.log(">>>updateStrengthCB", strengths)
    this.setState({
      isDirty: true, 
      strengths
    })
  }

  // **********************************************
  render() {
    console.log("Strengths::render()")
  
    const { question, instructions, isDynamic } = this.props

    const { strengths } = this.state
    console.log(strengths)

    return (
      <>
        {isDynamic &&
          (<>  
            <p>{instructions}</p>

            <ol>
              { strengths.map((strength, i) => (
                <li>
                  <StrengthCT 
                    number={i}
                    strength={strength}
                    question={question}
                    onUpdateStoreCB={this.updateStrengthCB}
                    isDynamic={true}
                  />
                </li>
                ))
              }
            </ol>

            { strengths.length < STRENGTH_LIMIT &&
              <Button type="button" onClick={this.addStrength}>Add Strength</Button>
            }
            
            <div className="text-center">
              <Button type="button" onClick={this.onclickClose}>Save</Button>
            </div>
          </>
          )
        }

        {!isDynamic && 
          (
            <ListGroup>
              {strengths.map(_strength => (
                <ListGroupItem>
                  {_strength}
                </ListGroupItem>
              ))
              }
            </ListGroup>
          )
        }
      </>
    )
  }
}

Strengths.propTypes = {
   question: PropTypes.shape( {
     code: PropTypes.number.isRequired,
     text: PropTypes.string.isRequired,
   } ).isRequired,
   strength: PropTypes.object.isRequired,
   isDynamic: PropTypes.bool,
   onUpdateAnswerCB: PropTypes.func,
}

export default Strengths

