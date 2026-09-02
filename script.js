document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const bookingsTable = document.querySelector("#bookingsTable");
  /////// Book a room /////////////////////////////////////////////////////////////////////////////////////////
  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(bookingForm);

      const booking = {
        id: "BK-" + Date.now(),
        name: formData.get("name"),
        email: formData.get("email"),
        numberOfPeople: formData.get("number_of_people"),
        purpose: formData.get("purpose"),
        room: formData.get("room"),
        date: formData.get("date"),
        time: formData.get("time"),
        endTime: formData.get("end_time"),
      };

      const bookings = JSON.parse(localStorage.getItem("bookings")) || []; // get bookings

      bookings.push(booking); // add new booking

      localStorage.setItem("bookings", JSON.stringify(bookings)); // save bookings

      window.location.href = "bookings.html"; // load my bookings page
    });
  }

  /////// Display bookings ///////////////////////////////////////////////////////////////////////////////////////
  if (bookingsTable) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.forEach((booking) => {
      const row = document.createElement("tr");

      row.className =
        "block sm:table-row mb-5 sm:mb-0 rounded-2xl sm:rounded-none border border-slate-800 sm:border-0 bg-slate-900 transition hover:bg-slate-800/60 overflow-hidden";

      row.innerHTML = `
        <td data-label="Booking ID"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 font-medium text-indigo-400 before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.id}
        </td>

        <td data-label="Name"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.name}
        </td>

        <td data-label="Email"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 text-slate-400 break-all sm:break-normal before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.email}
        </td>

        <td data-label="Number of People"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.numberOfPeople}
        </td>

        <td data-label="Purpose"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.purpose}
        </td>

        <td data-label="Room"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.room}
        </td>
      `;

      bookingsTable.appendChild(row);
    });
  }
});
