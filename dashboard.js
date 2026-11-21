document.addEventListener("DOMContentLoaded", () => {
  const KEY = "bookeaseBookings";
  const read = () => { try { const value = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } };
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const money = value => "₹" + Number(value || 0).toLocaleString("en-IN");
  const parseDate = b => { const d = new Date(`${b.date || ""} ${b.time || "11:59 PM"}`); return Number.isNaN(d.getTime()) ? null : d; };
  const isPast = b => { const d = parseDate(b); return d ? d < new Date() : false; };
  const today = new Date();
  document.getElementById("todayLabel").textContent = today.toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });

  function render() {
    const bookings = read();
    const active = bookings.filter(b => b.status !== "Cancelled");
    const upcoming = active.filter(b => !isPast(b));
    const completed = active.filter(isPast);
    const totalValue = active.reduce((sum, b) => sum + Number(b.price || 0), 0);
    document.getElementById("totalBookings").textContent = bookings.length;
    document.getElementById("upcomingBookings").textContent = upcoming.length;
    document.getElementById("completedBookings").textContent = completed.length;
    document.getElementById("bookingValue").textContent = money(totalValue);

    renderActivity(bookings);
    renderPopular(bookings);
    renderRecent(bookings);
  }

  function renderActivity(bookings) {
    const chart = document.getElementById("activityChart");
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() - i);
      const count = bookings.filter(b => { const bd = parseDate(b); return bd && bd.toDateString() === d.toDateString(); }).length;
      days.push({ label:d.toLocaleDateString("en-US",{weekday:"short"}), count });
    }
    const max = Math.max(1, ...days.map(d => d.count));
    chart.innerHTML = days.map(d => `<div class="chart-day"><span class="chart-value">${d.count}</span><div class="chart-bar-track"><div class="chart-bar" style="height:${Math.max(4,(d.count/max)*100)}%"></div></div><span class="chart-label">${d.label}</span></div>`).join("");
  }

  function renderPopular(bookings) {
    const target = document.getElementById("popularServices");
    const counts = new Map();
    bookings.filter(b => b.status !== "Cancelled").forEach(b => {
      const name = b.serviceName || "Other service";
      counts.set(name, (counts.get(name) || 0) + 1);
    });
    const items = [...counts.entries()].sort((a,b) => b[1]-a[1]).slice(0,5);
    if (!items.length) { target.innerHTML = '<div class="popular-empty">Your most booked services will appear here after sample bookings are created.</div>'; return; }
    const icons = ["✦","✂","◉","♡","✧"];
    target.innerHTML = items.map(([name,count],i) => `<div class="popular-service"><span class="popular-service-icon">${icons[i%icons.length]}</span><div class="popular-service-info"><strong>${esc(name)}</strong><small>Customer bookings</small></div><span class="popular-service-count">${count} ${count===1?"booking":"bookings"}</span></div>`).join("");
  }

  function renderRecent(bookings) {
    const sorted = [...bookings].sort((a,b) => (parseDate(b)?.getTime() || 0) - (parseDate(a)?.getTime() || 0)).slice(0,6);
    const tbody = document.getElementById("recentBookings");
    const mobile = document.getElementById("recentMobile");
    if (!sorted.length) {
      tbody.innerHTML = '<tr><td class="recent-empty" colspan="5">No demo bookings yet. Create a sample booking from the customer website.</td></tr>';
      mobile.innerHTML = '<div class="recent-empty">No demo bookings yet. Create a sample booking from the customer website.</div>';
      return;
    }
    const status = b => b.status === "Cancelled" ? ["Cancelled","cancelled"] : isPast(b) ? ["Past","past"] : ["Upcoming",""];
    tbody.innerHTML = sorted.map(b => {
      const [label,cls] = status(b);
      return `<tr><td><div class="customer-cell"><strong>${esc(b.customerName || b.name || "Demo customer")}</strong><small>${esc(b.email || "")}</small></div></td><td>${esc(b.serviceName || "Service")}</td><td>${esc(b.date || "—")} · ${esc(b.time || "—")}</td><td>${esc(b.id || "—")}</td><td><span class="booking-status ${cls}">${label}</span></td></tr>`;
    }).join("");
    mobile.innerHTML = sorted.map(b => {
      const [label,cls] = status(b);
      return `<article class="recent-mobile-card"><strong>${esc(b.serviceName || "Service")} · ${esc(b.customerName || b.name || "Demo customer")}</strong><span>${esc(b.date || "—")} · ${esc(b.time || "—")} · Ref: ${esc(b.id || "—")}</span><span class="booking-status ${cls}">${label}</span></article>`;
    }).join("");
  }

  window.addEventListener("storage", event => { if (!event.key || event.key === KEY) render(); });
  render();
});

// Stage 9–13: extended dashboard indicators from demo LocalStorage data.
document.addEventListener("DOMContentLoaded", () => {
 try { const bookings=JSON.parse(localStorage.getItem("bookeaseBookings")||"[]"); const cancelled=document.getElementById("cancelledBookings"); if(cancelled)cancelled.textContent=bookings.filter(b=>String(b.status||"").toLowerCase()==="cancelled").length; const pros=JSON.parse(localStorage.getItem("bookeaseProfessionals")||"null")||window.BookEaseData?.professionals||[]; const active=document.getElementById("activeProfessionals"); if(active)active.textContent=pros.filter(p=>p.active!==false).length; } catch(e) { console.warn("Could not load extended dashboard stats",e); }
});
