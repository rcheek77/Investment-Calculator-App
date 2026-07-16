import React, { useState, useMemo, useEffect } from 'react'
import { Header } from './components/header'
import './App.css'
import { UserInput } from './components/UserInput'
import { OutputData } from './components/outputdata'
import { calculateInvestmentResults } from './utilities/investment.js'
import { generatepdf } from './utilities/generatereport.js'

function App() {
  const [inputCust, setInputCust] = useState({
    begInvestment: 10000,
    annInvestment: 1200,
    returnInvestment: 5,
    yearlyInvestment: 25
  })

  const [isLoading, setIsLoading] = useState(false)
  const [debouncedInput, setDebouncedInput] = useState(inputCust)

  // 1. Real-time validation layer for instant UI error feedback
  const isInputValid =
    inputCust.yearlyInvestment >= 1 &&
    !isNaN(parseFloat(inputCust.begInvestment)) &&
    !isNaN(parseFloat(inputCust.annInvestment)) &&
    !isNaN(parseFloat(inputCust.returnInvestment))

  // 2. Debounce management effect with standard conditional pathways (no top-level returns)
  useEffect(() => {
    if (!isInputValid) {
      setDebouncedInput(inputCust)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      
      const handler = setTimeout(() => {
        setDebouncedInput(inputCust)
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(handler)
    }
  }, [inputCust, isInputValid])

  // 3. User input processor designed to accept string values (decimals, empties) without crashing
  function callUserInput(inputID, value) {
    if (value === '' || value === '-') {
      setInputCust((prev) => ({ ...prev, [inputID]: 0 }))
    } else if (typeof value === 'string' && value.endsWith('.')) {
      setInputCust((prev) => ({ ...prev, [inputID]: value }))
    } else {
      const parsedValue = parseFloat(value)
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setInputCust((prev) => ({
          ...prev,
          [inputID]: parsedValue
        }))
      }
    }
  }

  // 4. Computation layer triggered strictly by stable debounced fields
  const resdata = useMemo(() => {
    const isDebouncedValid =
      debouncedInput.yearlyInvestment >= 1 &&
      !isNaN(parseFloat(debouncedInput.begInvestment)) &&
      !isNaN(parseFloat(debouncedInput.annInvestment)) &&
      !isNaN(parseFloat(debouncedInput.returnInvestment))

    if (!isDebouncedValid) return []
    
    // Cast fields to strict numbers before running financial calculation logic
    const sanitizedInput = {
      begInvestment: Number(debouncedInput.begInvestment) || 0,
      annInvestment: Number(debouncedInput.annInvestment) || 0,
      returnInvestment: Number(debouncedInput.returnInvestment) || 0,
      yearlyInvestment: Number(debouncedInput.yearlyInvestment) || 0,
    }

    return calculateInvestmentResults(sanitizedInput)
  }, [debouncedInput])

  function handleGeneratePDF() {
    generatepdf({ ...debouncedInput, result: resdata })
  }

  return (
    <>
      <Header />
      <h1>RSC INVESTMENT CALCULATOR ©</h1>
      <UserInput inputCust={inputCust} onChangeCustInput={callUserInput} />

      {/* RENDER UI BASED ON VALIDATION AND LOADING STATUS */}
      {!isInputValid ? (
        <p className="error-message" style={{ textAlign: 'center', color: '#dc3545', fontWeight: 'bold' }}>
          Please enter a valid duration of 1 year or more
        </p>
      ) : isLoading ? (
        <div className="center">
          <p style={{ fontWeight: 'bold', color: '#007bff' }}>Calculating financial results...</p>
        </div>
      ) : (
        <OutputData calculationResults={resdata} />
      )}

      <div className='center'>
        <button type="button" disabled={isLoading || !isInputValid} onClick={handleGeneratePDF}>
          {isLoading ? 'Processing...' : 'Download PDF Report'}
        </button>
      </div>
    </>
  )
}

export default App
