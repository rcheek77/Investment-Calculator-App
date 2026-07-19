import jsPDF from 'jspdf';

export function generatepdf(data) {
    const doc = new jsPDF();
    const isYearly = data.viewMode !== 'monthly'; // Defaults to yearly if undefined

    // Render Document Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(33, 37, 41);
    doc.text('RSC INVESTMENT CALCULATOR', 14, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(108, 117, 125);
    doc.text(`${isYearly ? 'Yearly' : 'Monthly'} Investment Performance Report`, 14, 28);
    
    // Draw visual accent line
    doc.setDrawColor(222, 226, 230);
    doc.line(14, 33, 196, 33);

    // Render Parameter Summary Block
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(33, 37, 41);
    doc.text('Configuration Parameters', 14, 43);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Initial Investment: GBP ${Number(data.begInvestment).toLocaleString()}`, 14, 51);
    doc.text(`Annual Contribution: GBP ${Number(data.annInvestment).toLocaleString()}`, 14, 58);
    doc.text(`Expected Rate of Return: ${data.returnInvestment}%`, 110, 51);
    doc.text(`Investment Horizon: ${data.yearlyInvestment} Years`, 110, 58);

    // Draw visual divider line
    doc.line(14, 66, 196, 66);

    // Setup Dynamic Grid Layout Headers
    const headers = [
        isYearly ? 'Year' : 'Month', 
        'Investment Value', 
        `Interest (${isYearly ? 'Annual' : 'Monthly'})`, 
        'Total Interest Accum.', 
        'Total Invested'
    ];
    
    const columnWidths = [20, 42, 40, 42, 38]; 
    const startX = 14;
    let yOffset = 76;

    // Render Table Header Row Background
    doc.setFillColor(248, 249, 250);
    doc.rect(startX, yOffset - 5, 182, 7, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(73, 80, 87);

    let currentX = startX;
    headers.forEach((header, idx) => {
        doc.text(header, currentX, yOffset);
        currentX += columnWidths[idx];
    });

    yOffset += 8;
    
    // Calculate Accumulations and Render Grid Rows
    let accumulatedInterest = 0;
    const initialInvestment = Number(data.begInvestment);
    const investmentRows = data.result || [];
    const pageHeight = doc.internal.pageSize.height;

    investmentRows.forEach((rowItem) => {
        // Safe check for page overflows (leaves 15mm bottom safety boundary)
        if (yOffset > pageHeight - 15) {
            doc.addPage();
            yOffset = 20; 
            
            // Re-render sub-page headers for better readability on multi-page files
            doc.setFillColor(248, 249, 250);
            doc.rect(startX, yOffset - 5, 182, 7, 'F');
            doc.setFont("helvetica", "bold");
            doc.setTextColor(73, 80, 87);
            let subX = startX;
            headers.forEach((header, idx) => {
                doc.text(header, subX, yOffset);
                subX += columnWidths[idx];
            });
            yOffset += 8;
        }

        // Keep a rolling tally of cumulative interest
        accumulatedInterest += rowItem.interest;

        // Dynamically map steps and labels based on view mode keys
        const stepNumber = isYearly ? rowItem.year : rowItem.month;
        const rowLabel = isYearly ? `Year ${rowItem.year}` : `Month ${rowItem.month}`;
        
        const depositPerStep = isYearly ? Number(data.annInvestment) : (Number(data.annInvestment) / 12);
        const totalAmountInvested = initialInvestment + (depositPerStep * stepNumber);

        // Calculate actual mathematical total interest cleanly per row item rather than relying on loose stacking arrays
        const cleanTotalInterest = rowItem.valueEndOfYear - totalAmountInvested;

        // Format data cells cleanly
        const rowData = [
            rowLabel,
            `GBP ${Math.round(rowItem.valueEndOfYear).toLocaleString()}`,
            `GBP ${Math.round(rowItem.interest).toLocaleString()}`,
            `GBP ${Math.round(cleanTotalInterest).toLocaleString()}`,
            `GBP ${Math.round(totalAmountInvested).toLocaleString()}`
        ];

        // Draw light horizontal divider line
        doc.setDrawColor(241, 243, 245);
        doc.line(startX, yOffset + 2, 196, yOffset + 2);

        // Render cell text strings
        doc.setFont("helvetica", "normal");
        doc.setTextColor(33, 37, 41);
        
        let rowX = startX;
        rowData.forEach((cellText, idx) => {
            doc.text(cellText, rowX, yOffset);
            rowX += columnWidths[idx];
        });

        yOffset += 8;
    });

    // Fire system print download dialogue
    const reportFilename = isYearly ? 'Yearly_Investment_Report.pdf' : 'Monthly_Investment_Report.pdf';
    doc.save(reportFilename);
}
