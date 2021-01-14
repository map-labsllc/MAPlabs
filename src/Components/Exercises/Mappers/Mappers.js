import React from 'react'
import { PropTypes } from 'prop-types'
import { Card } from 'react-bootstrap'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import SectionNav from '../../Framework/SectionNav'

import {
  EXERCISE_510,
  EXERCISE_565,
  EXERCISE_511,
  EXERCISE_512,
  EXERCISE_520,
  EXERCISE_521,
  EXERCISE_522,
  EXERCISE_523,
  EXERCISE_524,
  EXERCISE_530,
  EXERCISE_531,
  EXERCISE_540,
  EXERCISE_550,
  EXERCISE_551,
  EXERCISE_552,
  EXERCISE_560,
} from '../../Modules/Module5'

const CompassIcon = () => (<i className="lg nc-icon nc-compass-05"></i>)

const VTE = (props) => (
  <VerticalTimelineElement
    contentStyle={{ background: '#1F77D0', color: 'black' }}
    contentArrowStyle={{ borderRight: '7px solid #1F77D0' }}
    iconStyle={{ background: '#1F77D0', color: '#fff', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
    icon={<CompassIcon />}
  >
    {props.children}
  </VerticalTimelineElement>
)

const Mappers = () => (
  <div className="mappers-layout">
    <VerticalTimeline layout="1-column-left">
      <VTE>
        <Card>
          <Card.Body>
            <div className="container-fluid contain">
              <SectionNav
                subSections= {[
                  {
                    id: 565,
                    title: 'In order to reach my future desired situation',
                    exercise: EXERCISE_565
                  },
                ]}
              />
            </div>
          </Card.Body>

        </Card>
      </VTE>

      <VTE>
        <div className="background text-left">
          <Card>
            <Card.Header>
              <Card.Title><h4>HOW I'LL DO IT</h4></Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="container-fluid contain">
                <h4>Goals - I will need to change my behavior</h4>
                <SectionNav
                  subSections= {[
                    {
                      id: 560,
                      title: 'Breaking and building',
                      exercise: EXERCISE_560
                    },
                  ]}
                />

                <h4>Commitments</h4>
                <SectionNav
                  subSections= {[
                    {
                      id: 550,
                      title: 'I will need personal growth',
                      exercise: EXERCISE_550
                    },
                    {
                      id: 551,
                      title: 'I will need supporting relationships',
                      exercise: EXERCISE_551
                    },
                    {
                      id: 552,
                      title: 'I will need engagement mastery',
                      exercise: EXERCISE_552
                    },
                  ]}
                />

                <h4>Life Purpose</h4>
                <SectionNav
                  subSections= {[
                    {
                      id: 540,
                      title: 'My "who" and "what"',
                      exercise: EXERCISE_540
                    },
                  ]}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </VTE>
      <VTE>
        <div className="background text-left">
          <Card>
            <Card.Header>
              <Card.Title><h4>WHAT I CARE ABOUT</h4></Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="container-fluid contain">
                <h4>Focus Beyond Self</h4>
                <SectionNav
                  subSections= {[
                    {
                      id: 531,
                      title: 'These are my thoughts and directives on "what" I care about',
                      exercise: EXERCISE_531
                    },
                    {
                      id: 530,
                      title: 'I want to focus on something beyond myself',
                      exercise: EXERCISE_530
                    },
                    {
                      id: 512,
                      title: 'These are my thoughts and directives about my context',
                      exercise: EXERCISE_512
                    },
                  ]}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </VTE>
      <VTE>
        <div className="background text-left">
          <Card>
            <Card.Header>
              <Card.Title><h4>WHO I AM</h4></Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="container-fluid contain">
                <h4>My Meaning</h4>
                <SectionNav
                  subSections= {[
                    {
                      id: 520,
                      title: 'By grounding myself in meaning',
                      exercise: EXERCISE_520
                    },
                    {
                      id: 22,
                      title: 'By using my top strengths',
                      exercise: EXERCISE_522
                    },
                    {
                      id: 521,
                      title: 'By living out my deepest desires',
                      exercise: EXERCISE_521
                    },
                  ]}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </VTE>
      <VTE>
        <div className="background text-left">
          <Card>
            <Card.Body>
              <div className="container-fluid contain">
                <SectionNav
                  subSections= {[
                    {
                      id: 511,
                      title: 'I need to acknowledge these important themes',
                      exercise: EXERCISE_511
                    },
                    {
                      id: 510,
                      title: 'In order to improve my current situation',
                      exercise: EXERCISE_510
                    }
                  ]}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </VTE>
    </VerticalTimeline>
  </div>
)

export default Mappers

Mappers.propTypes = {
}
