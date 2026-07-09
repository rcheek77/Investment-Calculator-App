import React, { useState } from 'react';
import { Header } from './components/header';
import './App.css';
import { UserInput } from './components/UserInput';
import { OutputData } from './components/outputdata';

function App() {
  const [inputCust, setInputCust] = useState({
    begInvestment: 10000,
    annInvestment: 1200,
    returnInvestment: 5,
    yearlyInvestment: 25
  });

  function callUserInput(inputID, value) {
    const parsedValue = value === '' ? 0 : parseFloat(value);
    if (parsedValue < 0) return;

    setInputCust((prev) => ({
      ...prev,
      [inputID]: parsedValue // Using the clean parsed number
    }));
  }

  function handleReset() {
    setInputCust({
      begInvestment: 10000,
      annInvestment: 1200,
      returnInvestment: 5,
      yearlyInvestment: 25
    });
  }

  const isInputValid =
    inputCust.yearlyInvestment >= 1 &&
    !isNaN(inputCust.begInvestment) &&
    !isNaN(inputCust.annInvestment) &&
    !isNaN(inputCust.returnInvestment);

  return (
    <>
      <Header />
      <h1>RSC INVESTMENT CALCULATOR ©</h1>
      <UserInput 
        inputCust={inputCust} 
        onChangeCustInput={callUserInput} 
        onResetInputs={handleReset} 
      />
      {isInputValid ? (
        <OutputData inputval={inputCust} />
      ) : (
        <p className="error-message" style={{ textAlign: 'center', color: '#dc3545', fontWeight: 'bold' }}>
          Please enter a valid duration of 1 year or more
        </p>
      )}
    </>
  );
}

export default App;
