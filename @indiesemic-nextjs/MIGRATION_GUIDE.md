# Migration Guide: Vite to Next.js

## Overview

This project has been successfully migrated from Vite + React to Next.js 14 using the App Router.

## Key Changes

### 1. Project Structure

- **Before (Vite):** `src/` folder with components, routes, and pages
- **After (Next.js):** `app/` folder for routes, `components/` for shared components

### 2. Routing

- **Before:** React Router DOM with `<BrowserRouter>`, `<Routes>`, `<Route>`
- **After:** Next.js App Router with folder-based routing
  - Home: `app/page.js`
  - IOT Modules: `app/iot-modules/page.js`
  - Product Detail: `app/product/[id]/page.js`
  - Services: `app/services/page.js`
  - SIP: `app/sip/page.js`
  - SOC Module: `app/socmodule/page.js`
  - Terms: `app/terms-and-conditions/page.js`
  - Privacy: `app/privacy-policy/page.js`
  - Shipping: `app/shipping-delivery-policy/page.js`
  - Refund: `app/cancellation-refund-policy/page.js`
  - Verification: `app/product-purchase-verification/page.js`
  - Dashboard: `app/dashboard/page.js`

### 3. Navigation

- **Before:** `<Link to="/path">` from react-router-dom
- **After:** `<Link href="/path">` from next/link

### 4. Client Components

- All components with hooks, browser APIs, or event handlers need `"use client"` directive
- Added automatically to all component files

### 5. Environment Variables

- **Before:** `import.meta.env.VITE_BASE_URL`
- **After:** `process.env.NEXT_PUBLIC_BASE_URL`
- Create `.env.local` file with your environment variables

### 6. Static Assets

- All assets moved from `public/Images/` - accessible directly as `/Images/...`
- ISC Modules: `public/ISC Modules for website/`

### 7. Lazy Loading

- **Before:** `React.lazy(() => import(...))`
- **After:** `dynamic(() => import(...), { loading: () => <Loading /> })`

### 8. Router Hooks

- `useNavigate()` → `useRouter()` from 'next/navigation'
- `useParams()` → `useParams()` from 'next/navigation' (same name, different import)
- `useLocation()` → `usePathname()` from 'next/navigation'
- `navigate('/path')` → `router.push('/path')`

### 9. Image Optimization

- Consider replacing `<img>` with Next.js `<Image>` component for better performance
- Configured with `unoptimized: true` for compatibility

### 10. CSS Imports

- All style imports updated to reference `../../styles/Styles/...`
- Global styles in `styles/globals.css`

## Installation & Running

```bash
cd @indiesemic-nextjs
npm install
npm run dev
```

The app will run on `http://localhost:3002`

## Build for Production

```bash
npm run build
npm start
```

## Known Considerations

1. **SSR Compatibility**: Some components may need adjustments for server-side rendering
2. **Window Object**: Added checks for `typeof window !== 'undefined'` where needed
3. **Local Storage**: Ensure localStorage access is wrapped in useEffect or checked for window
4. **External Scripts**: Moved to layout.js for global availability

## Next Steps

1. Test all routes and components
2. Optimize images using Next.js Image component
3. Configure environment variables in `.env.local`
4. Test form submissions and API calls
5. Review and optimize bundle size
6. Set up deployment configuration (Vercel recommended)

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Manual Deployment

1. Run `npm run build`
2. Upload `.next/` folder and `public/` folder
3. Set environment variables
4. Run `npm start` on your server

## Differences from Vite

1. **No Vite Config**: Replaced with `next.config.js`
2. **No index.html**: Layout defined in `app/layout.js`
3. **Automatic Code Splitting**: Next.js handles this automatically
4. **Server Components**: Can use server components for better performance (marked with `"use client"` for client-only features)

## Support

For issues or questions about the migration, refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
