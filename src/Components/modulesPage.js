import React, { Component } from 'react'
import Modal from './Modal'
import QuestionsList from './questionsList'
import NavBar from './NavBar'
export default class ModulesPage extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      activeModal:false,
      show: false,
      data: []
    }
    this.handleShow = this.handleShow.bind( this )
    this.handleClose = this.handleClose.bind( this )
  }

  //close and open modal
  handleClose() {
      this.setState( { show: false } )
  }

  handleShow() {
      this.setState( { show: true } )
  }

  render(){
    return(

      <div>
      <NavBar/>
        <Modal
          show = { this.state.show }
          data = { <QuestionsList/> }
          handleShow = { this.handleShow }
          handleClose = { this.handleClose }
        />
      </div>
    )
  }

}
