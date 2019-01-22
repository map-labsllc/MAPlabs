import React from 'react'
import { Button, Col, ButtonToolbar } from 'react-bootstrap'
const SplashPage = () => {
    return (
        <div>
            <h3 className="text-center">Welcome to MAPMaker</h3>
            <h5 className="text-center">tag line</h5>
            <img className="img-responsive center-block" src="https://placebear.com/g/300/300" />
            <ButtonToolbar style={style.buttonStyles} className='text-center'>
                <Button>Sign Up</Button>
                <Button>Log In</Button>
            </ButtonToolbar>
            <Col lg={2} />
            <Col lg={8}>
                <div className="text-center">What this website is about Lorem ipsum dolor amet meditation heirloom vape plaid, gluten-free trust fund yr tbh pickled. Distillery scenester 8-bit asymmetrical tacos enamel pin. Ethical typewriter four dollar toast migas you probably haven't heard of them. Cliche yr four dollar toast shabby chic listicle dreamcatcher kombucha freegan copper mug intelligentsia vegan synth franzen vice. Locavore trust fund tacos, leggings blue bottle occupy lyft pinterest. Prism yr adaptogen raw denim gluten-free street art organic selvage leggings keytar activated charcoal marfa salvia. Biodiesel narwhal farm-to-table ramps humblebrag. Oh. You need a little dummy text for your mockup? How quaint. I bet you’re still using Bootstrap too…</div>
            </Col>
            <Col lg={2} />
        </div >
    )
}
const style = {
    buttonStyles: {
        display: "flex",
        justifyContent: "center",
    }
}

export default SplashPage