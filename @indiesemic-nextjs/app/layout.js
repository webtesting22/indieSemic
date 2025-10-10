"use client";

import "../styles/globals.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="IndieSemiC" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#4a90e2" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="preconnect" href="https://checkout.razorpay.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />

        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

        <title>IndieSemiC</title>
        <meta name="author" content="IndieSemiC" />
        <meta
          name="keywords"
          content="SoC, RF Modules, Wireless Communication, IoT Solutions, Chip Design, Radio Frequency Modules, Embedded Systems, Semiconductors, Low-Power Chips, High-Frequency Circuits, Custom RF Design, Integrated Circuits"
        />
        <meta
          name="description"
          content="IndieSemiC specializes in semiconductor and embedded systems, with a focus on design and development of ASIC chipsets and RF modules. Our technology expertise spans BLE, WiFi, LoRa, GPS, Zigbee, and more."
        />
        <meta name="og:title" content="IndieSemiC" />
        <meta
          property="og:description"
          content="IndieSemiC is at the forefront of semiconductor innovation, specializing in ASIC chipsets and RF modules. Our expertise spans BLE, WiFi, LoRa, GPS, Zigbee, and more, empowering global technological advancements with tailored solutions for clients across Europe, the USA, and India."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.indiesemic.com" />
        <meta property="og:image" content="/logo.png" />

        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjMqXgMQUaEjyNq8Ym7gvNOD_ocbPn-7s"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
