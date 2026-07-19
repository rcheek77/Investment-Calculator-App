import React from 'react';
import { formatter } from "../utilities/investment.js";

export function OutputData({ inputval, resdata, viewMode, onViewModeChange }) {
    const initialInvestment = Number(inputval.begInvestment) || 0;
    const annualInvestment = Number(inputval.annInvestment) || 0;
    const totalYears = Number(inputval.yearlyInvestment) || 0;

    const isYearly = viewMode === 'yearly';
    
    if (!resdata || resdata.length === 0) {
        return <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '2rem 0' }}>No data available</p>;
    }

    const finalItem = resdata[resdata.length - 1];
    const finalEndingBalance = finalItem.valueEndOfYear;
    
    const finalTotalInvested = initialInvestment + (annualInvestment * totalYears);
    const finalTotalInterest = finalEndingBalance - finalTotalInvested;

    return (
        <div className="output-container" style={{ width: '100%', maxWidth: '800px', margin: '2rem auto' }}>
            
            <div className="view-toggle" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '10px' }}>
                <button 
                    onClick={() => onViewModeChange('yearly')}
                    style={{
                        padding: '0.5rem 1.5rem',
                        backgroundColor: isYearly ? 'rgb(80, 0, 80)' : '#e2e6ea',
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
                    onClick={() => onViewModeChange('monthly')}
                    style={{
                        padding: '0.5rem 1.5rem',
                        backgroundColor: !isYearly ? 'rgb(80, 0, 80)' : '#e2e6ea',
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
                    {resdata.map((item) => {
                        const steps = isYearly ? item.year : item.month;
                        const depositPerStep = isYearly ? annualInvestment : (annualInvestment / 12);
                        
                        const totalAmountInvested = initialInvestment + (depositPerStep * steps);
                        const totalInterest = item.valueEndOfYear - totalAmountInvested;

                        return (
                            <tr key={`${viewMode}-${steps}`}>
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
                        <td>{formatter.format(finalEndingBalance)}</td>
                        <td>—</td>
                        <td>{formatter.format(finalTotalInterest)}</td>
                        <td>{formatter.format(finalTotalInvested)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
