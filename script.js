document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const bookingsTable = document.querySelector("#bookingsTable");

  // Booking form features
  if (bookingForm) {
    const purposeSelect = document.getElementById("purpose");
    const otherPurposeInput = document.getElementById("otherPurpose");
    const roomSelect = document.getElementById("room");
    const numberOfPeopleInput = document.getElementById("number_of_people");
    const capacityCounter = document.getElementById("capacityCounter");
    const dateInput = document.getElementById("date");
    const startTimeInput = document.getElementById("time");
    const endTimeInput = document.getElementById("end_time");
    const maxBookingYears = 1;

    // Date range: allow bookings from today through one year ahead.
    const getToday = () => {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      return `${today.getFullYear()}-${month}-${day}`;
    };

    const getMaximumBookingDate = () => {
      const maximumDate = new Date();
      maximumDate.setFullYear(maximumDate.getFullYear() + maxBookingYears);
      const month = String(maximumDate.getMonth() + 1).padStart(2, "0");
      const day = String(maximumDate.getDate()).padStart(2, "0");

      return `${maximumDate.getFullYear()}-${month}-${day}`;
    };

    // Room capacity: read the current capacity directly from the rooms page.
    const getRoomCapacity = async (roomId) => {
      const response = await fetch("rooms.html");
      const roomsPage = await response.text();
      const roomsDocument = new DOMParser().parseFromString(
        roomsPage,
        "text/html",
      );
      const room = roomsDocument.querySelector(`[data-room-id="${roomId}"]`);
      const capacityText = [...(room?.querySelectorAll("p") || [])].find(
        (paragraph) => paragraph.textContent.includes("Capacity:"),
      )?.textContent;
      const capacity = capacityText?.match(/Capacity:\s*(\d+)/i)?.[1];

      return capacity ? Number(capacity) : null;
    };

    // People counter and capacity validation.
    const updatePeopleLimit = async () => {
      const numberOfPeople = Number(numberOfPeopleInput.value);
      numberOfPeopleInput.setCustomValidity(
        numberOfPeopleInput.value && numberOfPeople < 1
          ? "Number of people must be greater than 0."
          : "",
      );

      if (!roomSelect.value) {
        numberOfPeopleInput.removeAttribute("max");
        capacityCounter.textContent = `${numberOfPeopleInput.value || 0}/--`;
        return null;
      }

      const capacity = await getRoomCapacity(roomSelect.value);
      numberOfPeopleInput.max = capacity || "";
      capacityCounter.textContent = `${numberOfPeopleInput.value || 0}/${capacity || "--"}`;
      numberOfPeopleInput.setCustomValidity(
        numberOfPeopleInput.value && numberOfPeople < 1
          ? "Number of people must be greater than 0."
          : capacity && numberOfPeople > capacity
            ? `This room can hold a maximum of ${capacity} people.`
            : "",
      );

      return capacity;
    };

    // Date and time validation.
    const validateDateAndTime = () => {
      dateInput.min = getToday();
      dateInput.max = getMaximumBookingDate();
      dateInput.setCustomValidity(
        dateInput.value && dateInput.value < dateInput.min
          ? "The booking date cannot be in the past."
          : dateInput.value && dateInput.value > dateInput.max
            ? `Bookings can only be made up to ${maxBookingYears} year in advance.`
            : "",
      );

      endTimeInput.setCustomValidity(
        startTimeInput.value &&
          endTimeInput.value &&
          endTimeInput.value <= startTimeInput.value
          ? "End time must be after start time."
          : "",
      );
    };

    // Optional custom purpose field.
    purposeSelect.addEventListener("change", () => {
      const isOtherPurpose = purposeSelect.value === "Other";

      otherPurposeInput.classList.toggle("hidden", !isOtherPurpose);
      otherPurposeInput.required = isOtherPurpose;
    });

    roomSelect.addEventListener("change", updatePeopleLimit);
    numberOfPeopleInput.addEventListener("input", updatePeopleLimit);
    dateInput.min = getToday();
    dateInput.max = getMaximumBookingDate();
    dateInput.addEventListener("change", validateDateAndTime);
    startTimeInput.addEventListener("input", validateDateAndTime);
    endTimeInput.addEventListener("input", validateDateAndTime);

    // Save only bookings that pass every validation rule.
    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const capacity = await updatePeopleLimit();
      validateDateAndTime();
      if (!capacity || !bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const formData = new FormData(bookingForm);

      const booking = {
        id: "BK-" + Date.now(), // Date in ms since 1970-01-01.
        name: formData.get("name"),
        email: formData.get("email"),
        numberOfPeople: formData.get("number_of_people"),
        purpose:
          formData.get("purpose") === "Other"
            ? formData.get("otherPurpose")
            : formData.get("purpose"),
        room: formData.get("room"),
        date: formData.get("date"),
        time: formData.get("time"),
        endTime: formData.get("end_time"),
      };

      // Load existing bookings and add the new booking.
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

      bookings.push(booking);

      // Persist bookings in the browser for the bookings page.
      localStorage.setItem("bookings", JSON.stringify(bookings));

      window.location.href = "bookings.html";
    });
  }

  // Display all saved booking details.
  if (bookingsTable) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.forEach((booking) => {
      const row = document.createElement("tr");

      row.className =
        "block sm:table-row mb-5 sm:mb-0 rounded-2xl sm:rounded-none border border-slate-800 sm:border-0 bg-slate-900 transition hover:bg-slate-800/60 overflow-hidden";

      row.innerHTML = `
        <td data-label="Booking ID"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 text-center font-medium text-indigo-400 before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.id}
        </td>

        <td data-label="Name"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 text-center before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.name}
        </td>

        <td data-label="Email"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 text-center text-slate-400 break-all sm:break-normal before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.email}
        </td>

        <td data-label="Number of People"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 text-center before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.numberOfPeople}
        </td>

        <td data-label="Purpose"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-b border-slate-800 sm:border-0 text-center before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.purpose}
        </td>

        <td data-label="Room"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 text-center before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.room}
        </td>

        <td data-label="Date"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-t sm:border-0 border-slate-800 text-center before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.date}
        </td>

        <td data-label="Start Time"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-t sm:border-0 border-slate-800 text-center before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.time}
        </td>

        <td data-label="End Time"
          class="flex sm:table-cell justify-between gap-4 px-4 sm:px-5 py-3 sm:py-5 border-t sm:border-0 border-slate-800 text-center before:content-[attr(data-label)] before:text-slate-400 before:font-semibold sm:before:content-none">
          ${booking.endTime}
        </td>
      `;

      bookingsTable.appendChild(row);
    });
  }
});

// Add inline edit and delete controls to each saved booking.
document.addEventListener("DOMContentLoaded", () => {
  const bookingsTable = document.querySelector("#bookingsTable");
  if (!bookingsTable) return;

  const bookingFields = [
    { key: "id", label: "Booking ID", type: "text", readOnly: true },
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    {
      key: "numberOfPeople",
      label: "Number of People",
      type: "number",
      min: "1",
    },
    { key: "purpose", label: "Purpose", type: "text" },
    { key: "room", label: "Room", type: "text" },
    { key: "date", label: "Date", type: "date" },
    { key: "time", label: "Start Time", type: "time" },
    { key: "endTime", label: "End Time", type: "time" },
  ];

  const saveBookings = (bookings) => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  };

  const setCellValue = (cell, value) => {
    cell.textContent = value ?? "";
  };

  const getToday = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${today.getFullYear()}-${month}-${day}`;
  };

  const getMaximumBookingDate = () => {
    const maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() + 1);
    const month = String(maximumDate.getMonth() + 1).padStart(2, "0");
    const day = String(maximumDate.getDate()).padStart(2, "0");

    return `${maximumDate.getFullYear()}-${month}-${day}`;
  };

  const getRoomCapacity = async (roomId) => {
    const response = await fetch("rooms.html");
    const roomsPage = await response.text();
    const roomsDocument = new DOMParser().parseFromString(
      roomsPage,
      "text/html",
    );
    const room = roomsDocument.querySelector(`[data-room-id="${roomId}"]`);
    const capacityText = [...(room?.querySelectorAll("p") || [])].find(
      (paragraph) => paragraph.textContent.includes("Capacity:"),
    )?.textContent;
    const capacity = capacityText?.match(/Capacity:\s*(\d+)/i)?.[1];

    return capacity ? Number(capacity) : null;
  };

  const showBooking = (row, booking) => {
    bookingFields.forEach(({ key }, index) => {
      setCellValue(row.cells[index], booking[key]);
    });
  };

  const startEditing = (row, booking, actionsCell) => {
    bookingFields.forEach(({ key, label, type, min, readOnly }, index) => {
      const cell = row.cells[index];

      if (readOnly) {
        setCellValue(cell, booking[key]);
        return;
      }

      cell.textContent = "";

      const input = document.createElement("input");
      input.type = type;
      input.value = booking[key] ?? "";
      input.dataset.field = key;
      input.setAttribute("aria-label", label);
      input.className =
        "w-full min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-2 py-2 text-center text-slate-200";
      if (min) input.min = min;
      if (readOnly) input.readOnly = true;
      if (!readOnly) input.required = true;
      if (key === "date") {
        input.min = getToday();
        input.max = getMaximumBookingDate();
      }
      cell.appendChild(input);
    });

    actionsCell.innerHTML = `
      <div class="flex flex-wrap justify-center gap-3">
        <button type="button" data-action="save"
          class="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-500">
          Save
        </button>
        <button type="button" data-action="cancel"
          class="rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-600">
          Cancel
        </button>
      </div>
    `;

    actionsCell
      .querySelector('[data-action="save"]')
      .addEventListener("click", async () => {
        const updatedBooking = { ...booking };
        const inputsByKey = {};

        bookingFields.forEach(({ key }) => {
          const input = row.querySelector(`input[data-field="${key}"]`);
          if (input) {
            inputsByKey[key] = input;
            updatedBooking[key] = input.value;
          }
        });

        const inputs = Object.values(inputsByKey);
        const numberOfPeopleInput = inputsByKey.numberOfPeople;
        const roomInput = inputsByKey.room;
        const dateInput = inputsByKey.date;
        const startTimeInput = inputsByKey.time;
        const endTimeInput = inputsByKey.endTime;
        const capacity = await getRoomCapacity(roomInput.value.trim());

        numberOfPeopleInput.max = capacity || "";
        numberOfPeopleInput.setCustomValidity(
          capacity && Number(numberOfPeopleInput.value) > capacity
            ? `This room can hold a maximum of ${capacity} people.`
            : capacity
              ? ""
              : "Please enter a valid room.",
        );
        dateInput.setCustomValidity(
          dateInput.value < dateInput.min
            ? "The booking date cannot be in the past."
            : dateInput.value > dateInput.max
              ? "Bookings can only be made up to 1 year in advance."
              : "",
        );
        endTimeInput.setCustomValidity(
          startTimeInput.value &&
            endTimeInput.value &&
            endTimeInput.value <= startTimeInput.value
            ? "End time must be after start time."
            : "",
        );

        if (!capacity || inputs.some((input) => !input.checkValidity())) {
          inputs.find((input) => !input.checkValidity())?.reportValidity();
          return;
        }

        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const bookingIndex = bookings.findIndex(
          (savedBooking) => savedBooking.id === booking.id,
        );
        if (bookingIndex !== -1) {
          bookings[bookingIndex] = updatedBooking;
          saveBookings(bookings);
        }

        showBooking(row, updatedBooking);
        actionsCell.innerHTML = "";
        addActions(row, updatedBooking, actionsCell);
      });

    actionsCell
      .querySelector('[data-action="cancel"]')
      .addEventListener("click", () => {
        showBooking(row, booking);
        actionsCell.innerHTML = "";
        addActions(row, booking, actionsCell);
      });
  };

  const addActions = (row, booking, actionsCell) => {
    actionsCell.innerHTML = `
      <div class="flex flex-wrap justify-center gap-3">
        <button type="button" data-action="edit"
          class="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
          Edit
        </button>
        <button type="button" data-action="delete"
          class="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-500">
          Delete
        </button>
      </div>
    `;

    actionsCell
      .querySelector('[data-action="edit"]')
      .addEventListener("click", () => {
        startEditing(row, booking, actionsCell);
      });

    actionsCell
      .querySelector('[data-action="delete"]')
      .addEventListener("click", () => {
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        saveBookings(
          bookings.filter((savedBooking) => savedBooking.id !== booking.id),
        );
        row.remove();
      });
  };

  const headerRow = bookingsTable.querySelector("thead tr");
  if (headerRow) {
    const actionsHeader = document.createElement("th");
    actionsHeader.scope = "col";
    actionsHeader.className = "px-5 py-4 font-semibold";
    actionsHeader.textContent = "Actions";
    headerRow.appendChild(actionsHeader);
  }

  [...bookingsTable.rows].forEach((row) => {
    const booking = JSON.parse(localStorage.getItem("bookings"))?.find(
      (savedBooking) => savedBooking.id === row.cells[0]?.textContent.trim(),
    );
    if (!booking) return;

    const actionsCell = document.createElement("td");
    actionsCell.dataset.label = "Actions";
    actionsCell.className =
      "flex sm:table-cell justify-center gap-2 px-4 sm:px-5 py-3 sm:py-5 text-center";
    row.appendChild(actionsCell);
    addActions(row, booking, actionsCell);
  });
});
