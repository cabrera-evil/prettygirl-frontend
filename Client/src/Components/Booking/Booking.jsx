import React, {useState, useEffect} from 'react'
import { Routes, Route} from "react-router-dom";
import './Booking.scss';
import StepsVisualizer from './StepsVisualizer/StepsVisualizer';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep/SecondStep';
import ThirdStep from './ThirdStep/ThirdStep';
import { animateScroll as scroll } from 'react-scroll';

const Booking = () => {
  const [firstStep, setFirstStep] = useState(false);
  const [secondStep, setSecondStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (step == 1) {
      setFirstStep(true);
      setSecondStep(false);
      setThirdStep(false);
    } else if (step === 2) {
      setFirstStep(false);
      setSecondStep(true);
      setThirdStep(false);
    } else if (step === 3) {
      setThirdStep(true);
      setFirstStep(false);
      setSecondStep(false);
    } else {
      setFirstStep(false);
      setSecondStep(false);
      setThirdStep(false);
    }
  }, [step])
  
  const handleLoad = (e) => {
    setStep(e);
    scroll.scrollToTop();
  }

  return (
    <section className='booking-step'>
      < StepsVisualizer firstActive={firstStep} secondActive={secondStep} thirdActive={thirdStep}/>
        <Routes>
          <Route path='/client-data' element={<FirstStep onLoad={handleLoad}/>}/>
          <Route path='/delivery-method' element={<SecondStep onLoad={handleLoad}/>}/> 
          <Route path='/confirmation' element={<ThirdStep onLoad={handleLoad}/>}/>
        </Routes>
    </section>
  )
}

export default Booking