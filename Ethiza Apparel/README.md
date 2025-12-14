# 🌸 ETHIZA APPAREL – Luxury Women's E-commerce Platform

A premium, fully responsive women-only fashion e-commerce website built with **HTML, CSS & Vanilla JavaScript** (no backend, no frameworks). All data is stored in **localStorage** for seamless offline functionality.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [User Guide](#-user-guide)
- [Admin Guide](#-admin-guide)
- [Payment Methods](#-payment-methods)
- [Storage Management](#-storage-management)
- [Customization](#-customization)
- [Browser Compatibility](#-browser-compatibility)

---

## ✨ Features

### 🛍️ Customer Features

#### Authentication
- **User Registration**: Create account with email, name, and password
- **User Login**: Secure login with session management
- **Admin Login**: Special admin credentials for access control
- **Password Validation**: Minimum 6 characters
- **User Blocking**: Admins can block/unblock users

#### Shopping Experience
- **Product Catalog**: 12+ premium women's products with categories
- **Advanced Filtering**: Filter by category (Dress, Tops, Ethnic, Casual, Party) and price range
- **Product Details**: Name, price, category, rating, and stock status
- **Responsive Product Grid**: Auto-adjusting for all screen sizes
- **Quick Add to Cart**: One-click purchase
- **Wishlist Management**: Save favorites with add/remove functionality
- **Move from Wishlist to Cart**: Direct transition

#### Shopping Cart
- **Cart Display**: View all items with images, prices, and quantities
- **Quantity Control**: Increase/decrease quantity with ± buttons
- **Remove Items**: Delete unwanted products
- **Live Total Calculation**: Real-time cart total updates
- **Cart Badge**: Item count indicator in header

#### Checkout & Payments
- **Shipping Address Form**: Full address collection with validation
- **Multiple Payment Methods**:
  - ✅ **Cash on Delivery (COD)** - Direct confirmation
  - ✅ **Credit/Debit Card** - With validation (Luhn algorithm)
  - ✅ **PayPal** - Sandbox mode simulation
  - ✅ **Razorpay** - Test mode simulation
- **Card Validation**: Real-time validation for card number, expiry, and CVV
- **Order Generation**: Automatic order ID creation with timestamp

#### Order Management
- **Order Success Page**: Thank you message with order details
- **Order History**: View all previous orders in profile
- **Order Status Tracking**: Pending → Processing → Shipped → Delivered
- **Payment Method Display**: Shows which payment method was used

#### User Profile
- **Profile Information**: View name, email, and membership date
- **Order History**: Complete list of past orders with amounts and status
- **Logout**: Secure session termination

### 🏠 Content Pages

#### Home Page
- **Hero Slider**: Auto-rotating banner with 3+ slides
- **Slider Controls**: Previous/Next buttons and dot navigation
- **Featured Products**: Showcase top 6 products
- **Trust Badges**: Authentication, shipping, payment, women-empowerment
- **Testimonials**: 3+ customer reviews with ratings

#### Shop Page
- **Product Grid**: Responsive display of all products
- **Category Filters**: Checkbox filtering
- **Price Range Slider**: Dynamic price filtering
- **Reset Filters**: Clear all selections
- **Wishlist Integration**: Heart icons for saving items

#### Wishlist Page
- **Wishlist Items**: Display all saved products
- **Move to Cart**: Direct addition to shopping cart
- **Remove Items**: Delete from wishlist
- **Empty State**: Helpful message when empty

#### About Page
- **Brand Story**: Company history and vision
- **Mission Statement**: Brand values and commitment
- **Why Choose Us**: List of key differentiators

#### Contact Page
- **Contact Form**: Name, email, subject, message fields
- **Form Validation**: Required field validation
- **Contact Information**: Email, phone, and business hours
- **Success Message**: Confirmation after submission

### 🔐 Admin Panel

#### Dashboard
- **Statistics Cards**: Total users, orders, products, revenue
- **Recent Orders**: Last 5 orders with customer info
- **Revenue Tracking**: Total sales calculation

#### Product Management
- **Add Products**: Form to create new products
- **Edit Products**: Modify name, category, price, stock status
- **Delete Products**: Remove products with confirmation
- **Product Table**: All products with actions

#### Order Management
- **Order List**: All orders with customer info
- **Status Updates**: Dropdown to change order status
- **View Details**: Quick order information popup
- **Payment Info**: Display payment method used

#### User Management
- **User List**: All registered users
- **User Status**: View active/blocked status
- **Block/Unblock Users**: Restrict access
- **Delete Users**: Remove user accounts

#### Slider Management
- **Add Sliders**: Create new home page slides
- **Edit Sliders**: Modify slide content
- **Toggle Status**: Enable/disable slides
- **Delete Sliders**: Remove sliders
- **Live Updates**: Changes reflected immediately on home page

#### Admin Profile
- **Admin Info**: View and edit admin details

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup & page structure |
| **CSS3** | Responsive design, animations, premium styling |
| **Vanilla JavaScript (ES6+)** | All functionality without frameworks |
| **localStorage** | Client-side data persistence |
| **sessionStorage** | Temporary session management |

**No External Dependencies**: Pure vanilla implementation without jQuery, Bootstrap, or frameworks.

---

## 📂 Project Structure

```
Ethiza Apparel/
├── index.html                 # Main HTML file with all pages
├── css/
│   └── styles.css            # Complete stylesheet (600+ lines)
├── js/
│   ├── app.js                # Core app initialization & routing
│   ├── auth.js               # Authentication & login logic
│   ├── cart.js               # Shopping cart functionality
│   ├── wishlist.js           # Wishlist management
│   ├── payments.js           # Payment processing & validation
│   ├── slider.js             # Home slider/carousel logic
│   └── admin.js              # Admin panel management
└── README.md                 # Documentation (this file)
```

### Page Structure (All in index.html)

- `#home-page` - Hero slider, featured products, testimonials
- `#shop-page` - Product grid with filters
- `#wishlist-page` - Saved items display
- `#cart-page` - Shopping cart
- `#checkout-page` - Shipping & payment
- `#order-success-page` - Order confirmation
- `#about-page` - Brand story
- `#contact-page` - Contact form
- `#login-page` - Login & registration
- `#profile-page` - User profile & orders
- `#admin-page` - Admin dashboard & management panels

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required
- No installation needed

### Installation Steps

1. **Download/Extract Files**
   ```bash
   # Navigate to the Ethiza Apparel folder
   cd "Ethiza Apparel"
   ```

2. **Open in Browser**
   - Double-click `index.html` to open locally
   - Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

3. **Visit the Site**
   ```
   http://localhost:8000
   ```

---

## 👥 User Guide

### Creating an Account

1. Click **👤 Login** button in header
2. Click **Create Account** button
3. Fill in:
   - Full Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password
4. Click **Create Account**
5. Login with your credentials

### Browsing Products

1. Click **Shop** in the navigation
2. **Filter Options** on left sidebar:
   - Select categories (checkboxes)
   - Adjust price range (slider)
   - Click **Clear Filters** to reset
3. Hover over products to see **Add to Cart** button

### Adding to Wishlist

1. Click ❤️ (heart icon) on product card
2. Item appears in **Wishlist** page
3. Click product to see details
4. Click **Add to Cart** to purchase

### Shopping Cart

1. Click 🛒 in header
2. **Adjust quantities** with ± buttons
3. **Remove items** with "Remove" button
4. View **Order Summary** (subtotal, shipping, total)
5. Click **Proceed to Checkout**

### Checkout Process

1. **Fill Shipping Address**:
   - Full Name, Email, Phone
   - Address, City, State, Pincode
2. **Select Payment Method**:
   - Cash on Delivery (COD)
   - Credit/Debit Card
   - PayPal
   - Razorpay
3. **Card Details** (if paying by card):
   - Card Number (16 digits)
   - Expiry Date (MM/YY)
   - CVV (3-4 digits)
4. Click **Place Order**

### After Checkout

1. See **Order Success** page with:
   - Order ID
   - Total Amount
   - Payment Method
2. Confirmation email will be sent (simulated)
3. View order in **Profile → Order History**

### Managing Profile

1. Click 👤 (profile) in header
2. View:
   - Account information
   - Order history with status
3. Click **Logout** to sign out

---

## 🔐 Admin Guide

### Admin Login

1. Click **👤 Login** in header
2. Check **"Login as Admin"** checkbox
3. Enter credentials:
   ```
   Email: yashtilala11411@gmail.com
   Password: yash1313
   ```
4. Click **Sign In**
5. Redirected to **Admin Dashboard**

### Dashboard Overview

- **Statistics**: User count, order count, product count, total revenue
- **Recent Orders**: Last 5 orders with status
- **Quick Stats**: Real-time calculations from localStorage

### Product Management

1. Click **Products** in sidebar
2. **Add Product**:
   - Click **+ Add New Product**
   - Fill form: name, category, price, stock status
   - Click **Save Product**
3. **Edit Product**:
   - Click **Edit** button
   - Modify details
   - Click **Update Product**
4. **Delete Product**:
   - Click **Delete** button
   - Confirm deletion
   - Product removed from catalog

### Order Management

1. Click **Orders** in sidebar
2. View all orders with:
   - Order ID, Customer name
   - Amount, Payment method
   - Status dropdown
3. **Change Status**:
   - Click dropdown (Pending → Processing → Shipped → Delivered)
   - Status updates in real-time
4. **View Details**:
   - Click **View** button
   - See complete order information

### User Management

1. Click **Users** in sidebar
2. View all registered users:
   - Name, Email, Status
   - Join date
3. **Block User**:
   - Click **Block** button
   - User cannot login
4. **Unblock User**:
   - Click **Unblock** button
   - Restore access
5. **Delete User**:
   - Click **Delete** button
   - User account removed

### Slider Management

1. Click **Sliders** in sidebar
2. **Add Slider**:
   - Click **+ Add New Slider**
   - Fill: Title, Description
   - Click **Save Slider**
   - Appears on home page
3. **Edit Slider**:
   - Click **Edit** button
   - Modify content
   - Click **Update Slider**
4. **Enable/Disable**:
   - Check/uncheck status
   - Updates immediately on home page
5. **Delete Slider**:
   - Click **Delete** button
   - Removed from rotation

### Admin Profile

1. Click **Profile** in sidebar
2. View admin information
3. Edit name if needed
4. Click **Save Changes**

---

## 💳 Payment Methods

### 1. Cash on Delivery (COD)
- **Status**: ✅ Fully Functional
- **Process**: Order placed, payment collected at delivery
- **Order Status**: Confirmed immediately
- **Demo**: Works without additional validation

### 2. Credit/Debit Card
- **Status**: ✅ Fully Functional (Demo)
- **Validation**:
  - Card Number: 16 digits (Luhn algorithm)
  - Expiry: MM/YY format (must not be expired)
  - CVV: 3-4 digits
- **Test Card**: `4111 1111 1111 1111` (valid demo)
- **Process**: Simulated processing with 95% success rate
- **Demo**: No real payment processing

### 3. PayPal
- **Status**: ✅ Functional (Sandbox)
- **Process**: Simulated PayPal redirect
- **Success Rate**: 90% (for demo variability)
- **Notes**: Production requires PayPal API integration

### 4. Razorpay
- **Status**: ✅ Functional (Test Mode)
- **Process**: Simulated Razorpay processing
- **Success Rate**: 90% (for demo variability)
- **Notes**: Production requires Razorpay API integration

---

## 💾 Storage Management

### localStorage Keys

| Key | Content | Format |
|-----|---------|--------|
| `users` | All registered users | JSON array |
| `products` | Product catalog | JSON array |
| `cart` | Shopping cart items | JSON array |
| `wishlist` | Wishlist items | JSON array |
| `orders` | All orders | JSON array |
| `sliders` | Home page sliders | JSON array |
| `profiles` | User profile data | JSON object |

### sessionStorage Keys

| Key | Content |
|-----|---------|
| `currentUser` | Currently logged-in user |
| `lastOrderId` | Last created order ID |

### Clearing Data (Browser DevTools)

```javascript
// Open DevTools (F12) → Console
// Clear all data
localStorage.clear();
sessionStorage.clear();

// Or specific keys
localStorage.removeItem('cart');
localStorage.removeItem('orders');
```

---

## 🎨 Design System

### Color Palette
- **Primary Cream**: `#faf8f5` - Main background
- **Blush**: `#f5e6e0` - Secondary background
- **Rose Gold**: `#d4a574` - Primary accent
- **Brown**: `#8b6f47` - Secondary accent
- **Dark Text**: `#3d3d3d` - Primary text
- **Light Text**: `#6b6b6b` - Secondary text

### Typography
- **Primary Font**: Segoe UI, Tahoma, Verdana (sans-serif)
- **Secondary Font**: Georgia (serif) - Headlines
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing Scale
- `xs`: 8px
- `sm`: 12px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px

### Border Radius
- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `full`: 50%

### Shadows
- `sm`: `0 2px 8px rgba(0,0,0,0.08)`
- `md`: `0 4px 16px rgba(0,0,0,0.12)`
- `lg`: `0 8px 24px rgba(0,0,0,0.15)`
- `xl`: `0 16px 40px rgba(0,0,0,0.2)`

---

## 🔧 Customization

### Changing Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
  --primary-cream: #faf8f5;
  --primary-blush: #f5e6e0;
  --accent-rose-gold: #d4a574;
  --accent-brown: #8b6f47;
  /* ... update other colors ... */
}
```

### Adding Products

Edit `js/app.js` in `initializeDefaultData()`:

```javascript
this.products = [
  { 
    id: 1, 
    name: 'Product Name', 
    category: 'Dress', 
    price: 4999, 
    image: 'image.jpg', 
    rating: 4.5, 
    inStock: true 
  },
  // ... more products ...
];
```

### Changing Admin Credentials

Edit `js/auth.js`:

```javascript
const auth = {
  adminEmail: 'your-email@example.com',
  adminPassword: 'your-password',
  // ...
};
```

### Modifying Product Categories

Update filter options in `index.html` (shop page):

```html
<select id="product-category">
  <option>Your Category</option>
  <option>Another Category</option>
</select>
```

---

## 📱 Responsive Design

- **Desktop**: Full layout with sidebar filters
- **Tablet** (768px-1024px): Adjusted grid, stacked layout
- **Mobile** (< 768px): Single column, hidden navigation menu
- **Small Mobile** (< 480px): Minimal layout, optimized touch targets

---

## ♿ Accessibility Features

- Semantic HTML5 elements
- Form labels with proper associations
- Color contrast compliant
- Keyboard navigation support
- ARIA labels where appropriate

---

## 🌐 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Full support |
| Opera | ✅ Full support |
| IE 11 | ⚠️ Limited (no ES6) |

**Recommended**: Chrome 90+, Firefox 88+, Safari 14+

---

## 🐛 Troubleshooting

### Data Not Saving?
- Check browser localStorage limits
- Ensure cookies/storage not disabled
- Try clearing browser cache
- Use incognito mode to test

### Login Not Working?
- Verify email and password
- Check console for errors (F12)
- Clear sessionStorage and try again

### Slider Not Rotating?
- Check if sliders are enabled in admin panel
- Verify slider data in localStorage
- Refresh page

### Cart Items Disappearing?
- Check localStorage in DevTools
- Verify browser settings allow storage
- Don't use incognito mode for persistence

### Styling Issues?
- Clear browser cache (Ctrl+Shift+Del)
- Verify styles.css is in correct path
- Check console for CSS errors

---

## 📝 Sample Test Data

### Test User Account
```
Email: user@example.com
Password: password123
```

### Test Admin Account
```
Email: yashtilala11411@gmail.com
Password: yash1313
```

### Test Card Number
```
Card: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

---

## 🎓 Code Structure

### app.js
- Global state management
- Navigation and routing
- Storage operations
- UI updates

### auth.js
- User registration
- Login/logout logic
- Admin authentication
- Session management

### cart.js
- Add/remove items
- Quantity management
- Cart calculations
- Checkout initialization

### wishlist.js
- Add/remove wishlist items
- Move to cart
- Wishlist display

### payments.js
- Payment method processing
- Card validation
- Order creation
- Payment simulation

### slider.js
- Slider initialization
- Auto-play carousel
- Navigation controls
- Slide management

### admin.js
- Dashboard statistics
- Product CRUD operations
- Order management
- User management
- Slider administration

---

## 📄 License & Credits

**Ethiza Apparel** - Premium Women's Fashion E-commerce Platform
Built as a demonstration of vanilla JavaScript capabilities.

---

## 💬 Support

For issues or questions:
1. Check troubleshooting section
2. Review console errors (F12 → Console)
3. Clear cache and reload
4. Check localStorage data (F12 → Application → Storage)

---

## 🚀 Future Enhancements

- [ ] Product images upload functionality
- [ ] User reviews and ratings
- [ ] Email notifications
- [ ] Inventory management
- [ ] Coupon/discount codes
- [ ] Wishlist sharing
- [ ] Product recommendations
- [ ] Advanced analytics
- [ ] Multiple language support
- [ ] Social media integration

---

**Last Updated**: December 2024
**Version**: 1.0.0

---

**Happy Shopping! 🛍️✨**

*Ethiza Apparel - Empowering Women Through Fashion*
