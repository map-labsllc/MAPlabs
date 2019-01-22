import React from 'react'
import { Modal, Button, Pager } from 'react-bootstrap'
import ShortAnswersCT from '../Containers/ShortAnswersCT'

const ModalShortAnswer = ({ handleShow, handleClose, show }) => {
    return (
        <div>
            <Button bsStyle="primary" bsSize="large" onClick={handleShow} show={show}>Short Answers</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={style.header}>Compare your “current situation” statement to your “future desired situation” statement.</Modal.Title>
                </Modal.Header>
                <Modal.Body style={style.body}>
                    <ShortAnswersCT
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
        font: "bold",
    },
    body: {
        fontSize: "20px",
    },
    previous: {
        float: "left",
    },
    complete: {
        display: "flex",
        justifyContent: "center",
    },
    next: {
        float: "right",
    }
}
export default ModalShortAnswer