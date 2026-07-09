import React, { useState } from 'react';
import { 
    calculateInvestmentResults, 
    calculateMonthlyInvestmentResults, 
    formatter 
} from "../utilities/investment.js";

export function OutputData({ inputval }) {
    const [viewMode, setViewMode] = useState('yearly');     // useState for toggling between yearly & monthly view

    const annualData = calculateInvestmentResults(inputval);
    const monthlyData = calculateMonthlyInvestmentResults(inputval);

    const isYearly = viewMode === 'yearly';
    const activeData = isYearly ? annualData : monthlyData;

    if (!activeData || activeData.length === 0) {
        return <p style={{ textAlign: 'center' }}>No data available</p>;
    }

    const initialInvestment = inputval.begInvestment;

    // Grab the final item from the active view
    const finalItem = activeData[activeData.length - 1];
    
    // Both views now share the exact same financial totals
    const finalTotalInvested = initialInvestment + (inputval.annInvestment * inputval.yearlyInvestment);
    const finalTotalInterest = finalItem.valueEndOfYear - finalTotalInvested;

    return (
        <div className="output-container" style={{ width: '100%', maxWidth: '800px', margin: '2rem auto' }}>
            
            {/* View Selection Controls */}
            <div className="view-toggle" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '10px' }}>
                <button 
                    onClick={() => setViewMode('yearly')}
                    style={{
                        padding: '0.5rem 1.5rem',
                        backgroundColor: isYearly ? 'rgb(236, 0, 236)' : '#e2e6ea',
                        color: isYearly ? 'white' : '#495057',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Yearly Breakdown
                </button>
                <button 
                    onClick={() => setViewMode('monthly')}
                    style={{
                        padding: '0.5rem 1.5rem',
                        backgroundColor: !isYearly ? 'rgb(236, 0, 236)' : '#e2e6ea',
                        color: !isYearly ? 'white' : '#495057',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Monthly Breakdown
                </button>
            </div>

            <table id="results">
                <thead>
                    <tr>
                        <th>{isYearly ? 'Year' : 'Month'}</th>
                        <th>Investment Value</th>
                        <th>Interest ({isYearly ? 'Annual' : 'Monthly'})</th>
                        <th>Total Interest</th>
                        <th>Total Amount Invested</th>
                    </tr>
                </thead>
                <tbody>
                    {activeData.map((item) => {
                        const steps = isYearly ? item.year : item.month;
                        const depositPerStep = isYearly ? inputval.annInvestment : (inputval.annInvestment / 12);
                        
                        const totalAmountInvested = initialInvestment + (depositPerStep * steps);
                        const totalInterest = item.valueEndOfYear - totalAmountInvested;

                        return (
                            <tr key={steps}>
                                <td>{isYearly ? `Year ${item.year}` : `Month ${item.month}`}</td>
                                <td>{formatter.format(item.valueEndOfYear)}</td>
                                <td>{formatter.format(item.interest)}</td>
                                <td>{formatter.format(totalInterest)}</td>
                                <td>{formatter.format(totalAmountInvested)}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot style={{ backgroundColor: '#f8f9fa', borderTop: '3px solid #dee2e6' }}>
                    <tr style={{ fontWeight: 'bold' }}>
                        <td>Total Summary</td>
                        <td>{formatter.format(finalItem.valueEndOfYear)}</td>
                        <td>—</td>
                        <td>{formatter.format(finalTotalInterest)}</td>
                        <td>{formatter.format(finalTotalInvested)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
