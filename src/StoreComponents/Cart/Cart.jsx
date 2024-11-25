import React, { useState } from 'react';
import { Drawer, Button, Box, Typography, useMediaQuery, useTheme } from '@mui/material';



const Cart = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Use 'sm' breakpoint to detect mobile screens

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
                    anchor={isMobile ? 'right' : 'bottom'} // Change anchor based on screen size
                    open={open}
                    onClose={() => toggleDrawer(false)}
                >
                    <Box
                        sx={{
                            width: isMobile ? '250px' : '100%', // Adjust width for mobile
                            height: isMobile ? '100%' : '200px', // Set height for bottom drawer
                            padding: '16px',
                            backgroundColor: '#f4f4f4',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h6">This is the Cart Drawer</Typography>
                        {/* Add cart contents here */}
                    </Box>
                </Drawer>
            </div>
        </>
    )
}
export default Cart