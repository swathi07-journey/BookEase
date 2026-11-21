# BookEase — Appointment Booking & Business Management Website

Stage 2 includes the Stage 1 homepage plus a fully interactive Services catalogue.

## Run in VS Code
1. Extract this ZIP.
2. Open the `bookease` folder in VS Code.
3. Install the Live Server extension.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Select **Services** in the header, or open `services.html` directly.

## Features
- 18 fictional sample services and 8 fictional professionals in `js/data.js`
- Search by service name, category or provider
- Six category filters
- Minimum and maximum price sliders
- Duration and minimum-rating filters
- Sort by recommended, price low-to-high, price high-to-low and highest rated
- Clear all filters and helpful no-results state
- Responsive cards, filter panel and mobile layout
- Details and Book Now links carry the selected service ID for upcoming stages

## Demo limitations
Service Details and Booking pages are planned for later stages. Their links are placeholders until those stages are built. No real appointments or payments are processed. Sample images load from Unsplash and require internet access.

## Files
- `index.html` — Stage 1 homepage
- `services.html` — Stage 2 service catalogue
- `css/style.css`, `css/responsive.css`, `css/services.css`
- `js/data.js`, `js/main.js`, `js/services.js`


## Stage 3 – Service Details Page
- Open `services.html` and select **Details** on any service card.
- `service-details.html?id=s1` loads the selected service using its URL ID.
- Shows service description, sample price, duration, rating, matching sample professional, illustrative reviews and a booking link.
- Missing or invalid service IDs show a friendly error state.
- Uses the existing BookEase colours and shared header/footer styles.
- This remains a frontend portfolio demo; no real bookings or payments are processed.

## Stage 4 – Booking Page\n
- Open `booking.html` by selecting **Book this service** on a Service Details page.
- The selected service is loaded from the URL query parameter.
- The form validates name, email, 10-digit phone number, date, time and demo consent.
- A successful demo booking is saved in browser LocalStorage under `bookeaseBookings`.
- No real appointment, business notification or payment is made.
## Stage 5 – My Appointments\n\n- Open `appointments.html` to view bookings saved from Stage 4.\n- Filter by All, Upcoming, Past and Cancelled.\n- Cancel an upcoming demo booking; its status is updated in LocalStorage.\n- Uses the existing `bookeaseBookings` LocalStorage key.\n- These are local portfolio-demo records only, not real appointments.\n

## Stage 6 – Customer Account

- `account.html` includes Login and Create Account forms with basic client-side validation.
- A successful registration creates a demo account and opens `profile.html`.
- Login checks the demo account stored in this browser.
- `profile.html` displays the saved name, email and phone number.
- Edit Profile updates the customer details; Log out clears the demo session.
- Account data uses `bookeaseAccount`; the current demo session uses `bookeaseCurrentUser`.
- This is frontend-only demonstration authentication. Passwords are stored locally for demo purposes only; do not enter a real or reused password.
- Existing Stage 1–5 pages and the `bookeaseBookings` appointment storage key are preserved.


## Stage 7 – Business Dashboard

- Open `dashboard.html` to view the fictional Bright Studio business overview.
- Summary cards show total, upcoming and past appointments plus the value of active demo bookings.
- Booking activity chart shows the last seven days based on locally saved demo bookings.
- Popular services are ranked using the saved booking records.
- Recent appointments display customer, service, date/time, reference and status.
- The dashboard reads the existing `bookeaseBookings` LocalStorage key and refreshes when browser storage changes.
- All figures are demonstration data from this browser only. No real business, customers, payments or revenue are connected.
- Stage 8 will add the separate management screens.


## Stage 8 – Business Management
- Admin demo login: username `admin123`, password `1234` (use the Login tab on account.html).
- Successful admin login opens dashboard.html.
- Dashboard Manage button opens dashboard-manage.html.
- Manage Services: add, edit, hide/show and remove services.
- Manage Appointments: confirm or cancel demo bookings.
- Manage Offers: publish date-based percentage discounts shown on the customer service catalog.
- Data is stored in this browser using LocalStorage. This is a frontend portfolio demo, not production authentication or a real payment/revenue system.


## Final integrated release – Stages 9–13
- Professionals: add, edit, activate/deactivate and remove demo professionals in the Manage > Professionals tab. Stored in `bookeaseProfessionals`.
- Availability: configure opening/closing times, weekly working days and 15/30/45/60-minute intervals in Manage > Availability. Stored in `bookeaseAvailability`; the customer booking form generates slots from these settings.
- Services: service records remain in `bookeaseManagedServices`; add/edit/hide/remove operations update the customer catalogue. Removed services are hidden rather than destroying historical references.
- Offers: create, activate/deactivate and remove dated percentage offers; choose all services or one service. Expired offers are marked inactive. Stored in `bookeaseOffers`.
- Appointments: admin can confirm, complete or cancel saved demo bookings while preserving the `bookeaseBookings` key and booking references.
- Dashboard: includes cancelled booking and active professional indicators.
- All features use browser LocalStorage and fictional portfolio data. Admin login, bookings, offers and revenue are not production-secure or connected to real services/payments.

## Run
Extract the ZIP, open the `bookease` folder in VS Code and launch `index.html` with Live Server. For admin, use the demo credentials listed in the Stage 8 section of this README.
