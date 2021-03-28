import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAnswers } from '../../store/answers/reducer';
import SectionCompleteButton from './SectionCompleteButton';
import { getModuleSection, getNextModuleSection, showNextSection } from '../../store/user/reducer';
import { MadLibHtml } from '../Exercises/MadLibs/MadLibHtml';
/* **************************************************
   SectionExercise component

   Shows / hides a complex interactive component.

   props:
     user -- user object
     moduleNum -- integer
     sectionNum -- integer
     sectionTitle -- title of the section for resdisplay if we do a modal below this
     exercise -- component user will interact with
***************************************************** */
class SectionExercise extends React.Component {
  state = {
    isVisible: false,
  };

  // **************************************************
  // Show the complex interactive component
  onclickStart = () => {
    this.setState({ isVisible: true });
  };

  // Complete
  onComplete = () => {
    const { user, moduleNum, sectionNum, sectionCompletedCB } = this.props;
    sectionCompletedCB(user, moduleNum, sectionNum);

    this.setState({ isVisible: false });
  };

  // Save
  onSave = () => {
    const { exercise, onPersistQuestionCB } = this.props;
    onPersistQuestionCB(exercise.question_code);
    this.setState({ isVisible: false });
  };

  // **************************************************
  // render!
  render() {
    const { isVisible } = this.state;
    const {
      user,
      sectionNum,
      moduleNum,
      answersRD,
      userRD,
      exercise,
      section_ids,
      showComplete = true,
      theEnd = false,
    } = this.props;
    const currentModule = user.curr_module;
    const currentSection = user.curr_section;

    // Link the <exercise> to this instance of the SectionExercise Component.
    //   - onCloseModalCB() is called when exercise completes to tell us to close ModalX
    //   - isDynamic flag directs exercise to go live and take user input.  This flag
    //       doesn't exist (is undefined) in <exercise>.
    const exerciseDynamic = React.cloneElement(exercise, {
      onCloseModalCB: this.onSave,
      isDynamic: true,
    });

    // show the Edit/Save button default to true
    const showEdit = true;

    // By default <exercise> does not have the isDynamic prop and will
    //   render itself in a static format for display in <SectionExercise>.
    //   The assignment below is only to emphasize this fact.
    const exerciseStatic = exercise;

    // get the exercise's description
    const { description } = exerciseStatic.props;

    const answer = getAnswers(answersRD, sectionNum);

    // is this module started?
    const isStarted = () => {
      if (answer.length > 0) {
        return true;
      }
      if (section_ids) {
        return section_ids.some((childSectionId) => getAnswers(answersRD, childSectionId).length);
      }
      return false;
    };

    const buttonLabel = isStarted() ? 'Edit' : 'Start';

    const answersComplete = () => {
      if (answer.length > 0) {
        // console.log('answersComplete has length')
        return true;
      }

      if (section_ids) {
        // console.log('answersComplete checking answersComplete')
        return section_ids.every((childSectionId) => getAnswers(answersRD, childSectionId).length);
      }

      // console.log('answersComplete false')
      return false;
    };

    // next Module in sequence
    const next = getNextModuleSection(userRD, +moduleNum, +sectionNum);
    const nextModule = next.moduleNum;
    const nextSection = next.sectionNum || 'intro';

    const curr = getModuleSection(moduleNum, sectionNum);

    return (
      <>
        {/* display instructions */}
        {!isVisible && (
          <>
            <div>
              <span className="reading" dangerouslySetInnerHTML={{ __html: description }} />
              {curr?.reference_sections && (
                <>
                  {curr?.reference_sections?.map((rsId) => {
                    const ref_section = getModuleSection(moduleNum, rsId);
                    const answerRef = getAnswers(answersRD, rsId);
                    if (typeof answerRef === 'string') {
                      return (
                        <>
                          <hr className="divider" />
                          <span className="reading">
                            {rsId} - {ref_section.title}
                          </span>
                          <hr className="divider" />
                          <span className="reading">{answerRef}</span>
                        </>
                      );
                    }
                    if (Array.isArray(answerRef)) {
                      return (
                        <>
                          <hr className="divider" />
                          <span className="reading">
                            {rsId} - {ref_section.title}
                          </span>
                          {answerRef
                            .filter((a) => a !== '')
                            .map((aws) => {
                              let awsValue = '';
                              try {
                                awsValue = JSON.parse(aws);
                              } catch (e) {
                                console.log(e);
                              }
                              if (typeof awsValue === 'object') {
                                return (
                                  <>
                                    <hr className="divider" />
                                    <span className="reading">{MadLibHtml(JSON.parse(aws))}</span>
                                  </>
                                );
                              }
                              if (Array.isArray(aws)) {
                                return aws
                                  .filter((a) => a !== '')
                                  .map((a) => {
                                    let anValue = '';
                                    try {
                                      anValue = JSON.parse(a);
                                    } catch (e) {
                                      console.log(e);
                                    }
                                    if (typeof anValue === 'object') {
                                      return (
                                        <>
                                          <hr className="divider" />
                                          <span className="reading">{MadLibHtml(anValue)}</span>
                                        </>
                                      );
                                    }
                                    return (
                                      <>
                                        <hr className="divider" />
                                        <span className="reading">{a}</span>
                                      </>
                                    );
                                  });
                              }
                              if (typeof awsValue === 'string') {
                                return (
                                  <>
                                    <hr className="divider" />
                                    <span className="reading">{awsValue}</span>
                                  </>
                                );
                              }
                              return null;
                            })}
                        </>
                      );
                    }
                    return null;
                  })}
                </>
              )}
              <hr className="divider" />
              {exerciseStatic}

              {!theEnd && (
                <div className="text-center">
                  {showEdit && (
                    <Button className="mr-5" type="button" onClick={this.onclickStart}>
                      {buttonLabel}
                    </Button>
                  )}
                  {showComplete && (
                    <span className="ml-5">
                      {answersComplete(answer) && (
                        <SectionCompleteButton onClick={this.onComplete} />
                      )}
                    </span>
                  )}
                </div>
              )}

              {!theEnd && showNextSection(currentModule, moduleNum, currentSection, sectionNum) && (
                <>
                  <div className="text-center">
                    <h3>Module {moduleNum} Feedback</h3>
                    <p>
                      Congratulations on completing Module {moduleNum}! Let us know your thoughts by
                      filling out this short survey.
                    </p>
                    <a
                      className="nav-link"
                      target="_blank"
                      rel="noreferrer"
                      href={curr.feedbackUrl}
                    >
                      <i className="nc-icon nc-notification-70"></i>
                      Feedback
                    </a>
                  </div>
                  <div className="text-right">
                    <Link className="btn" to={`/modules/${nextModule}/section/${nextSection}`}>
                      Next Exercise &rarr;
                    </Link>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* display the exercise */}
        {isVisible && (
          <>
            <div>
              <span className="reading" dangerouslySetInnerHTML={{ __html: description }} />
              <hr className="divider" />
              {exerciseDynamic}
            </div>
          </>
        )}
      </>
    );
  }
}

export default SectionExercise;

SectionExercise.propTypes = {
  user: PropTypes.object.isRequired,
  sectionNum: PropTypes.node.isRequired,
  moduleNum: PropTypes.number.isRequired,
  answersRD: PropTypes.object.isRequired,
  userRD: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  section_ids: PropTypes.array,
};
