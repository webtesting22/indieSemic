import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../Styles/ProductSeparatePage.css";
import { Row, Col, Tabs, Image, Button, notification, message, InputNumber, Modal } from "antd";
import { FiCopy, FiCheck } from "react-icons/fi";
import ProductContext from "../Context/ProductContext";
import { FaShoppingCart, FaPhone } from "react-icons/fa";
import Cart from "../Cart/Cart";
import GetQuotationModal from "./GetQuatationModal";
import {
    ZoomInOutlined,
    PlayCircleOutlined,
    InfoCircleOutlined,
    FileTextOutlined,
    SettingOutlined,
    DownloadOutlined,
    AppstoreOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import {
    FaHeart,
    FaStar,
    FaCheckCircle,
    FaTruck,
    FaShieldAlt,
    FaPhoneAlt
} from "react-icons/fa";

import { GrTechnology } from "react-icons/gr";
import { GiIndiaGate } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";

import ContactHome from "../../Components/ContactHome/ContactHome";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const { TabPane } = Tabs;
const SeparateProductPage = () => {
    const { products, addToCart, cartItems, fetchProducts } = useContext(ProductContext);
    // console.log('name', name)
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [copiedProductId, setCopiedProductId] = useState(null);
    const [buttonText, setButtonText] = useState("Add To Cart");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [variants, setVariants] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);

    // Listen for quantity changes from cart
    useEffect(() => {
        const handleQuantityUpdate = (event) => {
            if (product && event.detail.productId === product._id) {
                setQuantity(event.detail.quantity);
            }
        };

        window.addEventListener('quantityUpdated', handleQuantityUpdate);
        return () => {
            window.removeEventListener('quantityUpdated', handleQuantityUpdate);
        };
    }, [product]);

    // Get initial quantity from cart
    useEffect(() => {
        const cartItem = cartItems.find(item => item._id === product?._id);
        if (cartItem) {
            const storedQuantities = JSON.parse(localStorage.getItem("cartQuantities")) || {};
            setQuantity(storedQuantities[product._id] || 1);
        } else {
            setQuantity(1);
        }
    }, [product, cartItems]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const apibaseUrl = import.meta.env.VITE_BASE_URL;

    const isProductInCart = cartItems.some(item => item._id === product?._id);
    // Sync button state with cart content
    useEffect(() => {
        if (isProductInCart) {
            setButtonText("Product Added");
            setIsButtonDisabled(true);
        } else {
            setButtonText("Add to Cart");
            setIsButtonDisabled(false);
        }
    }, [isProductInCart]);

    const handleQuantityChange = (value) => {
        // Determine max quantity based on product type
        const maxQuantity = product?.title?.startsWith('EVK') ? 10 : 20;
        
        if (value > maxQuantity) {
            message.error(`Quantity cannot exceed ${maxQuantity}!`);
            return;
        }
        setQuantity(value);

        // If product is in cart, update cart quantities
        if (isProductInCart) {
            const storedQuantities = JSON.parse(localStorage.getItem("cartQuantities")) || {};
            const newQuantities = { ...storedQuantities, [product._id]: value };
            localStorage.setItem("cartQuantities", JSON.stringify(newQuantities));

            // Dispatch event for real-time update
            window.dispatchEvent(new CustomEvent('quantityUpdated', {
                detail: {
                    productId: product._id,
                    quantity: value
                }
            }));
        }
    };

    const handleAddToCart = (product) => {
        // Add to cart with current quantity
        addToCart(product);

        // Save quantity to localStorage
        const storedQuantities = JSON.parse(localStorage.getItem("cartQuantities")) || {};
        const newQuantities = { ...storedQuantities, [product._id]: quantity };
        localStorage.setItem("cartQuantities", JSON.stringify(newQuantities));

        // Dispatch event for real-time update
        window.dispatchEvent(new CustomEvent('quantityUpdated', {
            detail: {
                productId: product._id,
                quantity: quantity
            }
        }));

        notification.success({
            message: "Product Added",
            description: `${product.title} has been added to your cart.`,
            placement: "topRight",
        });
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${apibaseUrl}/indieSemic/getAllProducts?id=${id}`);
                const data = await response.json();
                setProduct(data.product);
                setSelectedImage(data.product.mainImages?.[0] || null);
                if (data.variants) {
                    setVariants(data.variants.filter((v) => v._id !== id));
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        // const fetchAllProducts = async () => {
        //     try {
        //         const response = await fetch(`${apibaseUrl}/indieSemic/getAllProducts`);
        //         const data = await response.json();
        //         if (data.products) {
        //             setAllProducts(data.products.filter((p) => p._id !== id));
        //         }
        //     } catch (error) {
        //         console.error("Error fetching all products:", error);
        //     }
        // };

        fetchProductDetails();
        // fetchAllProducts();
    }, [id]);


    const isImageFile = (url) => {
        return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
    };

    const isYouTubeLink = (url) => {
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(url);
    };

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return "";
        let embedUrl = "";

        if (url.includes("watch?v=")) {
            embedUrl = url.replace("watch?v=", "embed/");
        } else if (url.includes("youtu.be/")) {
            embedUrl = url.replace("youtu.be/", "youtube.com/embed/");
        } else {
            embedUrl = url;
        }

        // Append `?rel=0` to disable related videos from other channels
        return embedUrl.includes("?") ? `${embedUrl}&rel=0` : `${embedUrl}?rel=0`;
    };


    if (!product) {
        return <h2></h2>;
    }


    const thumbnails = [product.mainImages?.[0], ...(product.mainImages || [])];
    const handleCopy = (productId) => {
        const productUrl = `${window.location.origin}/product/${productId}`;

        navigator.clipboard.writeText(productUrl).then(() => {
            setCopiedProductId(productId); // update state to show "Copied!"
            message.success('Link Copied to clipboard', 1.5); // antd message
            setTimeout(() => {
                setCopiedProductId(null);
            }, 2000);
        });
    };

    const showContactModal = () => {
        setIsContactModalVisible(true);
    };

    const handleContactModalCancel = () => {
        setIsContactModalVisible(false);
    };

    const handleContactClick = () => {
        window.location.href = 'tel:+917600460240';
    };

    // Extract base name (first two segments) for EVK matching
    const baseNameMatch = product.title.match(/^([^-]+-[^-]+)/);
    const baseName = baseNameMatch ? baseNameMatch[1] : product.title;

    const evkVariants = variants?.filter(variant => variant.title?.startsWith('EVK'));

    // Get related products by category (excluding the current product)
    const relatedProducts = products.filter(
        (p) =>
            p._id !== product?._id &&
            Array.isArray(p.category) &&
            product.category &&
            p.category.some((cat) => product.category.includes(cat))
    );

    // If no related products, fallback to all products (excluding the current product)
    const productsToShow =
        relatedProducts.length > 0
            ? relatedProducts
            : products.filter((p) => p._id !== product?._id);

    return (
        <section id="ProductSeparatePage" className="enhanced-product-page">



            {evkVariants && evkVariants.length > 0 && (
                <>
                    <button
                        className={`variant-toggle-btn ${!isSidebarVisible ? 'show' : ''}`}
                        onClick={toggleSidebar}
                        aria-label={isSidebarVisible ? "Hide product suggestions" : "Show product suggestions"}
                        title={isSidebarVisible ? "Hide product suggestions" : "Show product suggestions"}
                    >
                        {isSidebarVisible ? <LeftOutlined /> : <RightOutlined />}
                    </button>
                    <div className={`variant-suggestion-wrapper ${!isSidebarVisible ? 'hidden' : ''}`}>
                        <h3 className="variant-heading">
                            {product?.title?.startsWith('EVK') ? 'Base Module' : 'Evaluation Boards'}
                        </h3>
                        <div className="variant-list">
                            {evkVariants
                                .filter(variant =>
                                    product?.title?.startsWith('EVK')
                                        ? !variant.title?.startsWith('EVK') // If current is EVK, show only non-EVK
                                        : variant.title?.startsWith('EVK')  // If current is not EVK, show only EVK
                                )
                                .map((variant) => (
                                    <Link
                                        key={variant._id}
                                        to={`/product/${variant._id}`}
                                        className="variant-card"
                                    >
                                        <img
                                            src={variant.mainImages?.[0] || 'default-image.jpg'}
                                            alt={variant.title}
                                            className="variant-image"
                                        />
                                        <div className="variant-info">
                                            <h4>{variant.title}</h4>
                                            <p>₹{variant.price?.toLocaleString()}</p>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </>
            )}

            <div className="product-container">
                {/* Enhanced Breadcrumb Section */}
                <div className="breadcrumb-section">
                    <div className="breadcrumb-content">
                        <span>
                            <Link to="/iot-modules" className="breadcrumb-link">All Products</Link>
                            <span className="breadcrumb-separator"> {">"} </span>
                            <span className="breadcrumb-current">{product.title}</span>
                        </span>
                    </div>
                </div>

                {/* Main Product Section */}
                <div className="product-main-section">
                    <Row gutter={[32, 32]}>
                        {/* Enhanced Image Gallery */}
                        <Col lg={12} md={24} style={{ width: "100%" }}>
                            <div className="image-gallery-container">
                                <div className="main-image-wrapper">
                                    <div className="main-image-container">
                                        {isYouTubeLink(selectedImage) ? (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={getYouTubeEmbedUrl(selectedImage)}
                                                title="YouTube video"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <>
                                                <Image
                                                    src={selectedImage || "default-image.jpg"}
                                                    alt={product?.title}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                                <div className="image-overlay">
                                                    <ZoomInOutlined style={{ fontSize: '24px' }} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Enhanced Thumbnail Grid */}
                                <div className="thumbnail-grid">
                                    {thumbnails.map((thumb, idx) => (
                                        <div
                                            key={idx}
                                            className={`thumbnail-item ${selectedImage === thumb ? 'active' : ''}`}
                                            onMouseEnter={() => setSelectedImage(thumb)}
                                            onClick={() => window.scrollTo(0, 0)}
                                        >
                                            {isImageFile(thumb) ? (
                                                <img
                                                    src={thumb}
                                                    alt={`thumb-${idx}`}
                                                />
                                            ) : isYouTubeLink(thumb) ? (
                                                <>
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={getYouTubeEmbedUrl(thumb)}
                                                        title={`video-thumb-${idx}`}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                    <div className="video-overlay">
                                                        <PlayCircleOutlined />
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>

                        <Cart />

                        {/* Enhanced Product Info */}
                        <Col lg={12} md={24}>
                            <div className="product-info-section">
                                {/* Enhanced Product Header */}
                                <div className="product-header">
                                    <button

                                        onClick={() => handleCopy(product._id)} style={{ cursor: 'pointer' }}
                                        className="share-button"
                                    >
                                        {copiedProductId === product._id ? (
                                            <>
                                                <FiCheck />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <FiCopy />
                                                <span>Share</span>
                                            </>
                                        )}
                                    </button>

                                    <div className="product-title-section">
                                        <h1 className="product-title">{product.title || "No Title"}</h1>
                                        <h2 className="product-tagline">{product.tagline || "No Tagline"}</h2>
                                    </div>

                                    {/* Product Meta Info */}
                                    <div className="product-meta">
                                        {/* <div className="rating-section">
                                            <div className="stars">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar key={star} className="star-icon filled" />
                                                ))}
                                            </div>
                                            <span className="rating-text">4.8 (124 reviews)</span>
                                        </div> */}

                                        <div className="availability-section">
                                            {product.stock > 0 ? (
                                                <>
                                                    <FaCheckCircle className="availability-icon" />
                                                    <span className="availability-text">In Stock - Ready to Ship</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaCheckCircle className="availability-icon" style={{ color: '#ff4d4f' }} />
                                                    <span className="availability-text" style={{ color: '#ff4d4f' }}>Will be in stock soon</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Product Description */}
                                <div className="product-description-section">
                                    {product.productDescription && (
                                        <div
                                            className="product-description"
                                            dangerouslySetInnerHTML={{ __html: product.productDescription }}
                                        />
                                    )}
                                </div>

                                {/* Trust Badges */}
                                <div className="trust-badges">
                                    <div className="trust-badge">
                                        <FaShieldAlt className="badge-icon" />
                                        <span>Quality Assured</span>
                                    </div>
                                    <div className="trust-badge">
                                        <GrTechnology className="badge-icon" />
                                        <span>Cutting Edge Technology</span>
                                    </div>
                                    <div className="trust-badge">
                                        <GiIndiaGate className="badge-icon" />
                                        <span>Made In India</span>
                                    </div>
                                </div>

                                <div className="price-container">
                                    <div className="price-row">
                                        <div className="price-group">
                                            <div className="original-price">
                                                <FaIndianRupeeSign className="rupee-icon" />
                                                <span>{product.price + 100}</span>
                                            </div>
                                            <div className="current-price">
                                                <FaIndianRupeeSign className="rupee-icon" />
                                                <span>{product.price}</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="price-info">
                                        <span className="gst-info">*Price excluding GST</span>
                                        <span className="savings">You save ₹{product.price + 100 - product.price}</span>
                                    </div>
                                </div>
                                <br /><br />
                                {/* Enhanced Action Buttons */}

                                {product.stock > 0 ? (
                                    <div className="action-buttons-section">
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <button
                                                    onClick={() => {
                                                        const maxQuantity = product?.title?.startsWith('EVK') ? 10 : 20;
                                                        handleQuantityChange(Math.max(1, quantity - 1));
                                                    }}
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
                                                    max={product?.title?.startsWith('EVK') ? 10 : 20}
                                                    value={quantity}
                                                    onChange={handleQuantityChange}
                                                    style={{
                                                        width: "80px",
                                                        margin: "0 8px",
                                                        textAlign: "center"
                                                    }}
                                                    controls={false}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const maxQuantity = product?.title?.startsWith('EVK') ? 10 : 20;
                                                        handleQuantityChange(Math.min(maxQuantity, quantity + 1));
                                                    }}
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
                                            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                                                Max quantity: {product?.title?.startsWith('EVK') ? '10' : '20'}
                                            </div>
                                        </div>

                                        <div className="primary-actions">

                                            <>

                                                <Button
                                                    type="primary"
                                                    onClick={() => handleAddToCart(product)}
                                                    className="enhanced-add-to-cart-btn addToCart"
                                                    disabled={isProductInCart}
                                                >
                                                    <FaShoppingCart className="cart-icon" />
                                                    <span className="button-text">
                                                        {isProductInCart ? "Product Added" : "Add to Cart"}
                                                    </span>
                                                </Button>
                                            </>




                                            <div className="secondary-action">
                                                <GetQuotationModal />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="primary-actions">
                                        <Button
                                            type="primary"
                                            onClick={handleContactClick}
                                            className="enhanced-add-to-cart-btn"
                                            style={{
                                                backgroundColor: '#ff4d4f',
                                                borderColor: '#ff4d4f',
                                                height: '48px',
                                                fontSize: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            <FaPhoneAlt style={{ fontSize: '18px' }} />
                                            <span>Contact US</span>
                                        </Button>
                                        <div className="secondary-action">
                                            <GetQuotationModal />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Enhanced Tabs Section */}
                <div className="product-tabs-section">
                    <div className="tabs-container">
                        <Tabs defaultActiveKey="1" className="enhanced-tabs">
                            {[
                                {
                                    key: "1",
                                    title: "Overview",
                                    content: product?.tabs?.overview,
                                    icon: <InfoCircleOutlined />
                                },
                                {
                                    key: "2",
                                    title: "Specifications",
                                    content: product?.tabs?.specifications,
                                    icon: <FileTextOutlined />
                                },
                                {
                                    key: "3",
                                    title: "Pin Layout",
                                    content: product?.tabs?.pinLayout,
                                    icon: <SettingOutlined />
                                },
                                {
                                    key: "4",
                                    title: "Downloads",
                                    content: product?.tabs?.downloadsDocuments?.length > 0
                                        ? product.tabs.downloadsDocuments
                                        : null,
                                    icon: <DownloadOutlined />
                                },
                                {
                                    key: "5",
                                    title: "Related Products",
                                    content: product?.tabs?.relatedProducts?.length > 0
                                        ? product.tabs.relatedProducts
                                        : null,
                                    icon: <AppstoreOutlined />
                                },
                            ].map(
                                (tab) =>
                                    tab.content && (
                                        <TabPane
                                            tab={
                                                <span className="tab-label">
                                                    {tab.icon}
                                                    {tab.title}
                                                </span>
                                            }
                                            key={tab.key}
                                        >
                                            {tab.key === "1" ? (
                                                <div className="TabDescriptionContainer">
                                                    <div className="overview-image-container">
                                                        <img
                                                            src={tab.content}
                                                            alt="Overview"
                                                            className="overview-image"
                                                        />
                                                    </div>
                                                </div>
                                            ) : tab.key === "2" && Array.isArray(tab.content) ? (
                                                <div className="TabDescriptionContainer" style={{ display: "flex", justifyContent: "center" }}>
                                                    <div
                                                        className="spec-html-table"
                                                        dangerouslySetInnerHTML={{ __html: tab.content.join('') }}
                                                    />
                                                </div>
                                            ) : tab.key === "3" && Array.isArray(tab.content) ? (
                                                <div className="TabDescriptionContainer">
                                                    <div className="pinlayout-grid">
                                                        {tab.content.map((item, idx) => {
                                                            if (item.type === "image") {
                                                                return (
                                                                    <div key={idx} className="pinlayout-image-container">
                                                                        <img
                                                                            src={item.value}
                                                                            alt={`pin-layout-${idx}`}
                                                                            className="pinlayout-image"
                                                                        />
                                                                    </div>
                                                                );
                                                            } else if (item.type === "html") {
                                                                return (
                                                                    <div
                                                                        key={idx}
                                                                        className="pinlayout-html-table"
                                                                        dangerouslySetInnerHTML={{ __html: item.value }}
                                                                    />
                                                                );
                                                            } else {
                                                                return null;
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            )

                                                : tab.key === "4" ? (
                                                    <div className="TabDescriptionContainer">
                                                        <div className="downloads-list">
                                                            {product.tabs.downloadsDocuments.map((download, idx) => (
                                                                <div key={idx} className="download-item-enhanced">
                                                                    <Row gutter={[20, 16]} align="middle">
                                                                        <Col lg={16} xs={24}>
                                                                            <div className="download-info">
                                                                                <FileTextOutlined className="download-icon" />
                                                                                <div className="download-details">
                                                                                    <span className="download-name">
                                                                                        {idx + 1}. {download.name}
                                                                                    </span>
                                                                                    <span className="download-meta">PDF Document</span>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col lg={8} xs={24}>
                                                                            <a
                                                                                href={download.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="download-button-enhanced"
                                                                            >
                                                                                <DownloadOutlined />
                                                                                <span>Download</span>
                                                                            </a>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : tab.key === "5" ? (
                                                    <div className="TabDescriptionContainer">
                                                        <div className="related-products-section">
                                                            <h3 className="related-title">All Products</h3>

                                                            {/* Desktop Grid Layout */}
                                                            <div className="desktop-related-products">
                                                                <Row gutter={[24, 24]}>
                                                                    {productsToShow.slice(0, 50).map((related, idx) => (
                                                                        <Col key={idx} lg={6} md={8} sm={24} xs={24} style={{ width: "100%" }}>
                                                                            <Link
                                                                                to={`/product/${related._id}`}
                                                                                onClick={() => window.scrollTo(0, 0)}
                                                                                className="related-product-card-enhanced"
                                                                            >
                                                                                <div className="related-image-container">
                                                                                    <img
                                                                                        src={related.mainImages?.[0] || "default-image.jpg"}
                                                                                        alt={related.title}
                                                                                        className="related-product-image"
                                                                                    />
                                                                                    <div className="related-overlay">
                                                                                        <span>View Product</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="related-product-info">
                                                                                    <h4 className="related-product-title">{related.title}</h4>
                                                                                    <div className="related-price-section">
                                                                                        <span style={{ textDecoration: "line-through", color: "#6c757d" }}>₹{related.price ? (related.price + 100).toLocaleString() : '-'}</span>

                                                                                        <span className="related-price">₹{related.price?.toLocaleString()}</span>
                                                                                        {/* <div className="related-rating">
                                                                                        <FaStar className="star-mini" />
                                                                                        <span>4.5</span>
                                                                                    </div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        </Col>
                                                                    ))}
                                                                </Row>
                                                            </div>

                                                            {/* Mobile Swiper Carousel */}
                                                            <div className="mobile-related-products">
                                                                <Swiper
                                                                    modules={[Autoplay, Navigation, Pagination]}
                                                                    spaceBetween={16}
                                                                    slidesPerView={1.2}
                                                                    navigation={true}
                                                                    pagination={{ clickable: true }}
                                                                    autoplay={{
                                                                        delay: 2000,
                                                                        disableOnInteraction: false,
                                                                    }}
                                                                    loop={true}
                                                                    className="related-products-swiper"
                                                                >
                                                                    {productsToShow.slice(0, 20).map((related, idx) => (
                                                                        <SwiperSlide key={idx}>
                                                                            <Link
                                                                                to={`/product/${related._id}`}
                                                                                onClick={() => window.scrollTo(0, 0)}
                                                                                className="related-product-card-enhanced"
                                                                            >
                                                                                <div className="related-image-container">
                                                                                    <img
                                                                                        src={related.mainImages?.[0] || "default-image.jpg"}
                                                                                        alt={related.title}
                                                                                        className="related-product-image"
                                                                                    />
                                                                                    <div className="related-overlay">
                                                                                        <span>View Product</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="related-product-info">
                                                                                    <h4 className="related-product-title">{related.title}</h4>
                                                                                    <div className="related-price-section">
                                                                                        <span style={{ textDecoration: "line-through", color: "#6c757d" }}>₹{related.price ? (related.price + 100).toLocaleString() : '-'}</span>

                                                                                        <span className="related-price">₹{related.price?.toLocaleString()}</span>
                                                                                        {/* <div className="related-rating">
                                                                                        <FaStar className="star-mini" />
                                                                                        <span>4.5</span>
                                                                                    </div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        </SwiperSlide>
                                                                    ))}
                                                                </Swiper>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="TabDescriptionContainer">
                                                        <p className="tab-content-text">{tab.content}</p>
                                                    </div>
                                                )}
                                        </TabPane>
                                    )
                            )}
                        </Tabs>
                    </div>
                </div>
                <div>
                    <ContactHome />
                </div>
            </div>

            {/* Add Contact Modal */}
            <Modal
                title="Contact Us"
                open={isContactModalVisible}
                onCancel={handleContactModalCancel}
                footer={null}
                width={1000}
                style={{ top: 20 }}
            >
                <ContactHome />
            </Modal>
        </section>
    );
};

export default SeparateProductPage;


