import '../../Styles/ContactHome.css'
import React, { useState, useEffect } from 'react'
import { Row, Col, notification } from 'antd'
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Country, State } from 'country-state-city';
import SendIcon from '@mui/icons-material/Send';

const ContactHome = () => {
    const [formValues, setFormValues] = React.useState({
        name: "",
        email: "",
        contact: "",
        message: "",
        country: "",
        otherCountry: "",
        state: "",
    });
    
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const countryList = Country.getAllCountries();
        setCountries(countryList);
    }, []);

    const handleCountryChange = (event) => {
        const selectedCountryCode = event.target.value;
        
        setFormValues((prev) => ({
            ...prev,
            country: selectedCountryCode,
            state: '',
        }));
        
        const stateList = State.getStatesOfCountry(selectedCountryCode);
        setStates(stateList);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prev) => ({ ...prev, [id]: value }));
        // Clear error when user starts typing
        if (formErrors[id]) {
            setFormErrors((prev) => ({ ...prev, [id]: '' }));
        }
    };

    const handleStateChange = (event) => {
        setFormValues((prev) => ({ ...prev, state: event.target.value }));
        if (formErrors.state) {
            setFormErrors((prev) => ({ ...prev, state: '' }));
        }
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
        if (formValues.country === "India" && !formValues.state.trim())
            errors.state = "State is required";
        if (!formValues.message.trim()) errors.message = "Message is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            
            try {
                const emailData = {
                    ...formValues,
                    otherCountry: formValues.country === "Others" ? formValues.otherCountry : 'None',
                };
                
                emailjs.init("he7c_VvdVGJ1i14BP");
                
                await emailjs.send('service_2zloh8u', 'template_ou1ijvg', emailData, 'he7c_VvdVGJ1i14BP');
                
                notification.success({
                    message: 'Message Sent Successfully!',
                    description: 'Thank you for reaching out. We will get back to you shortly.',
                    placement: 'topRight',
                    duration: 4,
                });

                setFormValues({
                    name: "",
                    email: "",
                    contact: "",
                    message: "",
                    country: "",
                    otherCountry: "",
                    state: "",
                });
                setStates([]);
                
            } catch (error) {
                console.error('Error:', error);
                notification.error({
                    message: 'Failed to Send Message',
                    description: 'Something went wrong. Please try again later.',
                    placement: 'topRight',
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <section id="contact-container" className='contact-section'>
            <div className="contact-background">
                <div className="contact-background-overlay"></div>
            </div>
            
            <div className="contact-content">
                <div className="section-title">
                    <h2>Get In Touch</h2>
                    <p>Ready to transform your business? Let's start the conversation.</p>
                </div>
                
                <Row gutter={[48, 32]} align="middle">
                    <Col lg={11} md={24} xs={24}>
                        <div className='contact-info-container'>
                            <div className='contact-info-header'>
                                <h3>Contact Information</h3>
                                <p>Reach out to us through any of these channels</p>
                            </div>
                            
                            <div className='contact-items'>
                                <div className='contact-item'>
                                    <div className='contact-icon'>
                                        <LocationOnOutlinedIcon />
                                    </div>
                                    <div className='contact-details'>
                                        <h4>Our Office</h4>
                                        <Link 
                                            target='_blank' 
                                            to="https://maps.app.goo.gl/mh95Njc42ex6evFx9"
                                            className='contact-link'
                                        >
                                            C-201, 2nd Floor, The First, B/h Keshav Baugh Party Plot Nr. Shivalik High-Street, Vastrapur, Ahmedabad, Gujarat 380015.
                                        </Link>
                                    </div>
                                </div>
                                
                                <div className='contact-item'>
                                    <div className='contact-icon'>
                                        <LinkedInIcon />
                                    </div>
                                    <div className='contact-details'>
                                        <h4>LinkedIn</h4>
                                        <Link 
                                            to="https://www.linkedin.com/company/102919226/admin/dashboard/"
                                            target="_blank"
                                            className='contact-link'
                                        >
                                            Connect with us on LinkedIn
                                        </Link>
                                    </div>
                                </div>
                                
                                <div className='contact-item'>
                                    <div className='contact-icon'>
                                        <EmailIcon />
                                    </div>
                                    <div className='contact-details'>
                                        <h4>Email Us</h4>
                                        <Link 
                                            to="mailto:sales@indiesemic.com" 
                                            target="_blank"
                                            className='contact-link'
                                        >
                                            sales@indiesemic.com
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    
                    <Col lg={1} md={0} />
                    
                    <Col lg={12} md={24} xs={24}>
                        <div className='contact-form-container'>
                            <div className='form-header'>
                                <h3>Send us a Message</h3>
                                <p>Fill out the form below and we'll get back to you soon</p>
                            </div>
                            
                            <Box
                                component="form"
                                className="contact-form"
                                onSubmit={handleSubmit}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="form-row">
                                    <TextField 
                                        id="name" 
                                        label="Full Name" 
                                        variant="outlined" 
                                        value={formValues.name}
                                        error={!!formErrors.name}
                                        helperText={formErrors.name}
                                        onChange={handleInputChange}
                                        className="form-field"
                                        fullWidth
                                    />
                                </div>
                                
                                <div className="form-row">
                                    <TextField 
                                        id="email" 
                                        label="Email Address" 
                                        variant="outlined" 
                                        type="email"
                                        value={formValues.email}
                                        error={!!formErrors.email}
                                        helperText={formErrors.email}
                                        onChange={handleInputChange}
                                        className="form-field"
                                        fullWidth
                                    />
                                    <TextField 
                                        id='contact' 
                                        label="Phone Number" 
                                        variant='outlined' 
                                        value={formValues.contact}
                                        error={!!formErrors.contact}
                                        helperText={formErrors.contact}
                                        onChange={handleInputChange}
                                        className="form-field"
                                        fullWidth
                                    />
                                </div>
                                
                                <div className="form-row">
                                    <TextField
                                        select
                                        label="Country"
                                        id="country"
                                        value={formValues.country}
                                        onChange={handleCountryChange}
                                        error={!!formErrors.country}
                                        helperText={formErrors.country}
                                        className="form-field"
                                        fullWidth
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country.isoCode} value={country.isoCode}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    
                                    {states.length > 0 && (
                                        <TextField
                                            select
                                            label="State"
                                            id="state"
                                            value={formValues.state}
                                            onChange={handleStateChange}
                                            error={!!formErrors.state}
                                            helperText={formErrors.state}
                                            className="form-field"
                                            fullWidth
                                        >
                                            {states.map((state) => (
                                                <MenuItem key={state.isoCode} value={state.name}>
                                                    {state.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                </div>
                                
                                {formValues.country === "Others" && (
                                    <div className="form-row">
                                        <TextField
                                            id="otherCountry"
                                            label="Please specify your country"
                                            variant="outlined"
                                            value={formValues.otherCountry}
                                            onChange={handleInputChange}
                                            error={!!formErrors.otherCountry}
                                            helperText={formErrors.otherCountry}
                                            className="form-field"
                                            fullWidth
                                        />
                                    </div>
                                )}
                                
                                <div className="form-row">
                                    <TextField 
                                        id="message" 
                                        label="Your Message" 
                                        variant="outlined" 
                                        multiline 
                                        rows={4} 
                                        value={formValues.message}
                                        onChange={handleInputChange}
                                        error={!!formErrors.message}
                                        helperText={formErrors.message}
                                        className="form-field"
                                        fullWidth
                                    />
                                </div>
                                
                                <div className="form-submit">
                                    <button
                                        type='submit'
                                        className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="loading-spinner"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <SendIcon className="btn-icon" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </Box>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default ContactHome;