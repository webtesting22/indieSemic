import React, { useContext, useState, useEffect } from "react";
import { Button, Drawer, Typography, Card, InputNumber, Divider, message, Modal } from "antd";
import ProductContext from "../Context/ProductContext";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MdDelete } from "react-icons/md";
import ProductPurchaseVerificationModal from "../ProductPage/ProductPurchesVerficationModal/ProductPurchaseVerification";
import jsPDF from "jspdf";
import ContactHome from "../../Components/ContactHome/ContactHome";

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, products } = useContext(ProductContext);
    const [open, setOpen] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savedData, setSavedData] = useState(null);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null); // To store invoice info for PDF
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);

    // Track screen width for responsive layout
    const [locationDetails, setLocationDetails] = useState("");
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const apibaseUrl = import.meta.env.VITE_BASE_URL;
    // Toggle drawer open and close
    const toggleDrawer = (open) => {
        setOpen(open);

        // If opening the drawer, find recommended products
        if (open && products?.length > 0) {
            findRecommendedProducts();
        }
    };
    useEffect(() => {
        if (locationDetails && locationDetails.distance) {
            // distance is a string like "464 km", extract number
            const distKm = parseFloat(locationDetails.distance.replace(/[^\d\.]/g, ''));

            if (distKm <= 400) {
                setDeliveryCharge(100);
            } else {
                setDeliveryCharge(200);
            }
        } else {
            setDeliveryCharge(0);
        }
    }, [locationDetails]);


    // Update window width when resized
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Load quantities from localStorage when the component mounts
    useEffect(() => {
        const storedQuantities = JSON.parse(localStorage.getItem("cartQuantities")) || {};
        setQuantities(storedQuantities);

        // Listen for quantity changes from product page
        const handleQuantityUpdate = (event) => {
            const { productId, quantity } = event.detail;
            setQuantities(prev => ({
                ...prev,
                [productId]: quantity
            }));
        };

        window.addEventListener('quantityUpdated', handleQuantityUpdate);
        return () => {
            window.removeEventListener('quantityUpdated', handleQuantityUpdate);
        };
    }, []);

    // Update recommended products when cart items change or drawer opens
    useEffect(() => {
        if (open && products?.length > 0) {
            findRecommendedProducts();
        }
    }, [cartItems, open, products]);

    // Find recommended products - includes similar products and other products
    const findRecommendedProducts = () => {
        if (!products || !products.length) return;

        // Extract categories from cart items
        const cartCategories = cartItems.map(item => item.category).filter(Boolean);

        // Get cart item IDs to exclude them from recommendations
        const cartItemIds = cartItems.map(item => item._id);

        // First, find products with the same categories that are not in the cart
        const similarProducts = products
            .filter(product =>
                !cartItemIds.includes(product._id) &&
                product.category &&
                cartCategories.includes(product.category)
            );

        // Then, add other products to fill the recommendations (if needed)
        const otherProducts = products
            .filter(product =>
                !cartItemIds.includes(product._id) &&
                !similarProducts.includes(product)
            );

        // Combine similar products with other products
        const allRecommendations = [...similarProducts];

        // If we need more products, add from other products
        if (allRecommendations.length < 8) {
            allRecommendations.push(...otherProducts.slice(0, 8 - allRecommendations.length));
        }

        setRecommendedProducts(allRecommendations);
    };

    // Handle quantity change for each item in the cart
    const handleQuantityChange = (productId, value) => {
        // Check if the value exceeds the max limit of 30
        if (value > 30) {
            message.error("Quantity cannot exceed 30!");
            return;
        }

        const newQuantities = { ...quantities, [productId]: value };
        setQuantities(newQuantities);

        // Save updated quantities in localStorage
        localStorage.setItem("cartQuantities", JSON.stringify(newQuantities));

        // Dispatch event for real-time update
        window.dispatchEvent(new CustomEvent('quantityUpdated', {
            detail: {
                productId: productId,
                quantity: value
            }
        }));
    };

    // Calculate total price based on selected quantities
    const getTotalPrice = () => {
        const baseTotal = cartItems.reduce((total, item) => {
            const quantity = quantities[item._id] || 1;
            return total + item.price * quantity;
        }, 0);

        return baseTotal;
    };
    const GST_RATE = 0.18; // 18% GST

    const getTotalWithDelivery = () => {
        return getTotalPrice() + deliveryCharge;
    };

    const getGSTAmount = () => {
        return getTotalWithDelivery() * GST_RATE;
    };

    const getGrandTotal = () => {
        return getTotalPrice()
        // getTotalWithDelivery() + getGSTAmount();
    };


    // Handle adding product to cart
    const handleAddProduct = (product) => {
        addToCart(product);
        message.success(`${product.title} added to cart!`);
    };

    // Determine if using mobile layout
    const isMobile = windowWidth < 768;

    // Add clearCart function
    const clearCart = () => {
        // Clear all items from cart
        cartItems.forEach(item => {
            removeFromCart(item._id);
        });
        // Clear quantities from localStorage
        localStorage.removeItem("cartQuantities");
        setQuantities({});
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            let grandTotal = getGrandTotal(); // e.g., 33.6
    
            // Round up to nearest integer if decimal exists
            grandTotal = Math.ceil(grandTotal); // 34
    
            // Prepare cart data for backend
            const cartData = cartItems.map(item => ({
                productId: item._id,
                title: item.title,
                price: item.price,
                quantity: quantities[item._id] || 1,
            }));
    
            // Call backend API to create Razorpay order with amount in paise
            const res = await fetch(`${apibaseUrl}/indieSemic/createPaymentOrder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: grandTotal, cartItems: cartData, user: { /* user info here */ } }),
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                console.error("Order creation failed:", data);
                throw new Error(data.error || "Order creation failed");
            }
    
            // Razorpay payment options
            const options = {
                key: "rzp_live_8k9UElnDJykyXX",
                amount: data.order.amount,
                currency: data.order.currency,
                name: "indieSemiC",
                description: "Order Payment",
                order_id: data.order.id,
                handler: async function (response) {
                    message.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
    
                    // Prepare data to send on payment success
                    const dataToSend = {
                        ...savedData,
                        products: cartItems.map(item => ({
                            productId: item._id,
                            title: item.title,
                            price: item.price,
                            quantity: quantities[item._id] || 1,
                            mainImages: item.mainImages || [],
                        })),
                        paymentId: response.razorpay_payment_id,
                        deliveryCharge: deliveryCharge,
                    };
    
                    // Call your backend to save order after payment success
                    await saveFormDataToBackend(dataToSend);
    
                    setSavedData(null);
                    setInvoiceData(dataToSend);
                    setInvoiceModalVisible(true);
                    
                    // Clear the cart after successful payment
                    clearCart();
                },
                theme: {
                    color: "#1890ff",
                },
                modal: {
                    ondismiss: function () {
                        message.info("Payment popup closed.");
                    },
                },
            };
    
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            message.error(error.message || "Something went wrong during payment");
        } finally {
            setLoading(false);
        }
    };
    

    const saveFormDataToBackend = async (formData) => {
        try {
            const response = await fetch(`${apibaseUrl}/indiesemic/addPurchaseVerificationData`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to save purchase verification data');
            }
            return responseData;
        } catch (error) {
            console.error('Error saving purchase verification data:', error);
            throw error;
        }
    };
    // const generateInvoicePDF = (data) => {
    //     if (!data) return;
    
    //     const doc = new jsPDF('p', 'mm', 'a4');  // Ensure A4 size
    
    //     // Brand Info (Company details)
    //     const brandInfo = {
    //         companyName: "IndieSemiC Private Limited",
    //         address: "C-201, 2nd Floor, The First, B/h Keshav Baugh Party Plot Nr. Shivalik High-Street, Vastrapur, Ahmedabad, Gujarat 380015.",
    //         phone: "+917600460240",
    //         email: "sales@indiesemic.com",
    //         gstin: "24AAGCI8223E1ZT"
    //     };
    
    //     // Colors
    //     const primaryColor = [63, 81, 181]; // Indigo
    //     const lightGray = [245, 245, 245];
    //     const darkGray = [64, 64, 64];
    
    //     // Company Header Section
    //     doc.setFontSize(20);
    //     doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    //     doc.setFont(undefined, 'bold');
    //     doc.text(brandInfo.companyName, 20, 25);
    
    //     // Company Details
    //     doc.setFontSize(10);
    //     doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    //     doc.setFont(undefined, 'normal');
    //     doc.text(brandInfo.address, 20, 35);
    //     doc.text(brandInfo.phone, 20, 42);
    //     doc.text(brandInfo.email, 20, 49);
    //     doc.text("GST: " + brandInfo.gstin, 20, 56);
    
    //     // Invoice Title (Right Side)
    //     doc.setFontSize(24);
    //     doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    //     doc.setFont(undefined, 'bold');
    //     doc.text("SALES", 150, 25);
    //     doc.text("ORDER", 150, 35);
    
    //     // Order Number
    //     doc.setFontSize(12);
    //     doc.setFont(undefined, 'normal');
    //     doc.text(`WEB_SO# ${data.orderNumber || 'INV-' + Date.now()}`, 150, 50);
    
    //     // Horizontal line separator
    //     doc.setDrawColor(200, 200, 200);
    //     doc.line(20, 80, 190, 80);
    
    //     // Bill To Section
    //     doc.setFontSize(12);
    //     doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    //     doc.setFont(undefined, 'bold');
    //     doc.text("Bill To", 20, 95);
    
    //     // Customer Details
    //     doc.setFont(undefined, 'normal');
    //     const shipping = data.shipping || {};
    //     const customerName = `${shipping.firstName || ""} ${shipping.lastName || ""}`.trim();
    //     doc.text(customerName || "Customer Name", 20, 105);
    //     doc.text(shipping.company || "Company Name", 20, 112);
    //     doc.text(`${shipping.address1 || ""}, ${shipping.city || ""}`.trim(), 20, 119);
    //     doc.text(`${shipping.state || ""} - ${shipping.zipCode || ""}`.trim(), 20, 126);
    //     doc.text(`Mobile: ${shipping.mobile || ""}`, 20, 133);
    //     doc.text(`GSTIN: ${shipping.gstin || "XXXXXXXXXXXXXXX"}`, 20, 140);
    
    //     // Order Date and Expected Shipment (Right Side)
    //     const orderDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
    //     const expectedShipment = data.expectedShipment || new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');
    
    //     doc.text(`Order Date: ${orderDate}`, 120, 105);
    //     doc.text(`Expected Shipment: ${expectedShipment}`, 120, 115);
    
    //     // Table Header
    //     const tableStartY = 155;
    //     const tableHeaders = ['#', 'Item & Description', 'Qty', 'Rate', 'Amount'];
    //     const columnWidths = [15, 80, 20, 25, 30];
    //     const columnPositions = [20, 35, 115, 135, 160];
    
    //     // Draw table header background
    //     doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    //     doc.rect(20, tableStartY - 5, 170, 12, 'F');
    
    //     // Draw table header border
    //     doc.setDrawColor(200, 200, 200);
    //     doc.rect(20, tableStartY - 5, 170, 12);
    
    //     // Table header text
    //     doc.setFontSize(10);
    //     doc.setFont(undefined, 'bold');
    //     doc.setTextColor(0, 0, 0);
    //     tableHeaders.forEach((header, index) => {
    //         doc.text(header, columnPositions[index], tableStartY + 2);
    //     });
    
    //     // Table Content
    //     let currentY = tableStartY + 15;
    //     doc.setFont(undefined, 'normal');
    
    //     const products = data.products || [];
    //     let subtotal = 0;
    
    //     products.forEach((product, index) => {
    //         const itemTotal = (product.price || 0) * (product.quantity || 0);
    //         subtotal += itemTotal;
    
    //         // Draw row border
    //         doc.setDrawColor(230, 230, 230);
    //         doc.line(20, currentY + 8, 190, currentY + 8);
    
    //         // Row content
    //         doc.text(String(index + 1), columnPositions[0], currentY + 3);
    
    //         // Handle long product titles
    //         const productTitle = product.title || `Product ${index + 1}`;
    //         const splitTitle = doc.splitTextToSize(productTitle, columnWidths[1]);
    //         doc.text(splitTitle[0], columnPositions[1], currentY + 3);
    
    //         doc.text(String(product.quantity || 1), columnPositions[2] + 5, currentY + 3, { align: 'center' });
    //         doc.text(`₹${(product.price || 0).toFixed(2)}`, columnPositions[3] + 15, currentY + 3, { align: 'right' });
    //         doc.text(`₹${itemTotal.toFixed(2)}`, columnPositions[4] + 25, currentY + 3, { align: 'right' });
    
    //         currentY += 15;
    //     });
    
    //     // Delivery Charges (Get value from invoiceData)
    //     const deliveryCharges = data.deliveryCharge || 100; // Use the value from invoiceData
    //     if (deliveryCharges > 0) {
    //         doc.line(20, currentY + 8, 190, currentY + 8);
    //         doc.text(String(products.length + 1), columnPositions[0], currentY + 3);
    //         doc.text("Delivery Charges", columnPositions[1], currentY + 3);
    //         doc.text("1", columnPositions[2] + 5, currentY + 3, { align: 'center' });
    //         doc.text(`₹${deliveryCharges.toFixed(2)}`, columnPositions[3] + 15, currentY + 3, { align: 'right' });
    //         doc.text(`₹${deliveryCharges.toFixed(2)}`, columnPositions[4] + 25, currentY + 3, { align: 'right' });
    //         currentY += 15;
    //         subtotal += deliveryCharges;
    //     }
    
    //     // Final table border
    //     doc.setDrawColor(200, 200, 200);
    //     doc.rect(20, tableStartY - 5, 170, currentY - tableStartY + 8);
    
    //     // Totals Section
    //     const totalsStartY = currentY + 20;
    //     const gstRate = data.gstRate || 18; // Example GST rate
    //     const gstAmount = (subtotal * gstRate) / 100;
    //     const totalAmount = subtotal + gstAmount;
    
    //     // Subtotal
    //     doc.setFont(undefined, 'normal');
    //     doc.text("Sub Total", 140, totalsStartY);
    //     doc.text(`₹${subtotal.toFixed(2)}`, 185, totalsStartY, { align: 'right' });
    
    //     // GST
    //     doc.text(`GST (${gstRate}%)`, 140, totalsStartY + 10);
    //     doc.text(`₹${gstAmount.toFixed(2)}`, 185, totalsStartY + 10, { align: 'right' });
    
    //     // Total line
    //     doc.line(140, totalsStartY + 18, 190, totalsStartY + 18);
    
    //     // Final Total
    //     doc.setFont(undefined, 'bold');
    //     doc.setFontSize(12);
    //     doc.text("Total", 140, totalsStartY + 25);
    //     doc.text(`₹${totalAmount.toFixed(2)}`, 185, totalsStartY + 25, { align: 'right' });
    
    //     // Footer
    //     doc.setFontSize(8);
    //     doc.setFont(undefined, 'normal');
    //     doc.setTextColor(100, 100, 100);
    //     doc.text("Thank you for your business!", 20, 270);
    //     doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);
    
    //     // Save the PDF
    //     const fileName = `Invoice_${data.orderNumber || data._id || 'ORDER'}.pdf`;
    //     doc.save(fileName);
    // };
    
    const generateInvoicePDF = (data) => {
        if (!data) return;
    
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
    
        // Invoice Title (Right side of header)
        doc.setFontSize(28);
        doc.setFont(undefined, 'bold');
        // doc.text("SALES ORDER", 120, 22);
    
        // Company Details Section (White background)
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 35, 210, 25, 'F');
    
        // Company contact details
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
        doc.rect(120, 40, 75, 15, 'F');
        doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        doc.rect(120, 40, 75, 15);
        
        doc.setFontSize(11);
        doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
        doc.setFont(undefined, 'bold');
        doc.text(`Order #: WEB_SO# ${data.orderNumber || 'INV-' + Date.now()}`, 125, 50);
    
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
        doc.text(`Payment: Pending`, 118, contentStartY + 36);
    
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
    
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(colors.mediumGray[0], colors.mediumGray[1], colors.mediumGray[2]);
        doc.text("Thank you for choosing IndieSemiC Private Limited!", 15, footerY + 2);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, footerY + 8);
        
        doc.setFont(undefined, 'italic');
        doc.text("This is a computer-generated document and does not require a signature.", 15, footerY + 12);
    
        // Page border
        doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277);
    
        // Save the PDF
        const fileName = `Sales_Order_${data.orderNumber || data._id || 'ORDER'}.pdf`;
        doc.save(fileName);
    };

    const showContactModal = () => {
        setIsContactModalVisible(true);
    };

    const handleContactModalCancel = () => {
        setIsContactModalVisible(false);
    };

    return (
        <>
            {/* Button to open cart drawer */}

            <Button
                id="OpenCartButton"
                type="primary"
                onClick={() => toggleDrawer(true)}
                style={{
                    marginBottom: "16px",
                    backgroundColor: "#1890ff",
                    borderColor: "#1890ff",
                    color: "#fff",
                    fontSize: "32px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    borderRadius: "50%"
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {cartItems.length > 0 ? (
                        <span style={{ fontSize: "14px" }}>{cartItems.length}</span>
                    ) : null}
                    <BsFillCartCheckFill />
                </div>
            </Button>

            {/* Drawer component */}

            <Drawer
                title={<Typography.Title level={4} style={{ marginBottom: "0px" }}>Cart</Typography.Title>}
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                width={isMobile ? "100%" : "70%"}
                style={{
                    backgroundColor: "#fff",
                    padding: isMobile ? "16px" : "24px 40px",
                    height: "100%",
                }}
            >
                <br />
                {cartItems.length > 0 ? (
                    <div>
                        {/* Cart items header - only shown on larger screens */}
                        {!isMobile && (
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "80px 4fr 1fr 1fr",
                                padding: "12px 0",
                                borderBottom: "1px solid #eaeaea",
                                marginBottom: "16px",
                                color: "#888"
                            }}>
                                <div style={{ textAlign: "center" }}>№</div>
                                <div>Product</div>
                                <div>Quantity</div>
                                <div>Price</div>
                            </div>
                        )}

                        {/* Cart Items */}
                        {cartItems.map((item, index) => (
                            <div
                                key={item._id}
                                style={isMobile ? {
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "16px 0",
                                    borderBottom: "1px solid #eaeaea"
                                } : {
                                    display: "grid",
                                    gridTemplateColumns: "80px 4fr 1fr 1fr",
                                    alignItems: "center",
                                    padding: "16px 0",
                                    borderBottom: "1px solid #eaeaea"
                                }}
                            >
                                {/* Mobile layout */}
                                {isMobile ? (
                                    <>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                                            <Typography.Text strong style={{ fontSize: "16px" }}>{item.title}</Typography.Text>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    fontSize: "18px",
                                                    color: "#888"
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>

                                        <div style={{ display: "flex", marginBottom: "12px" }}>
                                            <div style={{ width: "80px", height: "100px", marginRight: "15px" }}>
                                                <img
                                                    src={item.mainImages?.[0] || "default-image.jpg"}
                                                    alt={item.title}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
                                                    {item.description || "Item code"}
                                                </div>
                                                <Typography.Text strong>₹{item.price}</Typography.Text>
                                                {(quantities[item._id] || 1) > 1 && (
                                                    <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
                                                        ₹{item.price} × {quantities[item._id] || 1} = ₹{(item.price * (quantities[item._id] || 1)).toFixed(2)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8px" }}>
                                            <button
                                                onClick={() => handleQuantityChange(item._id, Math.max(1, (quantities[item._id] || 1) - 1))}
                                                style={{
                                                    border: "1px solid #eaeaea",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    fontSize: "16px",
                                                    padding: "0 12px",
                                                    height: "32px",
                                                    borderRadius: "4px"
                                                }}
                                            >
                                                —
                                            </button>
                                            <InputNumber
                                                min={1}
                                                max={100}
                                                value={quantities[item._id] || 1}
                                                onChange={(value) => handleQuantityChange(item._id, value)}
                                                style={{
                                                    width: "80px",
                                                    margin: "0 8px",
                                                    textAlign: "center"
                                                }}
                                                controls={false}
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(item._id, Math.min(100, (quantities[item._id] || 1) + 1))}
                                                style={{
                                                    border: "1px solid #eaeaea",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    fontSize: "16px",
                                                    padding: "0 12px",
                                                    height: "32px",
                                                    borderRadius: "4px"
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ textAlign: "center", fontSize: "14px" }}>
                                            <b> {String(index + 1).padStart(2, '0')}</b>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <div style={{ width: "80px", height: "100px", marginRight: "20px" }}>
                                                <img
                                                    src={item.mainImages?.[0] || "default-image.jpg"}
                                                    alt={item.title}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Typography.Text strong>{item.title}</Typography.Text>
                                                <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
                                                    {item.description || "Item code"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity */}
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <button
                                                onClick={() => handleQuantityChange(item._id, Math.max(1, (quantities[item._id] || 1) - 1))}
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    fontSize: "16px",
                                                    padding: "0 8px"
                                                }}
                                            >
                                                —
                                            </button>
                                            <InputNumber
                                                min={1}
                                                max={100}
                                                value={quantities[item._id] || 1}
                                                onChange={(value) => handleQuantityChange(item._id, value)}
                                                style={{
                                                    width: "40px",
                                                    margin: "0 4px",
                                                    border: "none",
                                                    padding: "0",
                                                    textAlign: "center"
                                                }}
                                                controls={false}
                                                bordered={false}
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(item._id, Math.min(100, (quantities[item._id] || 1) + 1))}
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    fontSize: "16px",
                                                    padding: "0 8px"
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div>
                                                <Typography.Text strong>₹{item.price}</Typography.Text>
                                                <div>
                                                    {(quantities[item._id] || 1) > 1 && (
                                                        <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
                                                            ₹{item.price} × {quantities[item._id] || 1} = ₹{(item.price * (quantities[item._id] || 1)).toFixed(2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    fontSize: "18px",
                                                    color: "#888",
                                                    marginLeft: "16px"
                                                }}
                                            >
                                                <MdDelete style={{ color: "Red" }} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}

                        {/* Totals */}
                        <div className="order-summary">
                            <div className="summary-row">
                                <span className="label">Original Total</span>
                                <span className="value">₹{getTotalPrice().toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span className="label">Delivery Charges</span>
                                <span className="value">₹{deliveryCharge.toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span className="label">GST (18%)</span>
                                <span className="value">₹{getGSTAmount().toFixed(2)}</span>
                            </div>

                            <div className="summary-row total-row">
                                <span className="label">Total Payable (Incl. GST)</span>
                                <span className="value">₹{getGrandTotal().toFixed(2)}</span>
                            </div>
                        </div>



                        {/* Action Buttons */}
                        <div style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            gap: isMobile ? "12px" : "10px",
                            marginTop: "32px"
                        }}>
                            <Button
                                onClick={() => toggleDrawer(false)}
                                style={{
                                    padding: "8px 16px",
                                    borderColor: "#888",
                                    color: "#000",
                                    margin: "0px",
                                    background: "transparent",
                                    width: isMobile ? "100%" : "auto"
                                }}
                            >
                                Continue shopping
                            </Button>

                            <ProductPurchaseVerificationModal
                                handlePayment={handlePayment}
                                cartItems={cartItems}
                                quantities={quantities}
                                loading={loading}
                                savedData={savedData}
                                setSavedData={setSavedData}
                                locationDetails={locationDetails}
                                setLocationDetails={setLocationDetails}
                            />

                            {/* <Button
                                type="primary"
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#000",
                                    borderColor: "#000",
                                    width: isMobile ? "100%" : "auto"
                                }}
                                onClick={handlePayment}
                                loading={loading}

                            >
                                Process order
                            </Button> */}
                        </div>

                        {/* Products Carousel */}
                        {recommendedProducts.length > 0 && (
                            <div style={{ marginTop: "64px" }}>
                                <Divider />
                                <Typography.Title level={4} style={{ marginBottom: "24px" }}>
                                    Products You Might Like
                                </Typography.Title>

                                {/* Swiper Carousel */}
                                <div style={{ position: "relative", padding: isMobile ? "0 15px" : "0 30px" }}>
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={10}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                            dynamicBullets: true,
                                        }}
                                        navigation={!isMobile}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        loop={true}
                                        breakpoints={{
                                            400: {
                                                slidesPerView: 1.5,
                                                spaceBetween: 10,
                                            },
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 15,
                                            },
                                            768: {
                                                slidesPerView: 2.5,
                                                spaceBetween: 20,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                                spaceBetween: 20,
                                            },
                                        }}
                                        style={{
                                            "--swiper-navigation-color": "#1890ff",
                                            "--swiper-pagination-color": "#1890ff",
                                        }}
                                    >
                                        {recommendedProducts.map(product => (
                                            <SwiperSlide key={product._id}>
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <div style={{ height: isMobile ? "150px" : "180px", overflow: "hidden" }}>
                                                            <img
                                                                alt={product.title}
                                                                src={product.mainImages?.[0] || "default-image.jpg"}
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                            />
                                                        </div>
                                                    }
                                                    bodyStyle={{ padding: isMobile ? "10px" : "16px", height: "auto" }}
                                                    style={{ height: "100%", margin: "10px 0" }}
                                                >
                                                    <Link to={`/product/${product._id}`} onClick={() => toggleDrawer(false)}>
                                                        <div style={{ marginBottom: "8px" }}>
                                                            <Typography.Text
                                                                ellipsis={{ tooltip: product.title }}
                                                                style={{ width: '100%', fontWeight: "500" }}
                                                            >
                                                                {product.title}
                                                            </Typography.Text>
                                                        </div>

                                                        {product.category && (
                                                            <div style={{ marginBottom: "8px", fontSize: "12px", color: "#888" }}>
                                                                {product.category}
                                                            </div>
                                                        )}

                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography.Text strong>₹{product.price}</Typography.Text>
                                                            <Button
                                                                type="primary"
                                                                size="small"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleAddProduct(product);
                                                                }}
                                                                style={{
                                                                    backgroundColor: "#1890ff",
                                                                    borderColor: "#1890ff",
                                                                    fontSize: "12px",
                                                                    padding: "0 8px",
                                                                    height: "24px"
                                                                }}
                                                            >
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </Link>
                                                </Card>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: isMobile ? "20px 0" : "40px 0" }}>
                        <Typography.Text style={{ fontSize: "16px" }}>Your cart is empty.</Typography.Text>
                        <div style={{ marginTop: "24px" }}>
                            <Button
                                onClick={() => toggleDrawer(false)}
                                style={{
                                    padding: "8px 16px",
                                    borderColor: "#888",
                                    color: "#000",
                                    background: "transparent",
                                    width: isMobile ? "100%" : "auto"
                                }}
                            >
                                Continue shopping
                            </Button>
                        </div>

                        {/* Show products carousel even when cart is empty */}
                        {recommendedProducts.length > 0 && (
                            <div style={{ marginTop: "64px" }}>
                                <Divider />
                                <Typography.Title level={4} style={{ marginBottom: "24px", textAlign: "left" }}>
                                    Explore Our Products
                                </Typography.Title>

                                {/* Swiper Carousel */}
                                <div style={{ position: "relative", padding: isMobile ? "0 15px" : "0 30px" }}>
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={10}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                            dynamicBullets: true,
                                        }}
                                        navigation={!isMobile}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        loop={true}
                                        breakpoints={{
                                            400: {
                                                slidesPerView: 1.5,
                                                spaceBetween: 10,
                                            },
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 15,
                                            },
                                            768: {
                                                slidesPerView: 2.5,
                                                spaceBetween: 20,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                                spaceBetween: 20,
                                            },
                                        }}
                                        style={{
                                            "--swiper-navigation-color": "#1890ff",
                                            "--swiper-pagination-color": "#1890ff",
                                        }}
                                    >
                                        {recommendedProducts.map(product => (
                                            <SwiperSlide key={product._id}>
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <div style={{ height: isMobile ? "150px" : "180px", overflow: "hidden" }}>
                                                            <img
                                                                alt={product.title}
                                                                src={product.mainImages?.[0] || "default-image.jpg"}
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                            />
                                                        </div>
                                                    }
                                                    bodyStyle={{ padding: isMobile ? "10px" : "16px", height: "auto" }}
                                                    style={{ height: "100%", margin: "10px 0" }}
                                                >
                                                    <Link to={`/product/${product._id}`} onClick={() => toggleDrawer(false)}>
                                                        <div style={{ marginBottom: "8px" }}>
                                                            <Typography.Text
                                                                ellipsis={{ tooltip: product.title }}
                                                                style={{ width: '100%', fontWeight: "500" }}
                                                            >
                                                                {product.title}
                                                            </Typography.Text>
                                                        </div>

                                                        {product.category && (
                                                            <div style={{ marginBottom: "8px", fontSize: "12px", color: "#888" }}>
                                                                {product.category}
                                                            </div>
                                                        )}

                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <Typography.Text strong>₹{product.price}</Typography.Text>
                                                            <Button
                                                                type="primary"
                                                                size="small"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleAddProduct(product);
                                                                }}
                                                                style={{
                                                                    backgroundColor: "#1890ff",
                                                                    borderColor: "#1890ff",
                                                                    fontSize: "12px",
                                                                    padding: "0 8px",
                                                                    height: "24px"
                                                                }}
                                                            >
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </Link>
                                                </Card>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Drawer>
            <Modal
                title="Payment Successful!"
                open={invoiceModalVisible}
                onCancel={() => setInvoiceModalVisible(false)}
                maskClosable={false}
                footer={[
                    // <Button key="close" onClick={() => setInvoiceModalVisible(false)}>
                    //     Close
                    // </Button>,
                    <Button
                        key="download"
                        type="primary"
                        onClick={() => generateInvoicePDF(invoiceData)}
                        disabled={!invoiceData}
                    >
                        Download Invoice
                    </Button>,
                ]}
            >
                <Typography.Paragraph>
                    Your payment was successful. You can download your invoice here.
                </Typography.Paragraph>

                {/* Invoice Details */}
                <div>
                    <Typography.Text strong>Products:</Typography.Text>
                    <div>
                        {cartItems.map((item, index) => (
                            <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography.Text>{item.title}</Typography.Text>
                                <Typography.Text>
                                    ₹{item.price} x {quantities[item._id] || 1}
                                </Typography.Text>
                                <Typography.Text>
                                    ₹{(item.price * (quantities[item._id] || 1)).toFixed(2)}
                                </Typography.Text>
                            </div>
                        ))}
                    </div>

                    <Divider />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography.Text strong>Total Price</Typography.Text>
                        <Typography.Text>₹{getTotalPrice().toFixed(2)}</Typography.Text>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography.Text strong>Delivery Charges</Typography.Text>
                        <Typography.Text>₹{deliveryCharge.toFixed(2)}</Typography.Text>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography.Text strong>GST (18%)</Typography.Text>
                        <Typography.Text>₹{getGSTAmount().toFixed(2)}</Typography.Text>
                    </div>

                    <Divider />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography.Text strong>Grand Total</Typography.Text>
                        <Typography.Text>
                            ₹{getGrandTotal().toFixed(2)}
                        </Typography.Text>
                    </div>
                </div>
            </Modal>

            {/* Add Contact Modal */}
            <Modal
                title="Contact Us"
                open={isContactModalVisible}
                onCancel={handleContactModalCancel}
                footer={null}
                width={1000}
                style={{ top: 20 }}
            >
                <ContactHome />
            </Modal>

        </>
    );
};

export default Cart;