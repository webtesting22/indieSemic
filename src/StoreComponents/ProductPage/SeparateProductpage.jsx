import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Styles/ProductSeparatePage.css";
import { Row, Col, Tabs } from "antd";

const { TabPane } = Tabs;

const SeparateProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(
                    `https://testapi.prepseed.com/indieSemic/getAllProducts?id=${id}`
                );
                const data = await response.json();
                setProduct(data.product);
                setSelectedImage(data.product.mainImages?.[0] || null);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
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

    const thumbnails = [product.mainImages?.[0], ...(product.otherProductImages || [])];

    return (
        <section id="ProductSeparatePage">
            <div className="TopImagemainContainer">
                <Row gutter={[16, 16]}>
                    <Col lg={10} md={24}>
                        <div>
                            <div className="mainImageContainer">
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
                                    <img
                                        src={selectedImage || "default-image.jpg"}
                                        alt={product?.title}
                                        style={{ width: "100%", borderRadius: "8px" }}
                                    />
                                )}
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
                                {thumbnails.map((thumb, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            border:
                                                selectedImage === thumb
                                                    ? "2px solid #1890ff"
                                                    : "1px solid #ccc",
                                            borderRadius: "4px",
                                            overflow: "hidden",
                                            cursor: "pointer",
                                        }}
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
                                            />
                                        ) : isYouTubeLink(thumb) ? (
                                            <iframe
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
                                ))}
                            </div>
                        </div>
                    </Col>

                    <Col lg={14} md={24}>
                        <div className="ProductDetailsContainer">
                            <h1 className="ProductTitle">{product.title || "No Title"}</h1>
                            <h2 className="tagline">{product.tagline || "No Tagline"}</h2>
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
                            content:
                                product?.tabs?.downloadsDocuments?.length > 0
                                    ? product.tabs.downloadsDocuments
                                    : null,
                        },
                        {
                            key: "5",
                            title: "Related Products",
                            content:
                                product?.tabs?.relatedProducts?.length > 0
                                    ? product.tabs.relatedProducts
                                    : null,
                        },
                    ].map(
                        (tab) =>
                            tab.content && (
                                <TabPane tab={tab.title} key={tab.key}>
                                    {tab.key === "4" ? (
                                        <div className="TabDescriptionContainer">
                                            <ul>
                                                {product.tabs.downloadsDocuments.map((download, idx) => (
                                                    <li key={idx}>
                                                        <a
                                                            href={download.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {download.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : tab.key === "5" ? (
                                        <div className="TabDescriptionContainer">
                                            <ul>
                                                {product.tabs.relatedProducts.map((related, idx) => (
                                                    <li key={idx}>
                                                        <a href={related.link}>
                                                            {related.title} - ₹{related.price}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
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
        </section>
    );
};

export default SeparateProductPage;
