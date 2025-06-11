import React, { useState, useRef, useContext } from "react";
import { Row, Col, Input, Button, Tabs, Modal, Table, Checkbox, Image, Typography, Alert, Tag, Tooltip, message, Select } from "antd";
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
import ProductContext from "../Context/ProductContext";
import { IoDocumentTextSharp } from "react-icons/io5";
const GetQuotationModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [searchQuery, setSearchQuery] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [emailStatus, setEmailStatus] = useState("");
    const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false);
    const [tempSelectedProducts, setTempSelectedProducts] = useState([]);

    const [userDetails, setUserDetails] = useState({
        name: "",
        company: "",
        designation: "",
        email: "",
        contact: "",
        address: "",
    });
    const { products, addToCart } = useContext(ProductContext);
    const productList = products || [];
    // console.log("name", products)
    const handleGetQuotation = () => {
        setIsModalOpen(true);
    };
    // Handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const categories = [
        ...new Set(productList.map((product) => product.category))
    ].filter((category) => category && category.trim() !== "");

    // Filter products based on selected category, search query, and price range
    const filteredProducts = productList.filter((product) => {
        const categoryMatch =
            selectedCategory.length === 0 || selectedCategory.includes(product.category);
        const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;

        return categoryMatch && searchMatch && priceMatch;
    });


    // Extract unique categories, excluding null, undefined, or empty categories


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

            if (value.trim() === "") {
                // If the input is empty, reset everything
                setEmailError("");
                setEmailStatus("");
            } else if (!emailRegex.test(value)) {
                setEmailError("Please enter a valid email address");
                setEmailStatus("error");
            } else {
                setEmailError("");
                setEmailStatus("success");
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
        // Only reset if form was valid before and now becomes invalid
        if (formValid && !requiredFieldsFilled) {
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
    const showCheckbox = false;
    const columns = [
        {
            title: "Sr No.",
            key: "srno",
            width: 80,
            render: (_, __, index) => <Typography.Text strong>{index + 1}</Typography.Text>,
        },
        ...(showCheckbox
            ? [
                {
                    title: "Select",
                    render: (_, product) => (
                        <Checkbox
                            checked={selectedProducts.includes(product._id)}
                            onChange={(e) => handleProductSelect(product._id, e.target.checked)}
                            disabled={!formValid}
                        />
                    ),
                },
            ]
            : []),
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
                <div style={{ display: "flex", alignItems: "center",flexDirection:"column" }}>
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
                            max="30"
                            step="1"
                            value={productQuantities[product._id] || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                    handleQuantityChange(product._id, "");
                                } else if (/^\d*$/.test(value)) {
                                    const numValue = parseInt(value);
                                    if (numValue <= 30) {
                                        handleQuantityChange(product._id, value);
                                    }
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "." || e.key === "e" || e.key === "-" || e.key === "+") {
                                    e.preventDefault();
                                }
                            }}
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
                    <div style={{ fontSize: "12px", color: "#8c8c8c", marginTop: "2px" }}>Max quantity: 30</div>
                </div>
            ),
        },
        {
            title: "Action",
            key: "action",
            width: 100,
            render: (_, product) => (
                <Button
                    danger
                    size="small"
                    onClick={() => handleRemoveProduct(product._id)}
                >
                    Remove
                </Button>
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
    const handleRemoveProduct = (productId) => {
        setSelectedProducts((prev) => prev.filter((id) => id !== productId));

        // Optional: remove quantity if you want
        const updatedQuantities = { ...productQuantities };
        delete updatedQuantities[productId];
        setProductQuantities(updatedQuantities);
    };

    return (
        <>
            <b style={{ textAlign: "center", fontWeight: "700", fontSize: "19px" }}>For Bulk Orders:</b>
            {/* <br /> */}
            <Button type="primary" onClick={handleGetQuotation} className="enhanced-add-to-cart-btn">
                <IoDocumentTextSharp />Get Quotation
            </Button>
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
                    <>

                        <div style={{ display: "flex", justifyContent: "end", }}>
                            <div style={{ maxWidth: "300px" }}>
                                <Button
                                    key="submit"
                                    type="primary"
                                    disabled={isButtonDisabled}
                                    onClick={sendQuotationEmail}
                                    className="enhanced-add-to-cart-btn"
                                >
                                    Send Quotation Request
                                </Button>
                            </div>
                        </div>
                    </>
                ]}
                width={1000}
                centered
                // bodyStyle={{ padding: "24px" }}
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
                        <Col lg={8} md={12} sm={24} style={{ width: "100%" }}>
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
                        <Col lg={8} md={12} sm={24} style={{ width: "100%" }}>
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
                        <Col lg={8} md={12} sm={24} style={{ width: "100%" }}>
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
                                style={{
                                    borderRadius: "4px",
                                    // Hide number input arrows
                                    MozAppearance: "textfield",
                                    WebkitAppearance: "none",
                                    margin: 0,
                                }}
                                prefix={<PhoneOutlined style={{ color: "#bfbfbf" }} />}
                            />
                        </Col>
                        <Col lg={8} md={12} sm={24} style={{ width: "100%" }}>
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
                        <Col lg={8} md={12} sm={24} style={{ width: "100%" }}>
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
                        <Col lg={8} md={12} sm={24} style={{ width: "100%" }}>
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
                    <Typography.Title level={5} style={{ marginTop: 0, marginBottom: "16px", }}>
                        <span>Select Products for Quotation</span>
                        {/* <br /> <br /> */}
                        {/* <div className="searchBarContainer" style={{ display: "flex", alignItems: "center" }}>
                            
                            <Input
                                placeholder="Search products"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{ width: 250, borderRadius: "4px" }}
                                prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                                allowClear
                            />
                        </div> */}
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
                    {/* <div>
                        <Select
                            mode="multiple"
                            placeholder="Select Categories"
                            value={selectedCategory || []}
                            onChange={(value) => handleCategoryChange(value)}
                            allowClear
                            style={{ width: "100%" }}
                        >
                            {categories.map((category) => (
                                <Select.Option key={category} value={category}>
                                    {category}
                                </Select.Option>
                            ))}
                        </Select>

                    </div> */}
                    <br />


                    {/* Product Selection Table */}
                    <Button
                        type="primary"
                        onClick={() => setIsProductSelectorOpen(true)}
                        style={{ marginBottom: 16 }}
                    >
                        + Add Products
                    </Button>

                    <div style={{ width: "100%", overflow: "auto" }}>
                        <Table
                            rowKey="_id"
                            columns={columns}
                            dataSource={productList.filter((product) =>
                                selectedProducts.includes(product._id)
                            )}
                            pagination={false}
                        />

                    </div>

                    {/* <Button
                    type="primary"
                    onClick={handleGetQuotation}
                    style={{ marginTop: "20px" }}
                >
                    Get Quotation
                </Button> */}
                </div>
            </Modal >
            <Modal
                title="Select Products to Import"
                open={isProductSelectorOpen}
                onCancel={() => setIsProductSelectorOpen(false)}
                onOk={() => {
                    // Merge new products with already selected ones
                    const merged = [...new Set([...selectedProducts, ...tempSelectedProducts])];
                    setSelectedProducts(merged);

                    // Initialize quantities
                    tempSelectedProducts.forEach((id) => {
                        if (!productQuantities[id]) {
                            handleQuantityChange(id, 1);
                        }
                    });

                    setIsProductSelectorOpen(false);
                    setTempSelectedProducts([]);
                }}
                width={900}
            >
                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <Input
                            placeholder="Search products"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            prefix={<SearchOutlined />}
                            allowClear
                        />
                    </Col>
                    <Col span={12}>
                        <Select
                            mode="multiple"
                            placeholder="Select Categories"
                            value={selectedCategory}
                            onChange={(value) => {
                                // Handle "All" selection logic
                                if (value.includes("ALL_CATEGORIES")) {
                                    // If user selects "All Categories", set all category values
                                    setSelectedCategory(categories);
                                } else {
                                    setSelectedCategory(value);
                                }
                            }}
                            allowClear
                            style={{ width: "100%" }}
                        >
                            {/* All option */}
                            <Select.Option value="ALL_CATEGORIES">All Categories</Select.Option>

                            {/* Dynamic options */}
                            {categories.map((cat) => (
                                <Select.Option key={cat} value={cat}>
                                    {cat}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>

                </Row>

                <Table
                    rowKey="_id"
                    dataSource={filteredProducts}
                    pagination={{ pageSize: 100 }}
                    rowSelection={{
                        selectedRowKeys: tempSelectedProducts,
                        onChange: setTempSelectedProducts,
                    }}
                    columns={[
                        {
                            title: "Product",
                            render: (_, item) => (
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <img src={item.mainImages?.[0]} width={50} />
                                    <div>
                                        <b>{item.title}</b>
                                        <div>
                                            <Tag>{item.category}</Tag>
                                        </div>
                                    </div>
                                </div>
                            ),
                        },
                    ]}
                />
            </Modal>

        </>
    )
}
export default GetQuotationModal