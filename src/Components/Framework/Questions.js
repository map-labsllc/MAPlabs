import React from 'react';
import { Alert, Button, ProgressBar } from 'react-bootstrap';
import ErrorAlert from '../Utils/ErrorAlert';

/* **************************************************
   Questions component

   Manages array of questions displaying one at a time.
     -- Left/Right buttons to move to prev/next question
     -- Close button to initiate close of parent modal
     -- Left/Close/Right buttons perist the current question

   state:
     currIdx -- current position in array of questions

   props:
     subComponents -- array of React components to work with a single question
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal
     onPersistQuestionCB -- call to have parent CT persist a question from Store
     onCloseModalCB -- call to close the modal this control resides in

***************************************************** */
export default class Questions extends React.Component {
  state = {
    currIdx: 0,
    errorMessage: '',
    disableNext: false,
  };

  clearError = () => {
    this.setState({ errorMessage: '' });
  };

  setDisableNext = (value) => {
    // TODO ... fix
    // console.log('setDisableNext called', value)
    // this.setState({disableNext: value})
  };

  // ******************************************
  // persist the current question before moving off of it
  persistCurrent = () => {
    const { subComponents, onPersistQuestionCB } = this.props;
    const { currIdx } = this.state;

    onPersistQuestionCB(subComponents[currIdx].props.question);
  };

  // ******************************************
  // called when close button is clicked
  onclickClose = () => {
    // console.log( "Questions::onclickClose()" )

    const { onCloseModalCB } = this.props;

    this.persistCurrent();

    onCloseModalCB();
  };

  onSubComponentChange = () => {
    this.clearError();

    const { currIdx } = this.state;
    const { subComponents } = this.props;

    // aready at the end, do nothing
    if (currIdx === subComponents.length - 1) return;

    this.persistCurrent();
    this.isValid();
  };

  // ******************************************
  // called when left button clicked
  onclickLeft = () => {
    // console.log( "Questions::onclickLeft()" )
    this.clearError();

    const { currIdx } = this.state;

    // already at the start, do nothing
    if (currIdx === 0) return;

    this.persistCurrent();
    this.setState({ currIdx: currIdx - 1 });
  };

  // ******************************************
  // called when right button clicked
  onclickRight = () => {
    // console.log( "Questions::onclickRight()" )
    this.clearError();

    const { currIdx } = this.state;
    const { subComponents } = this.props;

    // aready at the end, do nothing
    if (currIdx === subComponents.length - 1) return;

    this.persistCurrent();

    this.setState({ currIdx: currIdx + 1 });
  };

  isValid = () => {
    const { currIdx } = this.state;
    const { subComponents, getAnswersForCodeCB } = this.props;
    const currentCode = subComponents[currIdx].props.question.code;

    this.clearError();

    const currentAnswers = getAnswersForCodeCB(currentCode);

    if (currentAnswers.length) {
      this.clearError();
      return true;
    }

    this.setState({ errorMessage: 'Please complete answers.' });
    return false;
  };

  // ******************************************
  render() {
    // console.log( 'ShortAnswers::render()" )

    const { subComponents, isDynamic, showNumbers = false } = this.props;
    const { currIdx, errorMessage, disableNext } = this.state;

    // ******************************************
    // render static version in <Popup>
    if (!isDynamic && subComponents) {
      return (
        <>
          {subComponents.map((subComponent, idx) => (
            <div className="text-left" key={idx}>
              <h4>
                {showNumbers ? `${idx + 1}. ` : ''} {subComponent.props.question.text}
              </h4>
              {subComponent}
            </div>
          ))}
        </>
      );
    }

    // ******************************************

    // inject isDynamic into props so the subCompoent will render its dynamic version
    const subComponentsWithIsDynamic = subComponents.map((subComponent, idx) =>
      React.cloneElement(subComponent, {
        isDynamic: true,
        number: idx + 1,
        setDisableNext: this.setDisableNext,
        onSubComponentChange: this.onSubComponentChange,
      }));

    const progressAmount = Math.round((100 * (currIdx + 1)) / subComponents.length);
    return (
      <>
        <ProgressBar variant="success" now={progressAmount} label={`${progressAmount}%`} />
        {subComponentsWithIsDynamic.map((subComponent, idx) => (
          <div key={idx}>{idx === currIdx && <>{subComponent}</>}</div>
        ))}

        <br />

        {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}

        <div className="bgButton text-center">
          {currIdx > 0 && (
            <Button className="previousButton" onClick={this.onclickLeft}>
              &larr; Previous
            </Button>
          )}

          <Button className="closeButton" type="button" onClick={this.onclickClose}>
            Save
          </Button>

          {currIdx < subComponentsWithIsDynamic.length - 1 && (
            <Button className="nextButton" onClick={this.onclickRight} disabled={!!disableNext}>
              Next &rarr;
            </Button>
          )}
        </div>
      </>
    );
  }
}
