import React, { useContext, useState, useEffect } from "react";
import { Button, Drawer, Typography, Card, InputNumber, Divider, message } from "antd";
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

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, products } = useContext(ProductContext);
    const [open, setOpen] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    // Track screen width for responsive layout
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // Toggle drawer open and close
    const toggleDrawer = (open) => {
        setOpen(open);

        // If opening the drawer, find recommended products
        if (open && products?.length > 0) {
            findRecommendedProducts();
        }
    };

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
        return cartItems.reduce((total, item) => {
            const quantity = quantities[item._id] || 1; // Default to 1 if no quantity set
            return total + item.price * quantity;
        }, 0);
    };

    // Handle adding product to cart
    const handleAddProduct = (product) => {
        addToCart(product);
        message.success(`${product.title} added to cart!`);
    };

    // Determine if using mobile layout
    const isMobile = windowWidth < 768;

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
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                }}
            >
                <BsFillCartCheckFill />
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
                        <div style={{ marginTop: "32px", paddingTop: "16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", marginBottom: "32px" }}>
                                <Typography.Text strong style={{ fontSize: "18px" }}>Total</Typography.Text>
                                <Typography.Text strong style={{ fontSize: "18px" }}>₹{getTotalPrice()}</Typography.Text>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            gap: isMobile ? "12px" : "0",
                            marginTop: "32px"
                        }}>
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
                            <Button
                                type="primary"
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#000",
                                    borderColor: "#000",
                                    width: isMobile ? "100%" : "auto"
                                }}
                            >
                                Process order
                            </Button>
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
        </>
    );
};

export default Cart;