import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './SingleProduct.css';

export default function SingleProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Premium Wireless Headphones",
    price: 299.99,
    description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals alike.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort",
      "Bluetooth 5.0"
    ],
    images: [
      "/api/placeholder/400/400",
      "https://plus.unsplash.com/premium_photo-1714618993404-1c25dd17afb7?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "/api/placeholder/100/100",
      "/api/placeholder/100/100"
    ]
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="product-container">
      <div className="product-grid">
        {/* Left Column - Images */}
        <div className="image-column">
          <div className="main-image-container">
            <img
              src={product.images[selectedImage]}
              alt="Main product view"
              className="main-image"
            />
          </div>
          <div className="thumbnail-grid">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`thumbnail-button ${
                  selectedImage === idx ? 'selected' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`Product view ${idx + 1}`}
                  className="thumbnail-image"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="details-column">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">${product.price}</p>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="features-section">
            <h2 className="features-title">Features</h2>
            <ul className="features-list">
              {product.features.map((feature, idx) => (
                <li key={idx} className="feature-item">
                  <span className="bullet">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="actions-section">
            <div className="quantity-selector">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button
                  onClick={decrementQuantity}
                  className="quantity-button"
                >
                  <FaMinus className="icon" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(99, Number(e.target.value))))}
                  className="quantity-input"
                  min="1"
                  max="99"
                />
                <button
                  onClick={incrementQuantity}
                  className="quantity-button"
                >
                  <FaPlus className="icon" />
                </button>
              </div>
            </div>

            <div className="button-group">
              <button className="add-to-cart-button">
                Add to Cart
              </button>
              <button className="buy-now-button">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}