/* =========================================================
   CONFIG
========================================================= */
const API_URL =
  "https://script.google.com/macros/s/AKfycbwO_gQPaFfNIGuq_pyocTOcg9TiIfvC2FgWQnw160t7WXdDKok1w_xs6lT90HqYbCOwoQ/exec";

// ========== USER LOGIN (ONE TIME) ==========
let userEmail = localStorage.getItem("loggedEmail");

if (!userEmail) {
  userEmail = prompt("Enter your official email to use the system:");
  if (userEmail) {
    localStorage.setItem("loggedEmail", userEmail.trim().toLowerCase());
  }
}


/* =========================================================
   HELPERS
========================================================= */
function qs(sel) { return document.querySelector(sel); }
function qid(id) { return document.getElementById(id); }

function populateSelect(id, list) {
  const sel = qid(id);
  if (!sel) return;

  sel.innerHTML = `<option value="">Select</option>`;

  (list || []).forEach(v => {
    if (v && v.toString().trim() !== "") {
      sel.add(new Option(v, v));
    }
  });
}

function formatDateISO(d) {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

/* =========================================================
   ONE-TIME EMAIL PROMPT (STORED LOCALLY)
========================================================= */
async function ensureUserEmail() {
  let email = localStorage.getItem("loggedEmail");

  if (!email) {
    email = prompt("Enter your email to use the system:");
    if (!email) {
      alert("Email is required to use the system.");
      throw new Error("No email provided");
    }
    localStorage.setItem("loggedEmail", email);
  }

  window.LOGGED_EMAIL = email.toLowerCase().trim();
}

/* =========================================================
   CHECK MISSED ENTRY PERMISSION
========================================================= */
async function checkMissedPermission() {
  const email = localStorage.getItem("loggedEmail") || "";

  try {
    const res = await fetch(
      `${API_URL}?action=check_missed_permission&email=${encodeURIComponent(email)}`
    );

    const data = await res.json();

    if (!data.authorized) {
      const btn = document.getElementById("missedSubmitBtn");
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = "0.6";
        btn.style.cursor = "not-allowed";
      }

      alert("You are NOT authorized for Missed Class Entry. You can still do Makeup.");
    }
  } catch (err) {
    console.error("Permission check failed", err);
  }
}

/* =========================================================
   BOOT
========================================================= */
window.addEventListener("DOMContentLoaded", async () => {

  await ensureUserEmail();
  await checkMissedPermission();

  if (qid("appRoot")) qid("appRoot").style.display = "block";
  if (qid("loginScreen")) qid("loginScreen").style.display = "none";

  loadDashboard();
  refreshRoutineDropdowns();
  loadPendingMakeup();
  bindForms();

  qid("pendingTeacherSearch")?.addEventListener("input", filterPendingTable);
});

/* =========================================================
   DASHBOARD
========================================================= */
function loadDashboard() {
  fetch(`${API_URL}?action=get_dashboard`)
    .then(r => r.json())
    .then(d => {
      if (d.status !== "success") return;

      qid("totalMissed").textContent = d.totalMissed || 0;
      qid("completed").textContent = d.completed || 0;
      qid("pending").textContent = d.pending || 0;
      qid("extraCount").textContent = d.extra || 0;
    })
    .catch(console.error);
}

async function checkMissedPermission() {
  const email = localStorage.getItem("loggedEmail") || "";

  try {
    const res = await fetch(
      `${API_URL}?action=check_missed_permission&email=${encodeURIComponent(email)}`
    );
    const data = await res.json();

    if (!data.authorized) {
      // DISABLE MISSED ENTRY BUTTON
      const btn = document.getElementById("missedSubmitBtn");
      if (btn) {
        btn.disabled = true;
        btn.title = "You are not authorized for Missed Entry";
      }

      alert("You are NOT authorized for Missed Class Entry. You can still do Makeup.");
    }
  } catch (err) {
    console.error("Permission check failed", err);
  }
}

/* =========================================================
   ROUTINE MASTER DROPDOWNS
========================================================= */
async function refreshRoutineDropdowns() {
  try {
    const res = await fetch(`${API_URL}?action=get_routine_master`);
    const d = await res.json();

    if (d.status !== "success") {
      console.error("Routine load failed", d);
      return;
    }

    const uniq = a =>
      [...new Set((a || []).filter(v => v && v.toString().trim() !== ""))];

    const sortedCourses = uniq(d.courses).sort((a, b) =>
      a.localeCompare(b)
    );

    // 🔥 SORT TEACHERS A → Z (case insensitive, first character wise)
    const sortedTeachers = uniq(d.teachers).sort((a, b) =>
      a.toUpperCase().localeCompare(b.toUpperCase())
    );

    // ======================
    // Missed form
    // ======================
    populateSelect("m_time", uniq(d.times));
    populateSelect("m_room", uniq(d.rooms));
    populateSelect("m_course", sortedCourses);
    populateSelect("m_teacher", sortedTeachers);

    // ======================
    // Makeup form
    // ======================
    populateSelect("k_time", uniq(d.times));
    populateSelect("k_room", uniq(d.rooms));
    populateSelect("k_course", sortedCourses);
    populateSelect("k_teacher", sortedTeachers);

  } catch (e) {
    console.error("Routine load failed", e);
  }
}

/* =========================================================
   FORM BINDINGS
========================================================= */
function bindForms() {
  qid("missedForm")?.addEventListener("submit", submitMissed);
  qid("makeupForm")?.addEventListener("submit", submitMakeup);
}

/* =========================================================
   SAVE MISSED
========================================================= */
  async function submitMissed(e) {
  e.preventDefault();

  const payload = new URLSearchParams({
    action: "save_missed",
    email: window.LOGGED_EMAIL,
    date: formatDateISO(qid("m_date").value),
    department: qid("m_dept").value,
    course: qid("m_course").value,
    room: qid("m_room").value,
    timeSlot: qid("m_time").value,
    teacherInitial: qid("m_teacher").value,
    reason: qid("m_reason").value
  });

  const res = await fetch(API_URL, { method: "POST", body: payload })
    .then(r => r.json());

  if (res.status === "success") {
    alert("Missed class entry saved successfully.");
    e.target.reset();
    loadDashboard();
  } else {
    alert(res.message || "Not Authorized for Missed Entry");
  }
}

/* =========================================================
   SAVE MAKEUP
========================================================= */
async function submitMakeup(e) {
  e.preventDefault();

  const payload = new URLSearchParams({
    action: "save_makeup",
    scheduleDate: formatDateISO(qid("k_schedule").value),
    department: qid("k_dept").value,
    course: qid("k_course").value,
    teacherInitial: qid("k_teacher").value,
    makeupDate: formatDateISO(qid("k_date").value),
    makeupTime: qid("k_time").value,
    makeupRoom: qid("k_room").value,
    status: qid("k_status").value,
    remarks: qid("k_remarks").value.trim()
  });

  const res = await fetch(API_URL, { method: "POST", body: payload })
    .then(r => r.json());

  if (res.status === "success") {
    alert("Makeup class entry saved successfully.");
    e.target.reset();
    loadPendingMakeup();
    loadDashboard();
  } else {
    alert(res.message || "Failed to save makeup class entry.");
  }
}

/* =========================================================
   PENDING MAKEUP LIST
========================================================= */
function loadPendingMakeup() {
  fetch(`${API_URL}?action=get_pending_makeup`)
    .then(r => r.json())
    .then(res => {
      const tbody = qs("#pendingTable tbody");
      if (!tbody) return;

      tbody.innerHTML = "";

      if (!res.data || !res.data.length) {
        tbody.innerHTML =
          `<tr><td colspan="9">No pending makeup classes</td></tr>`;
        return;
      }

      res.data.forEach(r => {
        tbody.insertAdjacentHTML(
          "beforeend",
          `
<tr id="row_${r.row}">
  <td>${r.scheduleDate}</td>
  <td>${r.department}</td>
  <td>${r.course}</td>
  <td>${r.teacher}</td>
  <td>${r.makeupDate}</td>
  <td>${r.makeupTime}</td>
  <td>${r.makeupRoom}</td>
  <td>
    <select id="status_${r.row}">
      <option value="Pending" selected>Pending</option>
      <option value="Completed">Completed</option>
    </select>
  </td>
  <td>
    <input
      id="remarks_${r.row}"
      value="${r.remarks || ""}"
      placeholder="Attendance / recording link"
    >
    <button onclick="updateMakeup(${r.row})">Update</button>
  </td>
</tr>
          `
        );
      });
    })
    .catch(err => {
      console.error("Pending load error:", err);
    });
}

/* =========================================================
   UPDATE MAKEUP
========================================================= */
function updateMakeup(row) {
  const statusEl = document.getElementById(`status_${row}`);
  const remarksEl = document.getElementById(`remarks_${row}`);

  if (!statusEl) return;

  const status = statusEl.value;
  const remarks = remarksEl ? remarksEl.value.trim() : "";

  fetch(
    `${API_URL}?action=update_makeup&row=${row}&status=${status}&remarks=${encodeURIComponent(remarks)}`
  )
    .then(r => r.json())
    .then(res => {
      if (res.status === "success") {

        alert("Updated successfully");

        if (status === "Completed") {
          const tr = document.getElementById(`row_${row}`);
          if (tr) tr.remove();
        }

        loadPendingMakeup();
        loadDashboard();

      } else {
        alert(res.message || "Update failed");
      }
    })
    .catch(err => {
      console.error("Update error:", err);
      alert("Server error — please check console.");
    });
}

/* =========================================================
   SEARCH PENDING LIST
========================================================= */
function filterPendingTable() {
  const term = qid("pendingTeacherSearch").value.toLowerCase().trim();
  const rows = document.querySelectorAll("#pendingTable tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(term) ? "" : "none";
  });
}

/* =========================================================
   EMPTY ROOM CHECK
========================================================= */
function loadEmptyRooms() {
  fetch(`${API_URL}?action=get_empty_rooms`)
    .then(r => r.json())
    .then(res => {
      const tbody = qs("#emptyRoomTable tbody");
      tbody.innerHTML = "";

      if (!res.data || !res.data.length) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4" style="text-align:center; color:#777;">
              No empty rooms available
            </td>
          </tr>`;
        return;
      }

      res.data.forEach(r => {
        tbody.insertAdjacentHTML(
          "beforeend",
          `<tr>
            <td>${r.day || ""}</td>
            <td>${r.time || ""}</td>
            <td>${r.room || ""}</td>
            <td>
              <button class="book-btn"
                onclick="autoFillMakeup('${r.day || ""}', '${r.time || ""}', '${r.room || ""}')">
                Book
              </button>
            </td>
          </tr>`
        );
      });
    })
    .catch(err => {
      console.error("Empty room load error:", err);
    });
}

function searchEmptyRooms() {
  const term = qid("emptyRoomSearch").value.toLowerCase().trim();
  const rows = qs("#emptyRoomTable tbody").querySelectorAll("tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(term) ? "" : "none";
  });
}

function autoFillMakeup(day, time, room) {
  qid("k_time").value = time;
  qid("k_room").value = room;
  alert(`Selected: ${day} | ${time} | ${room}`);
}
