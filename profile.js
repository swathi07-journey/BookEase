(() => {
 const ACCOUNT_KEY="bookeaseAccount", SESSION_KEY="bookeaseCurrentUser";
 const read=key=>{try{return JSON.parse(localStorage.getItem(key)||"null")}catch{return null}};
 const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
 let account=null;
 function render(user){
  document.getElementById("sideName").textContent=user.name;
  document.getElementById("sideEmail").textContent=user.email;
  document.getElementById("profileAvatar").textContent=(user.name.trim()[0]||"B").toUpperCase();
  document.getElementById("viewName").textContent=user.name;
  document.getElementById("viewEmail").textContent=user.email;
  document.getElementById("viewPhone").textContent=user.phone;
 }
 document.addEventListener("DOMContentLoaded",()=>{
  account=read(ACCOUNT_KEY);
  const session=read(SESSION_KEY);
  if(!account||!session||account.email!==session.email){location.replace("account.html");return}
  render(account);
  const form=document.getElementById("profileForm"), view=document.getElementById("profileView");
  const edit=()=>{document.getElementById("editName").value=account.name;document.getElementById("editEmail").value=account.email;document.getElementById("editPhone").value=account.phone;view.hidden=true;form.hidden=false;document.getElementById("editButton").hidden=true;};
  const close=()=>{form.hidden=true;view.hidden=false;document.getElementById("editButton").hidden=false;document.getElementById("profileMessage").textContent="";};
  document.getElementById("editButton").addEventListener("click",edit);
  document.getElementById("cancelEdit").addEventListener("click",close);
  form.addEventListener("submit",event=>{
   event.preventDefault();
   const name=document.getElementById("editName").value.trim();
   const email=document.getElementById("editEmail").value.trim().toLowerCase();
   const phone=document.getElementById("editPhone").value.trim();
   const msg=document.getElementById("profileMessage");
   msg.className="form-message";
   if(name.length<2){msg.textContent="Please enter your full name.";return}
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){msg.textContent="Please enter a valid email address.";return}
   if(phone.replace(/\D/g,"").length<7){msg.textContent="Please enter a valid phone number.";return}
   account={...account,name,email,phone};
   save(ACCOUNT_KEY,account);save(SESSION_KEY,{name,email,phone});
   render(account);close();
   const toast=document.createElement("div");toast.className="toast show";toast.textContent="Profile updated successfully.";document.body.appendChild(toast);setTimeout(()=>toast.remove(),2200);
  });
  document.getElementById("logoutButton").addEventListener("click",()=>{localStorage.removeItem(SESSION_KEY);location.href="account.html";});
 });
})();