import React, { useState } from "react";
import TopContainerBanner from "../../CommonComponents/Navigationdata/TopContainerBanner";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";
import { Row, Col, Card } from "antd";
import { useProductContext } from "../Context/ProductContext";
import "../../Styles/Product.css";
import CompareArrowsSharpIcon from "@mui/icons-material/CompareArrowsSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
const IndieSemicProduct = () => {
    const { products } = useProductContext();

    // State to manage icons for each product
    const [compareStates, setCompareStates] = useState({});
    const [favoriteStates, setFavoriteStates] = useState({});

    // Toggle Compare Icon
    const toggleCompareIcon = (productId) => {
        setCompareStates((prev) => ({
            ...prev,
            [productId]: !prev[productId], // Toggle the current product's state
        }));
    };

    // Toggle Favorite Icon
    const toggleFavoriteIcon = (productId) => {
        setFavoriteStates((prev) => ({
            ...prev,
            [productId]: !prev[productId], // Toggle the current product's state
        }));
    };

    return (
        <>
            <TopContainerBanner
                image="https://plus.unsplash.com/premium_photo-1681426694953-4d78658193dc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                DynamicHeading="Store"
                icon={<LocalGroceryStoreSharpIcon style={{ fontSize: "", color: "#fff" }} />}
                link="Products"
            />
            <section className="section_Padding">
                <div style={{ padding: "20px" }}>
                    <Row>
                        {products.map((product) => (
                            <Col lg={6} md={8} key={product.id}>
                                <div className="ProductCard">
                                    <div className="HoverableButtons">
                                        {/* Compare Button */}
                                        <div
                                            className="CompareButton"
                                            onClick={() => toggleCompareIcon(product.id)}
                                            style={{
                                                cursor: "pointer",
                                                transition: "transform 0.3s",
                                            }}
                                        >
                                            {compareStates[product.id] ? (
                                                <DoneSharpIcon />
                                            ) : (
                                                <CompareArrowsSharpIcon />
                                            )}
                                        </div>

                                        {/* Wishlist Button */}
                                        <div
                                            className="WishListButton"
                                            onClick={() => toggleFavoriteIcon(product.id)}
                                            style={{
                                                cursor: "pointer",
                                                transition: "transform 0.3s",
                                            }}
                                        >
                                            {favoriteStates[product.id] ? (
                                                <DoneSharpIcon />
                                            ) : (
                                                <FavoriteBorderSharpIcon />
                                            )}
                                        </div>
                                    </div>
                                    <div className="CombineContainer">
                                        <div>
                                            <div className="ImageContainer">
                                                <img alt={product.title} src={product.image} />
                                            </div>
                                            <div className="ProducardContent">
                                                <div className="AddToCardBtn">
                                                    <button className="cart-button">
                                                        <span className="cart-text">Add To Cart</span>
                                                        <span className="cart-icon" >
                                                           <ShoppingCartSharpIcon/>{/* FontAwesome cart icon */}
                                                        </span>
                                                    </button>
                                                </div>
                                                <h4>{product.title}</h4>
                                                <h5>{` $${product.price}`}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </>
    );
};

export default IndieSemicProduct;
