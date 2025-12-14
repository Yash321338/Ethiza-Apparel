/* ========================================
   PAYMENTS MODULE
   ======================================== */

const payments = {
  methods: ['COD', 'PayPal', 'Razorpay', 'Card'],
  
  processPayment(method, amount) {
    switch(method) {
      case 'COD':
        return this.processCOD(amount);
      case 'PayPal':
        return this.processPayPal(amount);
      case 'Razorpay':
        return this.processRazorpay(amount);
      case 'Card':
        return this.processCard(amount);
      default:
        return { success: false, message: 'Invalid payment method' };
    }
  },

  processCOD(amount) {
    // Simulate COD processing
    return {
      success: true,
      message: 'COD order confirmed',
      method: 'Cash on Delivery',
      amount: amount,
      transactionId: 'COD-' + Date.now()
    };
  },

  processPayPal(amount) {
    // Simulate PayPal processing (Sandbox mode)
    const sandbox = true;
    if (sandbox) {
      // In production, integrate with PayPal API
      return {
        success: Math.random() > 0.1, // 90% success rate for demo
        message: 'PayPal payment processed',
        method: 'PayPal',
        amount: amount,
        transactionId: 'PP-' + Date.now(),
        redirectUrl: 'https://sandbox.paypal.com'
      };
    }
  },

  processRazorpay(amount) {
    // Simulate Razorpay processing (Test mode)
    const testMode = true;
    if (testMode) {
      // In production, integrate with Razorpay API
      return {
        success: Math.random() > 0.1, // 90% success rate for demo
        message: 'Razorpay payment processed',
        method: 'Razorpay',
        amount: amount,
        transactionId: 'RZP-' + Date.now(),
        orderId: 'RZP-ORDER-' + Date.now()
      };
    }
  },

  processCard(amount) {
    // Simulate Card payment processing
    return {
      success: Math.random() > 0.05, // 95% success rate for demo
      message: 'Card payment processed',
      method: 'Credit/Debit Card',
      amount: amount,
      transactionId: 'CARD-' + Date.now(),
      last4Digits: '4242'
    };
  },

  validateCardNumber(cardNumber) {
    // Basic Luhn algorithm validation
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length !== 16) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  },

  validateExpiry(expiry) {
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expiryYear = parseInt(year);
    const expiryMonth = parseInt(month);
    
    if (expiryYear < currentYear) return false;
    if (expiryYear === currentYear && expiryMonth < currentMonth) return false;
    
    return true;
  },

  validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
  }
};

function initCheckoutPage() {
  const checkoutForm = document.getElementById('checkout-form');
  const paymentMethodSelect = document.getElementById('payment-method');
  const cardPaymentFields = document.getElementById('card-payment-fields');
  const paypalPaymentFields = document.getElementById('paypal-payment-fields');
  const razorpayPaymentFields = document.getElementById('razorpay-payment-fields');

  if (!checkoutForm) return;

  // Toggle payment method fields
  if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', (e) => {
      const method = e.target.value;
      
      if (cardPaymentFields) cardPaymentFields.classList.toggle('hidden', method !== 'Card');
      if (paypalPaymentFields) paypalPaymentFields.classList.toggle('hidden', method !== 'PayPal');
      if (razorpayPaymentFields) razorpayPaymentFields.classList.toggle('hidden', method !== 'Razorpay');
    });
  }

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate address form
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    const method = document.getElementById('payment-method').value;

    if (!name || !email || !phone || !address || !city || !state || !pincode) {
      app.showAlert('Please fill all address fields', 'error');
      return;
    }

    // Validate payment method specific fields
    if (method === 'Card') {
      const cardNumber = document.getElementById('card-number').value;
      const expiry = document.getElementById('card-expiry').value;
      const cvv = document.getElementById('card-cvv').value;

      if (!cardNumber || !expiry || !cvv) {
        app.showAlert('Please fill all card details', 'error');
        return;
      }

      if (!payments.validateCardNumber(cardNumber)) {
        app.showAlert('Invalid card number', 'error');
        return;
      }

      if (!payments.validateExpiry(expiry)) {
        app.showAlert('Card has expired', 'error');
        return;
      }

      if (!payments.validateCVV(cvv)) {
        app.showAlert('Invalid CVV', 'error');
        return;
      }
    }

    // Process payment
    const total = cartModule.getCartTotal();
    const paymentResult = payments.processPayment(method, total);

    if (paymentResult.success) {
      // Create order
      const order = {
        id: app.generateOrderId(),
        userId: app.currentUser.id,
        items: JSON.parse(JSON.stringify(app.cart)),
        total: total,
        paymentMethod: method,
        transactionId: paymentResult.transactionId,
        status: 'Pending',
        shippingAddress: {
          name, email, phone, address, city, state, pincode
        },
        createdAt: new Date().toISOString()
      };

      app.orders.push(order);
      
      // Update user profile with order
      if (!app.profiles[app.currentUser.id]) {
        app.profiles[app.currentUser.id] = { orders: [] };
      }
      if (!app.profiles[app.currentUser.id].orders) {
        app.profiles[app.currentUser.id].orders = [];
      }
      app.profiles[app.currentUser.id].orders.push(order.id);

      app.saveToStorage();
      cartModule.clearCart();

      // Store order ID in session for success page
      sessionStorage.setItem('lastOrderId', order.id);

      app.showAlert('Order placed successfully!', 'success');
      setTimeout(() => {
        app.navigateTo('order-success');
      }, 1000);
    } else {
      app.showAlert(paymentResult.message || 'Payment failed', 'error');
    }
  });

  // Update order summary
  const summaryTotal = document.getElementById('summary-total');
  if (summaryTotal) {
    summaryTotal.textContent = app.formatCurrency(cartModule.getCartTotal());
  }
}
