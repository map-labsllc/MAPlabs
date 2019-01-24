import React from 'react'
import { Button, Col, ButtonToolbar } from 'react-bootstrap'
const SplashPage = () => {
    return (
        <div style={style.background}>

            <h1 style={style.title} className="text-center">MAPMaker</h1>
            <h4 style={style.subtitle} className="text-center">The Science of Meaning and Purpose</h4>
            <img className="img-responsive center-block" src="https://scontent-dfw5-2.cdninstagram.com/vp/9f0a7c7aa18b83e0d11bf81408c5cbb3/5CF94F3C/t51.2885-15/sh0.08/e35/s750x750/46038013_203180027229315_5370813539263890085_n.jpg?_nc_ht=scontent-dfw5-2.cdninstagram.com" />
            <br />
            <ButtonToolbar style={style.buttonCentering} className='text-center'>
                <Button style={style.button}>Sign Up</Button>
                <Button style={style.button}>Log In</Button>
            </ButtonToolbar>
            <h5 style={style.textMargin}>At MAPlabs, we turn the latest scientific findings on human meaning and purpose into programs that inform, empower, and fulfill human lives.
When our lives have meaning and purpose we flourish. But when meaning and purpose lag, we passively endure the life we have rather than actively strive for the life that we want.

That’s why we founded MAPlabs.

​  ​ Our research-based programs help you to create a richer life by improving your personal sense of meaning, and by developing a pathway toward a more purposeful life.

 If you are ready to build a life of deep meaning and clarifying purpose, then you are ready for MAPlabs.</h5>
        </div >
    )
}
const style = {
    title: {
        color: "#AAABB8",
        fontFamily: "Veranda",
        fontSize: "5em"
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
        margin: "0",
        padding: "0",
        color: "#AAABB8"
    },
    textMargin: {
        marginLeft: "10em",
        marginRight: "10em",
        marginBottom: "10em"
    },
    header: {
        color: "#EDF5E1",
    }
}

export default SplashPage