import React from 'react'
import { Button, Col, ButtonGroup } from 'react-bootstrap'
const SplashPage = () => {
    return (
        <div>
            <h3 className="text-center">Welcome to MAPMaker</h3>
            <h5 className="text-center">tag line</h5>

            <ButtonGroup style={style.buttonGroup} >
                <Button bsSize="large">Log In</Button>
                <Button bsSize="large">Sign Up</Button>
            </ButtonGroup>


            <Col xs={12} md={8}>
                <img className="img-responsive center-block" src="https://placebear.com/g/300/300" />
            </Col>
            <Col xs={12} md={12}>
                <div className="text-center">What this website is about Lorem ipsum dolor amet meditation heirloom vape plaid, gluten-free trust fund yr tbh pickled. Distillery scenester 8-bit asymmetrical tacos enamel pin. Ethical typewriter four dollar toast migas you probably haven't heard of them. Cliche yr four dollar toast shabby chic listicle dreamcatcher kombucha freegan copper mug intelligentsia vegan synth franzen vice. Locavore trust fund tacos, leggings blue bottle occupy lyft pinterest. Prism yr adaptogen raw denim gluten-free street art organic selvage leggings keytar activated charcoal marfa salvia. Biodiesel narwhal farm-to-table ramps humblebrag. Oh. You need a little dummy text for your mockup? How quaint. I bet you’re still using Bootstrap too…</div>
            </Col>
        </div >
    )
}
const style = {
    buttonGroup: {
        justifyContent: "center",
    }

}

export default SplashPage