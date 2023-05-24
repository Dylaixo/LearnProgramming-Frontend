import React from 'react'
import Navigaiton from '../Navigation/Navigaiton'
import Options from '../Options/Options'
import Slider from '../Slider/Slider'
import About from '../About/About'
import NoAuthStyles from '../../modules/Noauth.module.scss'
function Nonauth() {
    return (
        <div className={NoAuthStyles.content}>
            <Navigaiton />
            <About />
            <Slider />
            <Options/>
        </div>
    )
}

export default Nonauth;