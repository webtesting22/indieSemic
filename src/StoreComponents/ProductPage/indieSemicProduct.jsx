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
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp';
import ViewCompactSharpIcon from '@mui/icons-material/ViewCompactSharp';
import Cart from "../Cart/Cart";
import SingleProductPage from "../../CommonComponents/Navigationdata/SingleProductPage/SingleProduct";
const IndieSemicProduct = () => {
    const [columnSpan, setColumnSpan] = useState({ lg: 6, md: 8 }); // Default to 6 (for 12/12 view)
    const { products } = useProductContext();

    // State to manage icons for each product
    const [compareStates, setCompareStates] = useState({});
    const [favoriteStates, setFavoriteStates] = useState({});
    const handleLayoutChange = (layout) => {
        if (layout === "first") {
            setColumnSpan({ lg: 6, md: 12 }); // Two columns per row
        } else if (layout === "second") {
            setColumnSpan({ lg: 8, md: 8 }); // Three columns per row
        } else if (layout === "third") {
            setColumnSpan({ lg: 12, md: 6 }); // Four columns per row
        }
    };


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
                <div className="ToolsAndFeatures">
                    <div onClick={() => handleLayoutChange("first")} style={{ cursor: "pointer" }}>
                        <ViewCompactSharpIcon />
                    </div>
                    <div onClick={() => handleLayoutChange("second")} style={{ cursor: "pointer" }}>
                        <ViewModuleSharpIcon />
                    </div>
                    <div onClick={() => handleLayoutChange("third")} style={{ cursor: "pointer" }}>
                        <GridViewSharpIcon />
                    </div>
                </div>
                <div style={{ padding: "20px" }}>
                    <Row>
                        {products.map((product) => (
                            <Col lg={columnSpan.lg} md={columnSpan.md} key={product.id}>
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
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                            <div className="ImageContainer">
                                                <img alt={product.title} src={product.image} />
                                            </div>
                                            <div className="ProducardContent">
                                                <div className="AddToCardBtn">
                                                    <button className="cart-button">
                                                        <span className="cart-text">Add To Cart</span>
                                                        <span className="cart-icon" >
                                                            <ShoppingCartSharpIcon />{/* FontAwesome cart icon */}
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
                <Cart />
                <SingleProductPage/>
            </section>
        </>
    );
};

export default IndieSemicProduct;
