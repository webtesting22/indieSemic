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
        // Check if the value exceeds the max limit of 100
        if (value > 100) {
            message.error("Quantity cannot exceed 100!");
            return;
        }

        const newQuantities = { ...quantities, [productId]: value };
        setQuantities(newQuantities);

        // Save updated quantities in localStorage
        localStorage.setItem("cartQuantities", JSON.stringify(newQuantities));
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
        return getTotalWithDelivery() + getGSTAmount();
    };


    // Handle adding product to cart
    const handleAddProduct = (product) => {
        addToCart(product);
        message.success(`${product.title} added to cart!`);
    };

    // Determine if using mobile layout
    const isMobile = windowWidth < 768;




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
                    };

                    // Call your backend to save order after payment success
                    await saveFormDataToBackend(dataToSend);

                    setSavedData(null);
                    setInvoiceData(dataToSend);  // Save the data needed for invoice
                    setInvoiceModalVisible(true); // Open the invoice modal
                    // ...clear cart here

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
    const generateInvoicePDF = (data) => {
        if (!data) return;

        const doc = new jsPDF();

        // Colors
        const primaryColor = [63, 81, 181]; // Indigo
        const lightGray = [245, 245, 245];
        const darkGray = [64, 64, 64];

        // Company Header Section
        doc.setFontSize(20);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont(undefined, 'bold');
        doc.text("YOUR COMPANY", 20, 25);

        // Company Details
        doc.setFontSize(10);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.setFont(undefined, 'normal');
        doc.text("Your Company Pvt Ltd.", 20, 35);
        doc.text("A-1101, B-1101, The First", 20, 42);
        doc.text("Behind Business Park, Your City - 380015", 20, 49);
        doc.text("+91-9876543210", 20, 56);
        doc.text("sales@yourcompany.com", 20, 63);
        doc.text("GST: 24AAGCI8223E1ZT", 20, 70);

        // Invoice Title (Right Side)
        doc.setFontSize(24);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.setFont(undefined, 'bold');
        doc.text("SALES", 150, 25);
        doc.text("ORDER", 150, 35);

        // Order Number
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`WEB_SO# ${data.orderNumber || 'INV-' + Date.now()}`, 150, 50);

        // Horizontal line separator
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 80, 190, 80);

        // Bill To Section
        doc.setFontSize(12);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        doc.setFont(undefined, 'bold');
        doc.text("Bill To", 20, 95);

        // Customer Details
        doc.setFont(undefined, 'normal');
        const shipping = data.shipping || {};
        const customerName = `${shipping.firstName || ""} ${shipping.lastName || ""}`.trim();
        doc.text(customerName || "Customer Name", 20, 105);
        doc.text(shipping.company || "Company Name", 20, 112);
        doc.text(`${shipping.address1 || ""}, ${shipping.city || ""}`.trim(), 20, 119);
        doc.text(`${shipping.state || ""} - ${shipping.zipCode || ""}`.trim(), 20, 126);
        doc.text(`Mobile: ${shipping.mobile || ""}`, 20, 133);
        doc.text(`GSTIN: ${shipping.gstin || "XXXXXXXXXXXXXXX"}`, 20, 140);

        // Order Date and Expected Shipment (Right Side)
        const orderDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
        const expectedShipment = data.expectedShipment || new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');

        doc.text(`Order Date: ${orderDate}`, 120, 105);
        doc.text(`Expected Shipment: ${expectedShipment}`, 120, 115);

        // Table Header
        const tableStartY = 155;
        const tableHeaders = ['#', 'Item & Description', 'Qty', 'Rate', 'Amount'];
        const columnWidths = [15, 80, 20, 25, 30];
        const columnPositions = [20, 35, 115, 135, 160];

        // Draw table header background
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.rect(20, tableStartY - 5, 170, 12, 'F');

        // Draw table header border
        doc.setDrawColor(200, 200, 200);
        doc.rect(20, tableStartY - 5, 170, 12);

        // Table header text
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        tableHeaders.forEach((header, index) => {
            doc.text(header, columnPositions[index], tableStartY + 2);
        });

        // Table Content
        let currentY = tableStartY + 15;
        doc.setFont(undefined, 'normal');

        const products = data.products || [];
        let subtotal = 0;

        products.forEach((product, index) => {
            const itemTotal = (product.price || 0) * (product.quantity || 0);
            subtotal += itemTotal;

            // Draw row border
            doc.setDrawColor(230, 230, 230);
            doc.line(20, currentY + 8, 190, currentY + 8);

            // Row content
            doc.text(String(index + 1), columnPositions[0], currentY + 3);

            // Handle long product titles
            const productTitle = product.title || `Product ${index + 1}`;
            const splitTitle = doc.splitTextToSize(productTitle, columnWidths[1]);
            doc.text(splitTitle[0], columnPositions[1], currentY + 3);

            doc.text(String(product.quantity || 1), columnPositions[2] + 5, currentY + 3, { align: 'center' });
            doc.text(`₹${(product.price || 0).toFixed(2)}`, columnPositions[3] + 15, currentY + 3, { align: 'right' });
            doc.text(`₹${itemTotal.toFixed(2)}`, columnPositions[4] + 25, currentY + 3, { align: 'right' });

            currentY += 15;
        });

        // Add freight charges if present
        const freightCharges = data.freightCharges || 100;
        if (freightCharges > 0) {
            doc.line(20, currentY + 8, 190, currentY + 8);
            doc.text(String(products.length + 1), columnPositions[0], currentY + 3);
            doc.text("Freight Charges", columnPositions[1], currentY + 3);
            doc.text("1", columnPositions[2] + 5, currentY + 3, { align: 'center' });
            doc.text(`₹${freightCharges.toFixed(2)}`, columnPositions[3] + 15, currentY + 3, { align: 'right' });
            doc.text(`₹${freightCharges.toFixed(2)}`, columnPositions[4] + 25, currentY + 3, { align: 'right' });
            currentY += 15;
            subtotal += freightCharges;
        }

        // Final table border
        doc.setDrawColor(200, 200, 200);
        doc.rect(20, tableStartY - 5, 170, currentY - tableStartY + 8);

        // Totals Section
        const totalsStartY = currentY + 20;
        const gstRate = data.gstRate || 18;
        const gstAmount = (subtotal * gstRate) / 100;
        const totalAmount = subtotal + gstAmount;

        // Subtotal
        doc.setFont(undefined, 'normal');
        doc.text("Sub Total", 140, totalsStartY);
        doc.text(`₹${subtotal.toFixed(2)}`, 185, totalsStartY, { align: 'right' });

        // GST
        doc.text(`GST (${gstRate}%)`, 140, totalsStartY + 10);
        doc.text(`₹${gstAmount.toFixed(2)}`, 185, totalsStartY + 10, { align: 'right' });

        // Total line
        doc.line(140, totalsStartY + 18, 190, totalsStartY + 18);

        // Final Total
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.text("Total", 140, totalsStartY + 25);
        doc.text(`₹${totalAmount.toFixed(2)}`, 185, totalsStartY + 25, { align: 'right' });

        // Footer
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text("Thank you for your business!", 20, 270);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);

        // Save the PDF
        const fileName = `Invoice_${data.orderNumber || data._id || 'ORDER'}.pdf`;
        doc.save(fileName);
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
                open={invoiceModalVisible}  // changed visible => open
                onCancel={() => setInvoiceModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setInvoiceModalVisible(false)}>
                        Close
                    </Button>,
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
            </Modal>
        </>
    );
};

export default Cart;