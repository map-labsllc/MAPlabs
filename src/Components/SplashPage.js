import React from 'react'
import { Button, Col, ButtonGroup } from 'react-bootstrap'
const SplashPage = () => {
    return (
        <div>
            <h3 className="text-center">Welcome to MAPMaker</h3>
            <h5 className="text-center">INSPIRE THYSELF</h5>
            <div style={style.buttonGroup}>
                <ButtonGroup >
                    <Button bsStyle="success" bsSize="large">Log In</Button>
                    <Button bsStyle="danger" bsSize="large">Sign Up</Button>
                </ButtonGroup>
            </div>

            <Col xs={12} md={8}>
                <img src="http://images.clipartpanda.com/home-is-where-the-heart-is-quote-tumblr_n1j235Jylo1r5gmiko1_500.jpg" />
            </Col>
            <Col xs={12} md={12}>
                <div className="text-center">What this website is about Lorem ipsum dolor amet meditation heirloom vape plaid, gluten-free trust fund yr tbh pickled. Distillery scenester 8-bit asymmetrical tacos enamel pin. Ethical typewriter four dollar toast migas you probably haven't heard of them. Cliche yr four dollar toast shabby chic listicle dreamcatcher kombucha freegan copper mug intelligentsia vegan synth franzen vice. Locavore trust fund tacos, leggings blue bottle occupy lyft pinterest. Prism yr adaptogen raw denim gluten-free street art organic selvage leggings keytar activated charcoal marfa salvia. Biodiesel narwhal farm-to-table ramps humblebrag. Oh. You need a little dummy text for your mockup? How quaint. I bet you’re still using Bootstrap too…</div>
            </Col>
        </div >
    )
}
const style = {
    buttonGroup: {
        flex: 1,
        alignItems: "center",
    }

}

export default SplashPage