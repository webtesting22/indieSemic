"use client";

import React, { useEffect, useState } from "react"
import "./Modules.css"
import { Row, Col } from 'antd';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ContactHome from "../ContactHome/ContactHome";

const Modules = () => {
    const CarouselImage = ({ imgSrc, hoverImgSrc, alt }) => {
        const [currentImg, setCurrentImg] = useState(imgSrc);
        const [fade, setFade] = useState(true); // State to control fading
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
        useEffect(() => {
            const interval = setInterval(() => {
                setFade(false); // Start fade-out effect
                setTimeout(() => {
                    // Switch image after fade-out
                    setCurrentImg((prev) => (prev === imgSrc ? hoverImgSrc : imgSrc));
                    setFade(true); // Start fade-in effect
                }, 500); // Match this duration with CSS transition time
            }, 2500); // Interval duration (image stays visible for 2 seconds + fade-out/in time)

            return () => clearInterval(interval); // Cleanup on component unmount
        }, [imgSrc, hoverImgSrc]);

        return (
            <div className="imageContainer">
                <img
                    src={currentImg}
                    alt={alt}
                    className={`carousel-image ${fade ? "fade-in" : "fade-out"}`}
                />
            </div>
        );
    };
    const contentData = [
        {
            title: "ISC-Beacon-V1.0 ",
            subtitle: "Based on Nordic’s nRF52820, Portable Bluetooth LE Positioning Tag ",
            text: `Compact and portable, the ISC-Beacon-V1.0 offers a long-range solution for asset tracking. It is based on Nordic Semiconductor’s nRF52820 chipset, with up to 12 months* battery life, dual-channel broadcast, and easy installation, and is ideal for commercial and industrial use.`,
            imgSrc: "/ISC Modules for website/1. ISC-Beacon-V01/20 F.png",
            hoverImgSrc: "/ISC Modules for website/1. ISC-Beacon-V01/20 B.png",
            attachmentPath: "/ISC Modules for website/1. ISC-Beacon-V01/ISC-Beacon-V01 Datasheet.pdf",
        },
        {
            title: "ISC-nRF52810-A ",
            subtitle: "Based on Nordic’s nRF52810 chipset IC, Multiprotocol BLE, ANT, 2.4GHz Module ",
            text: `ISC-nRF52810-A is a powerful multiprotocol BLE, ANT, 2.4GHz module featuring the nRF52810 SoC by Nordic Semiconductor for extended range, low power consumption, and versatile connectivity. Ideal for wearables, IoT sensors, industrial automation, and smart home applications.`,
            imgSrc: "/ISC Modules for website/2. ISC-nRF52810-A/10 F.png",
            hoverImgSrc: "/ISC Modules for website/2. ISC-nRF52810-A/10 B.png",
            attachmentPath: "/ISC Modules for website/2. ISC-nRF52810-A/ISC_nRF52810_A_Datasheet.pdf",
        },
        {
            title: "ISC-nRF52832-A ",
            subtitle: "Based on Nordic’s nRF52833 chipset IC, Multiprotocol BLE, ANT, 2.4GHz Module ",
            text: `The ISC-nRF52832-A is a multiprotocol module which is based on Nordic Semiconductor’s nRF52832 chipset that has a 32bit ARM Cortex-M4F CPU, Flash memory and analogue and digital peripherals. It supports Bluetooth 5.3 stack for BLE (Bluetooth Low Energy) and is designed for high data rate short-range wireless communication in the 2.4GHz ISM band. The module further supports SIGMESH protocol and ANT protocol. It provides a low power and ultra-low-cost solution for wireless transmission applications.`,
            imgSrc: "/ISC Modules for website/3. ISC-nRF-52832-A/32 F.png",
            hoverImgSrc: "/ISC Modules for website/3. ISC-nRF-52832-A/32 B.png",
            attachmentPath: "/ISC Modules for website/3. ISC-nRF-52832-A/ISC_nRF52832_A_Datasheet.pdf",
        },
        {
            title: "ISC-nRF52840-A",
            subtitle: "Based on Nordic’s nRF52840 chipset IC, Multiprotocol BLE, 2.4GHz Module with PCB Antenna",
            text: `The ISC-nRF52840-A is a powerful, highly flexible, ultra-low power Bluetooth Low Energy module based on Nordic Semiconductor’s nRF52840 chipset. This module is a 2.4GHz multiprotocol transceiver with an ARM Cortex M4F MCU available, 1MB Flash, 256KB RAM, that incorporates: GPIO, SPI, UART, I2C, I2S, PMD, PWM, ADC, NFC, and USB interfaces for connecting peripherals and sensors.`,
            imgSrc: "/ISC Modules for website/4. ISC-nRF52840-A/40 F.png",
            hoverImgSrc: "/ISC Modules for website/4. ISC-nRF52840-A/40 B.png",
            attachmentPath: "/ISC Modules for website/4. ISC-nRF52840-A/ISC_nRF52840_A_Datasheet_V03.pdf",
        },
        {
            title: "ISC-nRF5340-7002-A",
            subtitle: "An advanced multiprotocol ultra-low power BLE & Wi-Fi 6 Combo module",
            text: `The ISC-nRF5340-nRF7002-A is a powerful, highly flexible, ultra-low power Bluetooth Low Energy and Wifi 6 module based on Nordic Semiconductor’s nRF5340 and nRF7002 SoC solution. WiFi + BLE Combo module that supports WiFi6 dual-frequency connection, 2.4G and 5G 1TR1, Maximum WiFi speed 86mbps, output Maximum power up to 3dBm, receiving current in 2.4G frequency region is 56mA, while in 5G frequency region is 58mA, meanwhile supports BLE master/slave mode and pass through mode, adopts WiFi and BLE independent design, no crosstalk.`,
            imgSrc: "/ISC Modules for website/5. ISC-nRF-5340-7002-A/F.png",
            hoverImgSrc: "/ISC Modules for website/5. ISC-nRF-5340-7002-A/B.png",
            attachmentPath: "/ISC Modules for website/5. ISC-nRF-5340-7002-A/ISC_nRF5340_7002_A_Datasheet.pdf",
        },
        {
            title: "ISC-nRF7002-A",
            subtitle: "A compact WiFi 6 Companion based on Nordic’s nRF7002 chip",
            text: `ISC_NRF7002_A module is a powerful, highly flexible, ultra-low power WiFi 6 module using Nordic’s nRF7002 SoC. With an integrated PCB trace antenna, it allows faster time to market with reduced development cost. The nRF7002 is a companion IC, providing seamless Wi-Fi connectivity and Wi-Fi-based locationing (SSID sniffing of local Wi-Fi hubs). With the support for Wi-Fi 6, we bring added benefits to IoT applications including further efficiency gains that supportlong-life, battery-powered Wi-Fi operation.`,
            imgSrc: "/ISC Modules for website/6. ISC_nRF7002/ISC-nRF7002-A F.png",
            hoverImgSrc: "/ISC Modules for website/6. ISC_nRF7002/ISC-nRF7002-A B.png",
            attachmentPath: "/ISC Modules for website/6. ISC_nRF7002/ISC_nRF7002_A_Datasheet_v0.1.pdf",
        },
        {
            title: "ISC-SX1262-B",
            subtitle: "An advanced LORA Module based on Semtech’s SX1262 chip",
            text: `Compact and portable, the ISC-SX1262-B  module is used for ultra-long-range extended frequency communication, and its radio frequency chip SX1262 mainly uses LoRa™ remote modem, which is used for ultra-long range extended frequency communication. It offers more advanced features and is ideal for applications requiring high performance and flexibility, such as industrial IoT, logistics, and more complex wireless systems.`,
            imgSrc: "/ISC Modules for website/7. ISC-sx1262-B/ISC-SX1262-B F.png",
            hoverImgSrc: "/ISC Modules for website/7. ISC-sx1262-B/ISC-SX1262-B B.png",
            attachmentPath: "/ISC Modules for website/7. ISC-sx1262-B/ISC_SX1262_LORA_V0.2 1_Datasheet.pdf",
        },
        {
            title: "ISC-LLCC68-B",
            subtitle: "An advanced LORA Module based on Semtech’s LLCC68 chip",
            text: `Compact, portable, and designed primarily for cost-sensitive, large-volume applications, the ISC-LLCC68-B  module is used for long-range extended frequency communication, and its radio frequency chip LLCC68 mainly uses LoRa™ remote modem, which is used for long range extended frequency communication. It has strong anti-interference resistance and can minimize current consumption.`,
            imgSrc: "/ISC Modules for website/8. ISC-LLCC68-B/ISC-LLCC68-B F.png",
            hoverImgSrc: "/ISC Modules for website/8. ISC-LLCC68-B/ISC-LLCC68-B B.png",
            attachmentPath: "/ISC Modules for website/8. ISC-LLCC68-B/ISC-LLCC68-B Datasheet.pdf",
        },
    ];

    return (
        <>
            {/* <section id="ModulesContainer">
                <div className="ModuleBanner">
                    <div>
                        <img src="/Images/AlternateSoc.jpg" />
                    </div>
                </div>

            </section> */}
            <section className="section_Padding" id="ModulesDataContainer">
                <div className='ExpertiseCardContainer'>
                    <div className="DesignedContainer" id='Target'>
                        <h1 style={{ textAlign: "left" }}><span style={{ color: "rgb(74, 144, 226)" }}>Versatile Modules</span>  for Tomorrow’s Smart Technologies</h1>
                        {/* <p>Revolutionizing the future of technology with cutting-edge chip design and development.</p> */}
                    </div>
                    <br /><br />
                    <div className='ContentRow' style={{ overflow: "hidden" }}>
                        {contentData.map((item, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <Row key={index} gutter={[16, 16]} className={isEven ? 'even-row' : 'odd-row'}>
                                    {isEven ? (
                                        <>
                                            <Col lg={12} xs={24}>
                                                <CarouselImage
                                                    imgSrc={item.imgSrc}
                                                    hoverImgSrc={item.hoverImgSrc}
                                                    alt={item.title}
                                                />
                                            </Col>
                                            <Col lg={12} xs={24}>
                                                <div className="SideContentContainer">
                                                    <h3 data-aos="fade-up">{item.title}</h3>
                                                    <h4 className="moduleTagline" data-aos="fade-up" data-aos-delay="100">{item.subtitle}</h4>
                                                    <p style={{ fontSize: "18px" }} data-aos="fade-up" data-aos-delay="200">{item.text}</p>
                                                    <div style={{ display: "flex", padding: "20px 0px" }}>
                                                        <a href="#ModuleContactContainer">
                                                            <button type="submit">
                                                                <ArrowRightAltIcon />
                                                                Know More
                                                            </button>
                                                        </a>
                                                        <a href={item.attachmentPath} download>
                                                            <button type="submit">
                                                                <ArrowRightAltIcon />
                                                                Download Datasheet
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Col>
                                        </>
                                    ) : (
                                        <>
                                            <Col lg={12} xs={24}>
                                                <div className="SideContentContainer">
                                                    <h3 data-aos="fade-up">{item.title}</h3>
                                                    <h4 className="moduleTagline" data-aos="fade-up" data-aos-delay="100">{item.subtitle}</h4>
                                                    <p style={{ fontSize: "18px" }} data-aos="fade-up" data-aos-delay="200">{item.text}</p>
                                                    <div style={{ display: "flex", padding: "20px 0px" }}>
                                                        <a href="#ModuleContactContainer">
                                                            <button type="submit">
                                                                <ArrowRightAltIcon />
                                                                Know More
                                                            </button>
                                                        </a>
                                                        <a href={item.attachmentPath} download>
                                                            <button type="submit">
                                                                <ArrowRightAltIcon />
                                                                Download Datasheet
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={12} xs={24}>
                                                <CarouselImage
                                                    imgSrc={item.imgSrc}
                                                    hoverImgSrc={item.hoverImgSrc}
                                                    alt={item.title}
                                                />
                                            </Col>
                                        </>
                                    )}
                                </Row>

                            );
                        })}
                    </div>
                </div>
                <div id="ModuleContactContainer">
                    <ContactHome />
                </div>
            </section>

        </>
    )
}
export default Modules;