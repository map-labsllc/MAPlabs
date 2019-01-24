import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import ShortAnswersCT from '../Containers/ShortAnswersCT'

const ModalShortAnswer = ({ handleShow, handleClose, show }) => {
    return (
        <div>
            <Button style={style.complete} bsStyle="primary" bsSize="large" onClick={handleShow} show={show}>Short Answers</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={style.header} closeButton>
                    <Modal.Title style={style.header}>Compare your “current situation” statement to your “future desired situation” statement.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ShortAnswersCT
                        question={{ code: 40, text: "ShortAnswers 40 question" }}
                        doesHandlePersistence={{ value: false }}
                    />
                </Modal.Body>
                <Modal.Footer style={style.footer}>
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
        fontSize: "25px",
        backgroundColor: "#25274D",
        color: "#AAABB8",
    },
    previous: {
        float: "left",
        backgroundColor: "#29648A",
        color: "#AAABB8",
        borderColor: "#AAABB8",
    },
    complete: {
        marginLeft: "auto",
        marginRight: "175px",
        backgroundColor: "#2E9CCA",
        color: "black",
        borderColor: "black",
    },
    body: {
        backgroundColor: "#036FD5",
    },
    footer: {
        backgroundColor: "#25274D",
    },
    next: {
        float: "right",
        backgroundColor: "#29648A",
        color: "#AAABB8",
        borderColor: "#AAABB8",
    }
}
export default ModalShortAnswer

