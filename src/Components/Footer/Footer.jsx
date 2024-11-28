import React from "react";
import "../../Styles/Footer.css";
import { Row, Col } from "antd";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailIcon from '@mui/icons-material/Email';
import { NavigationData } from "../../CommonComponents/Navigationdata/NavigationData";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <section className="section_Padding" id="footerSection">
            <div className="QuateContainer">
                <div>
                    <h1>Explore Insights & Advancements</h1>
                    <p>Stay in the loop! Join our newsletter for exclusive updates and insights delivered straight to your inbox.</p>
                </div>
            </div>
            <div className="FooterContentContainer">
                <Row>
                    <Col lg={12} md={12}>
                        <div>
                        <div className="footerLogoContainer">
                                    <img src="/Images/logo.png" alt="Logo" />
                                </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus hic alias nisi optio voluptatibus dolorem cum dolore omnis. Earum, vitae!</p>
                        </div>
                    </Col>
                    <Col lg={6} md={12}>
                        <div className="SocialNavigationLinks">
                            <p>SocialNavigationLinks</p>
                        </div>
                    </Col>
                    <Col lg={6} md={12}>
                        <div className="SocialMediaLinks">
                            <p>SocialMediaLinks</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="CopyrightContainer">
                <div>
                    <p>© 2024<Link to="https://www.outleadsolutions.com/" target="_blank"> OutLead Solutions.</Link> All rights reserved.</p>
                    <p>www.(Website Domain).com</p>
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
                    <div className="footerSocialIcons">
                        <div><InstagramIcon /></div>
                        <div><LinkedInIcon /></div>
                        <div><XIcon /></div>
                    </div>
                </Col>
            </Row> */}
        </section>
    );
};
export default Footer;
