import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { MegaMenu } from 'primereact/megamenu';
import { NavigationData, RFModules, SystemOnChip, Services, Applications } from "../../CommonComponents/Navigationdata/NavigationData";
import { useNavigate } from 'react-router-dom'; // Updated import for React Router v6
import "../../Styles/MegaNavigation.css";

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element,
    window: PropTypes.func,
};

const MegaNavigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollY > 50); // Change threshold as needed
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navigate = useNavigate(); // Using useNavigate hook

    // Create a function to handle navigation on click
    const handleLinkClick = (path) => {
        navigate(path); // This will navigate to the selected path
    };

    // Map NavigationData to MegaMenu items
    const items = NavigationData.map((category) => {
        // If the category is a top-level menu like "Home" or "About Us"
        if (category.link === "Home" || category.link === "About Us") {
            return {
                label: category.link,
                icon: 'pi pi-home', // You can customize this icon for each category
                command: () => handleLinkClick(category.path) // Navigate directly on click
            };
        }

        let categoryItems = [];

        // Check the category type and map the corresponding links
        if (category.link === "RF Modules") {
            categoryItems = RFModules.map((item) => ({
                label: item.link,
                command: () => handleLinkClick(item.link)
            }));
        } else if (category.link === "System on Chip (SoCS)") {
            categoryItems = SystemOnChip.map((item) => ({
                label: item.link,
                command: () => handleLinkClick(item.link)
            }));
        } else if (category.link === "Services") {
            categoryItems = Services.map((item) => ({
                label: item.link,
                command: () => handleLinkClick(item.link)
            }));
        } else if (category.link === "Applications") {
            categoryItems = Applications.map((item) => ({
                label: item.link,
                command: () => handleLinkClick(item.link)
            }));
        }

        return {
            label: category.link,
            icon: 'pi pi-box', // You can customize this icon for each category
            items: [[...categoryItems]] // Wrap in an array of arrays to match MegaMenu structure
        };
    });

    return (
        <React.Fragment>
            <HideOnScroll>
                <AppBar style={{
                    backgroundColor: isScrolled ? "black" : "transparent",
                    transition: "background-color 0.3s ease",
                    boxShadow: isScrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                }}>
                    <main id="MegaNavigationContainer">
                        <div className="LogoContainer">
                            {/* Add logo or any other content here */}
                        </div>
                        <div className="NavigationLinksContainer">
                            <div className="card">
                                <MegaMenu model={items} breakpoint="960px" />
                            </div>
                        </div>
                    </main>
                </AppBar>
            </HideOnScroll>

            <Toolbar /> {/* To prevent content from jumping up under the AppBar */}


        </React.Fragment>
    );
};

export default MegaNavigation;
