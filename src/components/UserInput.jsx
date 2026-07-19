import React from 'react'

export const UserInput = ({ inputCust, onChangeCustInput, onResetInputs }) => {
  
  const validateKeyInput = (e, allowDecimals = true) => {
    const invalidChars = ['e', 'E', '-', '+'];
    if (!allowDecimals) {
      invalidChars.push('.', ',');
    }
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <section id='user-input' style={{ maxWidth: '100%', margin: '0 auto', padding: '1rem', marginTop: '10px' }}>
      <style>{`
        .input-group {
          display: grid;
          grid-template-columns: repeat(2, 2fr);
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .input-group {
            grid-template-columns: 2fr;
            gap: 0.5rem;
          }
          .input-group p {
            margin: 0;
          }
          .actions {
            margin-top: 0.75rem;
          }
        }
      `}</style>

      <div className='input-group'>
        <p style={{ margin: '0 0 1rem 0' }}>
          <label htmlFor="beg-invest" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Investments at Start</label>
          <input 
            id="beg-invest"
            type="number" 
            min="0"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', backgroundColor: 'lightgrey', borderRadius: '5px' }}
            value={inputCust.begInvestment ?? ''} 
            onKeyDown={(e) => validateKeyInput(e)}
            onChange={(e) => onChangeCustInput('begInvestment', e.target.value)} 
          />
        </p>

        <p style={{ margin: '0 0 1rem 0' }}>
          <label htmlFor="ann-invest" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Annual Investments</label>
          <input 
            id="ann-invest"
            type="number" 
            min="0"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', backgroundColor: 'lightgrey', borderRadius: '5px' }}
            value={inputCust.annInvestment ?? ''} 
            onKeyDown={(e) => validateKeyInput(e)}
            onChange={(e) => onChangeCustInput('annInvestment', e.target.value)} 
          />
        </p>

        <p style={{ margin: '0 0 1rem 0' }}>
          <label htmlFor="ret-invest" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Expected Return (%)</label>
          <input 
            id="ret-invest"
            type="number" 
            min="0"
            step="0.1"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', backgroundColor: 'lightgrey', borderRadius: '5px' }}
            value={inputCust.returnInvestment ?? ''} 
            onKeyDown={(e) => validateKeyInput(e)}
            onChange={(e) => onChangeCustInput('returnInvestment', e.target.value)} 
          />
        </p>

        <p style={{ margin: '0 0 1rem 0' }}>
          <label htmlFor="year-invest" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Duration (Years)</label>
          <input 
            id="year-invest"
            type="number" 
            min="1"
            step="1"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', backgroundColor: 'lightgrey', borderRadius: '5px' }}
            value={inputCust.yearlyInvestment ?? ''} 
            onKeyDown={(e) => validateKeyInput(e, false)}
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