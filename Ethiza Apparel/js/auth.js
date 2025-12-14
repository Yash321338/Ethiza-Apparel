/* ========================================
   AUTHENTICATION MODULE
   ======================================== */

const auth = {
  adminEmail: 'yashtilala11411@gmail.com',
  adminPassword: 'yash1313',

  register(userData) {
    // Validate input
    if (!userData.email || !userData.password || !userData.name) {
      return { success: false, message: 'All fields are required' };
    }

    if (userData.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    // Check if email already exists
    const emailExists = app.users.some(u => u.email === userData.email);
    if (emailExists) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email: userData.email,
      password: userData.password, // In production, this should be hashed
      name: userData.name,
      isAdmin: false,
      createdAt: new Date().toISOString(),
      blocked: false
    };

    app.users.push(newUser);
    app.saveToStorage();

    return { success: true, message: 'Registration successful! Please login.' };
  },

  login(email, password, isAdmin = false) {
    // Check admin login
    if (isAdmin) {
      if (email === this.adminEmail && password === this.adminPassword) {
        const adminUser = {
          id: 'admin-' + Date.now(),
          email: email,
          name: 'Admin',
          isAdmin: true
        };
        sessionStorage.setItem('currentUser', JSON.stringify(adminUser));
        app.currentUser = adminUser;
        app.isAdmin = true;
        app.updateUI();
        return { success: true, message: 'Admin login successful' };
      } else {
        return { success: false, message: 'Invalid admin credentials' };
      }
    }

    // Regular user login
    const user = app.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    if (user.blocked) {
      return { success: false, message: 'Your account has been blocked' };
    }

    sessionStorage.setItem('currentUser', JSON.stringify(user));
    app.currentUser = user;
    app.isAdmin = false;
    app.updateUI();
    return { success: true, message: 'Login successful!' };
  },

  logout() {
    sessionStorage.removeItem('currentUser');
    app.currentUser = null;
    app.isAdmin = false;
    app.updateUI();
  },

  isLoggedIn() {
    return app.currentUser !== null;
  },

  getCurrentUser() {
    return app.currentUser;
  }
};

// Initialize login page
function initLoginPage() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const toggleBtn = document.getElementById('toggle-form-btn');
  const loginContainer = document.getElementById('login-container');
  const registerContainer = document.getElementById('register-container');
  const adminCheckbox = document.getElementById('admin-checkbox');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      loginContainer.classList.toggle('hidden');
      registerContainer.classList.toggle('hidden');
      adminCheckbox.checked = false;
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const isAdmin = document.getElementById('admin-checkbox').checked;

      const result = auth.login(email, password, isAdmin);
      
      if (result.success) {
        app.showAlert(result.message, 'success');
        setTimeout(() => {
          if (isAdmin) {
            app.navigateTo('admin');
          } else {
            app.navigateTo('home');
          }
        }, 1000);
      } else {
        app.showAlert(result.message, 'error');
      }

      loginForm.reset();
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;

      if (password !== confirmPassword) {
        app.showAlert('Passwords do not match', 'error');
        return;
      }

      const result = auth.register({ name, email, password });
      
      if (result.success) {
        app.showAlert(result.message, 'success');
        registerForm.reset();
        
        // Switch to login form
        setTimeout(() => {
          loginContainer.classList.remove('hidden');
          registerContainer.classList.add('hidden');
        }, 1000);
      } else {
        app.showAlert(result.message, 'error');
      }
    });
  }
}
