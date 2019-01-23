import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import ShortAnswersCT from '../Containers/ShortAnswersCT'

const ModalShortAnswer = ({ handleShow, handleClose, show }) => {
    return (
        <div>
            <Button bsStyle="primary" bsSize="large" onClick={handleShow} show={show}>Short Answers</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={style.header}>Compare your “current situation” statement to your “future desired situation” statement.</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <ShortAnswersCT
                        style={style.body}
                        question={{ code: 40, text: "ShortAnswers 40 question" }}
                        doesHandlePersistence={{ value: false }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={style.previous}>Previous</Button>
                    <Button style={style.complete}>Complete</Button>
                    <Button style={style.next}>Next</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const style = {
    header: {
        fontWeight: "1",
    },
    body: {
        fontSize: "20px",
    },
    previous: {
        float: "left",
    },
    complete: {
        justifyContent: "center",
    },
    next: {
        float: "right",
    }
}
export default ModalShortAnswer