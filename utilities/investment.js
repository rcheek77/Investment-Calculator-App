export const formatter = new Intl.NumberFormat('en-GB', {     // built in browser tool
    style: 'currency',     
    currency: 'GBP',     
    minimumFractionDigits: 2,     
    maximumFractionDigits: 2 
});  

export function calculateInvestmentResults({     
    begInvestment,     
    annInvestment,     
    returnInvestment,     
    yearlyInvestment 
}) {     

    // calculate monthly results
    const monthlyData = calculateMonthlyInvestmentResults({
        begInvestment,
        annInvestment,
        returnInvestment,
        yearlyInvestment
    });

    const annualData = [];     
    
    // Group every 12 months together into a yearly summary
    for (let i = 0; i < yearlyInvestment; i++) {
        const startMonthIndex = i * 12;
        const endMonthIndex = startMonthIndex + 11;
        
        // Slice the 12 months for the current year
        const monthsInYear = monthlyData.slice(startMonthIndex, endMonthIndex + 1);
        
        // Sum up the interest earned across those 12 months
        const interestEarnedInYear = monthsInYear.reduce((sum, m) => sum + m.interest, 0);  // Sums up the individual interest values from all 12 sliced months into a single yearly total
        // Get the final balance at the very end of this year (Month 12, 24, 36, etc.)
        const valueEndOfYear = monthsInYear[11].valueEndOfYear;         // Grabs the final balance from the 12th month (index 11) of the current year's slice.

        annualData.push({                       // Stores the structured year summary object into the array.
            year: i + 1,             
            interest: interestEarnedInYear,             
            valueEndOfYear: valueEndOfYear,             
            annInvestment: annInvestment         
        });     
    }     
    return annualData; 
}  

export function calculateMonthlyInvestmentResults({     
    begInvestment,     
    annInvestment,     
    returnInvestment,     
    yearlyInvestment 
}) {     
    const monthlyData = [];     
    let currentValue = begInvestment;      

    const monthlyRateDecimal = (returnInvestment / 100) / 12;
    const monthlyInvestmentDeposit = annInvestment / 12;      
    const totalMonths = yearlyInvestment * 12;

    for (let month = 1; month <= totalMonths; month++) {         
        const monthlyInterestGain = currentValue * monthlyRateDecimal;                  
        currentValue += monthlyInterestGain + monthlyInvestmentDeposit;              

        monthlyData.push({             
            month: month,             
            interest: monthlyInterestGain,             
            valueEndOfYear: currentValue         
        });     
    }     
    return monthlyData; 
}
