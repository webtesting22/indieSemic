import '../../Styles/ContactHome.css'
import React, { useState } from 'react'
import { Row, Col } from 'antd'
// import { Button, Checkbox, Form, Input } from 'antd';
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
const ContactHome = () => {
    const [formValues, setFormValues] = React.useState({
        name: "",
        email: "",
        contact: "",
        message: "",
        country: "",
        otherCountry: "", // Additional state for "Others" input

    });
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prev) => ({ ...prev, [id]: value }));
    };
    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setFormValues((prev) => ({ ...prev, country: selectedCountry, otherCountry: "" })); // Reset otherCountry if not "Others"
    };
    const validateForm = () => {
        const errors = {};
        if (!formValues.name.trim()) errors.name = "Name is required";
        if (!formValues.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formValues.email)) errors.email = "Invalid email format";
        if (!formValues.contact.trim()) errors.contact = "Contact is required";
        else if (!/^\d{10}$/.test(formValues.contact)) errors.contact = "Contact must be 10 digits";
        if (!formValues.country) errors.country = "Country is required";
        if (formValues.country === "Others" && !formValues.otherCountry.trim())
            errors.otherCountry = "Please specify your country";
        if (!formValues.message.trim()) errors.message = "Message is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted", formValues);
            // Add API call or submission logic here
        }
    };


    return (
        <section id="ContactContainer" className='section_Padding'>
            <Row>
                <Col lg={12} xs={24}>
                    <div className='contactInfoContainer'>
                        <div className='sectionHeading'><h2>Contact Us</h2></div>
                        <p className='contactItem'>
                            <LocationOnOutlinedIcon sx={{ color: "rgb(59, 59, 214)" }} />C-201, 2nd Floor, The First, B/h Keshav Baugh Party Plot Nr. Shivalik High-Street,&nbsp;Vastrapur, Ahmedabad, Gujarat 380015, IN
                        </p>
                        <p className='contactItem'>
                            <PhoneIcon sx={{ color: "rgb(59, 59, 214)" }} />
                            Contact Number here
                        </p>
                        <p className='contactItem'>
                            <EmailIcon sx={{ color: "rgb(59, 59, 214)" }} />
                            sales@indiesemic.com
                        </p>
                    </div>
                </Col>
                <Col lg={12} xs={24}>
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
                            onSubmit={handleSubmit}

                        >
                            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                                <TextField id="name" label="Name" variant="outlined" value={formValues.name} error={!!formErrors.name}
                                    helperText={formErrors.name}

                                    onChange={handleInputChange} sx={{ flex: 1 }} />
                                <TextField id="email" label="Email" variant="outlined" value={formValues.email} error={!!formErrors.email}
                                    helperText={formErrors.email}
                                    onChange={handleInputChange} sx={{ flex: 1 }} />
                                <TextField id='contact' label="Contact" variant='outlined' value={formValues.contact} error={!!formErrors.email}
                                    helperText={formErrors.contact}
                                    onChange={handleInputChange} />
                            </Box>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formValues.country}
                                onChange={handleCountryChange}
                                error={!!formErrors.country}

                                variant='outlined'
                            >
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </Select>
                            {formValues.country === "Others" && (
                                <TextField
                                    id="otherCountry"
                                    label="Please specify your country"
                                    variant="outlined"
                                    value={formValues.otherCountry}
                                    onChange={handleInputChange}
                                    error={!!formErrors.otherCountry}
                                    helperText={formErrors.otherCountry}
                                />
                            )}
                            {formErrors.country && <p style={{ color: 'red', fontSize: '0.8em' }}>{formErrors.country}</p>}

                            <TextField id="message" label="Message" variant="outlined" multiline rows={4} value={formValues.message}
                                onChange={handleInputChange}
                                error={!!formErrors.message}
                                helperText={formErrors.message} />
                            <Button variant='contained' endIcon={<SendIcon />} type="submit" sx={{ width: "20%" }}>Submit</Button>
                        </Box>

                    </div>
                </Col>
            </Row>
        </section>
    )
}
export default ContactHome;