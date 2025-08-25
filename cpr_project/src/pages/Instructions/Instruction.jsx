import React, { useState } from 'react';
import './instruction.css'
import CPRInstructionData from '../../data/CPRInstructionData';
import AEDInstructionData from '../../data/AEDInstructionData';
import {useNavigate } from 'react-router-dom';

const AED_PATH="/aedinstruction";
const CPR_PATH="/cprinstruction";
const EXIT_PATH="/instructions";

 // Getting the current path for data display
function getCurrentPath() {
  return window.location.pathname
}

// Navigation to the AED instraction by pressing the button
function isAED() {
  if (getCurrentPath() !== AED_PATH) {
    return false;
  }
  return true;
}

// Navigation to the CPR instraction by pressing the button
function isCPR() {
  if (getCurrentPath() !== CPR_PATH) {
    return false;
  }
  return true;
}

 // Getting the current instraction data
function getCurrentInstructionData() {
  if (isAED()) {
    return AEDInstructionData;
  } else {
    return CPRInstructionData;
  }
}

const Instruction = () => {
  let InstructionData = getCurrentInstructionData();

  // Getting the current step for data display
  const [currentStep, setCurrentStep] = useState(0);

  // Going to the next step
  const handleNext = () => {
    if (currentStep < InstructionData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Going to the previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Going to the AED instruction
  let navigate = useNavigate();
  const toAED = () => {
    setCurrentStep(0);
    navigate(AED_PATH);
  };

  // Going to the CPR instruction
  const toCPR = () => {
    setCurrentStep(0);
    navigate(CPR_PATH);
  };

  // Exit  to the  instructions page
  const toExit = () => {
    setCurrentStep(0);
    navigate(EXIT_PATH);
  };

  // Splitting description by \n for separate lines
  const descriptionLines = InstructionData[currentStep].description
    .split('\n')
    .filter(line => line.trim() !== ''); // Remove empty lines

  return (
    <div className='box'> 
      <div className="inst-card"> 
        <div className='title-div'>
          <h2>Step {InstructionData[currentStep].step}: {InstructionData[currentStep].title}</h2> {/* Title format is 'Step x: x.title' */}
          {/* Render each line of the description separately */}
          {descriptionLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        
        </div>
        <img className='gif-img' src={InstructionData[currentStep].url} alt="" /> {/* Current steps gif */}
       {/* Previous button*/}
        <div className="button-div">
          <button className='button' onClick={handlePrevious} disabled={currentStep === 0} 
          style={{
                    display: currentStep === 0 ? 'none' : 'block'
                  }}>
            Previous
          </button>

          {/* CPR button*/}
          <button className='button' onClick={toCPR}
          disabled={currentStep !== 0 && isAED()}
          style={{
            display: (currentStep === 0 && isAED()) ? 'block' : 'none'
          }}>
            CPR
          </button>

          {/* Next button*/}
          <button className='button' onClick={handleNext} disabled={currentStep === InstructionData.length - 1} 
          style={{
            display: currentStep === InstructionData.length - 1 ? 'none' : 'block'
          }}>
            Next
          </button>

          {/* Use AED button*/}
          <button className='button' onClick={toAED} 
          disabled={currentStep !== InstructionData.length - 1 && isCPR()}
          style={{
            display: (currentStep === InstructionData.length - 1 && isCPR()) ? 'block' : 'none'
          }}>
            Use AED
          </button>

           {/* Exit button*/}
           <button className='button' onClick={toExit} 
          disabled={currentStep !== InstructionData.length - 1 && (isCPR() || isAED())}
          style={{
            display: (currentStep === InstructionData.length - 1 && (isCPR() || isAED())) ? 'block' : 'none'
          }}>
            Exit
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Instruction;
