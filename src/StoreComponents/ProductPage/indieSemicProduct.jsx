import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import TopContainerBanner from "../../CommonComponents/Navigationdata/TopContainerBanner";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";
import "../../Styles/Product.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Row, Col, Input, Button, Tabs, Modal, Table, Checkbox, Image, Typography, Alert, Tag, Tooltip,message } from "antd";
import ProductContext from "../Context/ProductContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from 'html2canvas';
import Cart from "../Cart/Cart";
import { RiResetRightLine } from "react-icons/ri";
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    BankOutlined,
    IdcardOutlined,
    HomeOutlined,
    SearchOutlined,
    InfoCircleOutlined,
    MinusOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";

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
    const [formValid, setFormValid] = useState(false);
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
    const [emailError, setEmailError] = useState("");
    const [emailStatus, setEmailStatus] = useState("");

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

    // Updated handleInputChange with form validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedDetails = {
            ...userDetails,
            [name]: value,
        };
        setUserDetails(updatedDetails);

        // Email validation for the email field
        if (name === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (value && !emailRegex.test(value)) {
                setEmailError("Please enter a valid email address");
                setEmailStatus("error");
            } else {
                setEmailError("");
                setEmailStatus(value ? "success" : "");
            }
        }

        // Check if required fields are filled and valid
        const requiredFieldsFilled =
            updatedDetails.name.trim() !== "" &&
            updatedDetails.contact.trim() !== "" &&
            updatedDetails.email.trim() !== "" &&
            (name === "email" ? emailStatus !== "error" : true);

        setFormValid(requiredFieldsFilled);

        // If form becomes invalid, reset product selections
        if (!requiredFieldsFilled && selectedProducts.length > 0) {
            setSelectedProducts([]);
            setProductQuantities({});
        }

        // Update button state based on new validity
        validateButtonState(productQuantities, [], requiredFieldsFilled);
    };


    // Handle quantity change
    const handleQuantityChange = (productId, quantity) => {
        const updatedQuantities = { ...productQuantities, [productId]: quantity };
        setProductQuantities(updatedQuantities);
        validateButtonState(updatedQuantities);
    };

    const handleProductSelect = (productId, isSelected) => {
        // Only allow selection if form is valid
        if (!formValid) {
            return; // Prevent selection if the required form fields aren't filled
        }

        if (isSelected) {
            // Add product to selectedProducts
            setSelectedProducts((prev) => [...prev, productId]);

            // Set initial quantity to 1 if not already set
            if (!productQuantities[productId]) {
                handleQuantityChange(productId, 1);
            }
        } else {
            // Remove product from selectedProducts
            setSelectedProducts((prev) => prev.filter((id) => id !== productId));
        }
    };



    // Updated validateButtonState to check both form validity and product selection
    const validateButtonState = (updatedQuantities) => {
        // Button is enabled only if form is valid AND at least one product is selected with quantity
        const isValid =
            formValid &&
            selectedProducts.length > 0 &&
            selectedProducts.every((id) => updatedQuantities[id] > 0);

        setIsButtonDisabled(!isValid);
    };

    // Updated Table columns with disabled state based on form validity
    const columns = [
        {
            title: "Sr No.",
            key: "srno",
            width: 80,
            render: (_, __, index) => <Typography.Text strong>{index + 1}</Typography.Text>,
        },
        {
            title: "Select",
            dataIndex: "select",
            key: "select",
            width: 80,
            render: (_, product) => (
                <Checkbox
                    checked={selectedProducts.includes(product._id)}
                    onChange={(e) => handleProductSelect(product._id, e.target.checked)}
                    disabled={!formValid} // Disable checkbox if form is not valid
                    style={{ transform: "scale(1.2)" }}
                />
            ),
        },
        {
            title: "Product Details",
            dataIndex: "title",
            key: "title",
            render: (_, product) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Product image */}
                    <div style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        border: "1px solid #f0f0f0"
                    }}>
                        <img
                            src={product.mainImages?.[0] || "default-image.jpg"}
                            alt={product.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                    {/* Product info */}
                    <div>
                        <Typography.Text strong style={{ fontSize: "15px" }}>
                            {product.title}
                        </Typography.Text>
                        {product.category && (
                            <div>
                                <Tag color="blue" style={{ marginTop: "6px" }}>
                                    {product.category}
                                </Tag>
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            width: 150,
            render: (_, product) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                        onClick={() => {
                            const currentQty = parseInt(productQuantities[product._id]) || 0;
                            if (currentQty > 1) {
                                handleQuantityChange(product._id, currentQty - 1);
                            }
                        }}
                        disabled={!selectedProducts.includes(product._id) || !formValid}
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            padding: "0 8px"
                        }}
                    >
                        -
                    </button>
                    <Input
                        type="number"
                        min="1"
                        value={productQuantities[product._id] || ""}
                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                        disabled={!selectedProducts.includes(product._id) || !formValid}
                        style={{
                            width: "90px",
                            textAlign: "center",
                            borderRadius: "0",
                            margin: "0 -1px",
                            WebkitAppearance: "none",
                            MozAppearance: "textfield"
                        }}
                    />
                    <button
                        onClick={() => {
                            const currentQty = parseInt(productQuantities[product._id]) || 0;
                            handleQuantityChange(product._id, currentQty + 1);
                        }}
                        disabled={!selectedProducts.includes(product._id) || !formValid}
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            padding: "0 8px"
                        }}
                    >
                        +
                    </button>
                </div>
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
                message.success("Quotation request sent successfully!");
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
                title={
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                            backgroundColor: "#1890ff",
                            width: "4px",
                            height: "20px",
                            borderRadius: "2px"
                        }}></div>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            Request Product Quotation
                        </Typography.Title>
                    </div>
                }
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    // <Button
                    //     key="cancel"
                    //     onClick={() => setIsModalOpen(false)}
                    //     style={{ borderRadius: "4px" }}
                    // >
                    //     Cancel
                    // </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        disabled={isButtonDisabled}
                        onClick={sendQuotationEmail}
                        style={{
                            backgroundColor: "#1890ff",
                            borderRadius: "4px"
                        }}
                    >
                        Send Quotation Request
                    </Button>,
                ]}
                width={1000}
                centered
                bodyStyle={{ padding: "24px" }}
                style={{ top: 20 }}
            >
                <div style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "24px",
                    background: "#fafafa"
                }}>
                    <Typography.Title level={5} style={{ marginTop: 0, marginBottom: "16px" }}>
                        Contact Information
                        <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
                    </Typography.Title>

                    <Row gutter={[24, 24]}>
                        <Col span={8}>
                            <div style={{ marginBottom: "8px" }}>
                                <Typography.Text strong>Full Name</Typography.Text>
                                <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
                            </div>
                            <Input
                                name="name"
                                placeholder="Enter your full name"
                                value={userDetails.name}
                                onChange={handleInputChange}
                                style={{ borderRadius: "4px" }}
                                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                            />
                        </Col>
                        <Col span={8}>
                            <div style={{ marginBottom: "8px" }}>
                                <Typography.Text strong>Email Address</Typography.Text>
                                <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
                            </div>
                            <Input
                                name="email"
                                placeholder="Enter your email address"
                                value={userDetails.email}
                                onChange={handleInputChange}
                                style={{ borderRadius: "4px" }}
                                prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                                status={emailStatus}
                                suffix={
                                    emailStatus === "error" ? (
                                        <Tooltip title={emailError}>
                                            <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
                                        </Tooltip>
                                    ) : emailStatus === "success" ? (
                                        <CheckCircleOutlined style={{ color: "#52c41a" }} />
                                    ) : null
                                }
                            />
                            {emailError && (
                                <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
                                    {emailError}
                                </div>
                            )}
                        </Col>
                        <Col span={8}>
                            <div style={{ marginBottom: "8px" }}>
                                <Typography.Text strong>Contact Number</Typography.Text>
                                <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
                            </div>
                            <Input
                                type="number"
                                name="contact"
                                placeholder="Enter your phone number"
                                value={userDetails.contact}
                                onChange={handleInputChange}
                                style={{ borderRadius: "4px" }}
                                prefix={<PhoneOutlined style={{ color: "#bfbfbf" }} />}
                            />
                        </Col>
                        <Col span={8}>
                            <div style={{ marginBottom: "8px" }}>
                                <Typography.Text strong>Company</Typography.Text>
                                <span style={{ color: "#d9d9d9", marginLeft: "4px", fontSize: "12px" }}>
                                    (Optional)
                                </span>
                            </div>
                            <Input
                                name="company"
                                placeholder="Enter your company name"
                                value={userDetails.company}
                                onChange={handleInputChange}
                                style={{ borderRadius: "4px" }}
                                prefix={<BankOutlined style={{ color: "#bfbfbf" }} />}
                            />
                        </Col>
                        <Col span={8}>
                            <div style={{ marginBottom: "8px" }}>
                                <Typography.Text strong>Designation</Typography.Text>
                                <span style={{ color: "#d9d9d9", marginLeft: "4px", fontSize: "12px" }}>
                                    (Optional)
                                </span>
                            </div>
                            <Input
                                name="designation"
                                placeholder="Enter your job title"
                                value={userDetails.designation}
                                onChange={handleInputChange}
                                style={{ borderRadius: "4px" }}
                                prefix={<IdcardOutlined style={{ color: "#bfbfbf" }} />}
                            />
                        </Col>
                        <Col span={8}>
                            <div style={{ marginBottom: "8px" }}>
                                <Typography.Text strong>Address</Typography.Text>
                                <span style={{ color: "#d9d9d9", marginLeft: "4px", fontSize: "12px" }}>
                                    (Optional)
                                </span>
                            </div>
                            <Input
                                name="address"
                                placeholder="Enter your address"
                                value={userDetails.address}
                                onChange={handleInputChange}
                                style={{ borderRadius: "4px" }}
                                prefix={<HomeOutlined style={{ color: "#bfbfbf" }} />}
                            />
                        </Col>
                    </Row>

                    {!formValid && (
                        <Alert
                            message="Please fill all required fields marked with * to proceed with product selection."
                            type="info"
                            showIcon
                            style={{ marginTop: "16px", borderRadius: "4px" }}
                        />
                    )}
                </div>

                <div style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                    padding: "20px",
                    background: "#fafafa"
                }}>
                    <Typography.Title level={5} style={{ marginTop: 0, marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
                        <span>Select Products for Quotation</span>
                        <div className="searchBarContainer" style={{ display: "flex", alignItems: "center" }}>
                            <Input
                                placeholder="Search products"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{ width: 250, borderRadius: "4px" }}
                                prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                                allowClear
                            />
                        </div>
                    </Typography.Title>

                    {!formValid && (
                        <div style={{
                            padding: "16px",
                            background: "rgba(0,0,0,0.02)",
                            borderRadius: "4px",
                            marginBottom: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            <InfoCircleOutlined style={{ color: "#1890ff" }} />
                            <Typography.Text type="secondary">
                                Complete your contact information above to enable product selection.
                            </Typography.Text>
                        </div>
                    )}

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
                </div>
            </Modal>
        </>
    );
};

export default IndieSemicProduct;
