/* ========================================
   WISHLIST MODULE
   ======================================== */

const wishlistModule = {
  addToWishlist(productId) {
    const product = app.products.find(p => p.id === productId);
    if (!product) return false;

    if (app.wishlist.find(item => item.id === productId)) {
      app.showAlert('Already in wishlist!', 'warning');
      return false;
    }

    app.wishlist.push({
      id: productId,
      name: product.name,
      price: product.price,
      category: product.category,
      addedAt: new Date().toISOString()
    });

    app.saveToStorage();
    app.updateUI();
    this.updateWishlistButtons();
    app.showAlert(`${product.name} added to wishlist!`, 'success');
    return true;
  },

  removeFromWishlist(productId) {
    app.wishlist = app.wishlist.filter(item => item.id !== productId);
    app.saveToStorage();
    app.updateUI();
    this.updateWishlistButtons();
    app.showAlert('Removed from wishlist', 'success');
  },

  isInWishlist(productId) {
    return app.wishlist.some(item => item.id === productId);
  },

  moveToCart(productId) {
    const item = app.wishlist.find(item => item.id === productId);
    if (item) {
      cartModule.addToCart(productId, 1);
      this.removeFromWishlist(productId);
    }
  },

  updateWishlistButtons() {
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
      const productId = parseInt(btn.dataset.productId);
      btn.classList.toggle('active', this.isInWishlist(productId));
    });
  }
};

function initWishlistPage() {
  const wishlistContainer = document.getElementById('wishlist-items');
  const emptyMessage = document.getElementById('wishlist-empty');

  if (!wishlistContainer) return;

  if (app.wishlist.length === 0) {
    wishlistContainer.innerHTML = '';
    if (emptyMessage) emptyMessage.classList.remove('hidden');
    return;
  }

  if (emptyMessage) emptyMessage.classList.add('hidden');

  wishlistContainer.innerHTML = app.wishlist.map(item => `
    <div class="product-card">
      <div class="product-image">
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #f5e6e0, #faf8f5); display: flex; align-items: center; justify-content: center; color: #999;">
          💝
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${item.category}</div>
        <div class="product-name">${item.name}</div>
        <div class="product-price">${app.formatCurrency(item.price)}</div>
        <div class="product-actions" style="margin-top: auto;">
          <button class="btn btn-primary" onclick="wishlistModule.moveToCart(${item.id})">
            Add to Cart
          </button>
          <button class="btn-wishlist" onclick="wishlistModule.removeFromWishlist(${item.id})" title="Remove from wishlist">
            ✕
          </button>
        </div>
      </div>
    </div>
  `).join('');
}
