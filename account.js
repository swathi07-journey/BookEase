(() => {
  const ACCOUNT_KEY = "bookeaseAccount";
  const SESSION_KEY = "bookeaseCurrentUser";
  const read = key => { try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  function showMode(mode) {
    const login = mode === "login";
    document.getElementById("loginPanel").hidden = !login;
    document.getElementById("registerPanel").hidden = login;
    document.querySelectorAll(".account-tab").forEach(tab => {
      const active = tab.dataset.mode === mode;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-mode]").forEach(btn => btn.addEventListener("click", () => showMode(btn.dataset.mode)));
    document.querySelectorAll("[data-switch]").forEach(btn => btn.addEventListener("click", () => showMode(btn.dataset.switch)));
    if (location.hash === "#register") showMode("register");

    document.getElementById("registerForm").addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim().toLowerCase();
      const phone = document.getElementById("registerPhone").value.trim();
      const password = document.getElementById("registerPassword").value;
      const message = document.getElementById("registerMessage");
      message.className = "form-message";
      if (name.length < 2) return message.textContent = "Please enter your full name.";
      if (!validEmail(email)) return message.textContent = "Please enter a valid email address.";
      if (phone.replace(/\D/g, "").length < 7) return message.textContent = "Please enter a valid phone number.";
      if (password.length < 6) return message.textContent = "Password must contain at least 6 characters.";
      const existing = read(ACCOUNT_KEY);
      if (existing && existing.email === email) return message.textContent = "An account with this email already exists. Please log in.";
      const user = { name, email, phone, password };
      write(ACCOUNT_KEY, user);
      write(SESSION_KEY, { name, email, phone });
      message.textContent = "Account created. Opening your profile...";
      message.classList.add("success");
      setTimeout(() => location.href = "profile.html", 500);
    });

    document.getElementById("loginForm").addEventListener("submit", event => {
      event.preventDefault();
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const message = document.getElementById("loginMessage");
      message.className = "form-message";
      if (email === "admin123" && password === "1234") {
        write("bookeaseAdminSession", { username: "admin123", role: "admin", signedInAt: new Date().toISOString() });
        message.textContent = "Admin login successful. Opening business dashboard...";
        message.classList.add("success");
        setTimeout(() => location.href = "dashboard.html", 350);
        return;
      }
      const user = read(ACCOUNT_KEY);
      if (!validEmail(email)) return message.textContent = "Please enter a valid customer email or the admin username.";
      if (!user || user.email !== email || user.password !== password) return message.textContent = "Account details not found. Check your details or create an account.";
      write(SESSION_KEY, { name: user.name, email: user.email, phone: user.phone });
      message.textContent = "Login successful. Opening your profile...";
      message.classList.add("success");
      setTimeout(() => location.href = "profile.html", 450);
    });
  });
})();