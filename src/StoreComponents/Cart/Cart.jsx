import React from "react";
import { Drawer, Button, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useProductContext } from "../Context/ProductContext";

const Cart = () => {
    const { cartItems } = useProductContext();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const toggleDrawer = (open) => {
        setOpen(open);
    };

    return (
        <>
            <div>
                <Button variant="contained" onClick={() => toggleDrawer(true)}>
                    Open Cart
                </Button>
                <Drawer
                    anchor={isMobile ? "right" : "bottom"}
                    open={open}
                    onClose={() => toggleDrawer(false)}
                >
                    <Box
                        sx={{
                            width: isMobile ? "250px" : "100%",
                            height: isMobile ? "100%" : "300px",
                            padding: "16px",
                            backgroundColor: "#f4f4f4",
                        }}
                    >
                        <Typography variant="h6">Your Cart</Typography>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <Box key={index} sx={{ margin: "10px 0" }}>
                                    <Typography variant="body1">{item.title}</Typography>
                                    <Typography variant="body2">{`Price: $${item.price}`}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2">Your cart is empty.</Typography>
                        )}
                    </Box>
                </Drawer>
            </div>
        </>
    );
};

export default Cart;
