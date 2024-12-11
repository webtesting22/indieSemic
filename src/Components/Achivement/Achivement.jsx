import React, { useState, useEffect, useRef } from "react";
import { Image, Modal } from "antd";
import "../../Styles/Achivement.css";
import Back2 from '/Images/AboutImage.jpg';
import Back from "/Images/soc.jpg"
import AlternateBack2 from "/Images/NewBanner.jpeg"; // Alternate image for Back2
import AlternateBack from "/Images/AlternateSoc.jpg"; // Alternate image for Back
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Achivement = () => {
    const sectionRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(""); // State to store the image to show in modal

    const handleImageClick = (alternateImage) => {
        setModalImage(alternateImage); // Set the alternate image to be displayed
        setIsModalVisible(true); // Show the modal
    };

    const handleModalClose = () => {
        setIsModalVisible(false); // Close the modal
    };
    const [offsetY, setOffsetY] = useState(0);
    // useEffect(() => {
    //     // Intersection Observer to detect visibility of the section
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.isIntersecting) {
    //                     setIsInView(true);
    //                 } else {
    //                     setIsInView(false);
    //                 }
    //             });
    //         },
    //         {
    //             threshold: 0.5,
    //         }
    //     );

    //     if (sectionRef.current) {
    //         observer.observe(sectionRef.current);
    //     }

    //     return () => {
    //         if (sectionRef.current) {
    //             observer.unobserve(sectionRef.current);
    //         }
    //     };
    // }, []);


    return (
        <>

            <section id="AchivementContainer" ref={sectionRef} className="section_Padding">
                <div>
                    <div className="DesignedContainer">
                        <h1 data-aos="fade-up"><span style={{ color: "rgb(74, 144, 226)" }}>Driving Innovation</span> in Semiconductor Technology</h1>
                        <p data-aos="fade-up">Shaping the Future of Technology Through Groundbreaking Design and Innovation.</p>
                    </div>
                </div>
                <div id="CardColumns">
                    <div data-aos="fade-right" data-aos-duration="1000">
                        <div className="BoxEdit"  >

                            <div className="blackoverlay">

                            </div>
                            <div className="Title" onClick={() => handleImageClick(AlternateBack)} // Show alternate image in modal
                            >
                                <h1 > SoC/SiP</h1>
                            </div>
                            <div className="ButtonContainer">
                                <button data-aos="fade-left"
                                    onClick={() => handleImageClick(AlternateBack)} // Show alternate image in modal
                                    data-aos-duration="1500">

                                    Know More
                                    <ArrowRightAltIcon />
                                </button>
                            </div>
                            <div className="Content">
                                <h1 >SoC </h1>
                                <div>
                                    <h2>The Building Block of Modern Technology</h2>
                                    <p>Semiconductors are materials with electrical conductivity between that of a conductor and an insulator, making them essential in modern electronics.</p>
                                </div>
                            </div>

                            <img src={Back} // Original image
                                alt=""
                                onClick={() => handleImageClick(AlternateBack)} // Show alternate image in modal
                                style={{
                                    transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                                    cursor: "pointer"
                                }} />
                        </div>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                        <div className="BoxEdit" >
                            <div className="blackoverlay">

                            </div>
                            <div className="Title" onClick={() => handleImageClick(AlternateBack2)} >
                                <h1> RF MODULES</h1>
                            </div>
                            <div className="ButtonContainer">
                                <button data-aos="fade-left"
                                    onClick={() => handleImageClick(AlternateBack2)} // Show alternate image in modal
                                    data-aos-duration="1500">

                                    Know More
                                    <ArrowRightAltIcon />
                                </button>
                            </div>
                            <div className="Content">
                                <h1>RF MODULES</h1>
                                <div>
                                    <h2>The Building Block of Modern Technology</h2>
                                    <p>Semiconductors are materials with electrical conductivity between that of a conductor and an insulator, making them essential in modern electronics.</p>
                                </div>
                            </div>
                            <img src={Back2} // Original image

                                onClick={() => handleImageClick(AlternateBack2)} // Show alternate image in modal
                                alt="" style={{
                                    transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                                    cursor: "pointer"
                                }} />
                        </div>
                    </div>
                </div>
                <div className="FixedImage" />

                <Modal
                    open={isModalVisible}
                    footer={null} // Remove footer
                    onCancel={handleModalClose} // Close the modal
                    width={1200}
                    className="ImageModal"
                >
                    <img src={modalImage} alt="Alternate View" style={{ width: "100%" }} />
                </Modal>
            </section>
        </>
    );
};

export default Achivement;
