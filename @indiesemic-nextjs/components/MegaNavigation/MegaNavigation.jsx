"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { NavigationData } from "../Navigationdata/NavigationData";
import { Drawer, Button, Collapse, Carousel } from "antd";
import { MenuOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../../styles/Styles/MegaNavigation.css";
import Link from "next/link";
import { Row, Col, Card } from "antd";
import ProductContext from "../StoreComponents/Context/ProductContext";

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
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAppBar, setShowAppBar] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false); // To manage drawer visibility
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const { products, addToCart, fetchProducts, loadingProducts } =
    useContext(ProductContext);
  const categories = [...new Set(products?.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const hideTimeout = useRef();

  // Ensure products are loaded - only fetch if products are not available and not currently loading
  useEffect(() => {
    if (!products || products.length === 0) {
      if (!loadingProducts) {
        fetchProducts();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - State.jsx handles the fetching

  // Dynamic IOT modules data from API
  const iotModulesData =
    products
      ?.filter(
        (product) =>
          product.category &&
          (product.category.includes("IOT") ||
            product.category.includes("Bluetooth") ||
            product.category.includes("WiFi") ||
            product.category.includes("LoRa") ||
            product.category.includes("Module") ||
            product.title?.includes("ISC-"))
      )
      .map((product) => ({
        title: product.title,
        subtitle: product.productDescription
          ? product.productDescription
              .replace(/<[^>]*>/g, "")
              .substring(0, 60) + "..."
          : "IOT Module",
        image:
          product.mainImages?.[0] ||
          "https://via.placeholder.com/150x100?text=IOT+Module",
        category: Array.isArray(product.category)
          ? product.category[0]
          : product.category,
        price: product.price
          ? `₹${product.price.toLocaleString()}`
          : "Contact Us",
        id: product._id,
      })) || [];

  // Dynamic IOT categories based on actual data
  const iotCategories = [
    { name: "All Modules", count: iotModulesData.length },
    ...Object.entries(
      iotModulesData.reduce((acc, item) => {
        const category = item.category || "Other";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {})
    ).map(([category, count]) => ({ name: category, count })),
  ];

  const [selectedIotCategory, setSelectedIotCategory] = useState("All Modules");
  const filteredIotModules =
    selectedIotCategory === "All Modules"
      ? iotModulesData
      : iotModulesData.filter((item) => item.category === selectedIotCategory);

  const handleIotCategoryHover = (category) => {
    setSelectedIotCategory(category);
  };

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
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile if screen width <= 768px
    };

    updateScreenSize(); // Initial check
    window.addEventListener("resize", updateScreenSize); // Listen for resize events

    return () => window.removeEventListener("resize", updateScreenSize); // Cleanup
  }, []);
  // A function to render sub-nav based on the main navigation item
  const renderSubNav = (link) => {
    switch (link) {
      case "RF Modules":
        return RFModules.map((item, index) => (
          <Collapse.Panel header={item.link} key={index}>
            <a href="#">{item.link}</a>
          </Collapse.Panel>
        ));
      case "System on Chip (SoCS)":
        return SystemOnChip.map((item, index) => (
          <Collapse.Panel header={item.link} key={index}>
            <a href="#">{item.link}</a>
          </Collapse.Panel>
        ));
      case "Services":
        return Services.map((item, index) => (
          <Collapse.Panel header={item.link} key={index}>
            <a href="#">{item.link}</a>
          </Collapse.Panel>
        ));
      case "Applications":
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
    return isScrolled ? "black" : "black";
  };

  // Hover logic for IOT Modules
  const handleMenuEnter = () => {
    clearTimeout(hideTimeout.current);
    setMenuVisible(true);
  };
  const handleMenuLeave = () => {
    hideTimeout.current = setTimeout(() => setMenuVisible(false), 200);
  };

  // Close dropdown when clicking on any item
  const handleDropdownItemClick = () => {
    setMenuVisible(false);
  };

  return (
    <React.Fragment>
      {/* Only show AppBar if `showAppBar` is true */}
      <HideOnScroll>
        <div id="NavigationBar">
          <AppBar
            style={{
              backgroundColor: isScrolled ? "#ffffff5c" : "transparent",
              backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
              top: showAppBar ? 0 : "-104px",
              transition: "0.5s ease-in-out",
              boxShadow: isScrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            <Toolbar style={{ padding: isScrolled ? "0px" : "10px 50px" }}>
              <div
                className="navigationbar"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  borderRadius: isScrolled ? "0px" : "20px",
                  marginLeft: isScrolled ? "0px" : "0px",
                  marginRight: isScrolled ? "0px" : "0px",
                  backdropFilter: isScrolled ? "blur(0px)" : "blur(10px)",
                  background: isScrolled ? "white" : "white",
                }}
              >
                <div
                  className="logoContainer"
                  style={{
                    height: isScrolled ? "85px" : "70px",
                  }}
                >
                  <a href="/">
                    <img
                      src={
                        isScrolled
                          ? "/Images/logo.png"
                          : "/Images/IndieSemicLogo.jpg"
                      }
                      alt="Logo"
                      style={{
                        width: isScrolled ? "120px" : "200px",
                        transition: "0.3s",
                      }}
                    />
                  </a>
                </div>
                {windowWidth < 768 ? (
                  <>
                    <Button
                      type="solid"
                      icon={<MenuOutlined />}
                      onClick={toggleDrawer}
                      style={{ backgroundColor: "black", color: "white" }}
                    ></Button>
                    <Drawer
                      title={
                        <>
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <Button
                              type="text"
                              icon={"X"}
                              onClick={toggleDrawer}
                              style={{
                                fontSize: "16px",
                                padding: "0 8px",
                              }}
                            />
                          </div>
                        </>
                      }
                      placement="left"
                      closable={false}
                      onClose={toggleDrawer}
                      open={drawerVisible}
                      width={300}
                    >
                      <div id="Collapse">
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                          {NavigationData.slice(
                            0,
                            NavigationData.length - 4
                          ).map((item, index) => (
                            <li key={index} style={{ marginBottom: "1rem" }}>
                              <Link
                                href={item.path} // Use `item.path` for the href
                                style={{
                                  fontSize: "16px",
                                  textDecoration: "none",
                                }}
                                className="MobileNavigationLink"
                                onClick={toggleDrawer} // Close drawer on link click
                              >
                                {item.link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Drawer>
                  </>
                ) : (
                  <>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        paddingRight: "2rem",
                        margin: "0px",
                      }}
                    >
                      {NavigationData.slice(0, NavigationData.length - 4).map(
                        (item, index) => (
                          <li
                            key={index}
                            style={{
                              display: "inline-block",
                              position: "relative",
                            }}
                          >
                            <div
                              className="dropdown"
                              onMouseEnter={
                                item.link === "IOT Modules"
                                  ? handleMenuEnter
                                  : undefined
                              }
                              onMouseLeave={
                                item.link === "IOT Modules"
                                  ? handleMenuLeave
                                  : undefined
                              }
                            >
                              <div className="dropdown-with-mega">
                                <button
                                  className="dropbtn"
                                  style={{ color: getButtonColor() }}
                                >
                                  <Link
                                    href={item.path}
                                    style={{ color: getButtonColor() }}
                                  >
                                    {item.link}
                                  </Link>
                                </button>
                                {/* IOT Modules Mega Menu */}
                                {item.link === "IOT Modules" && (
                                  <div
                                    className={`iot-mega-menu${
                                      menuVisible ? " visible" : ""
                                    }`}
                                    onMouseEnter={handleMenuEnter}
                                    onMouseLeave={handleMenuLeave}
                                  >
                                    <div className="iot-mega-menu-content">
                                      <div className="InsideSetContainer">
                                        <Row>
                                          <Col lg={8} md={10}>
                                            <div className="category-list">
                                              <h4 className="mega-menu-title">
                                                IOT Module Categories
                                              </h4>
                                              {iotCategories.map((category) => (
                                                <div
                                                  key={category.name}
                                                  className={`category-item ${
                                                    category.name ===
                                                    selectedIotCategory
                                                      ? "active"
                                                      : ""
                                                  }`}
                                                  onMouseEnter={() =>
                                                    handleIotCategoryHover(
                                                      category.name
                                                    )
                                                  }
                                                >
                                                  <p>
                                                    {category.name}{" "}
                                                    <span className="category-count">
                                                      ({category.count})
                                                    </span>
                                                  </p>
                                                </div>
                                              ))}
                                            </div>
                                          </Col>
                                          <Col lg={16} md={14}>
                                            <div className="iot-products-section">
                                              <h4 className="mega-menu-title">
                                                Featured IOT Modules
                                              </h4>
                                              {loadingProducts ? (
                                                <div className="loading-iot-modules">
                                                  <div className="loading-content">
                                                    <div className="loading-spinner"></div>
                                                    <p>
                                                      Loading IOT Modules...
                                                    </p>
                                                  </div>
                                                </div>
                                              ) : filteredIotModules.length >
                                                0 ? (
                                                <Carousel
                                                  dots={false}
                                                  arrows
                                                  slidesToShow={2}
                                                  slidesToScroll={1}
                                                  nextArrow={<RightOutlined />}
                                                  prevArrow={<LeftOutlined />}
                                                >
                                                  {filteredIotModules.map(
                                                    (module, index) => (
                                                      <div
                                                        key={module.id || index}
                                                        className="iot-carousel-slide"
                                                        onClick={
                                                          handleDropdownItemClick
                                                        }
                                                      >
                                                        <Link
                                                          href={`/product/${module.id}`}
                                                          className="iot-module-card"
                                                        >
                                                          <Card
                                                            hoverable
                                                            className="iot-module-card-inner"
                                                            cover={
                                                              <div className="iot-module-image">
                                                                <img
                                                                  src={
                                                                    module.image
                                                                  }
                                                                  alt={
                                                                    module.title
                                                                  }
                                                                  onError={(
                                                                    e
                                                                  ) => {
                                                                    e.target.src =
                                                                      "https://via.placeholder.com/150x100?text=IOT+Module";
                                                                  }}
                                                                />
                                                              </div>
                                                            }
                                                          >
                                                            <Card.Meta
                                                              title={
                                                                <div className="iot-module-title">
                                                                  <h5>
                                                                    {
                                                                      module.title
                                                                    }
                                                                  </h5>
                                                                </div>
                                                              }
                                                              description={
                                                                <div className="iot-module-details">
                                                                  <p className="iot-module-subtitle">
                                                                    {
                                                                      module.subtitle
                                                                    }
                                                                  </p>
                                                                  <span className="iot-module-category">
                                                                    {
                                                                      module.category
                                                                    }
                                                                  </span>
                                                                </div>
                                                              }
                                                            />
                                                          </Card>
                                                        </Link>
                                                      </div>
                                                    )
                                                  )}
                                                </Carousel>
                                              ) : (
                                                <div className="no-iot-modules">
                                                  <div className="no-modules-content">
                                                    <div className="no-modules-icon">
                                                      📡
                                                    </div>
                                                    <h5>
                                                      No IOT Modules Found
                                                    </h5>
                                                    <p>
                                                      Check back soon for our
                                                      latest IOT modules!
                                                    </p>
                                                  </div>
                                                </div>
                                              )}
                                              <div className="mega-menu-footer">
                                                <Link
                                                  href="/iot-modules"
                                                  className="view-all-link"
                                                  onClick={
                                                    handleDropdownItemClick
                                                  }
                                                >
                                                  View All IOT Modules →
                                                </Link>
                                              </div>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </HideOnScroll>

      <Toolbar />
    </React.Fragment>
  );
};

export default MegaNavigation;
