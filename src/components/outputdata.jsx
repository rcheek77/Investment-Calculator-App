import { formatter } from "../utilities/investment.js"

// Accept the pre-calculated results directly as a prop
export function OutputData({ calculationResults }) {
   
    if (!calculationResults || calculationResults.length === 0) {
        return <p className="center">No calculation data available.</p>
    }
   
    return (
        <table id="results">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Annual)</th>
                    <th>Total Interest</th>
                    <th>Total Amount Invested</th>
                </tr>
            </thead>
            <tbody>
                {calculationResults.map((yeardata) => (
                    <tr key={yeardata.year}>
                        <td>{yeardata.year}</td>
                        <td>{formatter.format(yeardata.valueEndOfYear)}</td>
                        <td>{formatter.format(yeardata.interest)}</td>
                        <td>{formatter.format(yeardata.totalInterest)}</td>
                        <td>{formatter.format(yeardata.totalAmountInvested)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
