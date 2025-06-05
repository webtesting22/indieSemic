import React, { useState, useEffect } from 'react';
import {
    Layout,
    Card,
    Avatar,
    Button,
    Drawer,
    Typography,
    Input,
    Menu,
    Badge,
    Modal,
    Tag,
    Divider,
    Row,
    Col,
    Space,
    message,
    Select,
    Form
} from 'antd';
import {
    FiHome,
    FiSearch,
    FiActivity,
    FiUser,
    FiMapPin,
    FiPackage,
    FiDollarSign,
    FiPhone,
    FiMail,
    // FiBuilding
} from 'react-icons/fi';
import './Dashboard.css';
import Login from './Login/Login';
import { CiUser } from "react-icons/ci";
import { MdLogout } from "react-icons/md";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = ({ handleLogout, user }) => {

    // Your existing states
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [verificationData, setVerificationData] = useState([]);
    const [loading, setLoading] = useState(true);

    // New states for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Product tracking modal states
    const [trackingModalVisible, setTrackingModalVisible] = useState(false);
    const [productStatuses, setProductStatuses] = useState({});
    const apibaseUrl = import.meta.env.VITE_BASE_URL;
    const revenueChannels = [
        { name: 'Direct', amount: '$5,24,685', percentage: 65.6, color: '#10b981' },
        { name: 'Organic Search', amount: '$7,24,685', percentage: 45.2, color: '#3b82f6' },
        { name: 'Referral', amount: '$3,524,685', percentage: 15.6, color: '#ef4444' },
        { name: 'Social', amount: '$343,685', percentage: 25.2, color: '#f59e0b' }
    ];

    const trackingStatusOptions = [
        { value: 'received', label: 'Order Received', color: '#52c41a' },
        { value: 'pending', label: 'Order Pending', color: '#faad14' },
        { value: 'completed', label: 'Order Completed', color: '#1890ff' }
    ];

    const menuItems = [
        { key: '1', icon: <FiHome />, label: 'Dashboard' },
    ];

    useEffect(() => {
        const authData = localStorage.getItem('authData');
        if (!authData) {
            message.error("Authentication expired. Please log in again.");
            handleLogout?.();
        }
    }, []);

    const fetchPurchaseVerificationData = async () => {
        try {
            const response = await fetch(`${apibaseUrl}/indiesemic/getAllPurchaseVerificationData`);
            if (!response.ok) throw new Error('Network response was not ok');

            const result = await response.json();
            const sortedData = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setVerificationData(sortedData || []);

        } catch (error) {
            console.error('Error fetching verification data:', error);
            message.error('Failed to load purchase verification data');
        } finally {
            setLoading(false);
        }
    };
    const getLatestOrder = () => {
        if (verificationData.length > 0) {
            // Sort orders by createdAt (desc), latest first
            const sortedOrders = verificationData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            return sortedOrders[0]; // Return the most recent order
        }
        return null;
    };
    
    const latestOrder = getLatestOrder(); 
    useEffect(() => {
        fetchPurchaseVerificationData();
    }, []);

    const openOrderModal = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeOrderModal = () => {
        setSelectedOrder(null);
        setModalVisible(false);
    };

    const openTrackingModal = () => {
        // Initialize product statuses
        const initialStatuses = {};
        verificationData.forEach(order => {
            order.products.forEach(product => {
                const key = `${order._id}_${product._id}`;
                initialStatuses[key] = productStatuses[key] || 'received'; // Default to 'received'
            });
        });
        setProductStatuses(initialStatuses);
        setTrackingModalVisible(true);
    };

    const closeTrackingModal = () => {
        setTrackingModalVisible(false);
    };

    const handleStatusChange = (orderProductKey, newStatus) => {
        setProductStatuses(prev => ({
            ...prev,
            [orderProductKey]: newStatus
        }));
    };

    const saveTrackingChanges = () => {
        // Here you would typically save to your backend
        message.success('Product tracking statuses updated successfully!');
        setTrackingModalVisible(false);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    return (
        <Layout className="dashboard-layout">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="dashboard-sider"
                width={240}
            >
                <div className="logo">
                    <img src="/Images/FooterLogoNew.png" alt="" style={{ width: "70%" }} />
                </div>

                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    className="dashboard-menu"
                >
                    {menuItems.map(item => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            className={item.active ? 'active-menu-item' : ''}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>

                <div className="upgrade-section">
                    <div className="upgrade-illustration">
                        <div className="upgrade-character"><img src="/Images/Avtar.png" alt="" style={{ width: "100%" }} /></div>
                    </div>
                    <Button
                        type="primary"
                        className="upgrade-btn"
                        onClick={() => {
                            localStorage.removeItem('authData');
                            handleLogout?.();
                        }}
                    >
                        <MdLogout />Logout {user?.name || user?.email}
                    </Button>
                </div>
            </Sider>

            <Layout className="site-layout">
                <Header className="dashboard-header">
                    <div className="header-left">
                        <Title level={2} className="page-title">Customer Analytics</Title>
                    </div>
                    <div className="header-right">
                        <Input
                            placeholder="Search customers..."
                            prefix={<FiSearch />}
                            className="search-input"
                        />
                        <Avatar className="user-avatar">{user?.name?.charAt(0) || 'U'}</Avatar>
                        <Button
                            type="text"
                            icon={<FiActivity />}
                            onClick={() => setDrawerVisible(true)}
                            className="activity-btn mobile-only"
                        >
                            Activity
                        </Button>
                    </div>
                </Header>

                <Content className="dashboard-content">
                    <div className="content-wrapper">
                        {/* Summary Cards */}
                        <div className="summary-cards">
                            <Card className="summary-card">
                                <div className="summary-content">
                                    <FiUser className="summary-icon user-icon" />
                                    <div className="summary-info">
                                        <Text className="summary-label">Total Customers</Text>
                                        <Title level={3} className="summary-value">{verificationData.length}</Title>
                                    </div>
                                </div>
                            </Card>
                            <Card className="summary-card">
                                <div className="summary-content">
                                    <FiDollarSign className="summary-icon revenue-icon" />
                                    <div className="summary-info">
                                        <Text className="summary-label">Total Revenue</Text>
                                        <Title level={3} className="summary-value">
                                            {formatCurrency(verificationData.reduce((sum, order) =>
                                                sum + order.products.reduce((orderSum, product) =>
                                                    orderSum + product.price * product.quantity, 0), 0))}
                                        </Title>
                                    </div>
                                </div>
                            </Card>
                            <Card className="summary-card">
                                <div className="summary-content">
                                    <FiPackage className="summary-icon orders-icon" />
                                    <div className="summary-info">
                                        <Text className="summary-label">Total Orders</Text>
                                        <Title level={3} className="summary-value">
                                            {verificationData.reduce((sum, order) =>
                                                sum + order.products.reduce((orderSum, product) =>
                                                    orderSum + product.quantity, 0), 0)}
                                        </Title>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="content-grid">
                            <div className="main-content">
                                <Card className="customers-card">
                                    <div className="card-header">
                                        <Title level={4}>Customer Purchase Data</Title>
                                        <div className="header-actions">
                                            <Button
                                                type="default"
                                                onClick={openTrackingModal}
                                                className="tracking-btn"
                                                icon={<FiPackage />}
                                            >
                                                Product Tracking
                                            </Button>
                                            <Badge count={verificationData.length} className="customer-badge" />
                                        </div>
                                    </div>

                                    <div className="customers-table">
                                        {loading ? (
                                            <div className="loading-container">
                                                <div className="loading-spinner"></div>
                                                <Text>Loading customer data...</Text>
                                            </div>
                                        ) : verificationData.length === 0 ? (
                                            <div className="empty-state">
                                                <FiUser className="empty-icon" />
                                                <Text>No customer data available</Text>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="table-header-modern">
                                                    <div className="header-cell customer-col">
                                                        <FiUser className="header-icon" />
                                                        Customer
                                                    </div>
                                                    <div className="header-cell value-col">
                                                        <FiDollarSign className="header-icon" />
                                                        Total Value
                                                    </div>
                                                    <div className="header-cell orders-col">
                                                        <FiPackage className="header-icon" />
                                                        Items
                                                    </div>
                                                    <div className="header-cell actions-col">Actions</div>
                                                </div>

                                                <div className="table-body">
                                                    {verificationData.map((order, index) => {
                                                        const totalValue = order.products.reduce(
                                                            (sum, product) => sum + product.price * product.quantity,
                                                            0
                                                        );
                                                        const totalQuantity = order.products.reduce(
                                                            (sum, product) => sum + product.quantity,
                                                            0
                                                        );
                                                        const isLatest = latestOrder && latestOrder._id === order._id;
                                                        return (
                                                            <div key={order._id} className="table-row-modern">
                                                                <div className="row-cell customer-info">
                                                                    <Avatar
                                                                        size={32}
                                                                        style={{ backgroundColor: `hsl(${order.shipping?.firstName?.charCodeAt(0) * 137.5 % 360}, 70%, 50%)` }}
                                                                    >
                                                                        {(order.shipping?.firstName?.charAt(0) || '') + (order.shipping?.lastName?.charAt(0) || '')}
                                                                    </Avatar>
                                                                    <div className="customer-details-tracking">
                                                                        <Text strong className="customer-name-tracking">
                                                                            {(order.shipping?.firstName || '') + ' ' + (order.shipping?.lastName || '')}
                                                                        </Text>
                                                                        <Text className="customer-location-tracking">
                                                                            {order.shipping?.city || ''}
                                                                        </Text>
                                                                    </div>

                                                                </div>
                                                                <div className="row-cell value-info">
                                                                    <Text strong className="value-amount">
                                                                        {formatCurrency(totalValue)}
                                                                    </Text>
                                                                </div>
                                                                <div className="row-cell orders-info">
                                                                    <Tag color="blue">{totalQuantity} items</Tag>
                                                                </div>
                                                                <div className="row-cell actions-info">
                                                                    <Button
                                                                        type="primary"
                                                                        size="small"
                                                                        onClick={() => openOrderModal(order)}
                                                                        className="view-details-btn"
                                                                    >
                                                                        View Details
                                                                    </Button>
                                                                </div>
                                                                {isLatest && <Tag color="green" className="new-tag">Newly Added</Tag>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>

            <Drawer
                title="Activity Dashboard"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width={320}
                className="activity-drawer"
            >
                <div className="activity-header">
                    <div className="activity-user">
                        <Avatar size={32}>{user?.name?.charAt(0) || 'U'}</Avatar>
                        <div className="activity-info">
                            <Text strong>Performance Overview</Text>
                            <Text className="activity-subtitle">
                                Your business metrics for the last 30 days
                            </Text>
                        </div>
                    </div>
                </div>

                <div className="revenue-section">
                    <Title level={5}>Revenue by Channel</Title>
                    <div className="revenue-list">
                        {revenueChannels.map((channel, index) => (
                            <div key={index} className="revenue-item">
                                <div className="revenue-info">
                                    <Text strong>{channel.name}</Text>
                                    <Text className="revenue-amount">{channel.amount}</Text>
                                </div>
                                <Text
                                    className="revenue-percentage"
                                    style={{ color: channel.color }}
                                >
                                    {channel.percentage}%
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="visitors-section">
                    <Title level={5}>Active Visitors</Title>
                    <Title level={2} className="visitors-count">3,467</Title>
                    <Text className="visitors-subtitle">Page views per minute</Text>
                    <div className="visitors-chart">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div
                                key={i}
                                className="chart-bar"
                                style={{ height: `${Math.random() * 40 + 10}px` }}
                            ></div>
                        ))}
                    </div>
                    <Button type="link" className="real-time-btn">
                        REAL-TIME REPORT →
                    </Button>
                </div>
            </Drawer>

            <Modal
                title={null}
                visible={modalVisible}
                onCancel={closeOrderModal}
                footer={null}
                width={1000}
                className="order-details-modal"
                destroyOnClose
            >
                {selectedOrder && (
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <div className="customer-header">
                                <Avatar
                                    size={60}
                                    className="modal-avatar"
                                    style={{ backgroundColor: '#1890ff' }}
                                >
                                    {selectedOrder.shipping?.firstName?.charAt(0)}{selectedOrder.shipping?.lastName.charAt(0)}
                                </Avatar>
                                <div className="customer-title">
                                    <Title level={3} className="customer-name">
                                        {selectedOrder.shipping?.firstName} {selectedOrder.shipping?.lastName}
                                    </Title>
                                    <Text className="customer-subtitle">Customer Details</Text>
                                </div>
                            </div>
                            <Button
                                type="text"
                                onClick={closeOrderModal}
                                className="modal-close-btn"
                            >
                                ✕
                            </Button>
                        </div>

                        <Divider />

                        {/* Order Summary */}
                        <div className="order-summary">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card className="summary-item">
                                        <FiDollarSign className="summary-item-icon revenue" />
                                        <div>
                                            <Text className="summary-item-label">Total Value</Text>
                                            <Title level={4} className="summary-item-value">
                                                {formatCurrency(selectedOrder.products.reduce(
                                                    (sum, p) => sum + p.price * p.quantity, 0
                                                ))}
                                            </Title>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="summary-item">
                                        <FiPackage className="summary-item-icon orders" />
                                        <div>
                                            <Text className="summary-item-label">Total Items</Text>
                                            <Title level={4} className="summary-item-value">
                                                {selectedOrder.products.reduce((sum, p) => sum + p.quantity, 0)}
                                            </Title>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="summary-item">
                                        <FiUser className="summary-item-icon customer" />
                                        <div>
                                            <Text className="summary-item-label">Products</Text>
                                            <Title level={4} className="summary-item-value">
                                                {selectedOrder.products.length}
                                            </Title>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>

                        {/* Shipping Information */}
                        <Card className="info-section" title={
                            <Space>
                                <FiMapPin className="section-icon" />
                                Shipping Address
                            </Space>
                        }>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <div className="info-item">
                                        <FiUser className="info-icon" />
                                        <div>
                                            <Text strong>Full Name</Text>
                                            <br />
                                            <Text>{selectedOrder.shipping?.firstName} {selectedOrder.shipping?.lastName}</Text>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="info-item">
                                        <FiPhone className="info-icon" />
                                        <div>
                                            <Text strong>Mobile</Text>
                                            <br />
                                            <Text>{selectedOrder.shipping?.mobile}</Text>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="info-item">
                                        <FiMapPin className="info-icon" />
                                        <div>
                                            <Text strong>Address</Text>
                                            <br />
                                            <Text>
                                                {selectedOrder.shipping?.address1}
                                                {selectedOrder.shipping?.address2 && `, ${selectedOrder.shipping?.address2}`}
                                                <br />
                                                {selectedOrder.shipping?.city}, {selectedOrder.shipping?.state} - {selectedOrder.shipping?.postalCode}
                                                <br />
                                                {selectedOrder.shipping?.country}
                                            </Text>
                                        </div>
                                    </div>
                                </Col>
                                {selectedOrder.shipping?.company && (
                                    <Col span={12}>
                                        <div className="info-item">
                                            <div>
                                                <Text strong>Company</Text>
                                                <br />
                                                <Text>{selectedOrder.shipping?.company}</Text>
                                            </div>
                                        </div>
                                    </Col>
                                )}
                                {selectedOrder.shipping?.gstin && (
                                    <Col span={12}>
                                        <div className="info-item">
                                            <FiMail className="info-icon" />
                                            <div>
                                                <Text strong>GSTIN</Text>
                                                <br />
                                                <Text>{selectedOrder.shipping?.gstin}</Text>
                                            </div>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Card>

                        {/* Products List */}
                        <Card className="products-section" title={
                            <Space>
                                <FiPackage className="section-icon" />
                                Ordered Products ({selectedOrder.products.length})
                            </Space>
                        }>
                            <div className="products-list">
                                {selectedOrder.products.map((product, index) => (
                                    <Card key={product._id} className="product-item" size="small">
                                        <div className="product-content">
                                            <div className="product-info">
                                                <Title level={5} className="product-title">
                                                    {product.title}
                                                </Title>
                                                <Text className="product-description">
                                                    {product.productDescription}
                                                </Text>
                                            </div>
                                            <div className="product-pricing">
                                                <div className="price-details">
                                                    <Text className="price-label">Unit Price:</Text>
                                                    <Text strong className="price-value">
                                                        {formatCurrency(product.price)}
                                                    </Text>
                                                </div>
                                                <div className="quantity-details">
                                                    <Text className="quantity-label">Quantity:</Text>
                                                    <Tag color="blue">{product.quantity}</Tag>
                                                </div>
                                                <div className="total-details">
                                                    <Text className="total-label">Total:</Text>
                                                    <Text strong className="total-value">
                                                        {formatCurrency(product.price * product.quantity)}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <Divider />

                            <div className="order-total">
                                <Title level={3} className="total-amount">
                                    Order Total: {formatCurrency(selectedOrder.products.reduce(
                                        (sum, p) => sum + p.price * p.quantity, 0
                                    ))}
                                </Title>
                            </div>
                        </Card>
                    </div>
                )}
            </Modal>

            {/* Product Tracking Modal */}
            <Modal
                title={
                    <div className="tracking-modal-title">
                        <FiPackage className="tracking-title-icon" />
                        Product Tracking Management
                    </div>
                }
                visible={trackingModalVisible}
                onCancel={closeTrackingModal}
                width={1200}
                className="product-tracking-modal"
                footer={[
                    <Button key="cancel" onClick={closeTrackingModal}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={saveTrackingChanges}>
                        Save Changes
                    </Button>,
                ]}
                destroyOnClose
            >
                <div className="tracking-modal-content">
                    <div className="tracking-stats">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card className="tracking-stat-card received">
                                    <div className="stat-content">
                                        <div className="stat-number">
                                            {Object.values(productStatuses).filter(status => status === 'received').length}
                                        </div>
                                        <div className="stat-label">Orders Received</div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card className="tracking-stat-card pending">
                                    <div className="stat-content">
                                        <div className="stat-number">
                                            {Object.values(productStatuses).filter(status => status === 'pending').length}
                                        </div>
                                        <div className="stat-label">Orders Pending</div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card className="tracking-stat-card completed">
                                    <div className="stat-content">
                                        <div className="stat-number">
                                            {Object.values(productStatuses).filter(status => status === 'completed').length}
                                        </div>
                                        <div className="stat-label">Orders Completed</div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <Divider />

                    <div className="products-tracking-list">
                        <div className="tracking-header">
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Text strong>Customer</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Product</Text>
                                </Col>
                                <Col span={4}>
                                    <Text strong>Quantity</Text>
                                </Col>
                                <Col span={6}>
                                    <Text strong>Tracking Status</Text>
                                </Col>
                            </Row>
                        </div>

                        <div className="tracking-items">
                            {verificationData.map((order) =>
                                order.products.map((product, productIndex) => {
                                    const orderProductKey = `${order._id}_${product._id}`;
                                    const currentStatus = productStatuses[orderProductKey] || 'received';
                                    const statusOption = trackingStatusOptions.find(opt => opt.value === currentStatus);

                                    return (
                                        <Card key={orderProductKey} className="tracking-item-card">
                                            <Row gutter={16} align="middle">
                                                <Col span={6}>
                                                    <div className="customer-info-tracking">
                                                        <Avatar
                                                            size={32}
                                                            style={{ backgroundColor: `hsl(${order.shipping?.firstName?.charCodeAt(0) * 137.5 % 360}, 70%, 50%)` }}
                                                        >
                                                            {order.shipping?.firstName?.charAt(0)}{order.shipping?.lastName?.charAt(0)}
                                                        </Avatar>
                                                        <div className="customer-details-tracking">
                                                            <Text strong className="customer-name-tracking">
                                                                {order.shipping?.firstName} {order.shipping?.lastName}
                                                            </Text>
                                                            <Text className="customer-location-tracking">
                                                                {order.shipping?.city}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col span={8}>
                                                    <div className="product-details-tracking">
                                                        <Text strong className="product-name-tracking">
                                                            {product.title}
                                                        </Text>
                                                        <Text className="product-price-tracking">
                                                            {formatCurrency(product.price)}
                                                        </Text>
                                                    </div>
                                                </Col>
                                                <Col span={4}>
                                                    <Tag color="blue" className="quantity-tag">
                                                        {product.quantity} units
                                                    </Tag>
                                                </Col>
                                                <Col span={6}>
                                                    <Select
                                                        value={currentStatus}
                                                        onChange={(value) => handleStatusChange(orderProductKey, value)}
                                                        className="status-select"
                                                        style={{ width: '100%' }}
                                                    >
                                                        {trackingStatusOptions.map(option => (
                                                            <Select.Option
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                <Tag color={option.color} style={{ margin: 0 }}>
                                                                    {option.label}
                                                                </Tag>
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </Col>
                                            </Row>
                                        </Card>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};

export default Dashboard;