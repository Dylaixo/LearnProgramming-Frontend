import React from 'react'
import About from '../About/About'
import Navigaiton from '../Navigation/Navigaiton'
import Options from '../Options/Options'
import Slider from '../Slider/Slider'

function Nonauth() {
    return (
        <>
            <Navigaiton />
            <About />
            <Slider />
            <Options/>
        </>
    )
}

export default Nonauth;