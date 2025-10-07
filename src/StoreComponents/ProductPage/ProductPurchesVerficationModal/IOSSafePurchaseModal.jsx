import React, { useState } from "react";
import { Modal, Button, Form, Input, Typography, notification } from "antd";
import { isIOSSafari } from "../../../utils/iosCompatibility.js";
import EmergencyErrorBoundary from "../../../components/EmergencyErrorBoundary.jsx";

const { Title } = Typography;

// EMERGENCY iOS Safari Safe Version - Minimal functionality
const IOSSafePurchaseModal = ({
  handlePayment,
  cartItems,
  quantities,
  loading,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleSimplePayment = () => {
    // Simple payment flow without country data
    const basicData = {
      name: form.getFieldValue("name") || "Customer",
      email: form.getFieldValue("email") || "",
      phone: form.getFieldValue("phone") || "",
      address: form.getFieldValue("address") || "",
      // Default location for iOS Safari users
      country: "Unknown",
      state: "Unknown",
      city: "Unknown",
    };

    notification.info({
      message: "iOS Safari Mode",
      description: "Using simplified checkout to prevent memory issues.",
      duration: 3,
    });

    handlePayment(basicData);
    setIsModalVisible(false);
  };

  return (
    <EmergencyErrorBoundary>
      <div>
        <Button
          type="primary"
          onClick={showModal}
          style={{ backgroundColor: "#007AFF" }}
        >
          🛒 Checkout (iOS Safe Mode)
        </Button>

        <Modal
          title={
            <div style={{ textAlign: "center" }}>
              <Title level={3} style={{ margin: 0, color: "#007AFF" }}>
                🍎 iOS Safari Checkout
              </Title>
              <p
                style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}
              >
                Simplified mode for better iOS Safari performance
              </p>
            </div>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={400}
          style={{ top: 20 }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="your.email@example.com" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="+1 234 567 8900" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Shipping Address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Your complete shipping address including city, state, and country"
              />
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="primary"
                onClick={handleSimplePayment}
                loading={loading}
                size="large"
                style={{
                  backgroundColor: "#007AFF",
                  borderColor: "#007AFF",
                  width: "100%",
                }}
              >
                🚀 Proceed to Payment
              </Button>
            </div>
          </Form>

          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px",
              textAlign: "center",
              fontSize: "12px",
              color: "#666",
            }}
          >
            <p style={{ margin: 0 }}>
              ℹ️ <strong>iOS Safari Safe Mode:</strong>
              <br />
              This simplified checkout prevents memory issues on iOS devices.
            </p>
          </div>
        </Modal>
      </div>
    </EmergencyErrorBoundary>
  );
};

export default IOSSafePurchaseModal;

