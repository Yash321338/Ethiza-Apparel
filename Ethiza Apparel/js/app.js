/* ========================================
   ETHIZA APPAREL - MAIN APP
   ======================================== */

// Global App State
const app = {
  currentUser: null,
  isAdmin: false,
  currentPage: 'home',
  products: [],
  cart: [],
  wishlist: [],
  orders: [],
  users: [],
  sliders: [],
  profiles: {},
  
  init() {
    this.loadFromStorage();
    this.initializeDefaultData();
    this.attachEventListeners();
    this.navigateTo(this.currentPage);
    this.updateUI();
  },

  // ===== STORAGE MANAGEMENT =====
  loadFromStorage() {
    try {
      this.users = JSON.parse(localStorage.getItem('users')) || [];
      this.products = JSON.parse(localStorage.getItem('products')) || [];
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      this.orders = JSON.parse(localStorage.getItem('orders')) || [];
      this.sliders = JSON.parse(localStorage.getItem('sliders')) || [];
      this.profiles = JSON.parse(localStorage.getItem('profiles')) || {};
      
      const userData = JSON.parse(sessionStorage.getItem('currentUser'));
      if (userData) {
        this.currentUser = userData;
        this.isAdmin = userData.isAdmin || false;
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('products', JSON.stringify(this.products));
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      localStorage.setItem('orders', JSON.stringify(this.orders));
      localStorage.setItem('sliders', JSON.stringify(this.sliders));
      localStorage.setItem('profiles', JSON.stringify(this.profiles));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },

  initializeDefaultData() {
    // Initialize default products if empty
    if (this.products.length === 0) {
      this.products = [
        { id: 1, name: 'Elegant Evening Dress', category: 'Dress', price: 4999, image: 'dress1.jpg', rating: 4.5, inStock: true },
        { id: 2, name: 'Silk Blouse Premium', category: 'Tops', price: 1999, image: 'blouse1.jpg', rating: 4.8, inStock: true },
        { id: 3, name: 'Traditional Saree', category: 'Ethnic', price: 3499, image: 'saree1.jpg', rating: 4.6, inStock: true },
        { id: 4, name: 'Casual Cotton Tee', category: 'Casual', price: 799, image: 'tee1.jpg', rating: 4.3, inStock: true },
        { id: 5, name: 'Party Gown Glamour', category: 'Party', price: 5999, image: 'gown1.jpg', rating: 4.7, inStock: true },
        { id: 6, name: 'Summer Linen Dress', category: 'Casual', price: 1299, image: 'summer_dress.jpg', rating: 4.4, inStock: true },
        { id: 7, name: 'Ethnic Lehenga', category: 'Ethnic', price: 4299, image: 'lehenga.jpg', rating: 4.9, inStock: true },
        { id: 8, name: 'Office Blazer', category: 'Tops', price: 2499, image: 'blazer.jpg', rating: 4.5, inStock: true },
        { id: 9, name: 'Cocktail Dress', category: 'Party', price: 3799, image: 'cocktail.jpg', rating: 4.6, inStock: true },
        { id: 10, name: 'Casual Kurta', category: 'Casual', price: 999, image: 'kurta.jpg', rating: 4.4, inStock: true },
        { id: 11, name: 'Wedding Lehenga Deluxe', category: 'Party', price: 7999, image: 'wedding_lehenga.jpg', rating: 4.9, inStock: true },
        { id: 12, name: 'Silk Ethnic Top', category: 'Ethnic', price: 1699, image: 'ethnic_top.jpg', rating: 4.5, inStock: true }
      ];
    }

    // Initialize default sliders if empty
    if (this.sliders.length === 0) {
      this.sliders = [
        { id: 1, title: 'Summer Collection', description: 'Discover our latest summer essentials', image: 'slider1.jpg', enabled: true },
        { id: 2, title: 'Ethnic Elegance', description: 'Traditional wear for modern women', image: 'slider2.jpg', enabled: true },
        { id: 3, title: 'Party Season', description: 'Stunning outfits for your special occasions', image: 'slider3.jpg', enabled: true }
      ];
    }

    this.saveToStorage();
  },

  // ===== NAVIGATION =====
  navigateTo(page) {
    this.currentPage = page;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    
    // Show requested page
    const pageElement = document.getElementById(`${page}-page`);
    if (pageElement) {
      pageElement.classList.remove('hidden');
      
      // Call page-specific initialization
      this.initializePage(page);
    }
    
    window.scrollTo(0, 0);
  },

  initializePage(page) {
    const handlers = {
      'home': () => this.initHomePage(),
      'shop': () => this.initShopPage(),
      'wishlist': () => this.initWishlistPage(),
      'cart': () => this.initCartPage(),
      'checkout': () => this.initCheckoutPage(),
      'admin': () => this.initAdminDashboard(),
      'admin-products': () => this.initAdminProducts(),
      'admin-orders': () => this.initAdminOrders(),
      'admin-users': () => this.initAdminUsers(),
      'admin-slider': () => this.initAdminSlider(),
      'admin-profile': () => this.initAdminProfile(),
      'profile': () => this.initProfilePage()
    };
    
    if (handlers[page]) {
      handlers[page]();
    }
  },

  // ===== UI UPDATES =====
  updateUI() {
    this.updateCartBadge();
    this.updateWishlistBadge();
    this.updateAuthUI();
  },

  updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = this.cart.length;
      badge.classList.toggle('hidden', this.cart.length === 0);
    }
  },

  updateWishlistBadge() {
    const badge = document.querySelector('.wishlist-badge');
    if (badge) {
      badge.textContent = this.wishlist.length;
      badge.classList.toggle('hidden', this.wishlist.length === 0);
    }
  },

  updateAuthUI() {
    const authBtn = document.querySelector('.auth-btn');
    const profileBtn = document.querySelector('.profile-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    
    if (this.currentUser) {
      if (authBtn) authBtn.classList.add('hidden');
      if (profileBtn) profileBtn.classList.remove('hidden');
      if (logoutBtn) logoutBtn.classList.remove('hidden');
    } else {
      if (authBtn) authBtn.classList.remove('hidden');
      if (profileBtn) profileBtn.classList.add('hidden');
      if (logoutBtn) logoutBtn.classList.add('hidden');
    }
  },

  // ===== UTILITY FUNCTIONS =====
  showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
      <span>${message}</span>
      <button style="margin-left: auto; background: none; border: none; cursor: pointer; color: inherit; font-size: 18px;">×</button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    alertDiv.querySelector('button').addEventListener('click', () => {
      alertDiv.remove();
    });
    
    setTimeout(() => {
      alertDiv.remove();
    }, 4000);
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  },

  generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  },

  // ===== PAGE INITIALIZATION STUBS =====
  initHomePage() {
    // Initialized in home.js
  },

  initShopPage() {
    // Initialized in shop.js
  },

  initWishlistPage() {
    // Initialized in wishlist.js
  },

  initCartPage() {
    // Initialized in cart.js
  },

  initCheckoutPage() {
    // Initialized in checkout.js
  },

  initAdminDashboard() {
    // Initialized in admin.js
  },

  initAdminProducts() {
    // Initialized in admin.js
  },

  initAdminOrders() {
    // Initialized in admin.js
  },

  initAdminUsers() {
    // Initialized in admin.js
  },

  initAdminSlider() {
    // Initialized in admin.js
  },

  initAdminProfile() {
    // Initialized in admin.js
  },

  initProfilePage() {
    // Initialized in profile.js
  },

  // ===== EVENT LISTENERS =====
  attachEventListeners() {
    // Navigation
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.nav;
        
        // Check admin access
        if (page.startsWith('admin')) {
          if (!this.isAdmin) {
            this.showAlert('Admin access required!', 'error');
            return;
          }
        }
        
        this.navigateTo(page);
      });
    });

    // Logout
    document.querySelector('.logout-btn')?.addEventListener('click', () => {
      this.logout();
    });

    // Profile
    document.querySelector('.profile-btn')?.addEventListener('click', () => {
      this.navigateTo('profile');
    });

    // Auth
    document.querySelector('.auth-btn')?.addEventListener('click', () => {
      this.navigateTo('login');
    });
  },

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
    this.isAdmin = false;
    this.updateUI();
    this.navigateTo('home');
    this.showAlert('Logged out successfully!', 'success');
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
