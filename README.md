# Group Room Booking

A responsive frontend room booking system created for **NTI Gymnasiet Södertörn**.

The website allows students to browse available group rooms, create reservations, and manage their existing bookings through a simple and responsive interface.

## Features

* Browse available group rooms
* View room images, features, and capacity
* Automatic room image sliders
* Create new room bookings
* Automatic room selection from the Rooms page
* Dynamic room capacity validation
* Date and time validation
* Weekend booking restrictions
* 10-minute booking intervals
* Prevention of expired time selections for same-day bookings
* Booking conflict detection
* Custom booking purpose option
* View saved bookings
* Edit existing bookings
* Delete bookings
* Responsive design for desktop and mobile
* Light and dark mode
* Persistent theme preference
* Active navigation highlighting
* Browser-based booking storage

## Technologies

* **HTML5**
* **Tailwind CSS 4**
* **JavaScript**
* **LocalStorage**
* **Git & GitHub**

Tailwind CSS is loaded through the browser CDN, so the project does not require a build process or package installation.

## Pages

### Home

`index.html`

The landing page for the application with an introduction to the group room booking system.

### Rooms

`rooms.html`

Displays the available rooms together with their:

* Images
* Features
* Capacity
* Booking links

Room images automatically cycle through a JavaScript-powered slider.

Clicking **Book Room** opens the booking form with the selected room already chosen.

### Book a Room

`book.html`

Contains the booking form where users can enter:

* Name
* Email
* Number of people
* Purpose
* Room
* Date
* Start time
* End time

Available purposes include:

* Study
* Meeting
* Game
* Other

Selecting **Other** displays an additional field where the user can enter a custom purpose.

The booking form also validates room capacity, booking dates, available times, and booking conflicts before a reservation can be saved.

### My Bookings

`bookings.html`

Displays bookings saved in the browser.

Each booking contains:

* Booking ID
* Name
* Email
* Number of people
* Purpose
* Room
* Date
* Start time
* End time

Existing bookings can be edited or deleted directly from the page.

Editing a booking uses the same validation rules as creating a new booking.

### Contact

`contact.html`

Contains contact information for **NTI Gymnasiet Södertörn**, opening hours, and frequently asked questions.

## Booking Validation

The application performs client-side validation before a booking can be saved or updated.

### Room Capacity

The maximum number of people is determined dynamically from the selected room.

Current room capacities:

| Room   | Capacity |
| ------ | -------: |
| Room 1 | 8 people |
| Room 2 | 6 people |
| Room 3 | 6 people |

The application prevents bookings that exceed the selected room's capacity.

### Date Validation

Bookings:

* Cannot be made for dates in the past
* Cannot be made on Saturdays or Sundays
* Can be made up to one year in advance

### Time Validation

Rooms can be booked between **08:00 and 16:00**.

Available booking times use **10-minute intervals**.

The application ensures that:

* The end time is later than the start time
* Expired times cannot be selected for bookings made today
* The selected start time is checked again when the booking is submitted
* Future dates receive the full available time range

### Booking Conflict Detection

The application prevents overlapping bookings for the same room, date, and time.

For example:

```text
Existing booking: 10:00 - 11:00
New booking:      10:30 - 11:30
Result:           Conflict
```

Back-to-back bookings are allowed:

```text
Existing booking: 10:00 - 11:00
New booking:      11:00 - 12:00
Result:           Allowed
```

Conflict detection is also applied when editing an existing booking.

## Automatic Room Selection

Each room on `rooms.html` links to the booking page using a URL parameter.

Example:

```text
book.html?room=room2
```

The booking page reads the room parameter and automatically selects the correct room in the form.

The user can still change the selected room manually.

## LocalStorage

The application is currently frontend-only and uses the browser's `localStorage`.

It stores:

* Room bookings
* Light/dark theme preference

This means bookings remain available after refreshing or reopening the website in the same browser.

Because there is currently no backend or database, bookings are not synchronized between different browsers, devices, or users.

Booking conflict detection therefore only checks bookings stored in the current browser.

## Light and Dark Mode

The navigation bar includes a light/dark mode toggle.

The selected theme is stored in `localStorage`, so the website remembers the user's preference between visits.

## Responsive Design

The interface is built using Tailwind CSS responsive utilities and adapts to different screen sizes.

This includes:

* Responsive navigation
* Responsive forms
* Responsive room cards
* Responsive booking table
* Mobile-friendly booking display
* Inline booking editing
* Light and dark responsive styling

## Project Structure

```text
GroupRoomBooking/
│
├── images/
│   ├── Room1/
│   ├── Room2/
│   ├── Room3/
│   └── ntig.svg
│
├── index.html
├── rooms.html
├── book.html
├── bookings.html
├── contact.html
├── script.js
└── README.md
```

## JavaScript Functionality

Most shared application logic is located in `script.js`.

It handles:

* Booking form validation
* Room capacity validation
* Date validation
* Weekend validation
* Time validation
* 10-minute time generation
* Same-day expired-time restrictions
* Booking conflict detection
* Automatic room preselection
* Saving bookings
* Displaying bookings
* Editing bookings
* Deleting bookings
* Theme switching
* Theme persistence
* Active navigation states
* Room image sliders

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/Dannio258/GroupRoomBooking.git
```

Enter the project directory:

```bash
cd GroupRoomBooking
```

No dependencies need to be installed.

Because some functionality loads information from other HTML files using JavaScript, the project should be opened through a local web server rather than directly through the filesystem.

### VS Code

You can use the **Live Server** extension.

Open `index.html` and choose:

```text
Open with Live Server
```

## Current Limitations

The project currently does not include:

* A backend
* A database
* User authentication
* Shared bookings between users
* Cross-device synchronization
* Server-side validation
* Centralized room availability

Because the application uses `localStorage`, booking data exists only in the browser where it was created.

## Possible Future Improvements

* Backend API
* Database integration
* Student authentication
* Shared room availability
* Admin dashboard
* Booking confirmation emails
* Server-side validation
* Multilingual support
* Booking history
* Search and filtering for bookings

## About

This project was created as a group web development project.

The project focuses on practical experience with:

* HTML
* Responsive web design
* Tailwind CSS
* JavaScript
* DOM manipulation
* Form validation
* LocalStorage
* URL parameters
* Client-side booking conflict detection
* Git
* GitHub
* Branches
* Pull requests
* Collaborative development

---

**Group Room Booking — NTI Gymnasiet Södertörn**
