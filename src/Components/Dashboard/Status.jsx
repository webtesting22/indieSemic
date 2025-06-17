import React, { useState, useEffect } from 'react';
import { Layout, Table, Select, Card, Typography, Tag, message } from 'antd';
import { FiPackage } from 'react-icons/fi';
import './Dashboard.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Status = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
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
                        productName: product.title,
                        value: product.price * product.quantity,
                        items: product.quantity,
                        status: product.productStatus || order.status || 'pending', // Use product status if available, otherwise order status
                        orderId: order._id,
                        productId: product._id,
                        customerName: `${order.shipping?.firstName || ''} ${order.shipping?.lastName || ''}`.trim(),
                        createdAt: order.createdAt
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

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (text) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiPackage />
                    <span>{text}</span>
                </div>
            ),
        },
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
        {
            title: 'Quantity',
            dataIndex: 'items',
            key: 'items',
            render: (items) => <Tag color="blue">{items} units</Tag>,
        },
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
        </Layout>
    );
};

export default Status;  