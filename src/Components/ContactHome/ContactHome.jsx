import '../../Styles/ContactHome.css'
import React from 'react'
import { Row, Col } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TextField from '@mui/material/TextField';

const ContactHome = () => {

    return (
        <section id="ContactContainer" className='section_Padding'>
            <Row>
                <Col lg={12} xs={24}>
                    <div className='contactInfoContainer'>
                        <div className='sectionHeading'><h2>Contact Us</h2></div>
                        <p><LocationOnOutlinedIcon />&nbsp;Address here</p>
                        <p><PhoneIcon />&nbsp;Contact Number here</p>
                        <p><EmailIcon />&nbsp;Mail here</p>
                    </div>
                </Col>
                <Col lg={12} xs={20}>
                    <div className='contactFormContainer'>
                        <div className='sectionHeading'><h2>Reach Out To Us!</h2></div>
                       
                    </div>
                </Col>
            </Row>
        </section>
    )
}
export default ContactHome;