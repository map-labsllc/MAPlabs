import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'

import aboutText from './aboutText'
const SplashPage = () => {
    return (
        <div style={style.background}>
            <div className="container-fluid">
                <h1 style={style.title} className="text-center"><span style={style.map}>MAP</span>Maker</h1>
                <div className="container-fluid" style={style.subtitle}>
                    <h4 className="text-center">The Science of <span style={style.MAP}>M</span>eaning <span style={style.MAP}>A</span>nd <span style={style.MAP}>P</span>urpose</h4>
                </div>
                <br />
                <br />

                <ButtonToolbar style={style.buttonCentering} className='text-center'>
                    <Button style={style.button} href='/signup'>Sign Up</Button>
                    <Button style={style.button} href='/login'>Log In</Button>
                </ButtonToolbar>
                <br />
                <br />
                <div className="container-fluid" style={style.paragraph}>
                    <p style={style.textMargin}>{aboutText}</p>
                </div>
                <br />
                <div className="container-fluid" style={style.paragraph}>
                    <p style={style.textMargin}>MAPlabs is taking on the largest questions and the latest science in order to help you find deeper meaning and more fulfilling life purpose.

Research finds that up to 75% of us (that’s 3 out of 4 people you know!) lack a well developed sense of life purpose based on personal meaning.  Our ability to find meaning and develop purpose in our ever-changing culture is being challenged as never before. The result:  stress, boredom, anxiety, and lives that lack fulfillment.

But science is helping to identifying new approaches, like focusing not on the symptom of stress, but on its cause, which is often a less-noticed sense of meaninglessness. </p>
                </div>
            </div>
        </div >
    )
}

const style = {
    title: {
        color: "#29648A",
        fontFamily: "Helvetica",
        fontSize: "5em",
        marginTop: "5%",
        opacity: "0.95",
    },
    map: {
        color: "#25274D",
    },
    MAP: {
        color: "#29648A",
    },
    subtitle: {
        color: "black",
        fontFamily: "Helvetica",
        backgroundColor: "#AAABB8",
        width: "30%",
        borderRadius: "25px",
        opacity: "0.8",
    },
    buttonCentering: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        borderColor: "black",
        backgroundColor: "#2E9CCA",
        color: "white",
        opacity: "0.8"
    },
    background: {
        backgroundImage: 'url("MAPmaker.jpg")',
        backgroundSize: "cover",
        //marginTop: "2%",
        padding: "6px",
        color: "#AAABB8",
    },
    textMargin: {

    },
    header: {
        color: "#EDF5E1",
    },
    paragraph: {
        marginLeft: "15%",
        marginTop: "1em",
        marginRight: "15%",
        marginBottom: "1em",
        backgroundColor: "#AAABB8",
        color: "black",
        borderRadius: "25px",
        padding: "10px",
        opacity: "0.8",
    }
}

export default SplashPage
