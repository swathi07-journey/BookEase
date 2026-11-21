document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    primaryNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  renderPopularServices();
  renderFeaturedProfessionals();

  const searchForm = document.getElementById("homeSearchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      const query = document.getElementById("homeSearch").value.trim();
      const category = document.getElementById("homeCategory").value;
      const params = new URLSearchParams();
      if (query) params.set("search", query);
      if (category) params.set("category", category);
      window.location.href = `services.html${params.toString() ? "?" + params.toString() : ""}`;
    });
  }

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
      event.preventDefault();
      const emailInput = document.getElementById("newsletterEmail");
      const message = document.getElementById("newsletterMessage");
      const email = emailInput.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "#c83c55";
        emailInput.focus();
        return;
      }
      message.textContent = "Thanks for subscribing! This is a demo confirmation.";
      message.style.color = "#258351";
      newsletterForm.reset();
    });
  }
});

function renderPopularServices() {
  const container = document.getElementById("popularServices");
  if (!container || !window.BookEaseData) return;
  container.innerHTML = BookEaseData.services.slice(0, 3).map(service => `
    <article class="service-card">
      <div class="service-image-wrap"><img src="${escapeHTML(service.image)}" alt="${escapeHTML(service.name)}" loading="lazy"><span class="service-tag">${escapeHTML(service.category)}</span></div>
      <div class="service-content">
        <div class="service-topline"><div><h3>${escapeHTML(service.name)}</h3><span class="service-provider">by ${escapeHTML(service.provider)}</span></div><span class="service-rating">★ ${service.rating}</span></div>
        <div class="service-meta"><span>◷ ${service.duration} min</span><span>✓ Demo provider</span></div>
        <div class="service-bottom"><div class="service-price">₹${service.price.toLocaleString("en-IN")} <small>/ session</small></div><a class="btn btn-outline" href="services.html">View service</a></div>
      </div>
    </article>`).join("");
}

function renderFeaturedProfessionals() {
  const container = document.getElementById("featuredProfessionals");
  if (!container || !window.BookEaseData) return;
  container.innerHTML = BookEaseData.professionals.map(person => `
    <article class="professional-card">
      <img src="${escapeHTML(person.image)}" alt="${escapeHTML(person.name)}" loading="lazy">
      <h3>${escapeHTML(person.name)}</h3><p>${escapeHTML(person.specialisation)}</p>
      <div class="professional-rating">★ ${person.rating} <span>· Demo profile</span></div>
      <div class="professional-experience">${escapeHTML(person.experience)}</div>
      <a class="btn btn-outline" href="services.html">View services</a>
    </article>`).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}
