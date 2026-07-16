import jsPDF from 'jspdf';

export function generatepdf(data) {
    const doc = new jsPDF();

    // Summary metadata
    doc.setFontSize(20);
    doc.text('Investment Report', 10, 20);

    doc.setFontSize(12);
    doc.text(`Initial Investment: £${data.begInvestment}`, 10, 35);
    doc.text(`Annual Amount Invested: £${data.annInvestment}`, 10, 45);
    doc.text(`Return on Investments: ${data.returnInvestment}%`, 10, 55);
    doc.text(`Years of Investments: ${data.yearlyInvestment}`, 10, 65);

    let yOffset = 85;
    const pageHeight = doc.internal.pageSize.height;
    const investmentRows = data.result || []; 

    investmentRows.forEach((yearData) => {
        if (yOffset > pageHeight - 20) {
            doc.addPage();
            yOffset = 20;
        }

        // Pulls directly from the keys added to investment.js
        const dataString = `Year ${yearData.year}: Value: £${Math.round(yearData.valueEndOfYear)} | Int: £${Math.round(yearData.interest)} | Total Int: £${Math.round(yearData.totalInterest)}`;
        
        doc.text(dataString, 10, yOffset);
        yOffset += 8;
    });

    // Tells jsPDF to trigger the file download dialog in the browser
    doc.save('Investment_Report.pdf');
}
