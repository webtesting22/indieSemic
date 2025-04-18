import React, { useContext, useState, useEffect } from "react";
import { Button, Drawer, Typography, List, Card, InputNumber, Image } from "antd";
import ProductContext from "../Context/ProductContext";
import { BsFillCartCheckFill } from "react-icons/bs";

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(ProductContext);
    const [open, setOpen] = useState(false);
    const [quantities, setQuantities] = useState({});

    // Toggle drawer open and close
    const toggleDrawer = (open) => {
        setOpen(open);
    };

    // Load quantities from localStorage when the component mounts
    useEffect(() => {
        const storedQuantities = JSON.parse(localStorage.getItem("cartQuantities")) || {};
        setQuantities(storedQuantities);
    }, []);

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
                title={<> <Typography.Title level={4} style={{ margin: "0px" }}>Your Cart</Typography.Title></>}
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                width="400px"
                style={{
                    backgroundColor: "#f4f4f4",
                    padding: "16px",
                    height: "100%",
                }}
            >


                {/* If cart has items */}
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item) => (
                            <Card
                                key={item._id}
                                style={{
                                    marginBottom: "20px",
                                    backgroundColor: "#fff",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                                actions={[
                                    <Button
                                        type="danger"
                                        onClick={() => removeFromCart(item._id)}
                                        style={{
                                            backgroundColor: "#ff4d4f",
                                            color: "#fff",
                                            borderColor: "#ff4d4f",
                                        }}
                                    >
                                        Remove
                                    </Button>,
                                ]}
                            >
                                <div>
                                    <div className="AntImageContainer">
                                        <Image
                                            src={item.mainImages?.[0] || "default-image.jpg"}
                                            alt={item.title}
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <div>
                                            <Typography.Text strong>{item.title}</Typography.Text>
                                        </div>
                                    </div>
                                    <br />

                                    <div>
                                        <Typography.Text strong>₹{item.price}</Typography.Text>
                                    </div>
                                </div>

                                {/* Quantity Input */}
                                <div style={{ marginTop: "10px" }}>
                                    <Typography.Text>Quantity</Typography.Text>
                                    <InputNumber
                                        min={1}
                                        max={100}
                                        value={quantities[item._id] || 1}
                                        onChange={(value) =>
                                            handleQuantityChange(item._id, value)
                                        }
                                        style={{ width: "100%", marginTop: "10px" }}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Typography.Text>Your cart is empty.</Typography.Text>
                )}

                {/* Total Price */}
                <div style={{ marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}>
                    <div>Total: ₹{getTotalPrice()}</div>
                </div>

                {/* Close Button */}
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <Button
                        onClick={() => toggleDrawer(false)}
                        style={{
                            width: "100%",
                            padding: "12px 0",
                            backgroundColor: "#1890ff",
                            color: "#fff",
                            borderColor: "#1890ff",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        Close
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default Cart;
