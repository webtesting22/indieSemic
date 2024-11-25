import React from "react";
import "../../Styles/TopContainerBanner.css"
import { Link } from "react-router-dom";
const TopContainerBanner = ({ image, DynamicHeading, icon, link }) => {
    return (
        <>
            <div id="TopContainerBannnerContainer">
                <div className="OverlayImageContainer">
                    <div className="OverlayContainer">

                    </div>
                    <img src={image} alt="" />
                    <div className="DynamicContentContainer">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {icon && <div className="IconContainer">{icon}</div>}
                            {DynamicHeading && <h1>{DynamicHeading}</h1>}
                        </div>
                        <div style={{color:"White",letterSpacing:"3px"}}>
                            <Link to="/" style={{color:"White",letterSpacing:"3px"}}>Home</Link> / {link}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TopContainerBanner