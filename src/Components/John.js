import React from 'react';
import { connect } from 'react-redux';

import ShortAnswersCT from '../Containers/ShortAnswersCT'
import NarrativeCT from '../Containers/NarrativeCT'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'

import {
    Button,
    Form,
    Modal,

} from 'react-bootstrap';
import ModalShortAnswer from './ModalShortAnswer';

/* **************************************************
   Used to test components during development
***************************************************** */
class TestShortAnswers extends React.Component {
    constructor(props, context) {
        super(props, context);
        //sets up close open and state without modal
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            ready: false,
            show: false,
        }
    }

    // load user data
    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(loadAllAnswersAC());
        dispatch(loadAllTransitionsAC());
        dispatch(loadAllStaticdataAC());
    }
    //close and open modal
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    // render!
    render() {

        const isLoading = this.props.isLoading

        return (
            <>
                <p>{((isLoading) ? "loading...." : "")}</p>
                {!isLoading && (
                    <>
                        <ModalShortAnswer handleShow={this.handleShow}
                            handleClose={this.handleClose}
                            show={this.state.show}
                        />


                        <hr />
                        <ShortAnswersCT
                            question={{ code: 41, text: "ShortAnswers 41 question" }}
                            doesHandlePersistence={{ value: true }}
                        />
                        <hr />
                        <ShortAnswersCT
                            question={{ code: 42, text: "ShortAnswers 42 question" }}
                            doesHandlePersistence={{ value: true }}
                        />
                        <NarrativeCT question={{ code: 50, text: "Narrative 50 question" }} />
                        <hr />
                        <NarrativeCT question={{ code: 51, text: "Narrative 51 question" }} />
                        <hr />
                        <NarrativeCT question={{ code: 52, text: "Narrative 52 question" }} />
                    </>
                )}
            </>
        )
    }
}

// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
    console.log("--- state: ", state);
    return {
        isLoading: state.answersRD.isLoading || state.transitionsRD.isLoading,
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestShortAnswers)
