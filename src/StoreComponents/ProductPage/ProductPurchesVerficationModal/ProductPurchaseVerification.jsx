import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Checkbox, Typography, Row, Col, notification } from 'antd';
import { Country, State, City } from 'country-state-city';
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import "./ProductPurchesVerficationModal.css";

const { Title } = Typography;
const { Option } = Select;
const STORAGE_KEY = 'purchaseVerificationData';

const ProductPurchaseVerificationModal = ({
    handlePayment,
    cartItems,
    quantities,
    loading,
    savedData,
    setSavedData,
    locationDetails,
    setLocationDetails,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [sameAsBilling, setSameAsBilling] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Shipping address states
    const [shippingCountries] = useState(Country.getAllCountries());
    const [shippingStates, setShippingStates] = useState([]);
    const [shippingCities, setShippingCities] = useState([]);
    const [selectedShippingCountry, setSelectedShippingCountry] = useState('');
    const [selectedShippingState, setSelectedShippingState] = useState('');

    // Billing address states
    const [billingCountries] = useState(Country.getAllCountries());
    const [billingStates, setBillingStates] = useState([]);
    const [billingCities, setBillingCities] = useState([]);
    const [selectedBillingCountry, setSelectedBillingCountry] = useState('');
    const [selectedBillingState, setSelectedBillingState] = useState('');

    // Load saved data and location details on mount
    useEffect(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            setSavedData(parsed);
            form.setFieldsValue(parsed);
            setSameAsBilling(parsed.sameAsBilling || false);

            if (parsed.shipping_country) {
                setSelectedShippingCountry(parsed.shipping_country);
                setShippingStates(State.getStatesOfCountry(parsed.shipping_country));
            }
            if (parsed.shipping_state) {
                setSelectedShippingState(parsed.shipping_state);
                setShippingCities(City.getCitiesOfState(parsed.shipping_country, parsed.shipping_state));
            }
            if (parsed.billing_country) {
                setSelectedBillingCountry(parsed.billing_country);
                setBillingStates(State.getStatesOfCountry(parsed.billing_country));
            }
            if (parsed.billing_state) {
                setSelectedBillingState(parsed.billing_state);
                setBillingCities(City.getCitiesOfState(parsed.billing_country, parsed.billing_state));
            }
        }

        const savedLocationDetails = localStorage.getItem('locationDetails');
        if (savedLocationDetails) {
            setLocationDetails(JSON.parse(savedLocationDetails));
        }
    }, [form, setLocationDetails, setSavedData]);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const handleSave = () => {
        const values = form.getFieldsValue(true);
        const origin = "Ahmedabad, India";
        const destination = values.shipping_city || values.billing_city;

        if (!destination) {
            setLocationDetails(null);
            console.log("Destination city not selected yet");
            return;
        }

        if (!window.google || !window.google.maps) {
            notification.error({
                message: "Error",
                description: "Google Maps API not loaded",
                placement: "topRight",
            });
            return;
        }

        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
                unitSystem: window.google.maps.UnitSystem.METRIC,
            },
            (response, status) => {
                if (status === "OK") {
                    const element = response.rows[0].elements[0];
                    if (element.status === "OK") {
                        const newLocationDetails = {
                            distance: element.distance.text,
                            duration: element.duration.text,
                        };
                        setLocationDetails(newLocationDetails);
                        localStorage.setItem("locationDetails", JSON.stringify(newLocationDetails));

                        // Save form data locally, update state, close modal
                        setSavedData(values);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
                        setSameAsBilling(values.sameAsBilling || false);
                        setIsModalVisible(false);

                        notification.success({
                            message: "Success",
                            description: "Your address details saved locally. Please proceed to payment.",
                            placement: "topRight",
                        });
                    } else {
                        setLocationDetails(null);
                        notification.error({
                            message: "Error",
                            description: "Distance matrix element status: " + element.status,
                            placement: "topRight",
                        });
                    }
                } else {
                    setLocationDetails(null);
                    notification.error({
                        message: "Error",
                        description: "Distance matrix status error: " + status,
                        placement: "topRight",
                    });
                }
            }
        );
    };



    // Dropdown change handlers
    const handleShippingCountryChange = (countryCode) => {
        setSelectedShippingCountry(countryCode);
        const states = State.getStatesOfCountry(countryCode);
        setShippingStates(states);
        setShippingCities([]);
        setSelectedShippingState('');
        form.setFieldsValue({ shipping_state: undefined, shipping_city: undefined });
    };

    const handleShippingStateChange = (stateCode) => {
        setSelectedShippingState(stateCode);
        const cities = City.getCitiesOfState(selectedShippingCountry, stateCode);
        setShippingCities(cities);
        form.setFieldsValue({ shipping_city: undefined });
    };

    const handleBillingCountryChange = (countryCode) => {
        setSelectedBillingCountry(countryCode);
        const states = State.getStatesOfCountry(countryCode);
        setBillingStates(states);
        setBillingCities([]);
        setSelectedBillingState('');
        form.setFieldsValue({ billing_state: undefined, billing_city: undefined });
    };

    const handleBillingStateChange = (stateCode) => {
        setSelectedBillingState(stateCode);
        const cities = City.getCitiesOfState(selectedBillingCountry, stateCode);
        setBillingCities(cities);
        form.setFieldsValue({ billing_city: undefined });
    };




    const handleSameAsBilling = (e) => {
        const checked = e.target.checked;
        setSameAsBilling(checked);

        if (checked) {
            const allValues = form.getFieldsValue(true);

            form.setFieldsValue({
                billing_firstName: allValues.shipping_firstName,
                billing_lastName: allValues.shipping_lastName,
                billing_company: allValues.shipping_company,
                billing_gstin: allValues.shipping_gstin,
                billing_mobile: allValues.shipping_mobile,
                billing_address1: allValues.shipping_address1,
                billing_address2: allValues.shipping_address2,
                billing_city: allValues.shipping_city,
                billing_country: allValues.shipping_country,
                billing_state: allValues.shipping_state,
                billing_postalCode: allValues.shipping_postalCode,
            });

            if (allValues.shipping_country) {
                setSelectedBillingCountry(allValues.shipping_country);
                setBillingStates(State.getStatesOfCountry(allValues.shipping_country));
            } else {
                setSelectedBillingCountry('');
                setBillingStates([]);
                setBillingCities([]);
                setSelectedBillingState('');
            }

            if (allValues.shipping_state) {
                setSelectedBillingState(allValues.shipping_state);
                setBillingCities(City.getCitiesOfState(allValues.shipping_country, allValues.shipping_state));
            } else {
                setSelectedBillingState('');
                setBillingCities([]);
            }
        }
        
        // Check form validation after updating billing fields
        setTimeout(handleFormValuesChange, 100);
    };



    // Format address for preview
    const formatAddressPreview = (data) => {
        if (!data) return null;

        return (
            <div>
                <b>{data.shipping_firstName?.slice(0, 12)} {data.shipping_lastName?.slice(0, 12)}</b>
                <br />
                {data.shipping_email && <>Email: {data.shipping_email.slice(0, 12)}<br /></>}
                {data.shipping_mobile && <>Mobile: {data.shipping_mobile.slice(0, 12)}</>}
            </div>
        );
    };

    // Delete saved data and reset form
    const handleDelete = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('locationDetails');
        setSavedData(null);
        setLocationDetails(null);
        form.resetFields();
            setSameAsBilling(false);
};

// Add form validation handler
const handleFormValuesChange = () => {
    const values = form.getFieldsValue(true);
    
    // Check if all required fields are filled
    const requiredFields = [
        'shipping_firstName',
        'shipping_lastName', 
        'shipping_mobile',
        'shipping_email',
        'shipping_address1',
        'shipping_country',
        'shipping_state',
        'shipping_city',
        'shipping_postalCode'
    ];

    // Add billing fields if not same as shipping
    if (!sameAsBilling) {
        requiredFields.push(
            'billing_firstName',
            'billing_lastName',
            'billing_mobile',
            'billing_address1',
            'billing_country',
            'billing_state',
            'billing_city',
            'billing_postalCode'
        );
    }

    // Check if all required fields have values
    const hasAllRequiredValues = requiredFields.every(field => values[field]);
    setIsFormValid(hasAllRequiredValues);
};
    return (
        <div style={{ padding: '0px', display: "flex", width: "100%", justifyContent: "end", gap: "10px" }} className='EditCss'>
            {!savedData ? (
                <Button type="primary" onClick={showModal} size="large" style={{ margin: "0px", backgroundColor: "rgb(0, 0, 0)" }}>
                    Process Order
                </Button>
            ) : (
                <>
                    <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '6px', marginBottom: '12px', width: '30%', maxWidth: "50%", position: "relative", overflow: "hidden" }} className='EditCssNew'>

                        <br /><Title level={5}>Your Address</Title>
                        <div>

                            {formatAddressPreview(savedData)}
                        </div>
                        <div className='EditAndDeleteButton'>
                            <GoPencil onClick={showModal} />
                            <MdDelete onClick={handleDelete} />
                        </div>
                    </div>
                    <Button type="primary" onClick={handlePayment} loading={loading} style={{ margin: "0px" }}>
                        Process Order
                    </Button>
                </>
            )}
            <Modal
                title={<Title level={3}>Purchase Verification</Title>}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
                style={{ top: 20 }}

            >
                {/* <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 20 }}>
                    {cartItems.map(item => (
                        <div key={item._id}>
                            <h3>{item.title}</h3>
                            <p>Price: ₹{item.price}</p>
                            <p>Description: {item.productDescription}</p>
                            <p>Category: {item.category}</p>
                            <p>Quantity: {quantities[item._id] || 1}</p>
                            <img src={item.mainImages?.[0]} alt={item.title} style={{ width: 100 }} />
                        </div>
                    ))}
                </div> */}

                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        shipping_country: undefined,
                        billing_country: undefined,
                        shippingMethod: 'express'
                    }}
                    onValuesChange={handleFormValuesChange}
                >
                    {/* Shipping Section */}
                    {/* <Title level={4}>Shipping</Title> */}
                    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                        <Title level={5}>Shipping Address</Title>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="First Name"
                                    name="shipping_firstName"
                                    rules={[{ required: true, message: 'Please enter first name' }]}
                                >
                                    <Input placeholder="Enter Your First Name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Last Name"
                                    name="shipping_lastName"
                                    rules={[{ required: true, message: 'Please enter last name' }]}
                                >
                                    <Input placeholder="Enter Your Last Name" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Company Name (Optional)"
                            name="shipping_company"
                        >
                            <Input placeholder="Company Name" />
                        </Form.Item>

                        <Form.Item
                            label="GSTIN (Optional)"
                            name="shipping_gstin"
                        >
                            <Input placeholder="GSTIN" />
                        </Form.Item>

                        <Form.Item
                            label="Mobile Number (required for delivery OTP)"
                            name="shipping_mobile"
                            rules={[{ required: true, message: 'Please enter mobile number' }]}
                        >
                            <Input placeholder="Enter Your Mobile Number" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="shipping_email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email address' }
                            ]}
                        >
                            <Input placeholder="Enter Your Email" />
                        </Form.Item>

                        <Form.Item
                            label="Address Line 1"
                            name="shipping_address1"
                            rules={[{ required: true, message: 'Please enter address' }]}
                        >
                            <Input placeholder="Address Line 1" />
                        </Form.Item>

                        <Form.Item
                            label="Address Line 2 (Optional)"
                            name="shipping_address2"
                        >
                            <Input placeholder="Address Line 2" />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Country"
                                    name="shipping_country"
                                    rules={[{ required: true, message: 'Please select country' }]}
                                >
                                    <Select
                                        placeholder="Select Country"
                                        onChange={handleShippingCountryChange}
                                        showSearch
                                        allowClear
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        value={selectedShippingCountry || undefined}
                                    >
                                        {shippingCountries.map((country) => (
                                            <Option key={country.isoCode} value={country.isoCode}>
                                                {country.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="State/Province"
                                    name="shipping_state"
                                    rules={[{ required: true, message: 'Please select state' }]}
                                >
                                    <Select
                                        placeholder="Select State"
                                        onChange={handleShippingStateChange}
                                        disabled={!selectedShippingCountry}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {shippingStates.map((state) => (
                                            <Option key={state.isoCode} value={state.isoCode}>
                                                {state.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="City"
                                    name="shipping_city"
                                    rules={[{ required: true, message: 'Please select city' }]}
                                >
                                    <Select
                                        placeholder="Select City"
                                        disabled={!selectedShippingState}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {shippingCities.map((city) => (
                                            <Option key={city.name} value={city.name}>
                                                {city.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Postal Code"
                                    name="shipping_postalCode"
                                    rules={[{ required: true, message: 'Please enter postal code' }]}
                                >
                                    <Input placeholder="Enter Your Postal Code" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="sameAsBilling" valuePropName="checked">
                            <Checkbox onChange={handleSameAsBilling}>
                                My Billing address is the same as my Shipping address
                            </Checkbox>
                        </Form.Item>

                        {/* <Title level={5} style={{ marginTop: '20px' }}>Shipping Method</Title>
                        <Form.Item name="shippingMethod">
                            <Radio.Group>
                                <Radio value="express">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '300px' }}>
                                        <span>Express Shipping</span>
                                        <Text strong>₹45.00</Text>
                                    </div>
                                </Radio>
                            </Radio.Group>
                        </Form.Item> */}

                        <Form.Item label="Order Comments" name="orderComments">
                            <Input.TextArea rows={3} placeholder="Any special instructions..." />
                        </Form.Item>
                    </div>

                    {/* Billing Section */}
                    {!sameAsBilling && (
                        <>
                            {/* <Title level={4}>Billing</Title> */}
                            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                                <Title level={5}>Billing Address</Title>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="First Name"
                                            name="billing_firstName"
                                            rules={[{ required: true, message: 'Please enter first name' }]}
                                        >
                                            <Input placeholder="Enter Your First Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Last Name"
                                            name="billing_lastName"
                                            rules={[{ required: true, message: 'Please enter last name' }]}
                                        >
                                            <Input placeholder="Enter Your Last Name" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label="Company Name (Optional)"
                                    name="billing_company"
                                >
                                    <Input placeholder="Company Name" />
                                </Form.Item>

                                <Form.Item
                                    label="GSTIN (Optional)"
                                    name="billing_gstin"
                                >
                                    <Input placeholder="GSTIN" />
                                </Form.Item>

                                <Form.Item
                                    label="Mobile Number (required for delivery OTP)"
                                    name="billing_mobile"
                                    rules={[{ required: true, message: 'Please enter mobile number' }]}
                                >
                                    <Input placeholder="Enter Your Mobile Number" />
                                </Form.Item>

                                <Form.Item
                                    label="Address Line 1"
                                    name="billing_address1"
                                    rules={[{ required: true, message: 'Please enter address' }]}
                                >
                                    <Input placeholder="Address Line 1" />
                                </Form.Item>

                                <Form.Item
                                    label="Address Line 2 (Optional)"
                                    name="billing_address2"
                                >
                                    <Input placeholder="Address Line 2" />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Country"
                                            name="billing_country"
                                            rules={[{ required: true, message: 'Please select country' }]}
                                        >
                                            <Select
                                                placeholder="Select Country"
                                                onChange={handleBillingCountryChange}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {billingCountries.map((country) => (
                                                    <Option key={country.isoCode} value={country.isoCode}>
                                                        {country.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="State/Province"
                                            name="billing_state"
                                            rules={[{ required: true, message: 'Please select state' }]}
                                        >
                                            <Select
                                                placeholder="Select State"
                                                onChange={handleBillingStateChange}
                                                disabled={!selectedBillingCountry}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {billingStates.map((state) => (
                                                    <Option key={state.isoCode} value={state.isoCode}>
                                                        {state.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="City"
                                            name="billing_city"
                                            rules={[{ required: true, message: 'Please select city' }]}
                                        >
                                            <Select
                                                placeholder="Select City"
                                                disabled={!selectedBillingState}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {billingCities.map((city) => (
                                                    <Option key={city.name} value={city.name}>
                                                        {city.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Postal Code"
                                            name="billing_postalCode"
                                            rules={[{ required: true, message: 'Please enter postal code' }]}
                                        >
                                            <Input placeholder="Enter Your Postal Code" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </>
                    )}


                    {/* Form Actions */}
                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        {/* <Button onClick={handleCancel} style={{ marginRight: '10px' }}>
                            Cancel
                        </Button> */}
                        <Button 
                            type="primary" 
                            onClick={handleSave}
                            disabled={!isFormValid}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductPurchaseVerificationModal;