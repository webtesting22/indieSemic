import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import TopContainerBanner from "../../CommonComponents/Navigationdata/TopContainerBanner";
import LocalGroceryStoreSharpIcon from "@mui/icons-material/LocalGroceryStoreSharp";
import "../../Styles/Product.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Row, Col, Input, Button, Tabs, Modal, Table, Checkbox, Image } from "antd";
import { useProductContext } from "../Context/ProductContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from 'html2canvas';
const { TabPane } = Tabs;

const IndieSemicProduct = () => {
    const { products } = useProductContext();
    const productList = products?.products || [];

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

    // Reset all filters to default values
    const resetFilters = () => {
        setSelectedCategory(null); // Reset category filter
        setSearchQuery(""); // Reset search query
        setMinPrice(0); // Reset min price
        setMaxPrice(10000); // Reset max price
    };

    // Filter products based on selected category, search query, and price range
    const filteredProducts = productList.filter((product) => {
        const categoryMatch = selectedCategory ? product.category === selectedCategory : true; // Show all if no category is selected
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
        setProductQuantities((prev) => ({
            ...prev,
            [productId]: quantity,
        }));
    };

    // Handle product selection
    const handleProductSelect = (productId, isSelected) => {
        if (isSelected) {
            setSelectedProducts((prev) => [...prev, productId]);
        } else {
            setSelectedProducts((prev) => prev.filter((id) => id !== productId));
        }
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
                    value={productQuantities[product._id] || 0}
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                />
            ),
        },
        {
            title: "Unit Rate (₹)",
            dataIndex: "price",
            key: "price",
            render: (_, product) => `₹${product.price}`,
        },
        {
            title: "Total (₹)",
            key: "total",
            render: (_, product) => {
                const quantity = productQuantities[product._id] || 0;
                const total = quantity * product.price;
                return `₹${total}`;
            },
        },
    ];
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
                    <div>
                        <Button type="primary" onClick={handleGetQuotation}>
                            Get Quotation
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="searchBarContainer">
                        <Input
                            placeholder="Search by name or category"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ width: 300 }}
                        />
                    </div>
                    <br />

                    {/* Category Tabs */}
                    <div className="categoryTabsContainer">
                        <Tabs onChange={handleCategoryChange} activeKey={selectedCategory}>
                            <TabPane tab="All Products" key="All Products">
                                {/* Show all products if no category is selected */}
                            </TabPane>
                            {categories.map((category) => (
                                <TabPane tab={category} key={category}>
                                    {/* Filter by category */}
                                </TabPane>
                            ))}
                        </Tabs>
                        <div className="resetButtonContainer" style={{ marginTop: "20px" }}>
                            <Button onClick={resetFilters} type="primary" danger>
                                Reset Filters
                            </Button>
                        </div>
                    </div>
                </div>
                <br /><br />
                <div>
                    <div>
                        <div className="countShowContainer">
                            <span>Total Products: {filteredProducts.length}</span>
                        </div>
                    </div>
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
                    <Button key="submit" type="primary" onClick={generatePDF}>
                        Get Quotation Download
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

                <div ref={contentRef} style={{
                    padding: '20px',
                    width: '210mm',
                    height: '297mm',
                    position: 'absolute',
                    top: '-9999px', // Move the content off-screen
                    left: '-9999px', // Move the content off-screen
                    visibility: 'visible', // Ensure visibility for capturing
                    zIndex: -9999, // Keep it out of view but still in the DOM
                }}>
                    {/* Your HTML content for the PDF */}
                    <div style={{ textAlign: 'center' }}>
                        <h1>Quotation</h1>
                        <p>Name: John Doe</p>
                        <p>Company: ABC Ltd.</p>
                        <p>Product: Some Product</p>
                        <p>Price: ₹2000</p>

                        {/* Dynamically render only the selected products */}
                        <Table
                            rowKey="_id"
                            columns={columns}
                            dataSource={filteredProducts.filter((product) => selectedProducts.includes(product._id))}
                            pagination={false}
                            style={{ marginTop: "20px" }}
                        />
                    </div>
                </div>

            </Modal>
        </>
    );
};

export default IndieSemicProduct;
