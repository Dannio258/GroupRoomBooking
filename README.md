# Group Room Booking

A responsive frontend room booking system created for **NTI Gymnasiet Södertörn**.

The website allows students to browse available group rooms, create reservations, and manage their existing bookings through a simple and responsive interface.

## Features

* Browse available group rooms
* View room images, features, and capacity
* Automatic room image sliders
* Create new room bookings
* Dynamic room capacity validation
* Date and time validation
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

The landing page for the application with an introduction to the room booking system.

### Rooms

`rooms.html`

Displays the available rooms together with their:

* Images
* Features
* Capacity
* Booking links

The room images automatically cycle through a JavaScript-powered slider.

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

### Contact

`contact.html`

Contains contact information and additional information related to the booking system.

## Booking Validation

The application performs client-side validation before a booking can be saved.

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
* Can be made up to one year in advance

### Time Validation

The booking end time must be later than the start time.

## LocalStorage

The application is currently frontend-only and uses the browser's `localStorage`.

It stores:

* Room bookings
* Light/dark theme preference

This means bookings remain available after refreshing or reopening the website in the same browser.

Because there is currently no backend or database, bookings are not synchronized between different browsers or devices.

## Light and Dark Mode

The navigation bar includes a light/dark mode toggle.

The selected theme is stored in `localStorage`, so the website remembers the user's preference between visits.

## Responsive Design

The interface is built using Tailwind CSS responsive utilities and adapts to different screen sizes.

This includes:

* Responsive navigation
* Responsive forms
* Responsive room cards
* Mobile-friendly booking display
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
* Date and time validation
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

You can use the **Live Server** extension and open `index.html` with:

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

## Possible Future Improvements

* Backend API
* Database integration
* Student authentication
* Real-time room availability
* Booking conflict detection
* Admin dashboard
* Booking confirmation emails
* Automatic room selection when clicking **Book Room**
* Multilingual support

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
* Git
* GitHub
* Branches and pull requests
* Collaborative development

---

**Group Room Booking — NTI Gymnasiet Södertörn**
