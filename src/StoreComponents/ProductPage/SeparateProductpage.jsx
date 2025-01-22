import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/ProductSeparatePage.css"
import { Row, Col } from "antd";
const SeparateProductPage = () => {


    const location = useLocation();
    const { product } = location.state || {};
    const [mainImage, setMainImage] = useState(product.mainImages[0]);
    return (
        <>
            <section id="ProductSeparatePage">
                <div>
                    {product ? (
                        <>
                            <div>
                                <Row>
                                    <Col lg={12}>
                                        <div className="ImagesSection">
                                            {/* View Images */}
                                            <div className="SideSmallImagesContainer">
                                                <div className="view-images">
                                                    {product.viewImages.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt={`View ${index}`}
                                                            className="view-image"
                                                            onClick={() => setMainImage(image)} // Update main image on click
                                                            style={{ cursor: "pointer", border: mainImage === image ? "2px solid blue" : "none" }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Main Image */}
                                            <div className="main-images">
                                                {mainImage && <img src={mainImage} alt="Main Image" className="main-image" />}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <h2>{product.title}</h2>
                                        {/* <p>{product.description}</p> */}
                                        <ul>
                                            {product.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>

                                        <h4>Main Images:</h4>
                                    </Col>
                                </Row>




                            </div>
                        </>
                    ) : (
                        <p>No product found</p>
                    )}
                </div>
            </section>
        </>
    )
}
export default SeparateProductPage 