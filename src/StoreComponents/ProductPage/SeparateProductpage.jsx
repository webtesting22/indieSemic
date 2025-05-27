import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../Styles/ProductSeparatePage.css";
import { Row, Col, Tabs, Image, Button, notification, message } from "antd";
import { FiCopy, FiCheck } from "react-icons/fi";
import ProductContext from "../Context/ProductContext";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Cart/Cart";
import GetQuotationModal from "./GetQuatationModal";
import {
    ZoomInOutlined,
    PlayCircleOutlined,
    InfoCircleOutlined,
    FileTextOutlined,
    SettingOutlined,
    DownloadOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import {
    FaHeart,
    FaStar,
    FaCheckCircle,
    FaTruck,
    FaShieldAlt
} from "react-icons/fa";
import ContactHome from "../../Components/ContactHome/ContactHome";
const { TabPane } = Tabs;
const SeparateProductPage = () => {
    const { products, addToCart, cartItems } = useContext(ProductContext);
    // console.log('name', name)
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [copiedProductId, setCopiedProductId] = useState(null);
    const [buttonText, setButtonText] = useState("Add To Cart");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const apibaseUrl = import.meta.env.VITE_BASE_URL;
    const handleCopyLink = (e, productId) => {
        e.preventDefault();
        const url = `${window.location.origin}/product/${productId}`;
        navigator.clipboard.writeText(url);
        setCopiedProductId(productId);
        setTimeout(() => setCopiedProductId(null), 1500);
    };

    const handleAddToCart = (product) => {
        addToCart(product);

        // Disable the button and change the text
        setButtonText("Product Added");
        setIsButtonDisabled(true);

        // Show a success notification
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
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`${apibaseUrl}/indieSemic/getAllProducts`);
                const data = await response.json();
                if (data.products) {
                    setAllProducts(data.products.filter((p) => p._id !== id));
                }
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };

        fetchProductDetails();
        fetchAllProducts();
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
    const isProductInCart = cartItems.some(item => item._id === product?._id);

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

    return (
        <section id="ProductSeparatePage" className="enhanced-product-page">
            <div className="product-container">
                {/* Enhanced Breadcrumb Section */}
                <div className="breadcrumb-section">
                    <div className="breadcrumb-content">
                        <span>
                            <Link to="/product" className="breadcrumb-link">All Products</Link>
                            <span className="breadcrumb-separator"> {">"} </span>
                            <span className="breadcrumb-current">{product.title}</span>
                        </span>
                    </div>
                </div>

                {/* Main Product Section */}
                <div className="product-main-section">
                    <Row gutter={[32, 32]}>
                        {/* Enhanced Image Gallery */}
                        <Col lg={12} md={24}>
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
                                    {/* <div className="product-meta">
                                        <div className="rating-section">
                                            <div className="stars">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar key={star} className="star-icon filled" />
                                                ))}
                                            </div>
                                            <span className="rating-text">4.8 (124 reviews)</span>
                                        </div>

                                        <div className="availability-section">
                                            <FaCheckCircle className="availability-icon" />
                                            <span className="availability-text">In Stock - Ready to Ship</span>
                                        </div>
                                    </div> */}
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
                                        {/* <span>2 Year Warranty</span> */}
                                    </div>
                                    <div className="trust-badge">
                                        <FaTruck className="badge-icon" />
                                        {/* <span>Free Shipping</span> */}
                                    </div>
                                    <div className="trust-badge">
                                        <FaCheckCircle className="badge-icon" />
                                        {/* <span>Quality Assured</span> */}
                                    </div>
                                </div>

                                {/* Enhanced Action Buttons */}
                                <div className="action-buttons-section">
                                    <div className="primary-actions">
                                        <Button
                                            type="primary"
                                            onClick={() => handleAddToCart(product)}
                                            className="enhanced-add-to-cart-btn"
                                            disabled={isButtonDisabled || isProductInCart}
                                        >
                                            <FaShoppingCart className="cart-icon" />
                                            <span className="button-text">
                                                {isProductInCart ? "Product Added" : buttonText}
                                            </span>
                                        </Button>

                                        <div className="secondary-action">
                                            <GetQuotationModal />
                                        </div>
                                    </div>

                                    {/* <div className="wishlist-section">
                                        <button className="wishlist-btn">
                                            <FaHeart />
                                            <span>Add to Wishlist</span>
                                        </button>
                                    </div> */}
                                </div>
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
                                                <div className="TabDescriptionContainer">
                                                    <div className="specifications-grid">
                                                        {tab.content.map((img, idx) => (
                                                            <div key={idx} className="spec-image-container">
                                                                <img
                                                                    src={img}
                                                                    alt={`spec-${idx}`}
                                                                    className="spec-image"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : tab.key === "3" && Array.isArray(tab.content) ? (
                                                <div className="TabDescriptionContainer">
                                                    <div className="pinlayout-grid">
                                                        {tab.content.map((img, idx) => (
                                                            <div key={idx} className="pinlayout-image-container">
                                                                <img
                                                                    src={img}
                                                                    alt={`pin-layout-${idx}`}
                                                                    className="pinlayout-image"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : tab.key === "4" ? (
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
                                                        <h3 className="related-title">You might also like</h3>
                                                        <Row gutter={[24, 24]}>
                                                            {allProducts.map((related, idx) => (
                                                                <Col key={idx} lg={6} md={8} sm={12} xs={12}>
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
                                                                                <span className="related-price">₹{related.price?.toLocaleString()}</span>
                                                                                <div className="related-rating">
                                                                                    <FaStar className="star-mini" />
                                                                                    <span>4.5</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </Col>
                                                            ))}
                                                        </Row>
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
        </section>
    );
};

export default SeparateProductPage;


