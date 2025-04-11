import React from "react";
import { Link } from "react-router-dom";
import TopContainerBanner from "../../CommonComponents/Navigationdata/TopContainerBanner";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";
import "../../Styles/Product.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Row, Col } from "antd";
import { useProductContext } from "../Context/ProductContext";

const IndieSemicProduct = () => {
    const { products } = useProductContext();
    const productList = products?.products || [];

    return (
        <>
            <TopContainerBanner
                image="https://plus.unsplash.com/premium_photo-1681426694953-4d78658193dc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                DynamicHeading="Store"
                icon={<LocalGroceryStoreSharpIcon style={{ color: "#fff" }} />}
                link="Products"
            />
            <section className="AllProductsContainer section_Padding">
                <Row gutter={[16, 16]}>
                    {productList.length > 0 ? (
                        productList.map((product) => (
                            <Col lg={8} md={12} sm={24} key={product._id}>
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
                                            <h2 className="ProductTitle">{product.title}</h2>
                                            <br />
                                            <p className="tagline">{product.tagline || "No tagline available"}</p>
                                            {/* <p className="price">₹{product.price}</p> */}
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
            </section>
        </>
    );
};

export default IndieSemicProduct;
