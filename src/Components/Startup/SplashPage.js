import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'

import aboutText from './aboutText'
const SplashPage = () => {
    return (
        <div style={style.background}>
            <h1 style={style.title} className="text-center">MAPMaker</h1>
            <h4 style={style.subtitle} className="text-center">The Science of Meaning and Purpose</h4>
            <ButtonToolbar style={style.buttonCentering} className='text-center'>
                <Button style={style.button} href='/signup'>Sign Up</Button>
                <Button style={style.button} href='/login'>Log In</Button>
            </ButtonToolbar>
            <img className="img-responsive center-block" src="https://scontent-dfw5-2.cdninstagram.com/vp/9f0a7c7aa18b83e0d11bf81408c5cbb3/5CF94F3C/t51.2885-15/sh0.08/e35/s750x750/46038013_203180027229315_5370813539263890085_n.jpg?_nc_ht=scontent-dfw5-2.cdninstagram.com" alt="homepage img" />
            <br />
            <p style={style.textMargin}>{aboutText}</p>
            <br />
        </div >
    )
}
const style = {
    title: {
        color: "#AAABB8",
        fontFamily: "Veranda",
        fontSize: "5em",
        marginTop: "3%"
    },
    subtitle: {
        color: "#29648A",
        fontFamily: "Courier",
    },
    buttonCentering: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        borderColor: "black",
        backgroundColor: "#2E9CCA",
        color: "white"
    },
    background: {
        backgroundColor: "#25274D",
        marginTop: "2%",
        padding: "6px",
        color: "#AAABB8"
    },
    textMargin: {
        marginLeft: "10em",
        marginRight: "10em",
        marginBottom: "5em"
    },
    header: {
        color: "#EDF5E1",
    },
}

export default SplashPage
