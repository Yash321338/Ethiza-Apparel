/* ========================================
   ADMIN PANEL MODULE
   ======================================== */

const adminModule = {
  currentSection: 'dashboard',

  switchSection(section) {
    this.currentSection = section;
    document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
    const element = document.getElementById(`admin-${section}`);
    if (element) {
      element.classList.remove('hidden');
      this.initSection(section);
    }
    
    document.querySelectorAll('.admin-nav a').forEach(link => {
      link.classList.toggle('active', link.dataset.section === section);
    });
  },

  initSection(section) {
    const handlers = {
      'dashboard': () => this.initDashboard(),
      'products': () => this.initProducts(),
      'orders': () => this.initOrders(),
      'users': () => this.initUsers(),
      'slider': () => this.initSlider(),
      'profile': () => this.initAdminProfile()
    };
    
    if (handlers[section]) {
      handlers[section]();
    }
  },

  // DASHBOARD
  initDashboard() {
    const statsGrid = document.getElementById('dashboard-stats');
    if (!statsGrid) return;

    const totalUsers = app.users.length;
    const totalOrders = app.orders.length;
    const totalProducts = app.products.length;
    const totalRevenue = app.orders.reduce((sum, order) => sum + order.total, 0);

    statsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-label">Total Users</div>
        <div class="stat-value">${totalUsers}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Orders</div>
        <div class="stat-value">${totalOrders}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Products</div>
        <div class="stat-value">${totalProducts}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Revenue</div>
        <div class="stat-value">${app.formatCurrency(totalRevenue)}</div>
      </div>
    `;

    // Recent orders
    const recentOrdersContainer = document.getElementById('recent-orders');
    if (recentOrdersContainer) {
      const recentOrders = app.orders.slice(-5).reverse();
      recentOrdersContainer.innerHTML = recentOrders.length === 0 ? '<p>No orders yet</p>' : `
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${recentOrders.map(order => {
              const user = app.users.find(u => u.id === order.userId);
              return `
                <tr>
                  <td>${order.id}</td>
                  <td>${user ? user.name : 'Unknown'}</td>
                  <td>${app.formatCurrency(order.total)}</td>
                  <td><span style="background: ${order.status === 'Delivered' ? '#4caf50' : '#ff9800'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${order.status}</span></td>
                  <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;
    }
  },

  // PRODUCTS MANAGEMENT
  initProducts() {
    const productsContainer = document.getElementById('products-list');
    if (!productsContainer) return;

    productsContainer.innerHTML = `
      <div style="margin-bottom: 20px;">
        <button class="btn btn-primary" onclick="adminModule.showAddProductForm()">+ Add New Product</button>
      </div>
      <div id="product-form-container" class="hidden"></div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${app.products.map(product => `
            <tr>
              <td>${product.name}</td>
              <td>${product.category}</td>
              <td>${app.formatCurrency(product.price)}</td>
              <td>${product.inStock ? '✓ In Stock' : '✗ Out'}</td>
              <td>
                <button class="btn btn-secondary btn-small" onclick="adminModule.showEditProductForm(${product.id})">Edit</button>
                <button class="btn btn-secondary btn-small" onclick="adminModule.deleteProduct(${product.id})" style="background: #f44336; color: white;">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  showAddProductForm() {
    const container = document.getElementById('product-form-container');
    container.innerHTML = `
      <form onsubmit="adminModule.saveProduct(event)" style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e8ddd5;">
        <h3>Add New Product</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Product Name</label>
            <input type="text" id="product-name" required>
          </div>
          <div class="form-group">
            <label>Category</label>
            <select id="product-category" required>
              <option>Dress</option>
              <option>Tops</option>
              <option>Ethnic</option>
              <option>Casual</option>
              <option>Party</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Price (₹)</label>
            <input type="number" id="product-price" step="0.01" required>
          </div>
          <div class="form-group">
            <label>In Stock</label>
            <input type="checkbox" id="product-stock" checked style="width: 20px; height: 20px;">
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="submit" class="btn btn-primary">Save Product</button>
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('product-form-container').innerHTML = ''; document.getElementById('product-form-container').classList.add('hidden');">Cancel</button>
        </div>
      </form>
    `;
    container.classList.remove('hidden');
  },

  showEditProductForm(productId) {
    const product = app.products.find(p => p.id === productId);
    if (!product) return;

    const container = document.getElementById('product-form-container');
    container.innerHTML = `
      <form onsubmit="adminModule.saveProduct(event, ${productId})" style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e8ddd5;">
        <h3>Edit Product</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Product Name</label>
            <input type="text" id="product-name" value="${product.name}" required>
          </div>
          <div class="form-group">
            <label>Category</label>
            <select id="product-category" required>
              <option ${product.category === 'Dress' ? 'selected' : ''}>Dress</option>
              <option ${product.category === 'Tops' ? 'selected' : ''}>Tops</option>
              <option ${product.category === 'Ethnic' ? 'selected' : ''}>Ethnic</option>
              <option ${product.category === 'Casual' ? 'selected' : ''}>Casual</option>
              <option ${product.category === 'Party' ? 'selected' : ''}>Party</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Price (₹)</label>
            <input type="number" id="product-price" value="${product.price}" step="0.01" required>
          </div>
          <div class="form-group">
            <label>In Stock</label>
            <input type="checkbox" id="product-stock" ${product.inStock ? 'checked' : ''} style="width: 20px; height: 20px;">
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="submit" class="btn btn-primary">Update Product</button>
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('product-form-container').innerHTML = ''; document.getElementById('product-form-container').classList.add('hidden');">Cancel</button>
        </div>
      </form>
    `;
    container.classList.remove('hidden');
  },

  saveProduct(event, productId = null) {
    event.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const inStock = document.getElementById('product-stock').checked;

    if (productId) {
      // Update existing
      const product = app.products.find(p => p.id === productId);
      if (product) {
        product.name = name;
        product.category = category;
        product.price = price;
        product.inStock = inStock;
        app.showAlert('Product updated successfully!', 'success');
      }
    } else {
      // Create new
      app.products.push({
        id: Date.now(),
        name,
        category,
        price,
        inStock,
        image: 'placeholder.jpg',
        rating: 4.5
      });
      app.showAlert('Product added successfully!', 'success');
    }

    app.saveToStorage();
    document.getElementById('product-form-container').innerHTML = '';
    document.getElementById('product-form-container').classList.add('hidden');
    this.initProducts();
  },

  deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
      app.products = app.products.filter(p => p.id !== productId);
      app.saveToStorage();
      app.showAlert('Product deleted successfully!', 'success');
      this.initProducts();
    }
  },

  // ORDERS MANAGEMENT
  initOrders() {
    const ordersContainer = document.getElementById('orders-list');
    if (!ordersContainer) return;

    ordersContainer.innerHTML = app.orders.length === 0 ? '<p>No orders yet</p>' : `
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${app.orders.map(order => {
            const user = app.users.find(u => u.id === order.userId);
            return `
              <tr>
                <td>${order.id}</td>
                <td>${user ? user.name : 'Unknown'}</td>
                <td>${app.formatCurrency(order.total)}</td>
                <td>
                  <select onchange="adminModule.updateOrderStatus('${order.id}', this.value)" style="padding: 5px;">
                    <option ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                    <option ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                  </select>
                </td>
                <td>${order.paymentMethod}</td>
                <td>
                  <button class="btn btn-secondary btn-small" onclick="adminModule.viewOrder('${order.id}')">View</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  },

  updateOrderStatus(orderId, newStatus) {
    const order = app.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      app.saveToStorage();
      app.showAlert('Order status updated!', 'success');
    }
  },

  viewOrder(orderId) {
    const order = app.orders.find(o => o.id === orderId);
    if (!order) return;

    const user = app.users.find(u => u.id === order.userId);
    alert(`Order ID: ${order.id}\nCustomer: ${user?.name}\nAmount: ${app.formatCurrency(order.total)}\nStatus: ${order.status}\nPayment: ${order.paymentMethod}\nDate: ${new Date(order.createdAt).toLocaleDateString()}`);
  },

  // USERS MANAGEMENT
  initUsers() {
    const usersContainer = document.getElementById('users-list');
    if (!usersContainer) return;

    usersContainer.innerHTML = app.users.length === 0 ? '<p>No users yet</p>' : `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${app.users.map(user => `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>
                <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; background: ${user.blocked ? '#f44336' : '#4caf50'}; color: white;">
                  ${user.blocked ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td>${new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button class="btn btn-secondary btn-small" onclick="adminModule.toggleUserBlock(${user.id})">
                  ${user.blocked ? 'Unblock' : 'Block'}
                </button>
                <button class="btn btn-secondary btn-small" onclick="adminModule.deleteUser(${user.id})" style="background: #f44336; color: white;">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  toggleUserBlock(userId) {
    const user = app.users.find(u => u.id === userId);
    if (user) {
      user.blocked = !user.blocked;
      app.saveToStorage();
      app.showAlert(`User ${user.blocked ? 'blocked' : 'unblocked'} successfully!`, 'success');
      this.initUsers();
    }
  },

  deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      app.users = app.users.filter(u => u.id !== userId);
      app.saveToStorage();
      app.showAlert('User deleted successfully!', 'success');
      this.initUsers();
    }
  },

  // SLIDER MANAGEMENT
  initSlider() {
    const sliderContainer = document.getElementById('slider-list');
    if (!sliderContainer) return;

    sliderContainer.innerHTML = `
      <div style="margin-bottom: 20px;">
        <button class="btn btn-primary" onclick="adminModule.showAddSliderForm()">+ Add New Slider</button>
      </div>
      <div id="slider-form-container" class="hidden"></div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${app.sliders.map(slider => `
            <tr>
              <td>${slider.title}</td>
              <td>${slider.description}</td>
              <td>
                <label style="cursor: pointer;">
                  <input type="checkbox" ${slider.enabled ? 'checked' : ''} onchange="adminModule.toggleSlider(${slider.id}, this.checked)" style="margin-right: 5px;">
                  ${slider.enabled ? 'Enabled' : 'Disabled'}
                </label>
              </td>
              <td>
                <button class="btn btn-secondary btn-small" onclick="adminModule.showEditSliderForm(${slider.id})">Edit</button>
                <button class="btn btn-secondary btn-small" onclick="adminModule.deleteSlider(${slider.id})" style="background: #f44336; color: white;">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  showAddSliderForm() {
    const container = document.getElementById('slider-form-container');
    container.innerHTML = `
      <form onsubmit="adminModule.saveSlider(event)" style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e8ddd5;">
        <h3>Add New Slider</h3>
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="slider-title" required>
        </div>
        <div class="form-group">
          <label>Description</label>
          <input type="text" id="slider-description" required>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="submit" class="btn btn-primary">Save Slider</button>
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('slider-form-container').innerHTML = ''; document.getElementById('slider-form-container').classList.add('hidden');">Cancel</button>
        </div>
      </form>
    `;
    container.classList.remove('hidden');
  },

  showEditSliderForm(sliderId) {
    const slider = app.sliders.find(s => s.id === sliderId);
    if (!slider) return;

    const container = document.getElementById('slider-form-container');
    container.innerHTML = `
      <form onsubmit="adminModule.saveSlider(event, ${sliderId})" style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e8ddd5;">
        <h3>Edit Slider</h3>
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="slider-title" value="${slider.title}" required>
        </div>
        <div class="form-group">
          <label>Description</label>
          <input type="text" id="slider-description" value="${slider.description}" required>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="submit" class="btn btn-primary">Update Slider</button>
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('slider-form-container').innerHTML = ''; document.getElementById('slider-form-container').classList.add('hidden');">Cancel</button>
        </div>
      </form>
    `;
    container.classList.remove('hidden');
  },

  saveSlider(event, sliderId = null) {
    event.preventDefault();
    
    const title = document.getElementById('slider-title').value;
    const description = document.getElementById('slider-description').value;

    if (sliderId) {
      const slider = app.sliders.find(s => s.id === sliderId);
      if (slider) {
        slider.title = title;
        slider.description = description;
        app.showAlert('Slider updated successfully!', 'success');
      }
    } else {
      app.sliders.push({
        id: Date.now(),
        title,
        description,
        image: 'placeholder.jpg',
        enabled: true
      });
      app.showAlert('Slider added successfully!', 'success');
    }

    app.saveToStorage();
    sliderModule.init();
    document.getElementById('slider-form-container').innerHTML = '';
    document.getElementById('slider-form-container').classList.add('hidden');
    this.initSlider();
  },

  toggleSlider(sliderId, enabled) {
    const slider = app.sliders.find(s => s.id === sliderId);
    if (slider) {
      slider.enabled = enabled;
      app.saveToStorage();
      sliderModule.init();
      app.showAlert('Slider updated!', 'success');
    }
  },

  deleteSlider(sliderId) {
    if (confirm('Are you sure you want to delete this slider?')) {
      app.sliders = app.sliders.filter(s => s.id !== sliderId);
      app.saveToStorage();
      sliderModule.init();
      app.showAlert('Slider deleted successfully!', 'success');
      this.initSlider();
    }
  },

  // ADMIN PROFILE
  initAdminProfile() {
    const profileForm = document.getElementById('admin-profile-form');
    if (!profileForm) return;

    profileForm.innerHTML = `
      <div class="profile-container">
        <form onsubmit="adminModule.saveAdminProfile(event)">
          <div class="form-group">
            <label>Name</label>
            <input type="text" id="admin-name" value="Admin" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="admin-email" value="${auth.adminEmail}" disabled>
          </div>
          <div style="display: flex; gap: 10px;">
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    `;
  },

  saveAdminProfile(event) {
    event.preventDefault();
    const name = document.getElementById('admin-name').value;
    app.showAlert('Admin profile updated successfully!', 'success');
  }
};

function initAdminDashboard() {
  adminModule.switchSection('dashboard');
}

function initAdminProducts() {
  adminModule.switchSection('products');
}

function initAdminOrders() {
  adminModule.switchSection('orders');
}

function initAdminUsers() {
  adminModule.switchSection('users');
}

function initAdminSlider() {
  adminModule.switchSection('slider');
}

function initAdminProfile() {
  adminModule.switchSection('profile');
}
