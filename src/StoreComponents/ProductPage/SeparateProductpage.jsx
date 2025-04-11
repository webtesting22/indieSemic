import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../Styles/ProductSeparatePage.css";
import { Row, Col, Tabs, Image } from "antd";
import { FiCopy, FiCheck } from "react-icons/fi";
const { TabPane } = Tabs;

const SeparateProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [copiedProductId, setCopiedProductId] = useState(null);

    const handleCopyLink = (e, productId) => {
        e.preventDefault();
        const url = `${window.location.origin}/product/${productId}`;
        navigator.clipboard.writeText(url);
        setCopiedProductId(productId);
        setTimeout(() => setCopiedProductId(null), 1500);
    };
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://testapi.prepseed.com/indieSemic/getAllProducts?id=${id}`);
                const data = await response.json();
                setProduct(data.product);
                setSelectedImage(data.product.mainImages?.[0] || null);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`https://testapi.prepseed.com/indieSemic/getAllProducts`);
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
        return <h2>Loading Product...</h2>;
    }

    const thumbnails = [product.mainImages?.[0], ...(product.mainImages || [])];

    return (
        <section id="ProductSeparatePage">
            <div className="TopImagemainContainer">
                <Row gutter={[16, 16]}>
                    <Col lg={10} md={24}>
                        <div>

                            <div className="mainImageContainer">
                                <div>
                                    {isYouTubeLink(selectedImage) ? (
                                        <iframe
                                            width="100%"
                                            height="400"
                                            src={getYouTubeEmbedUrl(selectedImage)}
                                            title="YouTube video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ borderRadius: "8px" }}
                                        ></iframe>
                                    ) : (
                                        <Image
                                            src={selectedImage || "default-image.jpg"}
                                            alt={product?.title}

                                            style={{ width: "100%", borderRadius: "8px" }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div
                                className="thumbnailRow"
                                style={{
                                    marginTop: "10px",
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap",
                                    justifyContent: "space-around",
                                }}
                            >
                                <Row style={{ width: "100%" }}>
                                    {thumbnails.map((thumb, idx) => (
                                        <Col lg={6} md={8}>
                                            <div
                                                key={idx}
                                                style={{
                                                    // width: "20%",
                                                    // height: "80px",
                                                    border:
                                                        selectedImage === thumb
                                                            ? "2px solid #1890ff"
                                                            : "1px solid #ccc",
                                                    borderRadius: "4px",
                                                    overflow: "hidden",
                                                    cursor: "pointer",
                                                }}
                                                id="ProductOtherImagesContainer"
                                                onMouseEnter={() => setSelectedImage(thumb)}
                                            >
                                                {isImageFile(thumb) ? (
                                                    <img
                                                        src={thumb}
                                                        alt={`thumb-${idx}`}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                        onClick={() => window.scrollTo(0, 0)}
                                                    />
                                                ) : isYouTubeLink(thumb) ? (
                                                    <iframe
                                                        onClick={() => window.scrollTo(0, 0)}
                                                        width="100%"
                                                        height="100%"
                                                        src={getYouTubeEmbedUrl(thumb)}
                                                        title={`video-thumb-${idx}`}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                ) : null}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </Col>

                    <Col lg={14} md={24}>
                        <div className="ProductDetailsContainer DesignedContainer">
                            <button
                                onClick={(e) => handleCopyLink(e, product._id)}
                                style={{
                                    padding: "6px 8px",
                                    backgroundColor: "black",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {copiedProductId === product._id ? (
                                    <>
                                        <FiCheck style={{ color: "white", transition: "0.3s" }} />

                                    </>
                                ) : (
                                    <>
                                        <FiCopy style={{ color: "white", transition: "0.3s" }} />

                                    </>
                                )}
                            </button>
                            <h2>{product.title || "No Title"}</h2>
                            <h1 className="tagline">{product.tagline || "No Tagline"}</h1>
                            {product.productDescription && (
                                <p
                                    className="Description"
                                    dangerouslySetInnerHTML={{ __html: product.productDescription }}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="ProductDescriptionContainer">
                <Tabs defaultActiveKey="1">
                    {[
                        { key: "1", title: "Overview", content: product?.tabs?.overview },
                        { key: "2", title: "Specifications", content: product?.tabs?.specifications },
                        { key: "3", title: "Pin Layout", content: product?.tabs?.pinLayout },
                        {
                            key: "4",
                            title: "Downloads",
                            content: product?.tabs?.downloadsDocuments?.length > 0
                                ? product.tabs.downloadsDocuments
                                : null,
                        },
                        {
                            key: "5",
                            title: "Related Products",
                            content: product?.tabs?.relatedProducts?.length > 0
                                ? product.tabs.relatedProducts
                                : null,
                        },
                    ].map(
                        (tab) =>
                            tab.content && (
                                <TabPane tab={tab.title} key={tab.key}>
                                    {tab.key === "1" ? (
                                        <div className="TabDescriptionContainer">
                                            <img
                                                src={tab.content}
                                                alt="Overview"
                                                style={{ width: "100%", maxWidth: "100%", objectFit: "contain" }}
                                            />
                                        </div>
                                    ) : tab.key === "2" && Array.isArray(tab.content) ? (
                                        <div className="TabDescriptionContainer">
                                            {tab.content.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`spec-${idx}`}
                                                    style={{ width: '100%', maxWidth: "100%", marginBottom: '1rem' }}
                                                />
                                            ))}
                                        </div>
                                    ) : tab.key === "3" && Array.isArray(tab.content) ? (
                                        <div className="TabDescriptionContainer">
                                            {tab.content.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`spec-${idx}`}
                                                    style={{ width: '100%', maxWidth: "100%", marginBottom: '1rem' }}
                                                />
                                            ))}
                                        </div>
                                    ) : tab.key === "4" ? (
                                        <div className="TabDescriptionContainer">
                                            {product.tabs.downloadsDocuments.map((download, idx) => (
                                                <Row
                                                    key={idx}
                                                    gutter={[16, 16]}
                                                    style={{
                                                        marginBottom: "12px",
                                                        padding: "12px 16px",
                                                        border: "1px solid #f0f0f0",
                                                        borderRadius: "8px",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Col lg={16} xs={24}>
                                                        <span style={{ fontWeight: "500" }}>{download.name}</span>
                                                    </Col>

                                                    <Col lg={8} xs={24}>
                                                        <a
                                                            href={download.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                padding: "6px 12px",
                                                                backgroundColor: "#1890ff",
                                                                color: "white",
                                                                borderRadius: "4px",
                                                                display: "inline-block",
                                                                textDecoration: "none",
                                                                fontWeight: "500"
                                                            }}
                                                        >
                                                            Download
                                                        </a>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </div>

                                    ) : tab.key === "5" ? (
                                        <div className="TabDescriptionContainer">
                                            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                                                {allProducts.map((related, idx) => (
                                                    <Col key={idx} lg={4} md={8} sm={12} xs={12}>
                                                        <Link
                                                            to={`/product/${related._id}`}
                                                            onClick={() => window.scrollTo(0, 0)}
                                                            style={{
                                                                display: "block",
                                                                border: "1px solid #f0f0f0",
                                                                borderRadius: "8px",
                                                                overflow: "hidden",
                                                                textDecoration: "none",
                                                                color: "inherit",
                                                                transition: "box-shadow 0.2s",
                                                            }}
                                                        >
                                                            <div style={{ height: "180px", overflow: "hidden" }}>
                                                                <img
                                                                    src={related.mainImages?.[0] || "default-image.jpg"}
                                                                    alt={related.title}
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                            </div>
                                                            <div style={{ padding: "10px" }}>
                                                                <h4 style={{ marginBottom: "4px" }}>{related.title}</h4>
                                                                <p style={{ margin: 0, fontWeight: "bold", color: "#1890ff" }}>
                                                                    ₹{related.price}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>

                                    ) : (
                                        <div className="TabDescriptionContainer">
                                            <p>{tab.content}</p>
                                        </div>
                                    )}
                                </TabPane>
                            )
                    )}
                </Tabs>

            </div>
        </section >
    );
};

export default SeparateProductPage;
