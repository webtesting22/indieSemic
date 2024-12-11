import React from "react";
import "../../Styles/Footer.css";
import { Row, Col } from "antd";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailIcon from '@mui/icons-material/Email';
import { NavigationData } from "../../CommonComponents/Navigationdata/NavigationData";
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <section className="section_Padding" id="footerSection">
            <div className="QuateContainer">

                <div>
                    <div className="footerLogoContainer">
                        <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                            <img src="/Images/logo.png" alt="Logo" />
                            <div className="mobileOnlyLogo">
                                <img src="/Images/MakeInIndia2.png" />
                            </div>
                        </div>
                        <div>
                            <p>IndieSemiC Private Limited</p>
                            <p><b>Address:</b>&nbsp;<Link to="https://maps.app.goo.gl/mh95Njc42ex6evFx9" target="_blank">C-201, 2nd Floor, The First, B/h Keshav Baugh Party Plot Nr. Shivalik High-Street, Vastrapur, Ahmedabad, Gujarat 380015.</Link></p>
                        </div>
                    </div>

                </div>
                <div className="pcOnlyLogo">
                    <img src="/Images/MakeInIndia2.png" />
                </div>
            </div>
            <div className="FooterContentContainer">
                <Row>
                    <Col lg={10} md={24} xs={24} className="FooterMapContainer">
                        {/* <div>
                            <div className="footerLogoContainer">
                                <img src="/Images/logo.png" alt="Logo" />
                            </div>
                            <p>IndieSemiC Private Limited</p>
                            <p><b>Address:</b>&nbsp;<Link to="https://maps.app.goo.gl/mh95Njc42ex6evFx9" target="_blank">C-201, 2nd Floor, The First, B/h Keshav Baugh Party Plot Nr. Shivalik High-Street, Vastrapur, Ahmedabad, Gujarat 380015.</Link></p>
                        </div> */}
                        <div style={{ width: "100%", height: "100%", display: "flex", }} >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d917.9563967364755!2d72.5293045!3d23.0301753!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84b62b4e39d5%3A0xf2de6400e70fdbbf!2sDevX%3A%20Co-working%20Space%20and%20Startup%20Accelerator!5e0!3m2!1sen!2sin!4v1733212596264!5m2!1sen!2sin"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: 0,
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            ></iframe>
                        </div>
                    </Col>
                    <Col lg={1} md={0} sm={0} xs={0} />
                    <Col lg={6} md={24} xs={24}>
                        <div className="SocialNavigationLinks">

                        </div>
                    </Col>
                    <Col lg={1} md={0} xs={0} sm={0} />
                    <Col lg={5} md={24} xs={24}>
                        <div className="SocialMediaLinks">
                            <p>Contact Us</p>
                            <div className="footerSocialIcons">
                                <div><Link to="mailto:sales@indiesemic.com" target="_blank"><MailIcon sx={{ color: "rgb(74, 144, 226)" }} />sales@indiesemic.com</Link></div>
                                <div><Link to="https://www.linkedin.com/company/102919226/admin/dashboard/" target="_blank"><LinkedInIcon sx={{ color: "rgb(74, 144, 226)" }} />LinkedIn</Link></div>
                                <div><Link to="tel:919427417598"><PhoneIcon sx={{ color: "rgb(74, 144, 226)" }} />+91-9427417598</Link></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="CopyrightContainer">
                <div>
                    <p>© 2024<Link to="https://www.outleadsolutions.com/" target="_blank"> OutLead Solutions.</Link> All rights reserved.</p>
                    <p>www.indiesemic.com</p>
                </div>
            </div>

            {/* <Row>
                <Col lg={10} xs={24}>Company Logo here</Col>
                <Col lg={6} xs={12}>
                    <div className="footerLinksSection">
                        <div className='sectionHeading'><h2>Quick Links</h2></div>
                        <ul>
                            {NavigationData.map((item, index) => (
                                <li key={index}>
                                    <a href={item.path}>{item.link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col lg={8} xs={12}>
                    <div className="footerContactLinks">
                        <div className='sectionHeading'><h2>Contact Us</h2></div>
                        <p><LocationOnOutlinedIcon />&nbsp;Address here</p>
                        <p><PhoneIcon />&nbsp;Contact Number here</p>
                        <p><EmailIcon />&nbsp;Mail here</p>
                    </div>
                   
                </Col>
            </Row> */}
        </section>
    );
};
export default Footer;
