import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);

    const handleMouseEnter = (menu) => {
      setActiveMenu(menu);
    };
  
    const handleMouseLeave = () => {
      setActiveMenu(null);
    };
  
    return (
      <nav className="mega-menu">
        <ul className="menu">
          {/* Home */}
          <li className="menu-item">Home</li>
  
          {/* Products */}
          <li
            className="menu-item"
            onMouseEnter={() => handleMouseEnter("products")}
            onMouseLeave={handleMouseLeave}
          >
            Products
            {activeMenu === "products" && (
              <div className="dropdown">
                <ul>
                  <li>Product 1</li>
                  <li>Product 2</li>
                  <li>Product 3</li>
                </ul>
              </div>
            )}
          </li>
  
          {/* Application */}
          <li
            className="menu-item"
            onMouseEnter={() => handleMouseEnter("application")}
            onMouseLeave={handleMouseLeave}
          >
            Application
            {activeMenu === "application" && (
              <div className="dropdown">
                <ul>
                  <li>Application 1</li>
                  <li>Application 2</li>
                  <li>Application 3</li>
                </ul>
              </div>
            )}
          </li>
  
          {/* Services */}
          <li
            className="menu-item"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            Services
            {activeMenu === "services" && (
              <div className="dropdown">
                <ul>
                  <li>Service 1</li>
                  <li>Service 2</li>
                  <li>Service 3</li>
                </ul>
              </div>
            )}
          </li>
  
          {/* Blog */}
          <li
            className="menu-item"
            onMouseEnter={() => handleMouseEnter("blog")}
            onMouseLeave={handleMouseLeave}
          >
            Blog
            {activeMenu === "blog" && (
              <div className="dropdown">
                <ul>
                  <li>Blog Post 1</li>
                  <li>Blog Post 2</li>
                  <li>Blog Post 3</li>
                </ul>
              </div>
            )}
          </li>
  
          {/* About Us */}
          <li
            className="menu-item"
            onMouseEnter={() => handleMouseEnter("aboutus")}
            onMouseLeave={handleMouseLeave}
          >
            About Us
            {activeMenu === "aboutus" && (
              <div className="dropdown">
                <ul>
                  <li>Our Mission</li>
                  <li>Our Team</li>
                  <li>Contact us</li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    );
};

export default Navbar;
