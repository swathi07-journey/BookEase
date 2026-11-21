document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("appointmentList");
  const tabs = [...document.querySelectorAll(".filter-tab")];
  let activeFilter = "all";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const read = () => { try { const x=JSON.parse(localStorage.getItem("bookeaseBookings")||"[]"); return Array.isArray(x)?x:[]; } catch(e) { return []; } };
  const past = b => { const d=new Date(`${b.date} ${b.time||"11:59 PM"}`); return !Number.isNaN(d.getTime()) && d < new Date(); };
  const money = n => "₹"+Number(n||0).toLocaleString("en-IN");
  function render(){
    const bookings=read(), active=bookings.filter(b=>b.status!=="Cancelled");
    document.getElementById("totalCount").textContent=bookings.length;
    document.getElementById("upcomingCount").textContent=active.filter(b=>!past(b)).length;
    document.getElementById("completedCount").textContent=active.filter(past).length;
    document.getElementById("allTabCount").textContent=bookings.length;
    tabs.forEach(t=>{const yes=t.dataset.filter===activeFilter;t.classList.toggle("active",yes);t.setAttribute("aria-selected",String(yes));});
    const shown=bookings.filter(b=>{
      if(activeFilter==="cancelled") return b.status==="Cancelled";
      if(activeFilter==="upcoming") return b.status!=="Cancelled"&&!past(b);
      if(activeFilter==="past") return b.status!=="Cancelled"&&past(b);
      return true;
    }).sort((a,b)=>`${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
    if(!shown.length){
      const msg=activeFilter==="all"?"You haven't booked a demo appointment yet.":activeFilter==="upcoming"?"There are no upcoming demo appointments.":activeFilter==="past"?"There are no past demo appointments.":"There are no cancelled demo appointments.";
      list.innerHTML=`<div class="empty-state"><div class="empty-icon">▣</div><h3>Nothing here just yet</h3><p>${msg} Explore services and create your first sample booking.</p><a class="btn btn-primary" href="services.html">Explore services</a></div>`;return;
    }
    list.innerHTML=shown.map(b=>{
      const cancelled=b.status==="Cancelled", wasPast=!cancelled&&past(b);
      const label=cancelled?"Cancelled":wasPast?"Past appointment":"Upcoming";
      const cls=cancelled?"cancelled":wasPast?"past":"";
      const service=window.BookEaseData?.services?.find(s=>s.id===b.serviceId);
      const img=b.image||service?.image||"";
      return `<article class="appointment-card ${cancelled?"cancelled-card":""}">
        <img src="${esc(img)}" alt="${esc(b.serviceName||"Booked service")}" loading="lazy">
        <div class="appointment-card-main"><span class="appointment-category">${esc(b.category||"BOOKEASE SERVICE")}</span><h3>${esc(b.serviceName||"Appointment")}</h3>
        <div class="appointment-meta"><span>▦ ${esc(b.date)}</span><span>◷ ${esc(b.time)}</span><span>◉ ${esc(b.duration)} min</span></div>
        <div class="appointment-meta"><span>Professional: ${esc(b.professional||"Any available professional")}</span></div><div class="appointment-ref">Reference: ${esc(b.id)}</div></div>
        <div class="appointment-card-side"><span class="status-pill ${cls}">● ${label}</span><strong class="appointment-price">${money(b.price)}</strong>
        ${!cancelled&&!wasPast?`<button class="cancel-booking" type="button" data-cancel="${esc(b.id)}">Cancel demo booking</button>`:""}</div></article>`;
    }).join("");
  }
  tabs.forEach(t=>t.addEventListener("click",()=>{activeFilter=t.dataset.filter;render();}));
  list.addEventListener("click",e=>{
    const btn=e.target.closest("[data-cancel]");if(!btn)return;
    const bookings=read(), b=bookings.find(x=>x.id===btn.dataset.cancel);
    if(!b||b.status==="Cancelled")return;
    if(!window.confirm("Cancel this sample booking? This only updates the demo data in your browser."))return;
    b.status="Cancelled";
    try{localStorage.setItem("bookeaseBookings",JSON.stringify(bookings));render();}
    catch(err){window.alert("Could not update this booking in browser storage.");}
  });
  window.addEventListener("storage",render);render();
});