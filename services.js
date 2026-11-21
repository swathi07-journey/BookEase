document.addEventListener("DOMContentLoaded", () => {
 const el = id => document.getElementById(id);
 const search=el("serviceSearch"), form=el("catalogSearchForm"), category=el("categoryFilter"), min=el("minPrice"), max=el("maxPrice"), duration=el("durationFilter"), rating=el("ratingFilter"), sort=el("sortSelect"), grid=el("serviceGrid"), count=el("resultCount"), empty=el("emptyState"), pills=el("categoryPills");
 if (!grid || !window.BookEaseData) return;
 const params=new URLSearchParams(location.search);
 if(params.has("search")) search.value=params.get("search");
 if(params.has("category")) category.value=params.get("category");
 const money=n=>"₹"+Number(n).toLocaleString("en-IN");
 const safe=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
 function render(){
  const q=search.value.trim().toLowerCase(), cat=category.value, low=+min.value, high=+max.value, dur=duration.value, stars=+rating.value;
  el("minPriceOutput").textContent=money(low); el("maxPriceOutput").textContent=money(high);
  pills.querySelectorAll("button").forEach(b=>{const on=(cat===""&&b.dataset.category==="all")||b.dataset.category===cat;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));});
  let items=BookEaseData.services.filter(s=>s.active!==false).filter(s=>{
   const text=[s.name,s.provider,s.category].join(" ").toLowerCase();
   let durationOk=!dur||(dur==="30"?s.duration<=30:dur==="60"?s.duration<=60:dur==="90"?s.duration<=90:s.duration>90);
   return (!q||text.includes(q))&&(!cat||s.category===cat)&&s.price>=low&&s.price<=high&&durationOk&&s.rating>=stars;
  });
  if(sort.value==="price-low")items.sort((a,b)=>a.price-b.price);
  else if(sort.value==="price-high")items.sort((a,b)=>b.price-a.price);
  else if(sort.value==="rating")items.sort((a,b)=>b.rating-a.rating);
  else items.sort((a,b)=>b.rating-a.rating);
  count.textContent=`Showing ${items.length} of ${BookEaseData.services.length} services`;
  grid.innerHTML=items.map(s=>`<article class="service-card"><div class="service-image-wrap"><img src="${safe(s.image)}" alt="${safe(s.name)}" loading="lazy"><span class="service-tag">${safe(s.category)}</span></div><div class="service-content"><div class="service-topline"><div><h3>${safe(s.name)}</h3><span class="service-provider">by ${safe(s.provider)}</span></div><span class="service-rating">★ ${s.rating.toFixed(1)}</span></div><p class="catalog-description">${safe(s.description)}</p><div class="service-meta"><span>◷ ${s.duration} min</span><span>✓ Demo listing</span></div><div class="service-bottom"><div class="service-price">${(() => { const today=new Date().toISOString().slice(0,10); const offer=(BookEaseData.offers||[]).find(o=>o.active!==false&&o.start<=today&&o.end>=today&&(!o.serviceId||o.serviceId==="all"||o.serviceId===s.id)); const finalPrice=offer?Math.round(s.price*(100-offer.discount)/100):s.price; return offer?`<span style="text-decoration:line-through;color:#9b9298;font-size:12px">${money(s.price)}</span> ${money(finalPrice)} <small>${offer.discount}% off · ${offer.name}</small>`:`${money(s.price)} <small>/ session</small>`; })()}</div><div class="card-actions"><a class="btn btn-outline" href="service-details.html?id=${encodeURIComponent(s.id)}">Details</a><a class="btn btn-primary" href="booking.html?service=${encodeURIComponent(s.id)}">Book now</a></div></div></div></article>`).join("");
  empty.hidden=items.length>0; grid.hidden=items.length===0;
 }
 function clear(){search.value="";category.value="";min.value=0;max.value=5000;duration.value="";rating.value="0";sort.value="recommended";history.replaceState({}, "", location.pathname);render();}
 form.addEventListener("submit",e=>{e.preventDefault();render();});
 [search,category,min,max,duration,rating,sort].forEach(x=>x.addEventListener(x===search?"input":"change",render));
 pills.addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(!b)return;category.value=b.dataset.category==="all"?"":b.dataset.category;render();});
 el("clearFilters").addEventListener("click",clear);el("emptyClearButton").addEventListener("click",clear);render();
});
