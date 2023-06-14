import React, {useState} from 'react'
/* For icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
/* Import visualizer components */
import Circle from './Circle/Circle'
/* Import styles */
import './StepsVisualizer.scss'

const StepsVisualizer = ({firstActive, secondActive, thirdActive}) => {
    
    return (
        <div className='steps-visualizer'>
            {/* Text */}
            <p className='first-text'>Datos del cliente</p>
            <div className="space"></div>
            <p className='second-text'>Método de envío</p>
            <div className="space"></div>
            <p className='third-text'>Confirmación</p>

            {/* Circles and arrows */}
            <div className="step first-step">
                {
                    firstActive ? <Circle className='circle' step='1' isActive={true}/> : <Circle className='circle' step='1' isActive={false}/>
                }
            </div>
            <div className="arrow-container first-arrow">
                <FontAwesomeIcon className="arrow" icon={faArrowRight}/>
            </div>
            <div className="step second-step">
                {
                    secondActive ? <Circle className='circle' step='2' isActive={true}/> : <Circle className='circle' step='2' isActive={false}/>
                }
            </div>
            <div className="arrow-container second-arrow">
                <FontAwesomeIcon className="arrow" icon={faArrowRight} width='10x'/>   
            </div>
            <div className="step third-step">
                {
                    thirdActive ? <Circle className='circle' step='3' isActive={true}/> : <Circle className='circle' step='3' isActive={false}/>
                }
            </div>
    </div>
    )
}

export default StepsVisualizer