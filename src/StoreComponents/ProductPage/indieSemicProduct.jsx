import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import TopContainerBanner from "../../CommonComponents/Navigationdata/TopContainerBanner";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";
import "../../Styles/Product.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Row, Col, Input, Button, Menu, Drawer, Table, Checkbox, Image, Typography, Alert, Tag, Tooltip, message } from "antd";
import ProductContext from "../Context/ProductContext";
import Cart from "../Cart/Cart";
import { RiResetRightLine } from "react-icons/ri";
import { MenuOutlined, FilterOutlined } from "@ant-design/icons";
import GetQuotationModal from "./GetQuatationModal";

const IndieSemicProduct = () => {
    const { products, addToCart } = useContext(ProductContext);
    const productList = products || [];

    // State management for filters
    const [selectedCategory, setSelectedCategory] = useState("All Products"); // Set default to "All Products"
    const [searchQuery, setSearchQuery] = useState("");
    const [drawerVisible, setDrawerVisible] = useState(false);

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category === "All Products" ? "All Products" : category);
        if (window.innerWidth < 768) {
            setDrawerVisible(false); // Close drawer on mobile after selection
        }
    };

    // Handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Reset all filters to default values
    const resetFilters = () => {
        setSelectedCategory("All Products"); // Reset category filter to "All Products"
        setSearchQuery(""); // Reset search query
    };

    // Toggle filter drawer for mobile view
    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    // Filter products based on selected category, search query, and price range
    const filteredProducts = productList.filter((product) => {
        const categoryMatch = selectedCategory === "All Products" ? true : product.category === selectedCategory;
        const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

        return categoryMatch && searchMatch;
    });

    // Extract unique categories, excluding null, undefined, or empty categories
    const categories = [
        ...new Set(productList.map((product) => product.category))
    ].filter((category) => category && category.trim() !== ""); // This removes null or empty categories

    // Sidebar component (for both desktop and mobile)
    const SidebarContent = () => (
        <div className="left-sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <ul className="category-list">
                <li
                    className={selectedCategory === "All Products" ? "active-category" : ""}
                    onClick={() => handleCategoryChange("All Products")}
                >
                    All Products
                </li>
                {categories.map((category) => (
                    <li
                        key={category}
                        className={selectedCategory === category ? "active-category" : ""}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>

            <div className="filter-controls">
                <Button onClick={resetFilters} type="primary" danger style={{ width: "100%", marginTop: "20px" }}>
                    <RiResetRightLine /> Reset Filters
                </Button>

                <div style={{ marginTop: "10px" }}>
                    <GetQuotationModal />
                </div>


            </div>
        </div>
    );

    return (
        <>
            <TopContainerBanner
                image="https://plus.unsplash.com/premium_photo-1681426694953-4d78658193dc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                DynamicHeading="Store"
                icon={<LocalGroceryStoreSharpIcon style={{ color: "#fff" }} />}
                link="Products"
            />
            <section className="AllProductsContainer section_Padding">
                {/* Mobile Filter Button */}
                <div className="mobile-filter-button">
                    <Button
                        type="primary"
                        icon={<FilterOutlined />}
                        onClick={toggleDrawer}
                    >
                        Filters
                    </Button>
                    {/* <span className="mobile-product-count">Products: {filteredProducts.length}</span> */}
                </div>
                <div className="SearchProductContainerWithCount">
                    <div>

                        <div className="countShowContainer" >
                            <span>Total&nbsp;Products:&nbsp;{filteredProducts.length}</span>
                        </div>
                        <div className="searchBarContainer" style={{width:"100%"}}>
                            <Input
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{ width: "100%" }}
                            />
                        </div>

                    </div>
                </div>
                {/* Mobile Drawer for Filters */}
                <Drawer
                    title="Filter Products"
                    placement="left"
                    onClose={toggleDrawer}
                    open={drawerVisible}
                    className="filter-drawer"
                >
                    <SidebarContent />
                </Drawer>

                <Row gutter={[24, 24]}>
                    {/* Left Side - Categories (desktop only) */}
                    <Col lg={5} md={8} sm={0} xs={0} className="sidebar-container desktop-sidebar">
                        <SidebarContent />
                    </Col>

                    {/* Right Side - Products */}
                    <Col lg={19} md={16} sm={24} xs={24}>
                        <Row gutter={[16, 16]}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Col lg={6} md={12} sm={12} xs={12} key={product._id}>
                                        <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                            <div className="ProductCard">
                                                <div className="mainImageContainer">
                                                    <img
                                                        src={product.mainImages?.[0] || "default-image.jpg"}
                                                        alt={`${product.title} front`}
                                                    />
                                                    <img
                                                        src={product.mainImages?.[1] || product.mainImages?.[0] || "default-image.jpg"}
                                                        alt={`${product.title} back`}
                                                    />
                                                </div>

                                                <div className="ProductDetailsContainer">
                                                    <h2 className="ProductTitle">
                                                        {product.title?.length > 40
                                                            ? `${product.title.slice(0, 40)}...`
                                                            : product.title}
                                                    </h2>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                ))
                            ) : (
                                <Col span={24}>
                                    <h2>No Products Available</h2>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </section>
            <Cart />
        </>
    );
};

export default IndieSemicProduct;