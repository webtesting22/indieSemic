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
const Footer = () => {
    return (
        <section className="section_Padding" id="footerSection">
            <Row>
                <Col lg={10} xs={24}>Company Logo here</Col>
                <Col lg={6} xs={12}>
                    <div className="footerLinksSection">
                        <h2>Quick Links</h2>
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
                        <h2>Contact Us</h2>
                        <p><LocationOnOutlinedIcon />&nbsp;Address here</p>
                        <p><PhoneIcon />&nbsp;Contact Number here</p>
                        <p><EmailIcon />&nbsp;Mail here</p>
                    </div>
                    <div className="footerSocialIcons">
                        <div><InstagramIcon/></div>
                        <div><LinkedInIcon /></div>
                        <div><XIcon /></div>
                    </div>
                </Col>
            </Row>
        </section>
    );
};
export default Footer;
