import React from 'react'

export const UserInput = ({ inputCust, onChangeCustInput }) => {
  return (
    <section id='user-input'>
      <div className='input-group'>
        <p>
          <label htmlFor="beg-invest">Investments at Start</label>
          <input 
            id="beg-invest"
            type="number" 
            required 
            min="0"
            value={inputCust.begInvestment || ''} 
            onChange={(e) => onChangeCustInput('begInvestment', e.target.value)} 
          />
        </p>

        <p>
          <label htmlFor="ann-invest">Annual Investments</label>
          <input 
            id="ann-invest"
            type="number" 
            required 
            min="0"
            value={inputCust.annInvestment || ''} 
            onChange={(e) => onChangeCustInput('annInvestment', e.target.value)} 
          />
        </p>

        <p>
          <label htmlFor="ret-invest">Expected Return (%)</label>
          <input 
            id="ret-invest"
            type="number" 
            required 
            min="0"
            step="0.1"
            value={inputCust.returnInvestment || ''} 
            onChange={(e) => onChangeCustInput('returnInvestment', e.target.value)} 
          />
        </p>

        <p>
          <label htmlFor="year-invest">Duration (Years)</label>
          <input 
            id="year-invest"
            type="number" 
            required 
            min="1"
            step="1"
            value={inputCust.yearlyInvestment || ''} 
            onChange={(e) => onChangeCustInput('yearlyInvestment', e.target.value)} 
          />
        </p>
      </div>
    </section>
  )
}
