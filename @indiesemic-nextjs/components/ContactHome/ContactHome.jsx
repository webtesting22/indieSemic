"use client";

import "../../styles/Styles/ContactHome.css";
import { useState, useEffect } from "react";
import { Row, Col, notification } from "antd";
import { MenuItem, Box, TextField } from "@mui/material";
import emailjs from "emailjs-com";
import { Country, State } from "country-state-city";
import SendIcon from "@mui/icons-material/Send";

const ContactHome = () => {
  const [formValues, setFormValues] = useState({
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
    const stateList = State.getStatesOfCountry(selectedCountryCode);

    // Batch state updates
    setFormValues((prev) => ({
      ...prev,
      country: selectedCountryCode,
      state: "",
    }));
    setStates(stateList);
    setFormErrors((prev) => ({ ...prev, country: "", state: "" }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Special validation for different field types
    let processedValue = value;

    // Phone number validation - only allow numbers and max 10 digits
    if (id === "contact") {
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Name validation - only allow letters, spaces, and common name characters
    else if (id === "name") {
      processedValue = value.replace(/[^a-zA-Z\s'.-]/g, "");
    }

    // Email validation - basic format check
    else if (id === "email") {
      processedValue = value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
    }

    // Message validation - allow letters, numbers, spaces, and common punctuation
    else if (id === "message") {
      processedValue = value.replace(
        /[^a-zA-Z0-9\s.,!?@#$%&*()_+=[\]{};':"\\|<>/]/g,
        ""
      );
    }

    // Other country validation - allow letters, spaces, and common characters
    else if (id === "otherCountry") {
      processedValue = value.replace(/[^a-zA-Z\s'-]/g, "");
    }

    // Update form values and clear error in one operation
    setFormValues((prev) => ({ ...prev, [id]: processedValue }));
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleStateChange = (event) => {
    const stateValue = event.target.value;
    setFormValues((prev) => ({ ...prev, state: stateValue }));
    setFormErrors((prev) => ({ ...prev, state: "" }));
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formValues.name.trim()) {
      errors.name = "Name is required";
    } else if (formValues.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long";
    } else if (formValues.name.trim().length > 50) {
      errors.name = "Name must be less than 50 characters";
    } else if (!/^[a-zA-Z\s'.-]+$/.test(formValues.name.trim())) {
      errors.name =
        "Name can only contain letters, spaces, apostrophes, hyphens, and dots";
    }

    // Email validation
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formValues.email.trim()
      )
    ) {
      errors.email = "Please enter a valid email address";
    } else if (formValues.email.trim().length > 100) {
      errors.email = "Email must be less than 100 characters";
    }

    // Contact validation
    if (!formValues.contact.trim()) {
      errors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formValues.contact.trim())) {
      errors.contact = "Contact number must be exactly 10 digits";
    }

    // Country validation
    if (!formValues.country) {
      errors.country = "Country is required";
    }

    // Other country validation
    if (formValues.country === "Others" && !formValues.otherCountry.trim()) {
      errors.otherCountry = "Please specify your country";
    } else if (
      formValues.country === "Others" &&
      formValues.otherCountry.trim().length < 2
    ) {
      errors.otherCountry = "Country name must be at least 2 characters long";
    } else if (
      formValues.country === "Others" &&
      formValues.otherCountry.trim().length > 50
    ) {
      errors.otherCountry = "Country name must be less than 50 characters";
    }

    // State validation for India
    if (formValues.country === "IN" && !formValues.state.trim()) {
      errors.state = "State is required for India";
    }

    // Message validation
    if (!formValues.message.trim()) {
      errors.message = "Message is required";
    } else if (formValues.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    } else if (formValues.message.trim().length > 1000) {
      errors.message = "Message must be less than 1000 characters";
    }

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
          otherCountry:
            formValues.country === "Others" ? formValues.otherCountry : "None",
        };

        emailjs.init("he7c_VvdVGJ1i14BP");

        await emailjs.send(
          "service_2zloh8u",
          "template_ou1ijvg",
          emailData,
          "he7c_VvdVGJ1i14BP"
        );

        notification.success({
          message: "Message Sent Successfully!",
          description:
            "Thank you for reaching out. We will get back to you shortly.",
          placement: "topRight",
          duration: 4,
        });

        // Reset form state
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
        setFormErrors({});
      } catch (error) {
        console.error("Error:", error);
        notification.error({
          message: "Failed to Send Message",
          description: "Something went wrong. Please try again later.",
          placement: "topRight",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact-container" className="contact-section">
      <div className="contact-background">
        <div className="contact-background-overlay"></div>
      </div>

      <div className="contact-content">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>
            Ready to transform your business? Let&apos;s start the conversation.
          </p>
        </div>

        <Row
          gutter={[48, 32]}
          align="middle"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* <Col lg={11} md={24} xs={24}>
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
                     */}
          {/* <Col lg={1} md={0} /> */}

          <Col lg={20} md={24} xs={24}>
            <div className="contact-form-container">
              <div className="form-header">
                <h3>Send us a Message</h3>
                <p>
                  Fill out the form below and we&apos;ll get back to you soon
                </p>
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
                    onKeyDown={(e) => {
                      // Allow letters, spaces, apostrophes, hyphens, dots, and navigation keys
                      if (
                        !/[a-zA-Z\s'.-]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                          "Enter",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="form-field"
                    fullWidth
                    inputProps={{
                      maxLength: 50,
                    }}
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
                    onKeyDown={(e) => {
                      // Allow email characters and navigation keys
                      if (
                        !/[a-zA-Z0-9@._%+-]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                          "Enter",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="form-field"
                    fullWidth
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                  <TextField
                    id="contact"
                    label="Phone Number"
                    variant="outlined"
                    value={formValues.contact}
                    error={!!formErrors.contact}
                    helperText={formErrors.contact}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      // Only allow numbers and navigation keys
                      if (
                        !/[\d]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                          "Enter",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                      // Prevent typing if already at max length (10 digits) and not a navigation key
                      if (
                        formValues.contact.length >= 10 &&
                        /[\d]/.test(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="form-field"
                    fullWidth
                    inputProps={{
                      maxLength: 10,
                      pattern: "[0-9]*",
                    }}
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
                      onKeyDown={(e) => {
                        // Allow letters, spaces, apostrophes, hyphens, and navigation keys
                        if (
                          !/[a-zA-Z\s'-]/.test(e.key) &&
                          ![
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "Tab",
                            "Enter",
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      error={!!formErrors.otherCountry}
                      helperText={formErrors.otherCountry}
                      className="form-field"
                      fullWidth
                      inputProps={{
                        maxLength: 50,
                      }}
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
                    onKeyDown={(e) => {
                      // Allow letters, numbers, spaces, and common punctuation
                      if (
                        !/[a-zA-Z0-9\s.,!?@#$%&*()_+=[\]{};':"\\|<>/]/.test(
                          e.key
                        ) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                          "Enter",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                    className="form-field"
                    fullWidth
                    inputProps={{
                      maxLength: 1000,
                    }}
                  />
                </div>

                <div className="form-submit">
                  <button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
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
  );
};

export default ContactHome;
