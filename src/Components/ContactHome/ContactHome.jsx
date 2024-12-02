import '../../Styles/ContactHome.css'
import React from 'react'
import { Row, Col } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const ContactHome = () => {

    return (
        <section id="ContactContainer" className='section_Padding'>
            <Row>
                <Col lg={12} xs={24}>
                    <div className='contactInfoContainer'>
                        <div className='sectionHeading'><h2>Contact Us</h2></div>
                        <p><LocationOnOutlinedIcon sx={{ color: "4a90e2" }} />&nbsp;Address here</p>
                        <p><PhoneIcon sx={{ color: "4a90e2" }} />&nbsp;Contact Number here</p>
                        <p><EmailIcon sx={{ color: "4a90e2" }} />&nbsp;Mail here</p>
                    </div>
                </Col>
                <Col lg={12} xs={20}>
                    <div className='contactFormContainer'>
                        <div className='sectionHeading'><h2>Reach Out To Us!</h2></div>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                width: '100%',
                                mt:3,
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                                <TextField id="name" label="Name" variant="outlined" sx={{ flex: 1 }} />
                                <TextField id="email" label="Email" variant="outlined" sx={{ flex: 1 }} />
                            </Box>
                            <TextField id="message" label="Message" variant="outlined" multiline rows={4} />
                        </Box>

                    </div>
                </Col>
            </Row>
        </section>
    )
}
export default ContactHome;