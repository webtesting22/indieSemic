import React, { useState, useRef, useContext, useEffect } from "react";
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
const imageList = [
    "/Images/ProductPageBackl.jpg",
    "https://images.unsplash.com/photo-1689852500942-3a705d709342?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];
const IndieSemicProduct = () => {
    const { products, addToCart } = useContext(ProductContext);
    const productList = products || [];

    // State management for filters
    const [selectedCategory, setSelectedCategory] = useState("All Products"); // Set default to "All Products"
    const [searchQuery, setSearchQuery] = useState("");
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // start fade out
            setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
                setFade(true); // fade in next image
            }, 300); // match fade-out duration
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
        <div className="modern-products-page">
            {/* Enhanced Hero Section */}
            <div className="hero-section-wrapper">
                <div className="hero-image-container">
                    <img
                        src={imageList[currentImageIndex]}
                        alt="Hero Background"
                        className={`hero-background-image ${fade ? 'fade-in' : 'fade-out'}`}
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content-container">
                    <div className="hero-content">
                        <div className="hero-text-wrapper">
                            <h1 className="hero-main-title">Precision in Every Layer</h1>
                            <p className="hero-subtitle">Crafting semiconductors for flawless performance.</p>
                            <div className="hero-stats-container">
                                <div className="stat-box">
                                    <span className="stat-number">{productList.length}+</span>
                                    <span className="stat-text">Products</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">99%</span>
                                    <span className="stat-text">Quality</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">24/7</span>
                                    <span className="stat-text">Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Products Section */}
            <section className="products-main-section">
                {/* Background Pattern */}
                <div className="background-pattern">
                    <img src="/Images/BackShapeImg.svg" alt="Background Pattern" />
                </div>

                {/* Enhanced Header Controls */}
                <div className="products-header-container">
                    {/* Breadcrumb */}
                    <div className="breadcrumb-wrapper">
                        <div className="breadcrumb-content">
                            <Link to="/" className="breadcrumb-item">Home</Link>
                            <span className="breadcrumb-divider">{">"}</span>
                            <span className="breadcrumb-current">Products</span>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="controls-section">
                        {/* Mobile Controls */}
                        <div className="mobile-controls-wrapper">
                            <Button
                                type="primary"
                                icon={<FilterOutlined />}
                                onClick={toggleDrawer}
                                className="mobile-filter-button"
                            >
                                Filters
                            </Button>
                            <div className="mobile-count-display">
                                <span className="count-text">{filteredProducts.length} Products</span>
                            </div>
                        </div>

                        {/* Desktop Controls */}
                        <div className="desktop-controls-wrapper">
                            <div className="products-count-section">
                                <div className="count-badge">
                                    <span className="count-label">Total Products:</span>
                                    <span className="count-value">{filteredProducts.length}</span>
                                </div>
                            </div>
                            <div className="search-section">
                                <div className="search-input-wrapper">
                                    <Input
                                        placeholder="Search semiconductors by name..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="modern-search-input"
                                        prefix={<span className="search-prefix-icon">🔍</span>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Filter Drawer */}
                <Drawer
                    title={
                        <div className="drawer-title-wrapper">
                            <FilterOutlined className="drawer-title-icon" />
                            <span>Filter Products</span>
                        </div>
                    }
                    placement="left"
                    onClose={toggleDrawer}
                    open={drawerVisible}
                    className="modern-filter-drawer"
                >
                    <div className="drawer-sidebar-content">
                        <div className="categories-section">
                            <h3 className="section-title">Categories</h3>
                            <div className="categories-list">
                                <div
                                    className={`category-option ${selectedCategory === "All Products" ? "active" : ""}`}
                                    onClick={() => handleCategoryChange("All Products")}
                                >
                                    <span className="category-text">All Products</span>
                                    <span className="category-badge">{productList.length}</span>
                                </div>
                                {categories.map((category) => {
                                    const categoryCount = productList.filter(p => p.category === category).length;
                                    return (
                                        <div
                                            key={category}
                                            className={`category-option ${selectedCategory === category ? "active" : ""}`}
                                            onClick={() => handleCategoryChange(category)}
                                        >
                                            <span className="category-text">{category}</span>
                                            <span className="category-badge">{categoryCount}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="filter-actions">
                            <Button
                                onClick={resetFilters}
                                className="reset-button"
                                icon={<RiResetRightLine />}
                                danger
                            >
                                Reset Filters
                            </Button>
                            <div className="quotation-wrapper">
                                <GetQuotationModal />
                            </div>
                        </div>
                    </div>
                </Drawer>

                {/* Main Content Grid */}
                <div className="content-grid-wrapper">
                    <Row gutter={[32, 32]}>
                        {/* Desktop Sidebar */}
                        <Col lg={6} md={8} sm={0} xs={0} className="desktop-sidebar-wrapper">
                            <div className="desktop-sidebar-container">
                                <div className="categories-section">
                                    <h3 className="section-title">Categories</h3>
                                    <div className="categories-list">
                                        <div
                                            className={`category-option ${selectedCategory === "All Products" ? "active" : ""}`}
                                            onClick={() => handleCategoryChange("All Products")}
                                        >
                                            <span className="category-text">All Products</span>
                                            <span className="category-badge">{productList.length}</span>
                                        </div>
                                        {categories.map((category) => {
                                            const categoryCount = productList.filter(p => p.category === category).length;
                                            return (
                                                <div
                                                    key={category}
                                                    className={`category-option ${selectedCategory === category ? "active" : ""}`}
                                                    onClick={() => handleCategoryChange(category)}
                                                >
                                                    <span className="category-text">{category}</span>
                                                    <span className="category-badge">{categoryCount}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="filter-actions">
                                    <Button
                                        onClick={resetFilters}
                                        className="reset-button"
                                        icon={<RiResetRightLine />}
                                        danger
                                    >
                                        Reset Filters
                                    </Button>
                                    <div className="quotation-wrapper">
                                        <GetQuotationModal />
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Products Grid */}
                        <Col lg={18} md={16} sm={24} xs={24}>
                            <div className="products-grid-section">
                                {filteredProducts.length > 0 ? (
                                    <Row gutter={[24, 24]}>
                                        {filteredProducts.map((product) => (
                                            <Col lg={8} md={12} sm={24} xs={24} key={product._id}>
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    className="product-link-wrapper"
                                                >
                                                    <div className="modern-product-card">
                                                        <div className="product-image-section">
                                                            <div className="image-container">
                                                                <img
                                                                    src={product.mainImages?.[0] || "default-image.jpg"}
                                                                    alt={`${product.title} primary`}
                                                                    className="product-image primary-image"
                                                                />
                                                                <img
                                                                    src={product.mainImages?.[1] || product.mainImages?.[0] || "default-image.jpg"}
                                                                    alt={`${product.title} secondary`}
                                                                    className="product-image secondary-image"
                                                                />
                                                            </div>
                                                            <div className="product-overlay">
                                                                <div className="overlay-content">
                                                                    <span className="view-text">View Product</span>
                                                                    <div className="overlay-arrow">→</div>
                                                                </div>
                                                            </div>
                                                            <div className="product-badge">
                                                                <span>Latest</span>
                                                            </div>
                                                        </div>

                                                        <div className="product-info-section">
                                                            <div className="product-content">
                                                                <h3 className="product-title">
                                                                    {product.title?.length > 45
                                                                        ? `${product.title.slice(0, 45)}...`
                                                                        : product.title}
                                                                </h3>
                                                                <div className="product-meta-info">
                                                                    <div className="rating-section">
                                                                        <div className="star-rating">
                                                                            {[1, 2, 3, 4, 5].map(star => (
                                                                                <span key={star} className="star">★</span>
                                                                            ))}
                                                                        </div>
                                                                        <span className="rating-value">4.8</span>
                                                                    </div>
                                                                    <div className="category-tag">
                                                                        {product.category || 'Electronics'}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="product-action">
                                                                <div className="action-btn">
                                                                    <span className="btn-text">View Details</span>
                                                                    <span className="btn-icon">→</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <div className="no-products-section">
                                        <div className="no-products-content">
                                            <div className="no-products-icon">📦</div>
                                            <h3 className="no-products-title">No Products Found</h3>
                                            <p className="no-products-text">
                                                Try adjusting your search criteria or browse all categories.
                                            </p>
                                            <Button
                                                type="primary"
                                                onClick={resetFilters}
                                                className="reset-search-button"
                                            >
                                                Reset Search
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <Cart />
        </div>
    );
};

export default IndieSemicProduct;