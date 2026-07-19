import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/header';
import './App.css';
import { UserInput } from './components/UserInput';
import { OutputData } from './components/outputdata';
import { calculateInvestmentResults, calculateMonthlyInvestmentResults } from './utilities/investment.js'
import { generatepdf } from './utilities/generatereport.js'

function App() {
  const [inputCust, setInputCust] = useState({
    begInvestment: 10000,
    annInvestment: 1000,
    returnInvestment: 2,
    yearlyInvestment: 10
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedInput, setDebouncedInput] = useState(inputCust);
  const [viewMode, setViewMode] = useState('yearly');

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedInput(inputCust);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputCust]);

  function callUserInput(inputID, value) {
    if (value === '') {
      setInputCust((prev) => ({ ...prev, [inputID]: '' }));
      return;
    }
    
    const parsedValue = parseFloat(value);
    if (parsedValue < 0 || isNaN(parsedValue)) return;

    setInputCust((prev) => ({
      ...prev,
      [inputID]: parsedValue
    }));
  }

  function handleReset() {
    setInputCust({
      begInvestment: 10000,
      annInvestment: 1200,
      returnInvestment: 5,
      yearlyInvestment: 25
    });
    setDebouncedInput({
      begInvestment: 10000,
      annInvestment: 1200,
      returnInvestment: 5,
      yearlyInvestment: 25
    });
    setViewMode('yearly');
  }

  const resdata = useMemo(() => {
    const isValid =
      debouncedInput.yearlyInvestment >= 1 &&
      !isNaN(parseFloat(debouncedInput.begInvestment)) &&
      !isNaN(parseFloat(debouncedInput.annInvestment)) &&
      !isNaN(parseFloat(debouncedInput.returnInvestment));

    if (!isValid) return [];
    

    return viewMode === 'yearly' 
      ? calculateInvestmentResults(debouncedInput)
      : calculateMonthlyInvestmentResults(debouncedInput);
  }, [debouncedInput, viewMode]); 

  function handleGeneratePDF() {
    generatepdf({ ...debouncedInput, result: resdata, viewMode: viewMode });
  }

  const isInputValid =
    inputCust.yearlyInvestment >= 1 &&
    inputCust.begInvestment !== '' &&
    inputCust.annInvestment !== '' &&
    inputCust.returnInvestment !== '';

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
