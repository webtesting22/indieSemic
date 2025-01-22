import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";
import SingleProductPage from "../../CommonComponents/Navigationdata/SingleProductPage/SingleProduct";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
const IndieSemicProduct = () => {
    const navigate = useNavigate();  // Use navigate hook for v6

    const handleClick = (product) => {
        // Push to the separate product page, passing the product as state
        navigate("/indiesemicproduct", { state: { product } });
    };
    const [columnSpan, setColumnSpan] = useState({ lg: 6, md: 8 }); // Default to 6 (for 12/12 view)
    const { products } = useProductContext();


    // State to manage icons for each product
    const [compareStates, setCompareStates] = useState({});
    const [favoriteStates, setFavoriteStates] = useState({});

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4040/api/indieSemic/getProducts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProductsData(data.products); // Set products array
                console.log(data.products); // Log the products array to the console
            } catch (error) {
                console.error('Error fetching the products:', error);
            }
        };

        fetchProducts();
    }, []);
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


    const CarousalDemoData = [
        {
            image: ""
        }
    ]

    return (
        <>
            <TopContainerBanner
                image="https://plus.unsplash.com/premium_photo-1681426694953-4d78658193dc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                DynamicHeading="Store"
                icon={<LocalGroceryStoreSharpIcon style={{ fontSize: "", color: "#fff" }} />}
                link="Products"
            />
            <section className="section_Padding">
                <div className="ProductSliderContainer">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div>

                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
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
                    <div className="product-container">
                        <Row>
                            {productsData.map((product) => (
                                <Col lg={6} md={8}>
                                    <div key={product._id} className="product-card" onClick={() => handleClick(product)}>
                                        <h2>{product.title}</h2>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </section>
        </>
    );
};

export default IndieSemicProduct;
