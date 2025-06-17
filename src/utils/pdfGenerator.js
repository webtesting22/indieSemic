import jsPDF from 'jspdf';

export const generateInvoicePDF = (data, preview = false) => {
    if (!data) return;

    // Use orderId from backend data
    const formattedOrderNumber = data.orderId || `Order ID: ${data._id || 'N/A'}`;
    
    // Console log the dynamic order ID
    console.log('Dynamic Order ID from backend:', data.orderId);
    console.log('Formatted Order Number for PDF:', formattedOrderNumber);

    const doc = new jsPDF('p', 'mm', 'a4');

    // Brand Info (Company details)
    const brandInfo = {
        companyName: "IndieSemiC Private Limited",
        address: "C-201, 2nd Floor, The First, B/h Keshav Baugh Party Plot Nr. Shivalik High-Street, Vastrapur, Ahmedabad, Gujarat 380015.",
        phone: "+917600460240",
        email: "sales@indiesemic.com",
        gstin: "24AAGCI8223E1ZT"
    };

    // Professional Color Scheme
    const colors = {
        primary: [41, 84, 144],      // Professional blue
        secondary: [52, 73, 94],     // Dark slate
        accent: [231, 76, 60],       // Professional red
        lightGray: [248, 249, 250],  // Very light gray
        mediumGray: [108, 117, 125], // Medium gray
        darkGray: [33, 37, 41],      // Dark gray
        border: [222, 226, 230],     // Light border
        success: [40, 167, 69]       // Green for totals
    };

    // Header Background
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, 0, 210, 35, 'F');

    // Company Name (White on blue background)
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text(brandInfo.companyName, 15, 22);

    // Company Details Section (White background)
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 35, 210, 25, 'F');

    // Company contact details with visual bullets
    doc.setFontSize(9);
    doc.setTextColor(colors.mediumGray[0], colors.mediumGray[1], colors.mediumGray[2]);
    doc.setFont(undefined, 'normal');

    // Split address for better formatting
    const addressLines = doc.splitTextToSize(brandInfo.address, 85);
    let yPos = 42;
    addressLines.forEach(line => {
        doc.text(line, 15, yPos);
        yPos += 4;
    });

    // Add simple bullets for contact info
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.circle(12, yPos - 1, 0.8, 'F');
    doc.text(`Phone: ${brandInfo.phone}`, 15, yPos);

    doc.circle(12, yPos + 3, 0.8, 'F');
    doc.text(`Email: ${brandInfo.email}`, 15, yPos + 4);

    doc.circle(12, yPos + 7, 0.8, 'F');
    doc.text(`GST: ${brandInfo.gstin}`, 15, yPos + 8);

    // Order Number Box (Right side)
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.rect(120, 40, 75, 22, 'F');
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.rect(120, 40, 75, 22);

    const boxCenterX = 120 + 75 / 2;
    const boxTopY = 40;

    // 'Sales Order' heading (big, bold, centered in the box)
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
    doc.text("Sales Order", boxCenterX, boxTopY + 10, { align: 'center' });

    // Order ID (smaller, bold, centered below)
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(formattedOrderNumber, boxCenterX, boxTopY + 17, { align: 'center' });

    // Main Content Area
    const contentStartY = 70;

    // Bill To Section with enhanced styling
    doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.rect(15, contentStartY, 95, 8, 'F');
    // Add small decorative elements
    doc.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    doc.circle(12, contentStartY + 3, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("BILL TO", 18, contentStartY + 5.5);

    // Order Info Section
    doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.rect(115, contentStartY, 80, 8, 'F');
    doc.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    doc.circle(112, contentStartY + 3, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("ORDER DETAILS", 118, contentStartY + 5.5);

    // Customer Details Box
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.rect(15, contentStartY + 8, 95, 35, 'F');
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.rect(15, contentStartY + 8, 95, 35);

    // Customer information with visual enhancements
    const shipping = data.shipping || {};
    const customerName = `${shipping.firstName || ""} ${shipping.lastName || ""}`.trim();

    doc.setFontSize(11);
    doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
    doc.setFont(undefined, 'bold');
    doc.text(customerName || "Customer Name", 18, contentStartY + 15);

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.text(shipping.company || "Company Name", 18, contentStartY + 20);
    doc.text(`${shipping.address1 || ""}, ${shipping.city || ""}`.trim(), 18, contentStartY + 25);
    doc.text(`${shipping.state || ""} - ${shipping.zipCode || ""}`.trim(), 18, contentStartY + 30);

    // Add small bullets for contact details
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.circle(16, contentStartY + 33.5, 0.6, 'F');
    doc.text(`Mobile: ${shipping.mobile || "N/A"}`, 18, contentStartY + 35);

    doc.circle(16, contentStartY + 38.5, 0.6, 'F');
    doc.text(`GSTIN: ${shipping.gstin || "XXXXXXXXXXXXXXX"}`, 18, contentStartY + 40);

    // Order Details Box
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.rect(115, contentStartY + 8, 80, 35, 'F');
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.rect(115, contentStartY + 8, 80, 35);

    const orderDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
    const expectedShipment = data.expectedShipment || new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');

    doc.setFontSize(9);
    doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
    doc.text(`Order Date: ${orderDate}`, 118, contentStartY + 15);
    doc.text(`Expected Shipment: ${expectedShipment}`, 118, contentStartY + 22);
    doc.text(`Status: Processing`, 118, contentStartY + 29);
    doc.text(`Payment: Completed`, 118, contentStartY + 36);

    // Items Table
    const tableStartY = contentStartY + 55;
    const tableHeaders = ['Sr.No', 'Item & Description', 'Qty', 'Rate', 'Amount'];
    const columnWidths = [12, 85, 18, 25, 30];
    const columnPositions = [15, 27, 112, 130, 155];

    // Table header with gradient effect
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(15, tableStartY, 180, 10, 'F');

    // Header text
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    tableHeaders.forEach((header, index) => {
        if (index === 0) {
            doc.text(header, columnPositions[index] + 4, tableStartY + 6.5, { align: 'center' });
        } else if (index >= 2) {
            doc.text(header, columnPositions[index] + (columnWidths[index] / 2), tableStartY + 6.5, { align: 'center' });
        } else {
            doc.text(header, columnPositions[index] + 2, tableStartY + 6.5);
        }
    });

    // Table Content
    let currentY = tableStartY + 10;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);

    const products = data.products || [];
    let subtotal = 0;

    products.forEach((product, index) => {
        const itemTotal = (product.price || 0) * (product.quantity || 0);
        subtotal += itemTotal;

        // Alternating row colors
        if (index % 2 === 0) {
            doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
            doc.rect(15, currentY, 180, 12, 'F');
        }

        // Row border
        doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        doc.line(15, currentY + 12, 195, currentY + 12);

        // Row content
        doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
        doc.text(String(index + 1), columnPositions[0] + 6, currentY + 7.5, { align: 'center' });

        // Product title with better formatting
        const productTitle = product.title || `Product ${index + 1}`;
        const splitTitle = doc.splitTextToSize(productTitle, columnWidths[1] - 4);
        doc.text(splitTitle[0], columnPositions[1] + 2, currentY + 7.5);

        doc.text(String(product.quantity || 1), columnPositions[2] + (columnWidths[2] / 2), currentY + 7.5, { align: 'center' });
        doc.text(`${(product.price || 0).toFixed(2)}`, columnPositions[3] + columnWidths[3] - 2, currentY + 7.5, { align: 'right' });
        doc.text(`${itemTotal.toFixed(2)}`, columnPositions[4] + columnWidths[4] - 2, currentY + 7.5, { align: 'right' });

        currentY += 12;
    });

    // Delivery Charges
    const deliveryCharges = data.deliveryCharge || 100;
    if (deliveryCharges > 0) {
        if (products.length % 2 === 0) {
            doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
            doc.rect(15, currentY, 180, 12, 'F');
        }

        doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        doc.line(15, currentY + 12, 195, currentY + 12);

        doc.text(String(products.length + 1), columnPositions[0] + 6, currentY + 7.5, { align: 'center' });
        doc.text("Delivery Charges", columnPositions[1] + 2, currentY + 7.5);
        doc.text("1", columnPositions[2] + (columnWidths[2] / 2), currentY + 7.5, { align: 'center' });
        doc.text(`${deliveryCharges.toFixed(2)}`, columnPositions[3] + columnWidths[3] - 2, currentY + 7.5, { align: 'right' });
        doc.text(`${deliveryCharges.toFixed(2)}`, columnPositions[4] + columnWidths[4] - 2, currentY + 7.5, { align: 'right' });
        currentY += 12;
        subtotal += deliveryCharges;
    }

    // Table border
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(1);
    doc.rect(15, tableStartY, 180, currentY - tableStartY);

    // Totals Section with enhanced styling
    const totalsStartY = currentY + 15;
    const gstRate = data.gstRate || 18;
    const gstAmount = (subtotal * gstRate) / 100;
    const totalAmount = subtotal + gstAmount;

    // Totals box
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.rect(130, totalsStartY - 5, 65, 35, 'F');
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.rect(130, totalsStartY - 5, 65, 35);

    // Subtotal
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
    doc.text("Subtotal:", 135, totalsStartY + 3);
    doc.text(`${subtotal.toFixed(2)}`, 190, totalsStartY + 3, { align: 'right' });

    // GST
    doc.text(`GST (${gstRate}%):`, 135, totalsStartY + 10);
    doc.text(`${gstAmount.toFixed(2)}`, 190, totalsStartY + 10, { align: 'right' });

    // Total line
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.5);
    doc.line(135, totalsStartY + 15, 190, totalsStartY + 15);

    // Final Total with emphasis
    doc.setFillColor(colors.success[0], colors.success[1], colors.success[2]);
    doc.rect(130, totalsStartY + 17, 65, 10, 'F');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("TOTAL:", 135, totalsStartY + 24);
    doc.text(`${totalAmount.toFixed(2)}`, 190, totalsStartY + 24, { align: 'right' });

    // Professional Footer
    const footerY = 270;
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.rect(0, footerY - 5, 210, 20, 'F');

    const pageWidth = 210; // A4 width in mm
    const centerX = pageWidth / 2;
    doc.setTextColor(colors.mediumGray[0], colors.mediumGray[1], colors.mediumGray[2]);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text("Thank you for choosing IndieSemiC Private Limited!", 15, footerY + 2);
    doc.setFontSize(8);
    doc.setFont(undefined, 'italic');
    doc.text("For questions concerning this order, please contact.", 15, footerY + 7);
    doc.setFont(undefined, 'normal');
    doc.text("+91-7600460240", 15, footerY + 11);
    doc.text("sales@indiesemic.com", 15, footerY + 15);

    // Page border
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // Return blob URL for preview or save for download
    if (preview) {
        const pdfBlob = doc.output('blob');
        return URL.createObjectURL(pdfBlob);
    } else {
        // Save the PDF for download
        const fileName = `Sales_Order_${data.orderId || data._id || 'ORDER'}.pdf`;
        doc.save(fileName);
    }
}; 