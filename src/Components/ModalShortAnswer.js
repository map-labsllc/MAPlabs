import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import ShortAnswersCT from '../Containers/ShortAnswersCT'

const ModalShortAnswer = (handleShow, handleClose) => {
    return (
        <div>
            <Button bsStyle="primary" bsSize="large" onClick={handleShow}>Short Answers</Button>
            <Modal show={this.state.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Compare your “current situation” statement to your “future desired situation” statement.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ShortAnswersCT
                        question={{ code: 40, text: "ShortAnswers 40 question" }}
                        doesHandlePersistence={{ value: false }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button>Complete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ModalShortAnswer
