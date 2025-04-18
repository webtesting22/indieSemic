import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import TopContainerBanner from "../../CommonComponents/Navigationdata/TopContainerBanner";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";
import "../../Styles/Product.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Row, Col, Input, Button, Tabs, Modal, Table, Checkbox, Image } from "antd";
import ProductContext from "../Context/ProductContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from 'html2canvas';
import Cart from "../Cart/Cart";
import { RiResetRightLine } from "react-icons/ri";

const { TabPane } = Tabs;

const IndieSemicProduct = () => {
    const { products, addToCart } = useContext(ProductContext);
    const productList = products || [];
    console.log("name", products)
    // State management for filters
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000); // Assuming max price is 10,000 for the price range filter

    // State management for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        company: "",
        designation: "",
        email: "",
        contact: "",
        address: "",
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const contentRef = useRef();
    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category === "All Products" ? null : category);
    };

    // Handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle price range change
    const handlePriceChange = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    // Reset all filters to default values
    const resetFilters = () => {
        setSelectedCategory(null); // Reset category filter
        setSearchQuery(""); // Reset search query
        setMinPrice(0); // Reset min price
        setMaxPrice(10000); // Reset max price
    };

    // Filter products based on selected category, search query, and price range
    const filteredProducts = productList.filter((product) => {
        const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
        const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;

        return categoryMatch && searchMatch && priceMatch;
    });


    // Extract unique categories, excluding null, undefined, or empty categories
    const categories = [
        ...new Set(productList.map((product) => product.category))
    ].filter((category) => category && category.trim() !== ""); // This removes null or empty categories

    // Open the modal
    const handleGetQuotation = () => {
        setIsModalOpen(true);
    };

    // Handle input changes for user details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle quantity change
    const handleQuantityChange = (productId, quantity) => {
        const updatedQuantities = { ...productQuantities, [productId]: quantity };
        setProductQuantities(updatedQuantities);
        validateButtonState(updatedQuantities);
    };

    const handleProductSelect = (productId, isSelected) => {
        if (isSelected) {
            // Add product to selectedProducts
            setSelectedProducts((prev) => [...prev, productId]);
        } else {
            // Remove product from selectedProducts
            setSelectedProducts((prev) => prev.filter((id) => id !== productId));
        }
    };
    const validateButtonState = (updatedQuantities) => {
        const isValid = selectedProducts.length > 0 && selectedProducts.every((id) => updatedQuantities[id] > 0);
        setIsButtonDisabled(!isValid);
    };
    // Generate PDF for quotation


    // Function to generate and download the PDF
    const generatePDF = () => {
        // Ensure that the content is rendered first
        setTimeout(() => {
            console.log(contentRef.current); // Ensure the DOM element is valid
            if (!contentRef.current) {
                console.error("Invalid contentRef element");
                return;
            }

            html2canvas(contentRef.current, {
                allowTaint: true,
                useCORS: true,
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const doc = new jsPDF();
                doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
                doc.save('quotation.pdf');
            });
        }, 100); // Small delay (100ms) to ensure the content is rendered
    };

    // Table columns for product list
    const columns = [
        {
            title: "Sr No.",
            key: "srno",
            render: (_, __, index) => index + 1, // Render serial number
        },
        {
            title: "Select",
            dataIndex: "select",
            key: "select",
            render: (_, product) => (
                <Checkbox
                    checked={selectedProducts.includes(product._id)}
                    onChange={(e) => handleProductSelect(product._id, e.target.checked)}
                />
            ),
        },
        {
            title: "Product Name",
            dataIndex: "title",
            key: "title",
            render: (_, product) => (
                <div style={{ display: 'flex', alignItems: 'center' }} className="ProductPreviewImage">
                    {/* Small product image */}
                    <Image

                        src={product.mainImages?.[0] || 'default-image.jpg'}
                        alt={product.title}

                    />
                    {/* Product name */}
                    <span>{product.title}</span>
                </div>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (_, product) => (
                <Input
                    type="number"
                    min="1"
                    value={productQuantities[product._id] || ""}
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    disabled={!selectedProducts.includes(product._id)}  // Disable quantity input when product is not selected
                />
            ),
        },

    ];




    const sendQuotationEmail = async () => {
        const emailBody = `
          <h1>Quotation Details</h1>
          <p><b>Name:</b> ${userDetails.name}</p>
          <p><b>Company:</b> ${userDetails.company}</p>
          <p><b>Email:</b> ${userDetails.email}</p>
          <p><b>Contact:</b> ${userDetails.contact}</p>
          <p><b>Address:</b> ${userDetails.address}</p>
          <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${selectedProducts.map((productId) => {
            const product = productList.find((prod) => prod._id === productId);
            return `
                  <tr>
                    <td><img src="${product.mainImages[0]}" width="80" /></td>
                    <td>${product.title}</td>
                    <td>${productQuantities[productId]}</td>
                  </tr>
                `;
        }).join("")}
            </tbody>
          </table>
        `;

        const subject = "Quotation Request";

        try {
            const response = await fetch("https://testapi.prepseed.com/autosend/sendEmailIndiesemic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userDetails.email,
                    emailBody: emailBody,
                    subject: subject,
                }),
            });
            const result = await response.json();
            if (result.success) {
                console.log("Email sent successfully");
            } else {
                console.error("Error sending email");
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };
    return (
        <>
            <TopContainerBanner
                image="https://plus.unsplash.com/premium_photo-1681426694953-4d78658193dc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                DynamicHeading="Store"
                icon={<LocalGroceryStoreSharpIcon style={{ color: "#fff" }} />}
                link="Products"
            />
            <section className="AllProductsContainer section_Padding">
                <div className="FiltersAndButtonsContainer">


                    {/* Search Bar */}


                    {/* Category Tabs */}
                    <div className="categoryTabsContainer">
                        <Row>
                            <Col lg={18} md={24} style={{ width: "100%" }}>
                                <br />
                                <Tabs onChange={handleCategoryChange} activeKey={selectedCategory} style={{ margin: "0px" }}>
                                    <TabPane tab="All Products" key="All Products">

                                    </TabPane>
                                    {categories.map((category) => (
                                        <TabPane tab={category} key={category} style={{ margin: "0px" }}>
                                            {/* Filter by category */}
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </Col>
                            <Col lg={6} md={24} style={{ width: "100%" }}>
                                <br />
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <div className="resetButtonContainer" >
                                        <Button onClick={resetFilters} type="primary" danger style={{ margin: "0px" }}>
                                            <RiResetRightLine />Reset Filters
                                        </Button>
                                    </div>
                                    <div>
                                        <Button type="primary" onClick={handleGetQuotation} style={{ margin: "0px" }}>
                                            Get Quotation
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>


                    </div>
                </div>
                <br /><br />
                <div>
                    <div>
                        <div className="countShowContainer">
                            <span>Total Products: {filteredProducts.length}</span>
                        </div>
                    </div>
                    <br />
                    <div className="searchBarContainer">
                        <Input
                            placeholder="Search by name or category"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ width: 300 }}
                        />
                    </div>
                    <br />
                    <Row gutter={[16, 16]}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Col lg={6} md={12} sm={24} key={product._id}>
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
                                                <h2 className="ProductTitle">
                                                    {product.title?.length > 40
                                                        ? `${product.title.slice(0, 40)}...`
                                                        : product.title}
                                                </h2>

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
                </div>
            </section>
            <Cart />
            {/* Modal for Get Quotation */}
            <Modal
                title="Get Quotation"
                visible={isModalOpen}
                // onOk={generateQuotationPDF}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" disabled={isButtonDisabled} onClick={sendQuotationEmail}>
                        Send Quotation
                    </Button>,
                ]}
                width={1000}
            >
                {/* User Details Form */}
                <div>
                    <p><b>User Details:</b></p>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Input
                                name="name"
                                placeholder="Name"
                                value={userDetails.name}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                name="company"
                                placeholder="Company (Optional)"
                                value={userDetails.company}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                name="designation"
                                placeholder="Designation (Optional)"
                                value={userDetails.designation}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                name="email"
                                placeholder="Email ID"
                                value={userDetails.email}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                name="contact"
                                placeholder="Contact Number"
                                value={userDetails.contact}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                name="address"
                                placeholder="Address (Optional)"
                                value={userDetails.address}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Row>
                </div>
                <br />
                <br />
                <div className="searchBarContainer">
                    <p><b>Search Products</b></p>
                    <Input
                        placeholder="Search by name or category"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: 300 }}
                    />
                </div>
                {/* Product Selection Table */}
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={filteredProducts}
                    pagination={false}
                    style={{ marginTop: "20px" }}
                />
                {/* <Button
                    type="primary"
                    onClick={handleGetQuotation}
                    style={{ marginTop: "20px" }}
                >
                    Get Quotation
                </Button> */}
            </Modal>
        </>
    );
};

export default IndieSemicProduct;
