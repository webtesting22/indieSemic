import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { NavigationData, RFModules, SystemOnChip, Services, Applications, } from "../../CommonComponents/Navigationdata/NavigationData";
import { Drawer, Button, Collapse } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import "../../Styles/MegaNavigation.css";
import IndieSemicLogo from "../../../public/Images/IndieSemicLogo.jpg"
import logo2 from "/Images/logo.png";
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
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showAppBar, setShowAppBar] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);  // To manage drawer visibility
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            setShowAppBar(scrollY <= lastScrollY); // Show AppBar when scrolling up
            setIsScrolled(scrollY > 50); // Add background when scrolled down
            setLastScrollY(scrollY);
        };

        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [lastScrollY]);


    // To toggle the Drawer visibility
    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    // A function to render sub-nav based on the main navigation item
    const renderSubNav = (link) => {
        switch (link) {
            case 'RF Modules':
                return RFModules.map((item, index) => (
                    <Collapse.Panel header={item.link} key={index}>
                        <a href="#">{item.link}</a>
                    </Collapse.Panel>
                ));
            case 'System on Chip (SoCS)':
                return SystemOnChip.map((item, index) => (
                    <Collapse.Panel header={item.link} key={index}>
                        <a href="#">{item.link}</a>
                    </Collapse.Panel>
                ));
            case 'Services':
                return Services.map((item, index) => (
                    <Collapse.Panel header={item.link} key={index}>
                        <a href="#">{item.link}</a>
                    </Collapse.Panel>
                ));
            case 'Applications':
                return Applications.map((item, index) => (
                    <Collapse.Panel header={item.link} key={index}>
                        <a href="#">{item.link}</a>
                    </Collapse.Panel>
                ));

            // case 'About Us':
            //     return AboutUs.map((item, index) => (
            //         <Collapse.Panel header={item.link} key={index}>
            //             <a href="#footerSection">{item.link}</a>
            //         </Collapse.Panel>
            //     ));

            default:
                return null;
        }
    };
    const getButtonColor = () => {
        if (windowWidth < 768) {
            return "white";
        }
        return isScrolled ? "black" : "white";
    };

    return (
        <React.Fragment>
            {/* Only show AppBar if `showAppBar` is true */}
            <HideOnScroll>
                <div id="NavigationBar">
                    <AppBar
                          style={{
                            backgroundColor: isScrolled ? "transparent" : "transparent",
                            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
                            top: showAppBar ? 0 : '-64px', transition: 'top 0.3s',
                            boxShadow: isScrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                        }}
                    >
                        <Toolbar>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: "center", marginTop: isScrolled ? "2px" : "20px", marginLeft: isScrolled ? "0px" : "0px", marginRight: isScrolled ? "0px" : "0px", backdropFilter: isScrolled ? "blur(0px)" : "blur(10px)" }}>
                                <div className="logoContainer">
                                    <img src={IndieSemicLogo} alt="Logo" style={{
                                        boxShadow: "rgb(255 255 255 / 67%) 0px 22px 35px -13px",
                                    }} />
                                </div>
                                {windowWidth < 768 ? (
                                    <>
                                        <Button
                                            type="solid"
                                            icon={<MenuOutlined />}
                                            onClick={toggleDrawer}
                                            style={{ backgroundColor: "black", color: "white" }}
                                        >
                                        </Button>
                                        <Drawer

                                            placement="left"
                                            closable={false}
                                            onClose={toggleDrawer}
                                            visible={drawerVisible}
                                            width={300}
                                        >
                                            <div id='Collapse'>
                                                {/* <Collapse accordion>
                                                    {NavigationData.map((item, index) => (
                                                        <Collapse.Panel header={item.link} key={index}>
                                                            {renderSubNav(item.link)}
                                                        </Collapse.Panel>
                                                    ))}
                                                </Collapse> */}
                                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                    {NavigationData.map((item, index) => (
                                                        <li key={index} style={{ marginBottom: '1rem' }}>
                                                            <a
                                                                href={item.path} // Use `item.path` for the href
                                                                style={{
                                                                    color: "black",
                                                                    fontSize: "16px",
                                                                    textDecoration: "none",
                                                                }}
                                                                onClick={toggleDrawer} // Close drawer on link click
                                                            >
                                                                {item.link}
                                                            </a>
                                                            {/* Render sub-navigation if available */}
                                                            {renderSubNav(item.link) && (
                                                                <Collapse accordion>
                                                                    {renderSubNav(item.link)}
                                                                </Collapse>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Drawer>
                                    </>
                                ) : (
                                    // Desktop navigation as per original code
                                    <>

                                        <ul style={{ listStyleType: 'none', padding: 0, paddingRight: "2rem", }}>
                                            {NavigationData.map((item, index) => (
                                                <li key={index} style={{ display: 'inline-block' }}>
                                                    <div className="dropdown">
                                                        <button className="dropbtn" style={{ color: getButtonColor() }}>
                                                            <a href={item.path} style={{ color: getButtonColor() }} // Use the path directly as href
                                                            >
                                                                {item.link}
                                                            </a >
                                                        </button>
                                                        {renderSubNav(item.link) && (
                                                            <div className="dropdown-content">
                                                                <div>
                                                                    {renderSubNav(item.link)} {/* Render sub-nav */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                    </>
                                )}
                                {/* <hr /> */}
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </HideOnScroll>

            <Toolbar />
        </React.Fragment >
    );
};

export default MegaNavigation;
