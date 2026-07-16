export const formatter = new Intl.NumberFormat('en-GB', {     // built in browser tool
    style: 'currency',     
    currency: 'GBP',     
    minimumFractionDigits: 2,     
    maximumFractionDigits: 2 
});  

//Declares and exports a function that accepts an object with four arguments: starting balance, annual investment, return rate, and total years.
export function calculateInvestmentResults({     
    begInvestment,     
    annInvestment,     
    returnInvestment,     
    yearlyInvestment 
}) {     

    // calculate monthly results
    // Calls the second function to generate a detailed list of investment growth month-by-month and saves it to monthlyData
    const monthlyData = calculateMonthlyInvestmentResults({
        begInvestment,
        annInvestment,
        returnInvestment,
        yearlyInvestment
    });

    const annualData = [];     // Creates an empty array to store the final year-by-year summaries
    
    // Group every 12 months together into a yearly summary
    for (let i = 0; i < yearlyInvestment; i++) {    // loop that runs once for every year of the investment period
        const startMonthIndex = i * 12;     // Calculates the starting array position for the current year 
        const endMonthIndex = startMonthIndex + 11; // Calculates the ending array position for the current year 
        
        // Slice the 12 months for the current year
        const monthsInYear = monthlyData.slice(startMonthIndex, endMonthIndex + 1); // Extracts exactly 12 months of data for the current year out of the main monthly list
        
        // Sum up the interest earned across those 12 months
        const interestEarnedInYear = monthsInYear.reduce((sum, m) => sum + m.interest, 0);  // Sums up the individual interest values from all 12 sliced months into a single yearly total
        // Get the final balance at the very end of this year (Month 12, 24, 36, etc.)
        const valueEndOfYear = monthsInYear[11].valueEndOfYear;         // Grabs the final balance from the 12th month (index 11) of the current year's slice.

        annualData.push({                       // Stores the structured year summary object into the array
            year: i + 1,                        // Sets the current year number
            interest: interestEarnedInYear,     // Stores the total interest calculated for this year  
            valueEndOfYear: valueEndOfYear,     // Stores the final closing balance for this year        
            annInvestment: annInvestment        // Stores the amount of money the user deposited during this year
        });     
    }     
    return annualData; 
}  

// Declares and exports the helper function using the same four input parameters
export function calculateMonthlyInvestmentResults({     
    begInvestment,     
    annInvestment,     
    returnInvestment,     
    yearlyInvestment 
}) {        
    const monthlyData = [];             // Create an empty array to hold the financial metrics for every single month
    let currentValue = begInvestment;   // Sets the running total balance to start with the initial investment amount  

    const monthlyRateDecimal = (returnInvestment / 100) / 12;   // Converts the percentage rate to a decimal (e.g., 5% becomes 0.05) and divides by 12 to get the monthly interest rate
    const monthlyInvestmentDeposit = annInvestment / 12;        // Divides the annual contribution by 12 to find out how much money is added each month
    const totalMonths = yearlyInvestment * 12;                  // Multiplies the total number of years by 12 to get the total number of months for the loop

    for (let month = 1; month <= totalMonths; month++) {                // loop that runs sequentially for every month, starting at month 1 up to the total months
        const monthlyInterestGain = currentValue * monthlyRateDecimal;  // Calculates the interest earned for the current month based on the current balance                
        currentValue += monthlyInterestGain + monthlyInvestmentDeposit; // Updates the running balance by adding the new interest and the monthly deposit to it             

        monthlyData.push({             
            month: month,                   // store the current month number
            interest: monthlyInterestGain,  // store the interest earned during the month           
            valueEndOfYear: currentValue    // store the total balance at the end of the month     
        });     
    }     
    return monthlyData; 
}
