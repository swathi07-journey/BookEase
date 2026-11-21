// Fictional sample data for the BookEase portfolio demonstration.
const BookEaseData = {
 services: [
  ["s1","Glow Facial","Beauty & Salon","Sarah Beauty Studio",999,60,4.8,"photo-1570172619644-dfd03ed5d881","A refreshing facial experience designed to leave your skin feeling cared for."],
  ["s2","Hair Cut & Style","Hair Styling","Mira Hair Studio",599,45,4.7,"photo-1560066984-138dadb4c035","A personalised haircut and styling session."],
  ["s3","Full Body Massage","Spa & Wellness","Willow Wellness Spa",1499,90,4.9,"photo-1540555700478-4be289fbecef","A calming wellness session in a peaceful setting."],
  ["s4","Skin Care Consultation","Healthcare","CarePoint Clinic",799,30,4.8,"photo-1616394584738-fc6e612e71b9","A one-to-one consultation to discuss your skincare goals."],
  ["s5","Personal Training","Fitness","MoveWell Studio",899,60,4.9,"photo-1534438327276-14e5300c3a48","A guided fitness session tailored to your experience level."],
  ["s6","Career Guidance","Consulting","NextStep Consulting",1199,45,4.7,"photo-1521737711867-e3b97375f902","A focused session to help you think through your next career step."],
  ["s7","Bridal Makeup","Beauty & Salon","Sarah Beauty Studio",4999,120,4.9,"photo-1487412947147-5cebf100ffc2","A polished makeup session for your special occasion."],
  ["s8","Hair Spa Treatment","Hair Styling","Mira Hair Studio",1299,75,4.8,"photo-1521590832167-7bcbfaa6381f","A relaxing hair and scalp care treatment."],
  ["s9","Aromatherapy Massage","Spa & Wellness","Willow Wellness Spa",1699,75,4.9,"photo-1519823551278-64ac92734fb1","A gentle massage experience with calming aromas."],
  ["s10","Dental Consultation","Healthcare","CarePoint Clinic",499,30,4.6,"photo-1606811971618-4486d14f3f99","A routine consultation to discuss your dental care."],
  ["s11","Yoga Session","Fitness","MoveWell Studio",499,60,4.8,"photo-1599447421416-3414500d18a5","A guided yoga session suitable for your current level."],
  ["s12","Business Consultation","Consulting","NextStep Consulting",1999,60,4.8,"photo-1556761175-b413da4baf72","Discuss business questions and practical next steps."],
  ["s13","Manicure & Pedicure","Beauty & Salon","Luna Beauty Lounge",899,60,4.7,"photo-1604654894610-df63bc536371","A neat, relaxing nail care appointment."],
  ["s14","Hair Colour","Hair Styling","Mira Hair Studio",2499,120,4.6,"photo-1519699047748-de8e457a634e","A colour consultation and styling appointment."],
  ["s15","Relaxation Therapy","Spa & Wellness","Willow Wellness Spa",1299,60,4.8,"photo-1544161515-4ab6ce6db874","A quiet wellness session focused on relaxation."],
  ["s16","Nutrition Consultation","Healthcare","CarePoint Clinic",899,45,4.7,"photo-1490645935967-10de6ba17061","Discuss everyday nutrition goals with a sample specialist."],
  ["s17","Strength Coaching","Fitness","MoveWell Studio",999,60,4.8,"photo-1583454110551-21f2fa2afe61","A coached strength session with adaptable exercises."],
  ["s18","Resume Review","Consulting","NextStep Consulting",699,30,4.9,"photo-1455390582262-044cdead277a","A focused review of your resume structure and clarity."]
 ].map(([id,name,category,provider,price,duration,rating,img,description]) => ({
  id,name,category,provider,price,duration,rating,description,
  image:`https://images.unsplash.com/${img}?w=900&h=650&fit=crop`
 })),
 professionals: [
  ["p1","Sarah Mitchell","Skin & Beauty Specialist","6 years experience",4.8,"photo-1551836022-d5d88e9218df"],
  ["p2","Mira James","Hair Stylist","8 years experience",4.9,"photo-1580489944761-15a19d654956"],
  ["p3","Ananya Rao","Wellness Therapist","5 years experience",4.9,"photo-1544005313-94ddf0286df2"],
  ["p4","Daniel Brooks","Healthcare Consultant","7 years experience",4.8,"photo-1500648767791-00dcc994a43e"],
  ["p5","Noah Williams","Fitness Coach","7 years experience",4.8,"photo-1535713875002-d1d0cf377fde"],
  ["p6","Olivia Carter","Career & Business Consultant","9 years experience",4.9,"photo-1544005313-94ddf0286df2"],
  ["p7","Emily Rose","Nail Care Specialist","4 years experience",4.7,"photo-1534528741775-53994a69daeb"],
  ["p8","Priya Nair","Nutrition Consultant","6 years experience",4.7,"photo-1551836022-d5d88e9218df"]
 ].map(([id,name,specialisation,experience,rating,img])=>({id,name,specialisation,experience,rating,image:`https://images.unsplash.com/${img}?w=300&h=300&fit=crop&crop=faces`}))
};

// Load admin-managed services and offers saved in this browser.
try {
 const savedServices = JSON.parse(localStorage.getItem("bookeaseManagedServices") || "[]");
 if (Array.isArray(savedServices)) {
  savedServices.forEach(item => {
   const index = BookEaseData.services.findIndex(service => service.id === item.id);
   if (index >= 0) BookEaseData.services[index] = item;
   else BookEaseData.services.push(item);
  });
 }
} catch (error) { console.warn("Could not load managed services", error); }
try {
 BookEaseData.offers = JSON.parse(localStorage.getItem("bookeaseOffers") || "[]");
} catch (error) { BookEaseData.offers = []; }

// Load admin-managed professionals and business availability without replacing legacy data.
try {
 const savedProfessionals = JSON.parse(localStorage.getItem("bookeaseProfessionals") || "null");
 if (Array.isArray(savedProfessionals)) BookEaseData.professionals = savedProfessionals;
} catch (error) { console.warn("Could not load managed professionals", error); }
try {
 BookEaseData.availability = JSON.parse(localStorage.getItem("bookeaseAvailability") || "null") || { openingTime:"09:00", closingTime:"18:00", workingDays:[1,2,3,4,5,6], interval:30 };
} catch (error) { BookEaseData.availability = { openingTime:"09:00", closingTime:"18:00", workingDays:[1,2,3,4,5,6], interval:30 }; }
// Make the sample data available to page scripts.
window.BookEaseData = BookEaseData;
