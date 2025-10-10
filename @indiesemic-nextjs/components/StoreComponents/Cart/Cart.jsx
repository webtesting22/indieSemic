"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Button,
  Drawer,
  Typography,
  Card,
  InputNumber,
  Divider,
  message,
  Modal,
  Tag,
} from "antd";
import ProductContext from "../Context/ProductContext";
import { BsFillCartCheckFill } from "react-icons/bs";
import Link from "next/link";
// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MdDelete } from "react-icons/md";
import ProductPurchaseVerificationModal from "../ProductPage/ProductPurchesVerficationModal/ProductPurchaseVerification";
import { generateInvoicePDF } from "../../../utils/pdfGenerator";
import ContactHome from "../../ContactHome/ContactHome";
// import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, products } =
    useContext(ProductContext);
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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
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
      const distKm = parseFloat(
        locationDetails.distance.replace(/[^\d\.]/g, "")
      );

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

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Load quantities from localStorage when the component mounts
  useEffect(() => {
    const storedQuantities =
      JSON.parse(localStorage.getItem("cartQuantities")) || {};
    setQuantities(storedQuantities);

    // Listen for quantity changes from product page
    const handleQuantityUpdate = (event) => {
      const { productId, quantity } = event.detail;
      setQuantities((prev) => ({
        ...prev,
        [productId]: quantity,
      }));
    };

    window.addEventListener("quantityUpdated", handleQuantityUpdate);
    return () => {
      window.removeEventListener("quantityUpdated", handleQuantityUpdate);
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
    const cartCategories = cartItems
      .map((item) => item.category)
      .filter(Boolean);

    // Get cart item IDs to exclude them from recommendations
    const cartItemIds = cartItems.map((item) => item._id);

    // First, find products with the same categories that are not in the cart
    const similarProducts = products.filter(
      (product) =>
        !cartItemIds.includes(product._id) &&
        product.category &&
        cartCategories.includes(product.category)
    );

    // Then, add other products to fill the recommendations (if needed)
    const otherProducts = products.filter(
      (product) =>
        !cartItemIds.includes(product._id) && !similarProducts.includes(product)
    );

    // Combine similar products with other products
    const allRecommendations = [...similarProducts];

    // If we need more products, add from other products
    if (allRecommendations.length < 8) {
      allRecommendations.push(
        ...otherProducts.slice(0, 8 - allRecommendations.length)
      );
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
    window.dispatchEvent(
      new CustomEvent("quantityUpdated", {
        detail: {
          productId: productId,
          quantity: value,
        },
      })
    );
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

  // Add clearCart function
  const clearCart = () => {
    // Clear all items from cart
    cartItems.forEach((item) => {
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
      const cartData = cartItems.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: quantities[item._id] || 1,
      }));

      // Call backend API to create Razorpay order with amount in paise
      const res = await fetch(`${apibaseUrl}/indieSemic/createPaymentOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          cartItems: cartData,
          user: {
            /* user info here */
          },
        }),
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
          message.success(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );

          // Prepare data to send on payment success
          const dataToSend = {
            ...savedData,
            shipping: {
              firstName:
                savedData.shipping_firstName || savedData.firstName || "",
              lastName: savedData.shipping_lastName || savedData.lastName || "",
              company: savedData.shipping_company || savedData.company || "",
              address1: savedData.shipping_address1 || savedData.address1 || "",
              city: savedData.shipping_city || savedData.city || "",
              state: savedData.shipping_state || savedData.state || "",
              zipCode: savedData.shipping_zipCode || savedData.zipCode || "",
              mobile: savedData.shipping_mobile || savedData.mobile || "",
              gstin: savedData.shipping_gstin || savedData.gstin || "",
              email: savedData.shipping_email || savedData.email || "",
            },
            products: cartItems.map((item) => ({
              productId: item._id,
              title: item.title,
              price: item.price,
              quantity: quantities[item._id] || 1,
              mainImages: item.mainImages || [],
            })),
            paymentId: response.razorpay_payment_id,
            deliveryCharge: deliveryCharge,
          };

          // Prepare orderDetails and productDetails for the email API
          const orderDetails = {
            _id:
              dataToSend._id || dataToSend.orderNumber || "ORDER" + Date.now(),
            shipping: {
              firstName: dataToSend.shipping?.firstName || "",
              lastName: dataToSend.shipping?.lastName || "",
              mobile: dataToSend.shipping?.mobile || "",
              address1: dataToSend.shipping?.address1 || "",
              city: dataToSend.shipping?.city || "",
              state: dataToSend.shipping?.state || "",
              postalCode:
                dataToSend.shipping?.zipCode ||
                dataToSend.shipping?.postalCode ||
                "",
            },
          };
          const userEmail =
            dataToSend.shipping?.email || dataToSend.userEmail || "";
          const productDetails = (dataToSend.products || []).map((p) => ({
            title: p.title,
            quantity: p.quantity,
            price: p.price,
          }));
          await sendOrderEmail({ orderDetails, userEmail, productDetails });

          // Call your backend to save order after payment success
          const savedOrderResponse = await saveFormDataToBackend(dataToSend);

          // Fetch the latest data with orderId from backend
          let latestOrderData = null;
          try {
            const fetchResponse = await fetch(
              `${apibaseUrl}/indiesemic/getAllPurchaseVerificationData`
            );
            const fetchData = await fetchResponse.json();

            if (
              fetchResponse.ok &&
              fetchData.data &&
              fetchData.data.length > 0
            ) {
              // Find the most recent order (assuming it's the one we just created)
              // You might want to use a more specific identifier like paymentId or timestamp
              latestOrderData = fetchData.data[fetchData.data.length - 1];
              console.log("Latest order data from backend:", latestOrderData);
            }
          } catch (error) {
            console.error("Error fetching latest order data:", error);
            // Fallback to the response data if fetch fails
            latestOrderData = savedOrderResponse.data;
          }

          setSavedData(null);
          // Use the latest data with orderId for invoice
          setInvoiceData(latestOrderData || savedOrderResponse.data);
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
      const response = await fetch(
        `${apibaseUrl}/indiesemic/addPurchaseVerificationData`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to save purchase verification data"
        );
      }
      return responseData;
    } catch (error) {
      console.error("Error saving purchase verification data:", error);
      throw error;
    }
  };

  const showContactModal = () => {
    setIsContactModalVisible(true);
  };

  const handleContactModalCancel = () => {
    setIsContactModalVisible(false);
  };

  const sendOrderEmail = async ({
    orderDetails,
    userEmail,
    productDetails,
  }) => {
    try {
      const response = await fetch(
        `${apibaseUrl}/autosend/sendOrderEmailsIndiesemic`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderDetails,
            userEmail,
            adminEmail: "sales@indiesemic.com",
            productDetails,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send order email");
      }
      return await response.json();
    } catch (err) {
      console.error("Order email error:", err);
    }
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
          borderRadius: "50%",
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
        title={
          <Typography.Title level={4} style={{ marginBottom: "0px" }}>
            Cart
          </Typography.Title>
        }
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 4fr 1fr 1fr",
                  padding: "12px 0",
                  borderBottom: "1px solid #eaeaea",
                  marginBottom: "16px",
                  color: "#888",
                }}
              >
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
                style={
                  isMobile
                    ? {
                        display: "flex",
                        flexDirection: "column",
                        padding: "16px 0",
                        borderBottom: "1px solid #eaeaea",
                      }
                    : {
                        display: "grid",
                        gridTemplateColumns: "80px 4fr 1fr 1fr",
                        alignItems: "center",
                        padding: "16px 0",
                        borderBottom: "1px solid #eaeaea",
                      }
                }
              >
                {/* Mobile layout */}
                {isMobile ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <Typography.Text strong style={{ fontSize: "16px" }}>
                        {item.title}
                      </Typography.Text>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "18px",
                          color: "#888",
                        }}
                      >
                        ×
                      </button>
                    </div>

                    <div style={{ display: "flex", marginBottom: "12px" }}>
                      <div
                        style={{
                          width: "80px",
                          height: "100px",
                          marginRight: "15px",
                        }}
                      >
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
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#888",
                            marginBottom: "8px",
                          }}
                        >
                          {item.description || "Item code"}
                        </div>
                        <Typography.Text strong>₹{item.price}</Typography.Text>
                        {(quantities[item._id] || 1) > 1 && (
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#888",
                              marginTop: "4px",
                            }}
                          >
                            ₹{item.price} × {quantities[item._id] || 1} = ₹
                            {(item.price * (quantities[item._id] || 1)).toFixed(
                              2
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "8px",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            Math.max(1, (quantities[item._id] || 1) - 1)
                          )
                        }
                        style={{
                          border: "1px solid #eaeaea",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "0 12px",
                          height: "32px",
                          borderRadius: "4px",
                        }}
                      >
                        —
                      </button>
                      <InputNumber
                        min={1}
                        max={100}
                        value={quantities[item._id] || 1}
                        onChange={(value) =>
                          handleQuantityChange(item._id, value)
                        }
                        style={{
                          width: "80px",
                          margin: "0 8px",
                          textAlign: "center",
                        }}
                        controls={false}
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            Math.min(100, (quantities[item._id] || 1) + 1)
                          )
                        }
                        style={{
                          border: "1px solid #eaeaea",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "0 12px",
                          height: "32px",
                          borderRadius: "4px",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ textAlign: "center", fontSize: "14px" }}>
                      <b> {String(index + 1).padStart(2, "0")}</b>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "80px",
                          height: "100px",
                          marginRight: "20px",
                        }}
                      >
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
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#888",
                            marginTop: "4px",
                          }}
                        >
                          {item.description || "Item code"}
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            Math.max(1, (quantities[item._id] || 1) - 1)
                          )
                        }
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "0 8px",
                        }}
                      >
                        —
                      </button>
                      <InputNumber
                        min={1}
                        max={100}
                        value={quantities[item._id] || 1}
                        onChange={(value) =>
                          handleQuantityChange(item._id, value)
                        }
                        style={{
                          width: "40px",
                          margin: "0 4px",
                          border: "none",
                          padding: "0",
                          textAlign: "center",
                        }}
                        controls={false}
                        bordered={false}
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            Math.min(100, (quantities[item._id] || 1) + 1)
                          )
                        }
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "0 8px",
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Typography.Text strong>₹{item.price}</Typography.Text>
                        <div>
                          {(quantities[item._id] || 1) > 1 && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#888",
                                marginTop: "4px",
                              }}
                            >
                              ₹{item.price} × {quantities[item._id] || 1} = ₹
                              {(
                                item.price * (quantities[item._id] || 1)
                              ).toFixed(2)}
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
                          marginLeft: "16px",
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
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                gap: isMobile ? "12px" : "10px",
                marginTop: "32px",
              }}
            >
              <Button
                onClick={() => toggleDrawer(false)}
                style={{
                  padding: "8px 16px",
                  borderColor: "#888",
                  color: "#000",
                  margin: "0px",
                  background: "transparent",
                  width: isMobile ? "100%" : "auto",
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
                <div
                  style={{
                    position: "relative",
                    padding: isMobile ? "0 15px" : "0 30px",
                  }}
                >
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
                    {recommendedProducts.map((product) => (
                      <SwiperSlide key={product._id}>
                        <Card
                          hoverable
                          cover={
                            <div
                              style={{
                                height: isMobile ? "150px" : "180px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                alt={product.title}
                                src={
                                  product.mainImages?.[0] || "default-image.jpg"
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          }
                          bodyStyle={{
                            padding: isMobile ? "10px" : "16px",
                            height: "auto",
                          }}
                          style={{ height: "100%", margin: "10px 0" }}
                        >
                          <Link
                            href={`/product/${product._id}`}
                            onClick={() => toggleDrawer(false)}
                          >
                            <div style={{ marginBottom: "8px" }}>
                              <Typography.Text
                                ellipsis={{ tooltip: product.title }}
                                style={{ width: "100%", fontWeight: "500" }}
                              >
                                {product.title}
                              </Typography.Text>
                            </div>

                            {product.category && (
                              <div
                                style={{
                                  marginBottom: "8px",
                                  fontSize: "12px",
                                  color: "#888",
                                }}
                              >
                                {product.category}
                              </div>
                            )}

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography.Text strong>
                                ₹{product.price}
                              </Typography.Text>
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
                                  height: "24px",
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
          <div
            style={{
              textAlign: "center",
              padding: isMobile ? "20px 0" : "40px 0",
            }}
          >
            <Typography.Text style={{ fontSize: "16px" }}>
              Your cart is empty.
            </Typography.Text>
            <div style={{ marginTop: "24px" }}>
              <Button
                onClick={() => toggleDrawer(false)}
                style={{
                  padding: "8px 16px",
                  borderColor: "#888",
                  color: "#000",
                  background: "transparent",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Continue shopping
              </Button>
            </div>

            {/* Show products carousel even when cart is empty */}
            {recommendedProducts.length > 0 && (
              <div style={{ marginTop: "64px" }}>
                <Divider />
                <Typography.Title
                  level={4}
                  style={{ marginBottom: "24px", textAlign: "left" }}
                >
                  Explore Our Products
                </Typography.Title>

                {/* Swiper Carousel */}
                <div
                  style={{
                    position: "relative",
                    padding: isMobile ? "0 15px" : "0 30px",
                  }}
                >
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
                    {recommendedProducts.map((product) => (
                      <SwiperSlide key={product._id}>
                        <Card
                          hoverable
                          cover={
                            <div
                              style={{
                                height: isMobile ? "150px" : "180px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                alt={product.title}
                                src={
                                  product.mainImages?.[0] || "default-image.jpg"
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          }
                          bodyStyle={{
                            padding: isMobile ? "10px" : "16px",
                            height: "auto",
                          }}
                          style={{ height: "100%", margin: "10px 0" }}
                        >
                          <Link
                            href={`/product/${product._id}`}
                            onClick={() => toggleDrawer(false)}
                          >
                            <div style={{ marginBottom: "8px" }}>
                              <Typography.Text
                                ellipsis={{ tooltip: product.title }}
                                style={{ width: "100%", fontWeight: "500" }}
                              >
                                {product.title}
                              </Typography.Text>
                            </div>

                            {product.category && (
                              <div
                                style={{
                                  marginBottom: "8px",
                                  fontSize: "12px",
                                  color: "#888",
                                }}
                              >
                                {product.category}
                              </div>
                            )}

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography.Text strong>
                                ₹{product.price}
                              </Typography.Text>
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
                                  height: "24px",
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
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
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
            <Typography.Text>₹{getGrandTotal().toFixed(2)}</Typography.Text>
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
