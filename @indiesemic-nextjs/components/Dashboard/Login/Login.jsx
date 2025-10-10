"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Login.css';

const { Title } = Typography;

const Login = ({ onLoginSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Demo credentials
    const validCredentials = {
        email: 'peter.parker@mail.com',
        password: 'dashboard123'
    };

    const handleLogin = async (values) => {
        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const { email, password, remember } = values;

            // Check credentials
            if (email === validCredentials.email && password === validCredentials.password) {
                // Store authentication in localStorage
                const authData = {
                    isAuthenticated: true,
                    user: {
                        email: email,
                        name: 'Peter Parker',
                        loginTime: new Date().toISOString()
                    },
                    rememberMe: remember
                };

                localStorage.setItem('authData', JSON.stringify(authData));

                message.success('Login successful! Redirecting to dashboard...');
                setTimeout(() => {
                    onLoginSuccess();
                }, 1000);
            } else {
                message.error('Invalid email or password. Please try again.');
            }

            setLoading(false);
        }, 1500);
    };

    const AnimatedCubes = () => (
        <div className="animated-cubes-container">
            <svg
                width="400"
                height="300"
                viewBox="0 0 400 300"
                className="cubes-svg"
            >
                {/* Base platform */}
                <g className="platform">
                    <path
                        d="M50 220 L200 220 L350 180 L200 140 L50 180 Z"
                        fill="#f0f0f0"
                        stroke="#ddd"
                        strokeWidth="1"
                    />
                    <path
                        d="M200 140 L350 180 L350 200 L200 240 Z"
                        fill="#e0e0e0"
                        stroke="#ddd"
                        strokeWidth="1"
                    />
                    <path
                        d="M50 180 L200 220 L200 240 L50 200 Z"
                        fill="#e8e8e8"
                        stroke="#ddd"
                        strokeWidth="1"
                    />
                </g>

                {/* Back row cubes */}
                <g className="cube cube-1">
                    <path d="M120 160 L140 150 L160 160 L140 170 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M140 150 L160 160 L160 180 L140 190 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M120 160 L140 170 L140 190 L120 180 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                <g className="cube cube-2">
                    <path d="M160 160 L180 150 L200 160 L180 170 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M180 150 L200 160 L200 180 L180 190 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M160 160 L180 170 L180 190 L160 180 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                <g className="cube cube-3">
                    <path d="M200 160 L220 150 L240 160 L220 170 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M220 150 L240 160 L240 180 L220 190 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M200 160 L220 170 L220 190 L200 180 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                <g className="cube cube-4">
                    <path d="M240 160 L260 150 L280 160 L260 170 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M260 150 L280 160 L280 180 L260 190 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M240 160 L260 170 L260 190 L240 180 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                {/* Middle row cubes */}
                <g className="cube cube-5">
                    <path d="M140 140 L160 130 L180 140 L160 150 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M160 130 L180 140 L180 160 L160 170 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M140 140 L160 150 L160 170 L140 160 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                <g className="cube cube-6">
                    <path d="M180 140 L200 130 L220 140 L200 150 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M200 130 L220 140 L220 160 L200 170 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M180 140 L200 150 L200 170 L180 160 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                <g className="cube cube-7">
                    <path d="M220 140 L240 130 L260 140 L240 150 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M240 130 L260 140 L260 160 L240 170 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M220 140 L240 150 L240 170 L220 160 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                {/* Front row cubes */}
                <g className="cube cube-8">
                    <path d="M160 120 L180 110 L200 120 L180 130 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M180 110 L200 120 L200 140 L180 150 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M160 120 L180 130 L180 150 L160 140 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                <g className="cube cube-9">
                    <path d="M200 120 L220 110 L240 120 L220 130 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M220 110 L240 120 L240 140 L220 150 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M200 120 L220 130 L220 150 L200 140 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                {/* Top center cube */}
                <g className="cube cube-10">
                    <path d="M180 100 L200 90 L220 100 L200 110 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M200 90 L220 100 L220 120 L200 130 Z" fill="#e76f51" stroke="#e76f51" strokeWidth="0.5" />
                    <path d="M180 100 L200 110 L200 130 L180 120 Z" fill="#f4a261" stroke="#e76f51" strokeWidth="0.5" />
                </g>

                {/* Floating cubes */}
                <g className="cube cube-float-1">
                    <path d="M80 140 L95 135 L110 140 L95 145 Z" fill="#2a9d8f" stroke="#264653" strokeWidth="0.5" />
                    <path d="M95 135 L110 140 L110 155 L95 160 Z" fill="#264653" stroke="#264653" strokeWidth="0.5" />
                    <path d="M80 140 L95 145 L95 160 L80 155 Z" fill="#2a9d8f" stroke="#264653" strokeWidth="0.5" />
                </g>

                <g className="cube cube-float-2">
                    <path d="M300 120 L315 115 L330 120 L315 125 Z" fill="#e63946" stroke="#d62828" strokeWidth="0.5" />
                    <path d="M315 115 L330 120 L330 135 L315 140 Z" fill="#d62828" stroke="#d62828" strokeWidth="0.5" />
                    <path d="M300 120 L315 125 L315 140 L300 135 Z" fill="#e63946" stroke="#d62828" strokeWidth="0.5" />
                </g>

                <g className="cube cube-float-3">
                    <path d="M70 200 L85 195 L100 200 L85 205 Z" fill="#ffffff" stroke="#ddd" strokeWidth="0.5" />
                    <path d="M85 195 L100 200 L100 215 L85 220 Z" fill="#f0f0f0" stroke="#ddd" strokeWidth="0.5" />
                    <path d="M70 200 L85 205 L85 220 L70 215 Z" fill="#ffffff" stroke="#ddd" strokeWidth="0.5" />
                </g>

                <g className="cube cube-float-4">
                    <path d="M320 200 L335 195 L350 200 L335 205 Z" fill="#ffffff" stroke="#ddd" strokeWidth="0.5" />
                    <path d="M335 195 L350 200 L350 215 L335 220 Z" fill="#f0f0f0" stroke="#ddd" strokeWidth="0.5" />
                    <path d="M320 200 L335 205 L335 220 L320 215 Z" fill="#ffffff" stroke="#ddd" strokeWidth="0.5" />
                </g>
            </svg>
        </div>
    );

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-left">
                    <div className="login-form-container">
                        <div className="logo-section">
                            <img src="/Images/logo.png" alt="" style={{ width: "30%" }} />
                        </div>

                        <Title level={2} className="login-title">
                            Sign in to IndieSemiC<br />
                            Analysis Dashboard
                        </Title>

                        <Form
                            form={form}
                            name="login"
                            onFinish={handleLogin}
                            autoComplete="off"
                            className="login-form"

                        >
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ]}
                                >
                                    <Input
                                        className="form-input"
                                        placeholder="peter.parker@mail.com"
                                    />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password
                                        className="form-input"
                                        placeholder="Enter your password"
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox className="remember-checkbox">Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-button"
                                    loading={loading}
                                    block
                                >
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="demo-credentials">
                            <p><strong>Demo Credentials:</strong></p>
                            <p>Email: peter.parker@mail.com</p>
                            <p>Password: dashboard123</p>
                        </div>
                    </div>
                </div>

                <div className="login-right">
                    <AnimatedCubes />
                </div>
            </div>
        </div>
    );
};

export default Login;