import React, { Component } from 'react'
import { Modal,Button } from 'react-bootstrap'

export default class Modall extends Component {
  


  render(){
    const { show, handleShow, handleClose, data } = this.props
    return(
      <div>
        <Button bsStyle="primary"  onClick= {handleShow}>Fucking press me</Button>
        <Modal show={show}>
            <Modal.Header >
                <Modal.Title>
                  Compare your “current situation” statement to your “future desired situation” statement.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              This has information
              { data }

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Complete</Button>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
