import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Styles/ProductSeparatePage.css";
import { Row, Col, Tabs } from "antd";

const { TabPane } = Tabs;

const SeparateProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4040/api/indieSemic/getAllProducts?id=${id}`);
                const data = await response.json();
                console.log("Fetched Product Data:", data);
                setProduct(data.product);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <h2>Loading Product...</h2>;
    }

    return (
        <section id="ProductSeparatePage">
            <div className="TopImagemainContainer">
                <div>
                    <Row gutter={[16, 16]}>
                        <Col lg={10} md={24}>
                            <div className="mainImageContainer">
                                <img src={product?.mainImages?.[0] || "default-image.jpg"} alt={product?.title} style={{ width: "100%" }} />
                            </div>
                        </Col>
                        <Col lg={14} md={24}>
                            <div className="ProductDetailsContainer">
                                <h1 className="ProductTitle">{product?.title || "No Title"}</h1>
                                <h2 className="tagline">{product?.tagline || "No Tagline"}</h2>
                                {product?.tabs?.product_description && (
                                    <p className="Description" dangerouslySetInnerHTML={{ __html: product.tabs.product_description }} />
                                )}
                                {/* <p className="price">₹{product?.price || "N/A"}</p> */}


                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="ProductDescriptionContainer">
                <div>
                    <Tabs defaultActiveKey="1">
                        {[
                            { key: "1", title: "Specifications", content: product?.tabs?.product_specification },
                            { key: "2", title: "Description", content: product?.tabs?.product_description },
                            { key: "3", title: "Downloads", content: product?.tabs?.downloads?.length > 0 ? product.tabs.downloads : null },
                            { key: "4", title: "Related Products", content: product?.tabs?.related_products?.length > 0 ? product.tabs.related_products : null }
                        ].map(
                            (tab) =>
                                tab.content && (
                                    <TabPane tab={tab.title} key={tab.key}>
                                        {/* <div>
                                            <h1>{tab.title}</h1>
                                        </div> */}
                                        {tab.key === "3" ? (
                                            <div className="TabDescriptionContainer">
                                                <ul>
                                                    {product.tabs.downloads.map((download) => (
                                                        <li key={download._id}>
                                                            <a href={download.url} target="_blank" rel="noopener noreferrer">
                                                                {download.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : tab.key === "4" ? (
                                            <div className="TabDescriptionContainer">
                                                <ul>
                                                    {product.tabs.related_products.map((related) => (
                                                        <li key={related._id}>
                                                            <a href={related.link}>{related.title} - ₹{related.price}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className="TabDescriptionContainer">
                                                <div dangerouslySetInnerHTML={{ __html: tab.content }} />
                                            </div>
                                        )}
                                    </TabPane>
                                )
                        )}
                    </Tabs>

                </div>
            </div>
        </section>
    );
};

export default SeparateProductPage;