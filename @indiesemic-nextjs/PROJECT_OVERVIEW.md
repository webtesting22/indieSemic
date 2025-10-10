# 🎯 IndieSemic Next.js - Project Overview

## 📊 Project Statistics

- **Total Files**: 49 JavaScript/JSX files
- **Total Components**: 34+ React components
- **Total Routes**: 13 pages
- **Total Size**: ~185MB (including assets)
- **Static Assets**: 100+ images, videos, and PDFs
- **CSS Files**: 15+ stylesheets
- **Dependencies**: 20+ npm packages

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Next.js App Router               │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   app/layout.js                    │ │
│  │   - Global layout                  │ │
│  │   - Metadata & SEO                 │ │
│  │   - External scripts (Maps, AOS)   │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   13 Route Pages                   │ │
│  │   - Home, Products, Services, etc. │ │
│  │   - Dynamic imports & lazy loading │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Components Layer                 │
│                                          │
│  Navigation → Context Provider → Pages   │
│                                          │
│  34+ Reusable Components:                │
│  - Hero, About, Contact, Footer          │
│  - Products, Cart, Forms                 │
│  - Dashboard, Services, Modules          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         State Management                 │
│                                          │
│  ProductContext (React Context API)      │
│  - Product data                          │
│  - Shopping cart                         │
│  - User preferences                      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         External Services                │
│                                          │
│  - EmailJS (Contact forms)               │
│  - Custom API (Product data)             │
│  - Razorpay (Payments)                   │
│  - Google Maps                           │
└─────────────────────────────────────────┘
```

## 🗺️ Page Structure

### Public Pages

```
├── / (Home)
│   ├── Hero carousel
│   ├── About company
│   ├── Expertise section
│   ├── Achievements
│   ├── Numbers/Stats
│   └── Contact form
│
├── /iot-modules
│   └── Product grid with filters
│
├── /product/[id]
│   └── Detailed product view
│
├── /services
│   └── Services offered
│
├── /sip
│   └── SIP information
│
├── /socmodule
│   └── SOC module details
│
└── Policy Pages
    ├── /terms-and-conditions
    ├── /privacy-policy
    ├── /shipping-delivery-policy
    └── /cancellation-refund-policy
```

### Protected Pages

```
└── /dashboard
    └── Admin dashboard
```

## 🧩 Component Hierarchy

### Core Layout Components

```
NavigationWrap (Context Provider)
  └── MegaNavigation
      ├── Logo
      ├── Navigation Links
      ├── Cart Icon
      └── Mobile Drawer

Footer
  ├── Company Info
  ├── Navigation Links
  ├── Social Links
  └── Copyright
```

### Home Page Components

```
Home Page
  ├── Hero (Swiper Carousel)
  ├── AboutCompany
  ├── Expertise
  ├── Achivement (Tech Partners)
  ├── ExpertiseCards (Application Areas)
  ├── NumbersComponent (Stats Counter)
  └── ContactHome (Contact Form)
```

### Product Pages

```
Product System
  ├── Product (List View)
  ├── SeparateProductpage (Detail View)
  ├── individualProduct (Single Product)
  └── Cart
      └── Checkout Flow
```

## 🎨 Styling System

### Global Styles

- `styles/globals.css` - Base styles and resets
- `styles/App.css` - App-level styles
- `styles/index.css` - Additional global styles

### Component Styles

Each major component has its own CSS file in `styles/Styles/`:

- `Hero.css`, `Footer.css`, `ContactHome.css`
- `MegaNavigation.css`, `Product.css`
- `AboutContent.css`, `Expertise.css`
- And more...

## 🔌 Integrations

### 1. EmailJS

- **Purpose**: Contact form submissions
- **Location**: `components/ContactHome/ContactHome.jsx`
- **Config**: Hardcoded service IDs (should move to env)

### 2. Product API

- **Purpose**: Fetch product data
- **Location**: `components/StoreComponents/Context/State.jsx`
- **Config**: `NEXT_PUBLIC_BASE_URL` in `.env.local`

### 3. Payment Gateway (Razorpay)

- **Purpose**: Product purchases
- **Location**: Script loaded in `app/layout.js`
- **Config**: Add Razorpay keys to environment

### 4. Google Maps

- **Purpose**: Location display
- **Location**: Script loaded in `app/layout.js`
- **API Key**: Already included (update if needed)

### 5. AOS (Animate On Scroll)

- **Purpose**: Scroll animations
- **Location**: Initialized in `app/layout.js`
- **Usage**: `data-aos="fade-up"` attributes throughout

## 🛠️ Utilities

### 1. PDF Generator (`utils/pdfGenerator.js`)

- Generate product quotations
- Export specifications

### 2. iOS Compatibility (`utils/iosCompatibility.js`)

- Handle iOS-specific video playback
- Safari compatibility fixes

## 📦 Dependencies

### Core

- `next` - Next.js framework
- `react` & `react-dom` - React library

### UI Components

- `@mui/material` - Material UI components
- `antd` - Ant Design components
- `primereact` - PrimeReact components

### Functionality

- `swiper` - Touch slider
- `emailjs-com` - Email service
- `country-state-city` - Location data
- `react-countup` - Number animations
- `aos` - Scroll animations

### Tools

- `html2canvas` - Screenshot capture
- `jspdf` - PDF generation
- `moment` - Date handling

## 🚀 Deployment Ready

### Files Configured:

- ✅ `package.json` - Production scripts
- ✅ `next.config.js` - Optimized settings
- ✅ `vercel.json` - Vercel deployment config
- ✅ `.gitignore` - Ignore build files
- ✅ `.eslintrc.json` - Code quality rules

### Deployment Commands:

```bash
# Build
npm run build

# Start production server
npm start

# Or deploy to Vercel
vercel
```

## 📝 Important Notes

### 1. Environment Variables

Don't forget to create `.env.local` with:

- `NEXT_PUBLIC_BASE_URL` for your API

### 2. EmailJS Configuration

Currently uses hardcoded service IDs. Consider moving to environment variables:

```javascript
// In ContactHome.jsx, replace:
emailjs.init("he7c_VvdVGJ1i14BP");
// With:
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
```

### 3. First Run

On first run, if products don't load:

- Check browser console for API errors
- Verify API base URL is correct
- Ensure API allows CORS from your domain

### 4. Local Storage

Shopping cart uses localStorage - works only on client side (properly handled).

## 🎓 Learning Resources

- **Next.js Basics**: https://nextjs.org/learn
- **App Router Guide**: https://nextjs.org/docs/app
- **Deployment**: https://nextjs.org/docs/deployment

## 📊 Performance Optimizations

Already Implemented:

- ✅ Code splitting per route
- ✅ Lazy loading components
- ✅ Optimized bundles
- ✅ Static asset optimization

Can Be Added:

- 🔄 Next.js Image component (instead of `<img>`)
- 🔄 Font optimization with `next/font`
- 🔄 Server Components where possible
- 🔄 API Routes for backend calls

## 🎉 You're Ready!

Everything is set up and converted. Just:

1. Install dependencies
2. Add environment variables
3. Run `npm run dev`

**Enjoy your Next.js app!** 🚀

---

_Last Updated: October 2025_
_Migration completed using context7 with full automation_
