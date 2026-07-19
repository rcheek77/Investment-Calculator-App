import React from 'react'

export const UserInput = ({ inputCust, onChangeCustInput, onResetInputs }) => {
  const blockInvalidChars = (e) => {
    if (['e', 'E', '-', '+'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const blockDecimals = (e) => {
    if (e.key === '.' || e.key === ',') {
      e.preventDefault();
    }
  };

  return (
    <section id='user-input'>
      <div className='input-group'>
        <p>
          <label htmlFor="beg-invest">Investments at Start</label>
          <input 
            id="beg-invest"
            type="number" 
            min="0"
            value={inputCust.begInvestment ?? ''} 
            onKeyDown={blockInvalidChars}
            onChange={(e) => onChangeCustInput('begInvestment', e.target.value)} 
          />
        </p>

        <p>
          <label htmlFor="ann-invest">Annual Investments</label>
          <input 
            id="ann-invest"
            type="number" 
            min="0"
            value={inputCust.annInvestment ?? ''} 
            onKeyDown={blockInvalidChars}
            onChange={(e) => onChangeCustInput('annInvestment', e.target.value)} 
          />
        </p>

        <p>
          <label htmlFor="ret-invest">Expected Return (%)</label>
          <input 
            id="ret-invest"
            type="number" 
            min="0"
            step="0.1"
            value={inputCust.returnInvestment ?? ''} 
            onKeyDown={blockInvalidChars}
            onChange={(e) => onChangeCustInput('returnInvestment', e.target.value)} 
          />
        </p>

        <p>
          <label htmlFor="year-invest">Duration (Years)</label>
          <input 
            id="year-invest"
            type="number" 
            min="1"
            step="1"
            value={inputCust.yearlyInvestment ?? ''} 
            onKeyDown={(e) => { blockInvalidChars(e); blockDecimals(e); }}
            onChange={(e) => onChangeCustInput('yearlyInvestment', e.target.value)} 
          />
        </p>
      </div>

      <div className="actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
        <button 
          type="button" 
          onClick={onResetInputs}
          style={{
            padding: '0.5rem 2rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Reset Values
        </button>
      </div>
    </section>
  )
}
