/* =========================================================
   CLASS MONITORING SYSTEM
   FRONTEND SCRIPT
   Compatible with CMS CENTRAL REGISTRY BACKEND v3.1
========================================================= */

/* =========================================================
   CONFIG
========================================================= */

const API_URL =
"https://script.google.com/macros/s/AKfycbylPe3SEDCVvPNJ-cT9YfaPQwGcUBuQ8SHw6HdprDRKj46KoIdH56DtdKE-Ak5GdwKOLA/exec";


/* =========================================================
   HELPERS
========================================================= */

const qid = id => document.getElementById(id);

const qs = selector => document.querySelector(selector);


function populateSelect(id, list) {

  const sel = qid(id);

  if (!sel) return;

  sel.innerHTML = `<option value="">Select</option>`;

  [...new Set(list || [])]
    .filter(v => v !== null && v !== undefined && String(v).trim() !== "")
    .sort((a, b) =>
      String(a).localeCompare(String(b))
    )
    .forEach(v => {

      sel.add(
        new Option(String(v), String(v))
      );

    });

}


function formatDateISO(value) {

  if (!value) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const d = new Date(value);

  if (isNaN(d.getTime())) {
    return String(value);
  }

  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0")
  ].join("-");

}


/* =========================================================
   SAFE JSON REQUEST
========================================================= */

async function apiGet(action, params = {}) {

  const query = new URLSearchParams();

  query.set("action", action);

  Object.keys(params).forEach(key => {

    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      query.set(key, params[key]);
    }

  });

  const response = await fetch(
    `${API_URL}?${query.toString()}`,
    {
      method: "GET",
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Server HTTP error: ${response.status}`);
  }

  return await response.json();

}


async function apiPost(payload) {

  const response = await fetch(
    API_URL,
    {
      method: "POST",
      body: new URLSearchParams(payload)
    }
  );

  if (!response.ok) {
    throw new Error(`Server HTTP error: ${response.status}`);
  }

  return await response.json();

}


/* =========================================================
   EMAIL LOGIN
   No Google Sign-In
========================================================= */

async function ensureUserEmail() {

  let email =
    localStorage.getItem("loggedEmail") ||
    localStorage.getItem("cms_user_email");

  if (!email) {

    email = prompt(
      "Enter your official DIU email:"
    );

    if (!email) {
      throw new Error("Email required");
    }

    email =
      email
        .trim()
        .toLowerCase();

    localStorage.setItem(
      "loggedEmail",
      email
    );

  }

  email =
    String(email)
      .trim()
      .toLowerCase();

  localStorage.setItem(
    "loggedEmail",
    email
  );

  localStorage.setItem(
    "cms_user_email",
    email
  );

  window.LOGGED_EMAIL = email;

  return email;

}


/* =========================================================
   PERMISSION CHECK
========================================================= */

async function checkMissedPermission() {

  try {

    if (!window.LOGGED_EMAIL) {
      await ensureUserEmail();
    }

    const data =
      await apiGet(
        "check_missed_permission",
        {
          email: window.LOGGED_EMAIL
        }
      );

    if (!data.authorized) {

      const btn =
        qid("missedSubmitBtn");

      if (btn) {
        btn.disabled = true;
      }

      console.warn(
        "User is not authorized for Missed Entry."
      );

      return false;

    }

    const btn =
      qid("missedSubmitBtn");

    if (btn) {
      btn.disabled = false;
    }

    return true;

  }

  catch (err) {

    console.error(
      "Permission check failed:",
      err
    );

    /*
      Do not block the entire application
      if the permission request itself fails.
    */

    return false;

  }

}


/* =========================================================
   BOOT
========================================================= */

window.addEventListener(
  "DOMContentLoaded",
  async () => {

    try {

      /*
       * Local email login.
       * No Google authentication.
       */

      await ensureUserEmail();

      await checkMissedPermission();

      const loginScreen =
        qid("loginScreen");

      if (loginScreen) {
        loginScreen.style.display = "none";
      }

      const appRoot =
        qid("appRoot");

      if (appRoot) {
        appRoot.style.display = "block";
      }


      /*
       * Bind all application functions.
       */

      bindForms();

      bindRoleButtons();

      bindControlButtons();

      bindSearchEvents();


      /*
       * Load initial data.
       */

      await Promise.allSettled([
        loadDashboard(),
        refreshRoutineDropdowns(),
        loadPendingMakeup()
      ]);


      /*
       * Start home state.
       */

      showInitialHome();


    }

    catch (err) {

      console.error(
        "CMS boot error:",
        err
      );

      /*
       * If there is a problem with login,
       * allow the user to retry email entry.
       */

      const appRoot =
        qid("appRoot");

      if (appRoot) {
        appRoot.style.display = "none";
      }

      alert(
        "System could not start.\n\n" +
        (err.message || "Please refresh and try again.")
      );

    }

  }
);


/* =========================================================
   ROLE BASED UI
========================================================= */

function bindRoleButtons() {

  const roleOffice =
    qid("roleOffice");

  const roleFaculty =
    qid("roleFaculty");

  const btnBackRole =
    qid("btnBackRole");


  if (roleOffice) {

    roleOffice.onclick =
      () => {

        openOfficePanel();

      };

  }


  if (roleFaculty) {

    roleFaculty.onclick =
      () => {

        openFacultyPanel();

      };

  }


  if (btnBackRole) {

    btnBackRole.onclick =
      () => {

        backToRoleSelection();

      };

  }

}


/* =========================================================
   OFFICE PANEL
========================================================= */

function openOfficePanel() {

  const roleSelect =
    qid("roleSelect");

  const controlPanel =
    qid("controlPanel");

  if (roleSelect) {
    roleSelect.classList.add("hidden");
  }

  if (controlPanel) {
    controlPanel.classList.remove("hidden");
  }

  document.body.classList.remove("faculty-page");
  document.body.classList.add("office-page");

  hideAllSections();

  showButtons([
    "btn-missed",
    "btnBackRole"
  ]);

  showDashboard();

}


/* =========================================================
   FACULTY PANEL
========================================================= */

function openFacultyPanel() {

  const roleSelect =
    qid("roleSelect");

  const controlPanel =
    qid("controlPanel");

  if (roleSelect) {
    roleSelect.classList.add("hidden");
  }

  if (controlPanel) {
    controlPanel.classList.remove("hidden");
  }

  document.body.classList.remove("office-page");
  document.body.classList.add("faculty-page");

  hideAllSections();

  showButtons([
    "btn-makeup",
    "btn_pending",
    "btn_empty",
    "btnBackRole"
  ]);

  showDashboard();

}


/* =========================================================
   BACK TO ROLE SELECTION
========================================================= */

function backToRoleSelection() {

  const controlPanel =
    qid("controlPanel");

  const roleSelect =
    qid("roleSelect");

  if (controlPanel) {
    controlPanel.classList.add("hidden");
  }

  if (roleSelect) {
    roleSelect.classList.remove("hidden");
  }

  document.body.classList.remove(
    "office-page",
    "faculty-page"
  );

  hideAllSections();

}


/* =========================================================
   INITIAL HOME
========================================================= */

function showInitialHome() {

  const controlPanel =
    qid("controlPanel");

  const roleSelect =
    qid("roleSelect");

  if (controlPanel) {
    controlPanel.classList.add("hidden");
  }

  if (roleSelect) {
    roleSelect.classList.remove("hidden");
  }

  hideAllSections();

}


/* =========================================================
   BUTTON CONTROL
========================================================= */

function showButtons(list) {

  const ids = [
    "btn-missed",
    "btn-makeup",
    "btn_pending",
    "btn_empty",
    "btnBackRole"
  ];

  ids.forEach(id => {

    const button =
      qid(id);

    if (!button) return;

    button.style.display =
      list.includes(id)
        ? "inline-block"
        : "none";

  });

}


/* =========================================================
   CONTROL BUTTON EVENTS
========================================================= */

function bindControlButtons() {

  const btnMissed =
    qid("btn-missed");

  const btnMakeup =
    qid("btn-makeup");

  const btnPending =
    qid("btn_pending");

  const btnEmpty =
    qid("btn_empty");


  if (btnMissed) {

    btnMissed.onclick =
      () => {

        showForm("missedForm");

      };

  }


  if (btnMakeup) {

    btnMakeup.onclick =
      () => {

        showForm("makeupForm");

      };

  }


  if (btnPending) {

    btnPending.onclick =
      () => {

        showForm("pendingSection");

        loadPendingMakeup();

      };

  }


  if (btnEmpty) {

    btnEmpty.onclick =
      () => {

        showForm("emptyRoomSection");

        loadEmptyRooms();

      };

  }

}


/* =========================================================
   SHOW ONE FORM / SECTION
========================================================= */

function showForm(id) {

  const target =
    qid(id);

  if (!target) return;

  hideAllSections();

  target.classList.remove("hidden");

  /*
   * Keep dashboard hidden when
   * opening an actual working section.
   */

  const dashboard =
    document.querySelector(".dashboard");

  if (dashboard) {
    dashboard.style.display = "none";
  }

}


/* =========================================================
   HIDE ALL SECTIONS
========================================================= */

function hideAllSections() {

  const dashboard =
    document.querySelector(".dashboard");

  if (dashboard) {
    dashboard.style.display = "none";
  }

  [
    "missedForm",
    "makeupForm",
    "pendingSection",
    "emptyRoomSection"
  ]
  .forEach(id => {

    const el =
      qid(id);

    if (el) {
      el.classList.add("hidden");
    }

  });

}


/* =========================================================
   SHOW DASHBOARD
========================================================= */

function showDashboard() {

  hideAllSections();

  const dashboard =
    document.querySelector(".dashboard");

  if (dashboard) {
    dashboard.style.display = "grid";
  }

}


/* =========================================================
   DASHBOARD
   Compatible with backend v3.1:
   data.data.totalMissed
   data.data.completed
   data.data.pending
========================================================= */

async function loadDashboard() {

  try {

    const response =
      await apiGet("get_dashboard");

    if (
      !response ||
      response.status !== "success"
    ) {
      return;
    }

    const data =
      response.data || {};


    const totalMissed =
      qid("totalMissed");

    const completed =
      qid("completed");

    const pending =
      qid("pending");

    const extra =
      qid("extraCount");


    if (totalMissed) {
      totalMissed.textContent =
        data.totalMissed || 0;
    }

    if (completed) {
      completed.textContent =
        data.completed || 0;
    }

    if (pending) {
      pending.textContent =
        data.pending || 0;
    }

    /*
     * Current backend v3.1 does not return
     * a separate "extra" dashboard value.
     */

    if (extra) {
      extra.textContent =
        data.extra || 0;
    }

  }

  catch (err) {

    console.error(
      "Dashboard error:",
      err
    );

  }

}


/* =========================================================
   ROUTINE MASTER
========================================================= */

async function refreshRoutineDropdowns() {

  try {

    const response =
      await apiGet(
        "get_routine_master"
      );

    if (
      !response ||
      response.status !== "success"
    ) {
      console.warn(
        "Routine master error:",
        response?.message
      );

      return;
    }


    populateSelect(
      "m_time",
      response.times
    );

    populateSelect(
      "m_room",
      response.rooms
    );

    populateSelect(
      "m_course",
      response.courses
    );

    populateSelect(
      "m_teacher",
      response.teachers
    );


    populateSelect(
      "k_time",
      response.times
    );

    populateSelect(
      "k_room",
      response.rooms
    );

    populateSelect(
      "k_course",
      response.courses
    );

    populateSelect(
      "k_teacher",
      response.teachers
    );

  }

  catch (err) {

    console.error(
      "Routine master error:",
      err
    );

  }

}


/* =========================================================
   FORM BINDING
========================================================= */

function bindForms() {

  const missedForm =
    qid("missedForm");

  const makeupForm =
    qid("makeupForm");


  if (missedForm) {

    missedForm.addEventListener(
      "submit",
      submitMissed
    );

  }


  if (makeupForm) {

    makeupForm.addEventListener(
      "submit",
      submitMakeup
    );

  }

}


/* =========================================================
   SAVE MISSED CLASS
========================================================= */

async function submitMissed(e) {

  e.preventDefault();


  const button =
    qid("missedSubmitBtn");

  if (button) {

    button.disabled = true;

    button.textContent =
      "Saving...";

  }


  try {

    if (!window.LOGGED_EMAIL) {
      await ensureUserEmail();
    }


    const payload = {

      action: "save_missed",

      email:
        window.LOGGED_EMAIL,

      date:
        formatDateISO(
          qid("m_date")?.value
        ),

      department:
        qid("m_dept")?.value || "",

      course:
        qid("m_course")?.value || "",

      room:
        qid("m_room")?.value || "",

      timeSlot:
        qid("m_time")?.value || "",

      teacherInitial:
        qid("m_teacher")?.value || "",

      reason:
        qid("m_reason")?.value || ""

    };


    if (!payload.date) {

      alert(
        "Please select the missed class date."
      );

      return;

    }


    if (!payload.department) {

      alert(
        "Please select the department."
      );

      return;

    }


    if (!payload.course) {

      alert(
        "Please select the course."
      );

      return;

    }


    if (!payload.room) {

      alert(
        "Please select the room."
      );

      return;

    }


    if (!payload.timeSlot) {

      alert(
        "Please select the time slot."
      );

      return;

    }


    if (!payload.teacherInitial) {

      alert(
        "Please select the teacher."
      );

      return;

    }


    const response =
      await apiPost(payload);


    if (
      response.status === "success"
    ) {

      if (response.isDuplicate) {

        alert(
          "This missed class is already registered."
        );

      } else {

        alert(
          response.message ||
          "Missed class saved successfully."
        );

      }


      e.target.reset();

      await loadDashboard();

      return;

    }


    alert(
      response.message ||
      "Failed to save missed class."
    );

  }

  catch (err) {

    console.error(
      "Save missed error:",
      err
    );

    alert(
      "Server error while saving missed class.\n\n" +
      err.message
    );

  }

  finally {

    if (button) {

      button.disabled = false;

      button.textContent =
        "Submit Missed";

    }

  }

}


/* =========================================================
   SAVE MAKEUP CLASS
========================================================= */

async function submitMakeup(e) {

  e.preventDefault();


  const form =
    e.target;

  const button =
    form.querySelector(
      "button[type='submit']"
    );


  if (button) {

    button.disabled = true;

    button.textContent =
      "Saving...";

  }


  try {

    if (!window.LOGGED_EMAIL) {
      await ensureUserEmail();
    }


    const payload = {

      action: "save_makeup",

      email:
        window.LOGGED_EMAIL,

      scheduleDate:
        qid("k_schedule")?.value || "Extra Class",

      department:
        qid("k_dept")?.value || "CSE",

      course:
        qid("k_course")?.value || "",

      teacherInitial:
        qid("k_teacher")?.value || "",

      makeupDate:
        formatDateISO(
          qid("k_date")?.value
        ),

      makeupTime:
        qid("k_time")?.value || "",

      makeupRoom:
        qid("k_room")?.value || "",

      status:
        qid("k_status")?.value || "Pending",

      remarks:
        qid("k_remarks")?.value || "N/A"

    };


    if (!payload.course) {

      alert(
        "Please select the course."
      );

      return;

    }


    if (!payload.teacherInitial) {

      alert(
        "Please select the teacher."
      );

      return;

    }


    if (!payload.makeupDate) {

      alert(
        "Please select the makeup date."
      );

      return;

    }


    if (!payload.makeupTime) {

      alert(
        "Please select the makeup time."
      );

      return;

    }


    if (!payload.makeupRoom) {

      alert(
        "Please select the makeup room."
      );

      return;

    }


    const response =
      await apiPost(payload);


    if (
      response.status === "success"
    ) {

      alert(
        response.message ||
        "Makeup class saved successfully."
      );


      form.reset();


      await Promise.allSettled([
        loadDashboard(),
        loadPendingMakeup()
      ]);


      return;

    }


    alert(
      response.message ||
      "Failed to save makeup class."
    );

  }

  catch (err) {

    console.error(
      "Save makeup error:",
      err
    );

    alert(
      "Server error while saving makeup class.\n\n" +
      err.message
    );

  }

  finally {

    if (button) {

      button.disabled = false;

      button.textContent =
        "Save Makeup Class";

    }

  }

}


/* =========================================================
   PENDING MAKEUP LIST
========================================================= */

async function loadPendingMakeup() {

  try {

    const response =
      await apiGet(
        "get_pending_makeup"
      );


    const tbody =
      qs("#pendingTable tbody");


    if (!tbody) return;


    tbody.innerHTML = "";


    if (
      !response ||
      response.status !== "success"
    ) {

      tbody.innerHTML =
        `<tr>
          <td colspan="9">
            Unable to load pending classes.
          </td>
        </tr>`;

      return;

    }


    const records =
      response.data || [];


    if (!records.length) {

      tbody.innerHTML =
        `<tr>
          <td colspan="9">
            No pending classes.
          </td>
        </tr>`;

      return;

    }


    records.forEach(record => {

      const row =
        Number(record.row);


      const status =
        record.status ||
        "Pending";


      const remarks =
        escapeHtml(
          record.remarks || ""
        );


      tbody.insertAdjacentHTML(
        "beforeend",
        `
        <tr id="row_${row}">

          <td>
            ${escapeHtml(record.scheduleDate || "")}
          </td>

          <td>
            ${escapeHtml(record.department || "")}
          </td>

          <td>
            ${escapeHtml(record.course || "")}
          </td>

          <td>
            ${escapeHtml(record.teacher || "")}
          </td>

          <td>
            ${escapeHtml(record.makeupDate || "")}
          </td>

          <td>
            ${escapeHtml(record.makeupTime || "")}
          </td>

          <td>
            ${escapeHtml(record.makeupRoom || "")}
          </td>

          <td>

            <select
              id="status_${row}"
            >

              <option
                value="Pending"
                ${String(status).toLowerCase() === "pending" ? "selected" : ""}
              >
                Pending
              </option>

              <option
                value="Completed"
                ${String(status).toLowerCase() === "completed" ? "selected" : ""}
              >
                Completed
              </option>

            </select>

          </td>

          <td>

            <input
              id="remarks_${row}"
              value="${remarks}"
            >

            <button
              type="button"
              onclick="updateMakeup(${row})"
            >
              Update
            </button>

          </td>

        </tr>
        `
      );

    });


    filterPendingTable();

  }

  catch (err) {

    console.error(
      "Pending makeup error:",
      err
    );

    const tbody =
      qs("#pendingTable tbody");

    if (tbody) {

      tbody.innerHTML =
        `<tr>
          <td colspan="9">
            Server error while loading pending classes.
          </td>
        </tr>`;

    }

  }

}


/* =========================================================
   UPDATE MAKEUP
========================================================= */

async function updateMakeup(row) {

  const statusElement =
    qid(`status_${row}`);

  const remarksElement =
    qid(`remarks_${row}`);


  if (!statusElement) {

    alert(
      "Status field not found."
    );

    return;

  }


  const status =
    statusElement.value;


  const remarks =
    remarksElement
      ? remarksElement.value
      : "";


  try {

    const response =
      await apiGet(
        "update_makeup",
        {
          row: row,
          status: status,
          remarks: remarks,
          email:
            window.LOGGED_EMAIL || ""
        }
      );


    if (
      response.status === "success"
    ) {

      alert(
        response.message ||
        "Makeup class updated."
      );


      await Promise.allSettled([
        loadPendingMakeup(),
        loadDashboard()
      ]);


    } else {

      alert(
        response.message ||
        "Update failed."
      );

    }

  }

  catch (err) {

    console.error(
      "Update makeup error:",
      err
    );

    alert(
      "Server error while updating makeup class."
    );

  }

}


/* =========================================================
   PENDING SEARCH
========================================================= */

function bindSearchEvents() {

  const search =
    qid("pendingTeacherSearch");

  if (search) {

    search.addEventListener(
      "input",
      filterPendingTable
    );

  }


  const emptySearch =
    qid("emptyRoomSearch");

  if (emptySearch) {

    emptySearch.addEventListener(
      "input",
      searchEmptyRooms
    );

  }


  /*
   * Automatically refresh room suggestions
   * when date/time changes.
   *
   * This does NOT call an unsupported
   * suggestRoom backend action.
   */

  qid("k_date")
    ?.addEventListener(
      "change",
      () => loadEmptyRooms(true)
    );

  qid("k_time")
    ?.addEventListener(
      "change",
      () => loadEmptyRooms(true)
    );

}


function filterPendingTable() {

  const search =
    qid("pendingTeacherSearch");

  const term =
    search
      ? search.value
          .trim()
          .toLowerCase()
      : "";


  document
    .querySelectorAll(
      "#pendingTable tbody tr"
    )
    .forEach(row => {

      const text =
        row.innerText
          .toLowerCase();

      row.style.display =
        text.includes(term)
          ? ""
          : "none";

    });

}


/* =========================================================
   EMPTY ROOMS
========================================================= */

async function loadEmptyRooms(silent = false) {

  try {

    const response =
      await apiGet(
        "get_empty_rooms"
      );


    const tbody =
      qs("#emptyRoomTable tbody");


    if (!tbody) return;


    tbody.innerHTML = "";


    if (
      !response ||
      response.status !== "success"
    ) {

      tbody.innerHTML =
        `<tr>
          <td colspan="4">
            Unable to load empty rooms.
          </td>
        </tr>`;

      return;

    }


    const rooms =
      response.data || [];


    if (!rooms.length) {

      tbody.innerHTML =
        `<tr>
          <td colspan="4">
            No empty rooms found.
          </td>
        </tr>`;

      return;

    }


    rooms.forEach(room => {

      const day =
        room.day || "";

      const time =
        room.time || "";

      const roomName =
        room.room || "";


      tbody.insertAdjacentHTML(
        "beforeend",
        `
        <tr>

          <td>
            ${escapeHtml(day)}
          </td>

          <td>
            ${escapeHtml(time)}
          </td>

          <td>
            ${escapeHtml(roomName)}
          </td>

          <td>

            <button
              type="button"
              onclick='autoFillMakeup(
                ${JSON.stringify(day)},
                ${JSON.stringify(time)},
                ${JSON.stringify(roomName)}
              )'
            >
              Book
            </button>

          </td>

        </tr>
        `
      );

    });


    searchEmptyRooms();


  }

  catch (err) {

    console.error(
      "Empty room error:",
      err
    );


    const tbody =
      qs("#emptyRoomTable tbody");


    if (tbody) {

      tbody.innerHTML =
        `<tr>
          <td colspan="4">
            Server error while loading rooms.
          </td>
        </tr>`;

    }


    if (!silent) {

      alert(
        "Unable to load empty rooms."
      );

    }

  }

}


/* =========================================================
   EMPTY ROOM SEARCH
========================================================= */

function searchEmptyRooms() {

  const input =
    qid("emptyRoomSearch");


  const term =
    input
      ? input.value
          .trim()
          .toLowerCase()
      : "";


  const rows =
    qs("#emptyRoomTable tbody")
      ?.querySelectorAll("tr");


  if (!rows) return;


  rows.forEach(row => {

    row.style.display =
      row.innerText
        .toLowerCase()
        .includes(term)
        ? ""
        : "none";

  });

}


/* =========================================================
   AUTO FILL MAKEUP
========================================================= */

function autoFillMakeup(
  day,
  time,
  room
) {

  const timeSelect =
    qid("k_time");

  const roomSelect =
    qid("k_room");


  if (timeSelect) {

    const option =
      [...timeSelect.options]
        .find(
          option =>
            option.value === String(time)
        );


    if (option) {

      timeSelect.value =
        option.value;

    } else {

      timeSelect.value =
        time;

    }

  }


  if (roomSelect) {

    const option =
      [...roomSelect.options]
        .find(
          option =>
            option.value === String(room)
        );


    if (option) {

      roomSelect.value =
        option.value;

    } else {

      roomSelect.value =
        room;

    }

  }


  /*
   * Open makeup form automatically
   * so the selected room is immediately usable.
   */

  showForm("makeupForm");


  alert(
    `Selected room:\n\n${day} | ${time} | ${room}`
  );

}


/* =========================================================
   OPTIONAL ROOM SUGGESTION
   Uses already-loaded empty room data.
   No backend "suggestRoom" action is required.
========================================================= */

async function suggestRoom() {

  const date =
    qid("k_date")?.value || "";

  const slot =
    qid("k_time")?.value || "";


  if (!slot) {

    alert(
      "Please select a time slot first."
    );

    return;

  }


  try {

    const response =
      await apiGet(
        "get_empty_rooms"
      );


    if (
      !response ||
      response.status !== "success"
    ) {

      alert(
        "Unable to find available rooms."
      );

      return;

    }


    const rooms =
      response.data || [];


    /*
     * Try to match selected time.
     */

    let matches =
      rooms.filter(
        item =>
          String(item.time || "")
            .trim()
            .toLowerCase()
          ===
          String(slot)
            .trim()
            .toLowerCase()
      );


    /*
     * If no time match, show all
     * available rooms.
     */

    if (!matches.length) {
      matches = rooms;
    }


    const roomSelect =
      qid("k_room");


    if (!roomSelect) return;


    roomSelect.innerHTML =
      `<option value="">
        Select Available Room
      </option>`;


    const uniqueRooms =
      [
        ...new Set(
          matches
            .map(item =>
              String(item.room || "").trim()
            )
            .filter(Boolean)
        )
      ];


    uniqueRooms.forEach(room => {

      roomSelect.add(
        new Option(
          room,
          room
        )
      );

    });


    if (!uniqueRooms.length) {

      roomSelect.innerHTML =
        `<option value="">
          No room available
        </option>`;

      return;

    }


    /*
     * If there is exactly one room,
     * select it automatically.
     */

    if (uniqueRooms.length === 1) {

      roomSelect.value =
        uniqueRooms[0];

    }


  }

  catch (err) {

    console.error(
      "Room suggestion error:",
      err
    );

    alert(
      "Unable to suggest a room."
    );

  }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   PWA INSTALL
========================================================= */

let deferredPrompt = null;


window.addEventListener(
  "beforeinstallprompt",
  event => {

    event.preventDefault();

    deferredPrompt =
      event;


    const button =
      qid("installBtn");


    if (!button) return;


    button.style.display =
      "inline-block";


    button.onclick =
      async () => {

        if (!deferredPrompt) {
          return;
        }


        deferredPrompt.prompt();


        try {

          await deferredPrompt.userChoice;

        }

        catch (err) {

          console.warn(
            "Install prompt:",
            err
          );

        }


        deferredPrompt = null;

        button.style.display =
          "none";

      };

  }
);


window.addEventListener(
  "appinstalled",
  () => {

    deferredPrompt = null;

    const button =
      qid("installBtn");

    if (button) {
      button.style.display =
        "none";
    }

  }
);


/* =========================================================
   SERVICE WORKER
========================================================= */

if (
  "serviceWorker" in navigator
) {

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register("sw.js")
        .then(
          registration => {

            console.log(
              "Service Worker registered:",
              registration.scope
            );

          }
        )
        .catch(
          error => {

            console.warn(
              "Service Worker registration failed:",
              error
            );

          }
        );

    }
  );

}


/* =========================================================
   OPTIONAL API HEALTH CHECK
========================================================= */

async function checkApiHealth() {

  try {

    const response =
      await apiGet("ping");


    if (
      response &&
      response.status === "success"
    ) {

      console.log(
        "CMS API:",
        response.version || "active"
      );

      return true;

    }

  }

  catch (err) {

    console.warn(
      "CMS API health check failed:",
      err
    );

  }

  return false;

}


/* =========================================================
   FINAL GLOBAL EXPORTS
   Needed for inline HTML onclick handlers.
========================================================= */

window.updateMakeup =
  updateMakeup;

window.loadEmptyRooms =
  loadEmptyRooms;

window.searchEmptyRooms =
  searchEmptyRooms;

window.autoFillMakeup =
  autoFillMakeup;

window.suggestRoom =
  suggestRoom;

window.filterPendingTable =
  filterPendingTable;

window.openOfficePanel =
  openOfficePanel;

window.openFacultyPanel =
  openFacultyPanel;

window.backToRoleSelection =
  backToRoleSelection;


/* =========================================================
   END OF SCRIPT
========================================================= */
