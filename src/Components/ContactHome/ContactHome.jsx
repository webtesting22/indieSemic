import '../../Styles/ContactHome.css'
import React from 'react'
import { Row, Col } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd';
const { TextArea } = Input;

const ContactHome = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <section id="ContactContainer" className='section_Padding'>
            <Row>
                <Col lg={12}>
                    <div className='contactInfoContainer'>
                        <h2>Contact Us</h2>
                        <p>Registered Office:Address here</p>
                        <p>Contact:Contact Number here</p>
                        <p>Email:Mail here</p>
                    </div>
                </Col>
                <Col lg={12}>
                    <div className='contactFormContainer'>
                        <h2>Reach Out To Us!</h2>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 5,
                            }}
                            wrapperCol={{
                                span: 19,
                            }}
                            style={{
                                maxWidth: 600,

                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Your Name:"
                                name="name"
                                style={{
                                    textAlign: "left"
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please write your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Your Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please write your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Subject"
                                name="Subject"
                                rules={[{
                                    required: true,
                                    message: "Please write subject!"
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Your Message:"
                                name="message"

                            >
                                <TextArea rows={3} />
                            </Form.Item>


                            <div className='ContentContainerHome'>
                                <Form.Item
                                >
                                    <button type="primary" htmlType="submit">
                                        Submit
                                    </button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </section>
    )
}
export default ContactHome;