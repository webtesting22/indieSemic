# Setup Guide for IndieSemic Next.js

## Quick Start

### 1. Install Dependencies

```bash
cd @indiesemic-nextjs
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=your_api_base_url_here
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3002`

## Production Build

```bash
npm run build
npm start
```

## Project Structure

```
@indiesemic-nextjs/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with metadata
│   ├── page.js                   # Home page
│   ├── iot-modules/             # IOT modules page
│   ├── product/[id]/            # Dynamic product pages
│   ├── services/                # Services page
│   ├── sip/                     # SIP page
│   ├── socmodule/               # SOC module page
│   ├── dashboard/               # Dashboard page
│   └── [other routes]/          # Policy pages, etc.
│
├── components/                   # All React components
│   ├── HeroHome/                # Hero section
│   ├── AboutCompany/            # About section
│   ├── ContactHome/             # Contact form
│   ├── Footer/                  # Footer
│   ├── MegaNavigation/          # Navigation bar
│   ├── StoreComponents/         # E-commerce components
│   └── [other components]/      # Various components
│
├── public/                       # Static assets
│   ├── Images/                  # All images
│   ├── ISC Modules for website/ # Product datasheets
│   ├── favicon.ico              # Favicon
│   └── logo.png                 # Logo
│
├── styles/                       # CSS files
│   ├── globals.css              # Global styles
│   ├── App.css                  # App-specific styles
│   ├── index.css                # Additional global styles
│   └── Styles/                  # Component-specific styles
│
├── utils/                        # Utility functions
│   ├── iosCompatibility.js      # iOS-specific fixes
│   └── pdfGenerator.js          # PDF generation utilities
│
├── package.json                  # Dependencies
├── next.config.js               # Next.js configuration
├── jsconfig.json                # Path aliases
└── .eslintrc.json               # ESLint configuration
```

## Features

### ✅ Lazy Loading

- All routes use dynamic imports with loading states
- Optimized bundle splitting

### ✅ Client-Side Components

- All components marked with `"use client"` directive
- Proper hydration and interactivity

### ✅ SEO Optimization

- Metadata configured in `app/layout.js`
- Open Graph tags for social sharing

### ✅ Performance Optimizations

- Code splitting per route
- Lazy loading of components
- Optimized asset loading

### ✅ Form Handling

- Contact form with EmailJS integration
- Client-side validation
- Country/State selection

### ✅ E-commerce Features

- Product listing and details
- Shopping cart functionality
- Quote request system

## Important Notes

### 1. Window Object

Some components check for `typeof window !== 'undefined'` to prevent SSR issues.

### 2. LocalStorage

All localStorage access is wrapped in `useEffect` to ensure client-side execution.

### 3. External Scripts

- Razorpay checkout script
- Google Maps API
- AOS (Animate On Scroll)

All loaded in `app/layout.js` for global availability.

### 4. API Integration

The project uses EmailJS for contact forms and a custom API for product data.

Configure the API base URL in `.env.local`:

```
NEXT_PUBLIC_BASE_URL=your_api_url
```

### 5. Router Migration

- `useNavigate()` → `useRouter()` from 'next/navigation'
- `navigate('/path')` → `router.push('/path')`
- `useParams()` → `useParams()` from 'next/navigation'
- `useLocation()` → `usePathname()` from 'next/navigation'

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm start
   ```

3. Or export as static site:
   ```bash
   # Add to package.json scripts:
   "export": "next build && next export"
   ```

## Troubleshooting

### Issue: "Window is not defined"

**Solution:** Wrap window access in useEffect or add typeof window check

### Issue: Images not loading

**Solution:** Ensure images are in `public/` folder and paths start with `/`

### Issue: Styles not applying

**Solution:** Check import paths - should be relative to component location

### Issue: API calls failing

**Solution:** Verify `.env.local` configuration and CORS settings

### Issue: Navigation not working

**Solution:** Ensure using Next.js `Link` with `href` (not `to`)

## Testing Checklist

- [ ] Home page loads correctly
- [ ] Navigation between pages works
- [ ] Contact form submission works
- [ ] Product listings display
- [ ] Product detail pages work
- [ ] Shopping cart functionality
- [ ] Mobile responsiveness
- [ ] All images load
- [ ] External scripts load (Maps, Razorpay)
- [ ] SEO metadata is correct

## Performance Tips

1. **Image Optimization**: Convert to Next.js Image component
2. **Font Optimization**: Use Next.js font optimization
3. **API Calls**: Consider using Next.js API routes for backend calls
4. **Caching**: Leverage Next.js built-in caching strategies

## Support

For Next.js specific questions:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Next.js Discord](https://discord.gg/nextjs)
