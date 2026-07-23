import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/header';
import './App.css';
import { UserInput } from './components/UserInput';
import { OutputData } from './components/outputdata';
import { calculateInvestmentResults, calculateMonthlyInvestmentResults } from './utilities/investment.js'
import { generatepdf } from './utilities/generatereport.js'

function App() {
  const [inputCust, setInputCust] = useState({    // Usestate to hold variable types by the user
    begInvestment: 10000,   // default values
    annInvestment: 1200,
    returnInvestment: 2.5,
    yearlyInvestment: 5
  });
  
  const [isLoading, setIsLoading] = useState(false);    // state variable to track whether the app is currently waiting for for user to stop typing
  const [debouncedInput, setDebouncedInput] = useState(inputCust); // stores a "delayed" version of the user inputs so calculations don't fire on every single keystroke
  const [viewMode, setViewMode] = useState('yearly'); // state variable for switching between yearly or monthly view

  useEffect(() => {     // useEffect hook to perform sideffects
    setIsLoading(true);                 // flags the system as "loading/processing" as soon as a user presses a key. In built method
    const handler = setTimeout(() => {
      setDebouncedInput(inputCust); // if the timer finishes without interruption, it updates the final debouncedInput with the user's input
      setIsLoading(false);          // and sets loading to false.
    }, 500);      // 5 second (500 millisecond) delay

    return () => clearTimeout(handler); //cleanup function. If the user types another letter before the 500ms timer finishes, the old timer is instantly destroyed, and a new 500ms timer starts
  }, [inputCust]); // Tells the effect to rerun every single time the user modifies inputCust (user input boxes)

  // function to clear empty fields. Sets field to empty string if user deletes input text
  function callUserInput(inputID, value) { 
    if (value === '') {                                     // Checks if the input is empty. If it is, it updates the state key (inputID) to '' and returns
      setInputCust((prev) => ({ ...prev, [inputID]: '' })); // takes previous state object (prev), copies all existing fields (...prev) and assigns '' to input ID key
      return;
    }
    
    const parsedValue = parseFloat(value);  // converts the string into JS value
    if (parsedValue < 0 || isNaN(parsedValue)) return; // If the number is below zero, or if parseFloat failed because the text was NaN, the function stops and changes nothing

    setInputCust((prev) => ({ // If the input passes all checks, copy the existing state (...prev),
      ...prev,
      [inputID]: parsedValue // and overwrite the specific inputID with the new valid number
    }));
  }

  // function to handle pressing reset button
  function handleReset() {
    setInputCust({
      begInvestment: 10000,
      annInvestment: 1200,
      returnInvestment: 2.5,
      yearlyInvestment: 5
    });
    setDebouncedInput({
      begInvestment: 10000,
      annInvestment: 1200,
      returnInvestment: 2.5,
      yearlyInvestment: 5
    });
    setViewMode('yearly');
  }

  const resdata = useMemo(() => { // React Hook that stores (caches) the output of the function so it doesn't re-run on every single compinent render
    const isValid =
      debouncedInput.yearlyInvestment >= 1 &&               // checks if yearly investment is at least 1,
      !isNaN(parseFloat(debouncedInput.begInvestment)) &&   // check if initial investment, annual investment & return rates are all valid numbers
      !isNaN(parseFloat(debouncedInput.annInvestment)) &&
      !isNaN(parseFloat(debouncedInput.returnInvestment));

    if (!isValid) return []; // if validation fails, return an emtpy array to prevent crashing
    

    return viewMode === 'yearly'                        // if view mode is yearly, 
      ? calculateInvestmentResults(debouncedInput)        // display yearly results (imported from investment.js),
      : calculateMonthlyInvestmentResults(debouncedInput); // otherwise, display monthly results
  }, [debouncedInput, viewMode]); 

  // function to generate a pdf, imported from generatereport component
  function handleGeneratePDF() {
    generatepdf({ ...debouncedInput, result: resdata, viewMode: viewMode });
  }

  const isInputValid =                  // const for checking inputCust values
    inputCust.yearlyInvestment >= 1 &&  // yearly invest is greater than or equal to 1,
    inputCust.begInvestment !== '' &&   // initial investment is not empty
    inputCust.annInvestment !== '' &&   // annual investment is not empty
    inputCust.returnInvestment !== '';  // return rate is not empty

  return (
    <>
      <Header />
      <h1>RSC INVESTMENT CALCULATOR ©</h1>
      <div className='center'>
        <button id='generateBtn' type="button" disabled={isLoading || !isInputValid} onClick={handleGeneratePDF}>
          {isLoading ? 'Processing...' : 'Download PDF Report'}
        </button>
      </div>
      <UserInput 
        inputCust={inputCust} 
        onChangeCustInput={callUserInput} 
        onResetInputs={handleReset} 
      />
      {isInputValid ? (
        <OutputData 
          inputval={debouncedInput} 
          resdata={resdata}
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
        />
      ) : (
        <p className="error-message" style={{ textAlign: 'center', color: '#dc3545', fontWeight: 'bold' }}>
          Please enter a valid duration of 1 year or more
        </p>
      )}
    </>
  );
}

export default App;
