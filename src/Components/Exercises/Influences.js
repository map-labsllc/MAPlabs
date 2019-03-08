import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import InfluenceGroup from './InfluenceGroup'
import {
  GROUP_PERSONAL,
  GROUP_SOCIAL,
  GROUP_WIDER,
} from './InfluencesConstants.js'

// legal values for an impact
export const IMPACT_SUPPORTIVE = 'supportive'
export const IMPACT_INHIBITING = 'inhibiting'
export const IMPACT_BOTH       = 'both'

/* **************************************************
   Influences component

   Displays three sections for entering an influence
     -- three sections
     -- Save button

   state:
     todo: fill this in

   props:
     userId
     question -- { code: 50, text: "Question 50" }
     instructions
     previousData --  {
                        todo: show example
                      }
     isDynamic -- undefined - render static version in <PopUp>
                  true - render dynamic version <ModalX>
     onPersistCB() -- callback to update the store and persist data
     onCloseModalCB -- when user clicks Close button
***************************************************** */
export default class Influences extends React.Component {

  state = {
  }

  // **********************************************
  componentDidMount = () => {
  }

  // **********************************************
  onclickClose = () => {
    // console.log( "Influences::onclickClose()" )

    const { onCloseModalCB } = this.props

    // this.persistCurrent()
    onCloseModalCB()
  }

  // **********************************************
  // tell parent to update data to store
  updateData = () => {
    console.log(`Influences::updateData()`)

    // const { onUpdateStoreCB } = this.props
    //
    // const newData = {}
    // newData.strength    = this.state.strength
    // newData.broadly     = this.state.broadly
    // newData.reflections = this.uuid.stripKeys(this.state.reflectionsWithKeys)
    //
    // onUpdateStoreCB(newData)
  }

  // **********************************************
  // render!
  render() {
    console.log("Influences::render()")
    console.log("this.props.previousData", this.props.previousData)

    const { question, previousData, isDynamic } = this.props

    // if ( !isDynamic ) {
    //
    //   return (
    //     <>
    //       <InfluenceGroup
    //         heading="Personal Relationships"
    //         isDynamic={isDynamic}
    //         influences={previousData.personal}
    //       />
    //       <InfluenceGroup
    //         heading="Social Groups and Ideologies"
    //         isDynamic={isDynamic}
    //         influences={previousData.social}
    //       />
    //       <InfluenceGroup
    //         heading="Wider Communities and Cultural Groups"
    //         isDynamic={isDynamic}
    //         influences={previousData.wider}
    //       />
    //     </>
    //   )
    // }

    return (
      <>
        <InfluenceGroup
          heading="Personal Relationships"
          isDynamic={isDynamic}
          influences={previousData[GROUP_PERSONAL]}
          groupId={GROUP_PERSONAL}
          updateInfluencesCB={this.updateInfluences}
        />
        <InfluenceGroup
          heading="Social Groups and Ideologies"
          isDynamic={isDynamic}
          influences={previousData[GROUP_SOCIAL]}
          groupId={GROUP_SOCIAL}
          updateInfluencesCB={this.updateInfluences}
        />
        <InfluenceGroup
          heading="Wider Communities and Cultural Groups"
          isDynamic={isDynamic}
          influences={previousData[GROUP_WIDER]}
          groupId={GROUP_WIDER}
          updateInfluencesCB={this.updateInfluences}
        />
        <Button type="button" onClick={this.onclickClose}>Close</Button>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Influences.propTypes = {
//   question: PropTypes.shape( {
//     code: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//   } ).isRequired,
//   previousData: PropTypes.object.isRequired,
//   isDynamic: PropTypes.bool,
//   onUpdateAnswerCB: PropTypes.func,  // required, injected by <Popup>
// }

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
