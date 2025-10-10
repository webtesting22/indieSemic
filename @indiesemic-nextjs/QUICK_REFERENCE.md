# Quick Reference Guide

## 🚀 Essential Commands

```bash
# Setup
npm install

# Development
npm run dev              # http://localhost:3002

# Production
npm run build
npm start

# Deploy
vercel
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/layout.js` | Root layout, metadata, scripts |
| `app/page.js` | Home page |
| `components/` | All React components |
| `styles/globals.css` | Global styles |
| `.env.local` | Environment variables |
| `next.config.js` | Next.js configuration |

## 🔗 Route Mapping

| URL | File |
|-----|------|
| `/` | `app/page.js` |
| `/iot-modules` | `app/iot-modules/page.js` |
| `/product/123` | `app/product/[id]/page.js` |
| `/services` | `app/services/page.js` |
| `/sip` | `app/sip/page.js` |
| `/socmodule` | `app/socmodule/page.js` |
| `/dashboard` | `app/dashboard/page.js` |

## 🔧 Common Tasks

### Add New Page
```bash
mkdir app/new-page
echo '"use client"; export default function NewPage() { return <div>New Page</div> }' > app/new-page/page.js
```

### Add New Component
```javascript
// components/MyComponent/MyComponent.jsx
"use client";

export default function MyComponent() {
  return <div>My Component</div>
}
```

### Import Component
```javascript
import MyComponent from "@/components/MyComponent/MyComponent";
// or
import MyComponent from "../components/MyComponent/MyComponent";
```

## 🎨 Style Updates

### Global Styles
Edit `styles/globals.css`

### Component Styles
Edit `styles/Styles/[ComponentName].css`

### Import Styles
```javascript
import "../../styles/Styles/MyComponent.css";
```

## 🔐 Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_BASE_URL=http://your-api.com
```

Access in code:
```javascript
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
```

## 🐛 Debug Tips

### Clear Cache
```bash
rm -rf .next
npm run dev
```

### Check Errors
1. Browser console (F12)
2. Terminal output
3. Network tab for API calls

### Common Fixes
```javascript
// SSR issue with window
if (typeof window !== 'undefined') {
  // window code here
}

// Use in useEffect
useEffect(() => {
  // window or document code
}, []);
```

## 📚 Documentation

- **Quick Start**: See `START_HERE.md`
- **Full Setup**: See `SETUP_GUIDE.md`
- **Migration Details**: See `MIGRATION_GUIDE.md`
- **Summary**: See `CONVERSION_SUMMARY.md`

## 🔄 Git Workflow

```bash
# Initialize (if not already)
git init
git add .
git commit -m "Initial Next.js conversion"

# Push to remote
git remote add origin your-repo-url
git push -u origin main
```

## ✅ Verification

After setup, verify:
- [ ] `npm install` completes
- [ ] `npm run dev` starts server
- [ ] Home page loads at localhost:3002
- [ ] Navigation works
- [ ] Images display
- [ ] Forms work

---

**Quick Help**: Start with `START_HERE.md` → Read other docs as needed
