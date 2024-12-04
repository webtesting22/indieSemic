import '../../Styles/ContactHome.css'
import React from 'react'
import { Row, Col } from 'antd'
// import { Button, Checkbox, Form, Input } from 'antd';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
const ContactHome = () => {

    return (
        <section id="ContactContainer" className='section_Padding'>
            <Row>
                <Col lg={12} xs={24}>
                    <div className='contactInfoContainer'>
                        <div className='sectionHeading'><h2>Contact Us</h2></div>
                        <p><LocationOnOutlinedIcon sx={{ color: "rgb(59, 59, 214)" }} />&nbsp;C-201, 2nd Floor, The First, B/h Keshav Baugh Party Plot Nr. Shivalik High-Street, Vastrapur, Ahmedabad, Gujarat 380015, IN</p>
                        <p><PhoneIcon sx={{ color: "rgb(59, 59, 214)" }} />&nbsp;Contact Number here</p>
                        <p><EmailIcon sx={{ color: "rgb(59, 59, 214)" }} />&nbsp;sales@indiesemic.com</p>
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
                                mt: 3,
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                                <TextField id="name" label="Name" variant="outlined" sx={{ flex: 1 }} />
                                <TextField id="email" label="Email" variant="outlined" sx={{ flex: 1 }} />
                            </Box>
                            <TextField id="message" label="Message" variant="outlined" multiline rows={4} />
                            <Button variant='contained' endIcon={<SendIcon />} sx={{width:"20%"}}>Submit</Button>
                        </Box>

                    </div>
                </Col>
            </Row>
        </section>
    )
}
export default ContactHome;