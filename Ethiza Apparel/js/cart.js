/* ========================================
   SHOPPING CART MODULE
   ======================================== */

const cartModule = {
  addToCart(productId, quantity = 1) {
    const product = app.products.find(p => p.id === productId);
    if (!product) return false;

    const existingItem = app.cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      app.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        category: product.category
      });
    }

    app.saveToStorage();
    app.updateUI();
    app.showAlert(`${product.name} added to cart!`, 'success');
    return true;
  },

  removeFromCart(productId) {
    app.cart = app.cart.filter(item => item.id !== productId);
    app.saveToStorage();
    app.updateUI();
    app.showAlert('Item removed from cart', 'success');
  },

  updateQuantity(productId, quantity) {
    const item = app.cart.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        app.saveToStorage();
        this.updateCartTotal();
      }
    }
  },

  getCartTotal() {
    return app.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartCount() {
    return app.cart.reduce((count, item) => count + item.quantity, 0);
  },

  clearCart() {
    app.cart = [];
    app.saveToStorage();
    app.updateUI();
  },

  updateCartTotal() {
    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
      totalElement.textContent = app.formatCurrency(this.getCartTotal());
    }
  }
};

function initCartPage() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('cart-empty');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartItemsContainer) return;

  if (app.cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    if (emptyMessage) emptyMessage.classList.remove('hidden');
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (emptyMessage) emptyMessage.classList.add('hidden');
  if (checkoutBtn) checkoutBtn.disabled = false;

  cartItemsContainer.innerHTML = app.cart.map(item => `
    <div class="cart-item" data-product-id="${item.id}">
      <div class="cart-item-image">
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #f5e6e0, #faf8f5); display: flex; align-items: center; justify-content: center; color: #999;">
          📦
        </div>
      </div>
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <div class="product-category">${item.category}</div>
        <div class="product-price">${app.formatCurrency(item.price)}</div>
        <div class="quantity-control" style="margin-top: var(--spacing-md);">
          <button onclick="cartModule.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
          <input type="number" value="${item.quantity}" readonly>
          <button onclick="cartModule.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 18px; font-weight: 700; color: var(--accent-brown); margin-bottom: var(--spacing-md);">
          ${app.formatCurrency(item.price * item.quantity)}
        </div>
        <button class="btn btn-secondary btn-small" onclick="cartModule.removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');

  cartModule.updateCartTotal();

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (!auth.isLoggedIn()) {
        app.showAlert('Please login first', 'warning');
        app.navigateTo('login');
        return;
      }
      app.navigateTo('checkout');
    });
  }
}
