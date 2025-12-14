/* ========================================
   SLIDER MODULE
   ======================================== */

const sliderModule = {
  currentSlide: 0,

  init() {
    const sliderContainer = document.getElementById('hero-slider');
    if (!sliderContainer) return;

    this.renderSlides();
    this.startAutoPlay();
  },

  renderSlides() {
    const sliderContainer = document.getElementById('slider-slides');
    if (!sliderContainer) return;

    const enabledSliders = app.sliders.filter(s => s.enabled);
    
    if (enabledSliders.length === 0) {
      sliderContainer.innerHTML = '<div style="text-align: center; padding: 60px 20px; color: #999;">No active sliders</div>';
      return;
    }

    sliderContainer.innerHTML = enabledSliders.map((slider, index) => `
      <div class="slider-slide ${index === this.currentSlide ? 'active' : ''}" style="
        display: ${index === this.currentSlide ? 'flex' : 'none'};
        align-items: center;
        justify-content: center;
        min-height: 400px;
        background: linear-gradient(135deg, #f5e6e0 0%, #faf8f5 100%);
      ">
        <div style="text-align: center;">
          <h2 style="font-size: 48px; margin-bottom: 20px; color: #3d3d3d; font-family: Georgia, serif;">${slider.title}</h2>
          <p style="font-size: 18px; color: #6b6b6b; margin-bottom: 30px;">${slider.description}</p>
          <button class="btn btn-primary" onclick="app.navigateTo('shop')">Shop Now</button>
        </div>
      </div>
    `).join('');

    // Add navigation buttons
    const navContainer = document.getElementById('slider-nav');
    if (navContainer) {
      navContainer.innerHTML = `
        <button class="slider-nav-btn prev" onclick="sliderModule.prevSlide()">❮</button>
        <div class="slider-dots">
          ${enabledSliders.map((_, index) => `
            <button class="dot ${index === this.currentSlide ? 'active' : ''}" onclick="sliderModule.goToSlide(${index})"></button>
          `).join('')}
        </div>
        <button class="slider-nav-btn next" onclick="sliderModule.nextSlide()">❯</button>
      `;
    }
  },

  nextSlide() {
    const enabledSliders = app.sliders.filter(s => s.enabled);
    this.currentSlide = (this.currentSlide + 1) % enabledSliders.length;
    this.renderSlides();
    this.resetAutoPlay();
  },

  prevSlide() {
    const enabledSliders = app.sliders.filter(s => s.enabled);
    this.currentSlide = (this.currentSlide - 1 + enabledSliders.length) % enabledSliders.length;
    this.renderSlides();
    this.resetAutoPlay();
  },

  goToSlide(index) {
    this.currentSlide = index;
    this.renderSlides();
    this.resetAutoPlay();
  },

  autoPlayInterval: null,

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  },

  resetAutoPlay() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
};
