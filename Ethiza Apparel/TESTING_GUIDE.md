# 🧪 ETHIZA APPAREL - TESTING CHECKLIST

## Quick Test Guide

### Test 1: Admin Login ✅
**Location:** pages/login.html

Steps:
1. Go to Login page
2. Check "Login as Admin" checkbox
3. Enter:
   - Email: `yashtilala11411@gmail.com`
   - Password: `yash1313`
4. Click "Sign In"
5. ✅ Should redirect to admin/dashboard.html with success message

---

### Test 2: User Registration ✅
**Location:** pages/login.html

Steps:
1. Go to Login page
2. Click "Create Account"
3. Enter:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Create Account"
5. ✅ Should show success message
6. ✅ Should toggle back to login form
7. ✅ Can now login with these credentials

**Validation Test:**
- Try password < 6 chars: Should show "Password must be at least 6 characters"
- Try mismatched passwords: Should show "Passwords do not match"
- Try duplicate email: Should show "Email already registered"

---

### Test 3: User Login ✅
**Location:** pages/login.html

Steps:
1. Register a user first (Test 2)
2. Go to Login page
3. Uncheck "Login as Admin"
4. Enter registered email and password
5. Click "Sign In"
6. ✅ Should redirect to home.html with success message
7. ✅ Profile button (👤) should show instead of Login
8. ✅ Logout button (🚪) should show

---

### Test 4: Product Details Modal ✅
**Location:** pages/shop.html

Steps:
1. Go to Shop page
2. Click on any product image or product name
3. ✅ Modal should open with:
   - Product image
   - Product name
   - Category
   - Price
   - Star rating
   - Description
   - Stock status
   - "Add to Cart" button
   - "Add to Wishlist" button
4. Click "Add to Cart"
5. ✅ Modal should close
6. ✅ Notification should show "added to cart"

**Close Modal Test:**
- Click X button: ✅ Modal closes
- Click outside modal: ✅ Modal closes
- Click on same product again: ✅ Modal opens

---

### Test 5: Add to Wishlist ✅
**Location:** pages/shop.html

Steps:
1. Go to Shop page
2. Click heart (❤️) button on any product
3. ✅ Heart should change appearance
4. ✅ Wishlist badge should show in header
5. ✅ Notification: "added to wishlist"
6. Click same heart again
7. ✅ Heart should return to normal
8. ✅ Wishlist count decreases
9. ✅ Notification: "removed from wishlist"

---

### Test 6: Wishlist Page ✅
**Location:** pages/wishlist.html

Steps:
1. Add some items to wishlist (Test 5)
2. Click ❤️ icon in header
3. Go to Wishlist page
4. ✅ Should see all wishlist items
5. ✅ Each item shows: name, category, price
6. ✅ "Add to Cart" button on each item
7. ✅ ✕ button to remove

Actions:
- Click "Add to Cart": ✅ Item moves to cart, removed from wishlist
- Click ✕: ✅ Item removed from wishlist
- If no items: ✅ Shows "Your wishlist is empty"

---

### Test 7: Add to Cart ✅
**Location:** pages/shop.html & pages/cart.html

Steps:
1. Go to Shop page
2. Click "Add to Cart" on any product
3. ✅ Notification: "added to cart"
4. ✅ Cart badge shows in header
5. ✅ Click same button again
6. ✅ Notification: "added to cart"
7. ✅ Cart count increases
8. Go to Cart page
9. ✅ See item listed with quantity

---

### Test 8: Shopping Cart ✅
**Location:** pages/cart.html

Steps:
1. Add 2-3 items to cart (Test 7)
2. Go to Cart page
3. ✅ Should see all items with:
   - Product image
   - Name
   - Category
   - Price
   - Quantity controls (+/-)
   - Item subtotal
   - Remove button
4. ✅ Order summary shows:
   - Subtotal
   - Shipping (Free)
   - Total

**Quantity Test:**
- Click + button: ✅ Quantity increases
- Click - button: ✅ Quantity decreases
- Total updates automatically: ✅
- Click - to 0: ✅ Item removed

**Remove Test:**
- Click "Remove": ✅ Item removed
- Notification shows: ✅
- Total updates: ✅

---

### Test 9: Checkout ✅
**Location:** pages/checkout.html

**If Not Logged In:**
1. Clear cart, add item, don't login
2. Go to Cart page
3. Click "Proceed to Checkout"
4. ✅ Alert: "Please login first"
5. ✅ Redirects to login page

**If Logged In:**
1. Login as user (Test 3)
2. Add items to cart
3. Go to Cart page
4. Click "Proceed to Checkout"
5. ✅ Redirects to checkout.html
6. ✅ See form with:
   - Shipping Address fields
   - Payment Method selection
7. Fill form:
   - Name: Any name
   - Email: Any email
   - Phone: Any 10 digits
   - Address: Any address
   - City: Any city
   - State: Any state
   - Pincode: Any 6 digits
8. Select payment method:
   - COD (no extra fields)
   - Card (shows card fields)
   - PayPal (shows PayPal info)
   - Razorpay (shows Razorpay info)
9. Click "Place Order"
10. ✅ Redirects to order-success.html
11. ✅ Shows order ID and total

---

### Test 10: User Profile ✅
**Location:** pages/profile.html

Steps:
1. Login as user (Test 3)
2. Click profile icon (👤) in header
3. Go to Profile page
4. ✅ Should see:
   - User name
   - Email
   - Member since date
   - Order history table
5. ✅ If orders exist:
   - Order ID
   - Amount
   - Status
   - Date

---

### Test 11: Logout ✅
**Location:** Any page with logout button

Steps:
1. Login as user
2. Click logout button (🚪) in header
3. ✅ Alert: "Logged out successfully"
4. ✅ Redirects to home
5. ✅ Profile button hidden
6. ✅ Login button shows

---

### Test 12: Admin Dashboard ✅
**Location:** admin/dashboard.html

Steps:
1. Admin login (Test 1)
2. ✅ Should see:
   - Stats cards: Total Users, Orders, Products, Revenue
   - Recent Orders table
   - Sidebar navigation
3. ✅ Stats should show correct counts
4. ✅ Recent orders show latest orders

---

### Test 13: Admin Product Management ✅
**Location:** admin/products.html

Steps:
1. Admin login
2. Go to Products page
3. ✅ Should see all products in table
4. Click "+ Add New Product"
5. ✅ Form appears
6. Fill form:
   - Name: "Test Product"
   - Category: "Dress"
   - Price: "2999"
   - Stock: "10"
   - Description: "Test description"
7. Click "Add Product"
8. ✅ Product added to list
9. ✅ Table refreshes
10. ✅ Alert: "Product added successfully"

**Edit Test:**
1. Click "Edit" on any product
2. Update name and price
3. Click OK
4. ✅ Product updated in table

**Delete Test:**
1. Click "Delete" on any product
2. Confirm deletion
3. ✅ Product removed from table

---

### Test 14: Admin Order Management ✅
**Location:** admin/orders.html

Steps:
1. Admin login
2. Go to Orders page
3. ✅ Should see all customer orders
4. Click "View" on order
5. ✅ Shows order details popup
6. Click "Update Status" on order
7. ✅ Status changes: Processing → Shipped → Delivered → Cancelled

---

### Test 15: Admin User Management ✅
**Location:** admin/users.html

Steps:
1. Admin login
2. Go to Users page
3. ✅ Should see all registered users
4. Click "View" on user
5. ✅ Shows user details
6. Click "Block" on user
7. ✅ User status changes to "Blocked"
8. ✅ Blocked user cannot login

---

### Test 16: Mobile Responsiveness ✅

Steps:
1. Open website in browser
2. Open DevTools (F12)
3. Toggle device toolbar (mobile view)
4. Test at:
   - **Mobile (375px):** All pages readable
   - **Tablet (768px):** All pages readable
   - **Desktop (1200px):** All pages readable
5. ✅ Navigation works on all sizes
6. ✅ Products grid adjusts
7. ✅ Forms are usable
8. ✅ Cart layout responsive

---

### Test 17: Filters & Search ✅

Steps:
1. Go to Shop page
2. Select category: "Dress"
3. ✅ Shows only Dress products
4. Select multiple: "Dress", "Tops"
5. ✅ Shows Dress and Tops only
6. Adjust price range slider
7. ✅ Shows products within price range
8. Click "Clear Filters"
9. ✅ All filters reset
10. ✅ All products shown

---

### Test 18: Data Persistence ✅

Steps:
1. Go to Shop
2. Add item to cart
3. Add item to wishlist
4. Refresh page (F5)
5. ✅ Cart item still there
6. ✅ Wishlist item still there
7. Close and reopen browser
8. ✅ Data persists
9. Open in different tab
10. ✅ Data synced across tabs

---

## Summary

- **Total Tests:** 18
- **All Features:** ✅ Working
- **Ready to Use:** ✅ Yes

---

## Common Issues & Solutions

### Cart not updating?
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser localStorage is enabled
- Refresh page

### Wishlist not showing?
- Make sure items were added (heart button should look active)
- Check Wishlist page with ❤️ button
- Items should appear in grid

### Admin login not working?
- Use EXACT credentials:
  - Email: `yashtilala11411@gmail.com`
  - Password: `yash1313`
- Check "Login as Admin" checkbox
- Check browser console for errors (F12)

### Product modal not opening?
- Click on product IMAGE or NAME (not other areas)
- Make sure JavaScript is enabled
- Try refreshing page
- Check browser console for errors

### Forms not submitting?
- Fill ALL required fields (marked with *)
- Check form validation messages
- Ensure JavaScript is enabled
- Try a different browser

---

## Performance Tips

✅ Website is optimized for:
- Fast load time (no external resources)
- Smooth interactions
- Mobile performance
- Local storage (no API calls)

---

**Testing Last Updated:** December 13, 2025  
**Status:** All Tests Passing ✅
