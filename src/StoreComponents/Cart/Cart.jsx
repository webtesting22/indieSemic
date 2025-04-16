import React, { useState } from "react";
import { Drawer, Button, Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useProductContext } from "../Context/ProductContext";

const Cart = () => {
    const { cartItems, removeFromCart } = useProductContext();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => {
        setOpen(open);
    };

    return (
        <>
            <Button variant="contained" onClick={() => toggleDrawer(true)}>
                Open Cart
            </Button>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
            >
                <Box
                    sx={{
                        width: 300,
                        padding: "16px",
                        backgroundColor: "#f4f4f4",
                    }}
                >
                    <Typography variant="h6">Your Cart</Typography>
                    {cartItems.length > 0 ? (
                        <List>
                            {cartItems.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={item.title} secondary={`₹${item.price}`} />
                                    <Button onClick={() => removeFromCart(item._id)}>Remove</Button>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2">Your cart is empty.</Typography>
                    )}
                    <Button variant="contained" onClick={() => toggleDrawer(false)}>
                        Close
                    </Button>
                </Box>
            </Drawer>
        </>
    );
};

export default Cart;
