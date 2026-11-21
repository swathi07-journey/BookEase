document.addEventListener("DOMContentLoaded", () => {
 const container = document.getElementById("detailContent");
 if (!container || !window.BookEaseData) return;
 const params = new URLSearchParams(window.location.search);
 const serviceId = params.get("id");
 const service = BookEaseData.services.find(item => item.id === serviceId && item.active !== false);
 const money = value => "₹" + Number(value).toLocaleString("en-IN");
 const safe = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
 if (!service) {
   container.innerHTML = `<div class="detail-error"><h1>Service not found</h1><p>This service link may be incomplete. Return to the services page and choose a service.</p><a class="btn btn-primary" href="services.html">Browse services</a></div>`;
   return;
 }
 document.title = `${service.name} | BookEase`;
 document.getElementById("crumbName").textContent = service.name;
 const professionalMap = {
  "Beauty & Salon":"p1","Hair Styling":"p2","Spa & Wellness":"p3",
  "Healthcare":"p4","Fitness":"p5","Consulting":"p6"
 };
 let professional = BookEaseData.professionals.find(p => p.id === professionalMap[service.category] && p.active !== false);
 if (service.name === "Manicure & Pedicure") professional = BookEaseData.professionals.find(p => p.id === "p7" && p.active !== false);
 if (service.name === "Nutrition Consultation") professional = BookEaseData.professionals.find(p => p.id === "p8" && p.active !== false);
 const person = professional || BookEaseData.professionals.find(p => p.active !== false) || {name:"BookEase Professional",specialisation:"Service specialist",rating:5,experience:"Sample profile",image:""};
 container.innerHTML = `
  <div class="detail-layout">
   <div><img class="detail-photo" src="${safe(service.image)}" alt="${safe(service.name)}">
    <section class="professional-section"><h2 class="subheading">Your sample professional</h2>
     <article class="professional-card-detail"><img src="${safe(person.image)}" alt="${safe(person.name)}"><div><h3>${safe(person.name)}</h3><p>${safe(person.specialisation)}</p><span class="pro-meta">★ ${person.rating.toFixed(1)} · ${safe(person.experience)}</span></div></article>
    </section>
    <section class="review-section"><h2 class="subheading">Customer feedback</h2>
     <article class="review-card"><div class="review-stars">★★★★★</div><p>“The service information was clear and the overall experience felt simple and welcoming.”</p><strong>Alex Morgan</strong> <small>· Illustrative demo review</small></article>
     <article class="review-card"><div class="review-stars">★★★★★</div><p>“A helpful way to compare the details before choosing an appointment.”</p><strong>Jamie Lee</strong> <small>· Illustrative demo review</small></article>
    </section>
   </div>
   <div class="detail-main"><span class="detail-category">${safe(service.category)}</span><h1>${safe(service.name)}</h1>
    <div class="detail-provider">Provided by <strong>${safe(service.provider)}</strong></div>
    <div class="detail-rating">★ ${Number(service.rating).toFixed(1)} <span>Sample customer rating</span></div>
    <p class="detail-description">${safe(service.description)} This listing is part of the BookEase portfolio demonstration. Review the sample information below before continuing.</p>
    <div class="detail-facts"><div class="fact-card"><small>Duration</small><strong>${service.duration} min</strong></div><div class="fact-card"><small>Category</small><strong>${safe(service.category)}</strong></div><div class="fact-card"><small>Rating</small><strong>★ ${Number(service.rating).toFixed(1)}</strong></div></div>
    <div class="detail-bookbox"><div class="detail-price">${money(service.price)} <small>/ session</small></div><p>Sample price · No payment will be collected</p><a class="btn btn-primary" href="booking.html?service=${encodeURIComponent(service.id)}">Book this service <span>→</span></a></div>
    <p class="detail-description"><strong>Good to know:</strong> Prices, professionals, ratings and reviews are fictional sample content. BookEase is a frontend portfolio demo and is not connected to real businesses.</p>
    <a class="text-link" href="services.html">← Back to all services</a>
   </div>
  </div>`;
});
