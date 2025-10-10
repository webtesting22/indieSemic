"use client";

import React, { useState, useEffect } from 'react';
import { Layout, Table, Select, Card, Typography, Tag, message, Row, Col, Button, Modal } from 'antd';
import { FiPackage, FiCheckCircle, FiClock, FiXCircle, FiDownload, FiEye } from 'react-icons/fi';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import './Dashboard.css';
import jsPDF from 'jspdf';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Status = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [previewPdfUrl, setPreviewPdfUrl] = useState('');
    const [currentOrderData, setCurrentOrderData] = useState(null);
    const [previewLoading, setPreviewLoading] = useState(false);
    const apibaseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchPurchaseVerificationData();
    }, []);

    const fetchPurchaseVerificationData = async () => {
        try {
            const response = await fetch(`${apibaseUrl}/indiesemic/getAllPurchaseVerificationData`);
            if (!response.ok) throw new Error('Network response was not ok');

            const result = await response.json();
            console.log('API Response:', result); // Debug log

            const sortedData = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Transform the data for the table
            const transformedData = sortedData.flatMap(order =>
                order.products.map((product, index) => {
                    console.log('Product:', product); // Debug log for each product
                    return {
                        key: `${order._id}_${product._id}`,
                        orderId: order.orderId || order._id, // Use orderId from backend or fallback to _id
                        productName: product.title,
                        value: product.price * product.quantity,
                        items: product.quantity,
                        status: product.productStatus || order.status || 'pending', // Use product status if available, otherwise order status
                        orderIdInternal: order._id,
                        productId: product._id,
                        customerName: `${order.shipping?.firstName || ''} ${order.shipping?.lastName || ''}`.trim(),
                        createdAt: order.createdAt,
                        // Include full order data for PDF generation
                        fullOrderData: order
                    };
                })
            );

            console.log('Transformed Data:', transformedData); // Debug log
            setData(transformedData);
        } catch (error) {
            console.error('Error fetching verification data:', error);
            message.error('Failed to load purchase verification data');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (key, value) => {
        try {
            // Extract orderId from the key (format: orderId_productId)
            const orderId = key.split('_')[0];
            console.log('Key:', key); // Debug log
            console.log('Extracted Order ID:', orderId); // Debug log

            // Make API call to update status
            const response = await fetch(`${apibaseUrl}/indiesemic/updatePurchaseStatus/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: value
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            const result = await response.json();
            console.log('Status update response:', result); // Debug log

            // Update local state only after successful API call
            setData(prevData =>
                prevData.map(item =>
                    item.key === key ? { ...item, status: value } : item
                )
            );

            message.success('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            message.error('Failed to update status');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    // Calculate status counts
    const getStatusCounts = () => {
        const counts = {
            pending: 0,
            completed: 0,
            cancelled: 0
        };

        data.forEach(item => {
            if (counts.hasOwnProperty(item.status)) {
                counts[item.status]++;
            }
        });

        return counts;
    };

    const statusCounts = getStatusCounts();

    const handlePreviewInvoice = async (orderData) => {
        try {
            setPreviewLoading(true);
            
            // First close modal and clear old PDF if exists
            if (previewModalVisible) {
                setPreviewModalVisible(false);
                if (previewPdfUrl) {
                    URL.revokeObjectURL(previewPdfUrl);
                    setPreviewPdfUrl('');
                }
                // Wait for modal to close and cleanup
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            
            // Then generate new preview
            const pdfUrl = generateInvoicePDF(orderData, true);
            setCurrentOrderData(orderData);
            setPreviewPdfUrl(pdfUrl);
            setPreviewModalVisible(true);
        } catch (error) {
            console.error('Error generating PDF preview:', error);
            message.error('Failed to generate PDF preview');
        } finally {
            setPreviewLoading(false);
        }
    };

    const handleClosePreview = () => {
        // First close the modal
        setPreviewModalVisible(false);
        setPreviewLoading(false);
        
        // Then clean up after modal animation
        setTimeout(() => {
            if (previewPdfUrl) {
                URL.revokeObjectURL(previewPdfUrl);
                setPreviewPdfUrl('');
            }
            setCurrentOrderData(null);
        }, 300);
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiPackage />
                    <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{text}</span>
                </div>
            ),
        },
        // {
        //     title: 'Product Name',
        //     dataIndex: 'productName',
        //     key: 'productName',
        // },
        {
            title: 'Customer',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (value) => formatCurrency(value),
        },
        // {
        //     title: 'Quantity',
        //     dataIndex: 'items',
        //     key: 'items',
        //     render: (items) => <Tag color="blue">{items} units</Tag>,
        // },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    value={status}
                    style={{ width: 120 }}
                    onChange={(value) => handleStatusChange(record.key, value)}
                >
                    <Option value="pending">
                        <Tag color="orange">Pending</Tag>
                    </Option>
                    <Option value="completed">
                        <Tag color="green">Completed</Tag>
                    </Option>
                    <Option value="cancelled">
                        <Tag color="red">Cancelled</Tag>
                    </Option>
                </Select>
            ),
        },
        {
            title: 'Preview Invoice',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="primary"
                    size="small"
                    icon={<FiEye />}
                    onClick={() => handlePreviewInvoice(record.fullOrderData)}
                    style={{
                        backgroundColor: '#1890ff',
                        borderColor: '#1890ff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    Preview
                </Button>
            ),
        },
    ];

    return (
        <Layout className="dashboard-layout">
            <Header className="dashboard-header">
                <div className="header-left">
                    <Title level={2} className="page-title">Product Status</Title>
                </div>
            </Header>

            <Content className="dashboard-content">
                <div className="content-wrapper">
                    {/* Status Summary Cards */}
                    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                        <Col xs={24} sm={8}>
                            <Card
                                className="status-summary-card pending-card"
                                style={{
                                    background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(255, 154, 86, 0.3)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 154, 86, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 154, 86, 0.3)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <Title level={3} style={{ color: 'white', margin: 0 }}>
                                            {statusCounts.pending}
                                        </Title>
                                        <div style={{ color: 'white', opacity: 0.9, fontSize: '14px' }}>
                                            Pending Orders
                                        </div>
                                    </div>
                                    <FiClock size={40} color="white" style={{ opacity: 0.8 }} />
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={8}>
                            <Card
                                className="status-summary-card completed-card"
                                style={{
                                    background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(74, 222, 128, 0.3)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(74, 222, 128, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 222, 128, 0.3)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <Title level={3} style={{ color: 'white', margin: 0 }}>
                                            {statusCounts.completed}
                                        </Title>
                                        <div style={{ color: 'white', opacity: 0.9, fontSize: '14px' }}>
                                            Completed Orders
                                        </div>
                                    </div>
                                    <FiCheckCircle size={40} color="white" style={{ opacity: 0.8 }} />
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={8}>
                            <Card
                                className="status-summary-card cancelled-card"
                                style={{
                                    background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(248, 113, 113, 0.3)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(248, 113, 113, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(248, 113, 113, 0.3)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <Title level={3} style={{ color: 'white', margin: 0 }}>
                                            {statusCounts.cancelled}
                                        </Title>
                                        <div style={{ color: 'white', opacity: 0.9, fontSize: '14px' }}>
                                            Cancelled Orders
                                        </div>
                                    </div>
                                    <FiXCircle size={40} color="white" style={{ opacity: 0.8 }} />
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Card className="status-card">
                        <Table
                            columns={columns}
                            dataSource={data}
                            loading={loading}
                            pagination={{
                                pageSize: 10,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                            }}
                            className="status-table"
                        />
                    </Card>
                </div>
            </Content>

            {/* PDF Preview Modal */}
            <Modal
                title="Invoice Preview"
                open={previewModalVisible}
                onCancel={handleClosePreview}
                destroyOnClose={true}
                footer={[
                    <Button key="close" onClick={handleClosePreview}>
                        Close
                    </Button>,
                    <Button 
                        key="download" 
                        type="primary" 
                        icon={<FiDownload />}
                        onClick={() => {
                            generateInvoicePDF(currentOrderData, false);
                            handleClosePreview();
                        }}
                        disabled={previewLoading}
                    >
                        Download
                    </Button>
                ]}
                width="90%"
                style={{ top: 20 }}
                bodyStyle={{ height: '80vh', padding: 0 }}
            >
                {previewLoading ? (
                    <div style={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}>
                        <div>Loading preview...</div>
                    </div>
                ) : previewPdfUrl ? (
                    <object
                        key={previewPdfUrl} // Force re-render on URL change
                        data={previewPdfUrl}
                        type="application/pdf"
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <embed
                            src={previewPdfUrl}
                            type="application/pdf"
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </object>
                ) : null}
            </Modal>
        </Layout>
    );
};

export default Status;  