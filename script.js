/* ========================================================= 
   CONFIG (GITHUB SAFE — NO LOGIN)
========================================================= */
const API_URL =
  "https://script.google.com/macros/s/AKfycbwDZ5C8Oez5qyvi0B4P3rKFtbGg8-TO2syQiU_d0pgOP-FQ_trUQBxJ04iNjiKW6mTnWg/exec";

/* ---------- HELPERS ---------- */
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
   BOOT (AUTO-OPEN APP — LOGIN REMOVED)
========================================================= */
window.addEventListener("DOMContentLoaded", () => {

  if (qid("appRoot")) qid("appRoot").style.display = "block";
  if (qid("loginScreen")) qid("loginScreen").style.display = "none";

  loadDashboard();
  refreshRoutineDropdowns();
  loadPendingMakeup();
  bindForms();

  enableSelect2SmartSearch();   // ✅ ADD HERE (ONLY THIS LINE)
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

/* =========================================================
   ROUTINE MASTER DROPDOWNS (GITHUB FIXED)
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

    // Populate Missed form
    populateSelect("m_time", uniq(d.times));
    populateSelect("m_room", uniq(d.rooms));
    const sortedCourses = uniq(d.courses).sort((a, b) => a.localeCompare(b));
    populateSelect("m_course", sortedCourses);
    populateSelect("m_teacher", uniq(d.teachers));

    // Populate Makeup form
    populateSelect("k_time", uniq(d.times));
    populateSelect("k_room", uniq(d.rooms));
    populateSelect("k_course", sortedCourses);
    populateSelect("k_teacher", uniq(d.teachers));

    // Apply Select2 AFTER options are loaded
    setTimeout(() => {
  if (window.jQuery) {

    // Teacher stays normal
    $("#m_teacher, #k_teacher").select2({
      width: "100%",
      placeholder: "Search & select...",
      allowClear: true
    });

    // DESTROY old Select2 on course (prevents broken search)
    $("#m_course, #k_course").select2("destroy");

    // Now initialize our smart course search
    enableSelect2SmartSearch();
  }
}, 300);

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
    alert(res.message || "Failed to save missed class entry.");
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
   PENDING MAKEUP
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
<tr>
  <td>${r.scheduleDate}</td>
  <td>${r.department}</td>
  <td>${r.course}</td>
  <td>${r.teacher}</td>
  <td>${r.makeupDate}</td>
  <td>${r.makeupTime}</td>
  <td>${r.makeupRoom}</td>
  <td>
    <select id="status_${r.row}">
      <option value="" disabled selected hidden>${r.status}</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  </td>
  <td>
    <input
      id="remarks_${r.row}"
      value="${r.remarks || ""}"
      placeholder="Attendance link provide"
    >
    <button onclick="updateMakeup(${r.row})">Update</button>
  </td>
</tr>
          `
        );
      });
    })
    .catch(console.error);
}

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

        // ✅ KEY LOGIC YOU ASKED FOR:
        if (status === "Completed") {
          // Remove row instantly from UI
          const tr = document.getElementById(`status_${row}`)?.closest("tr");
          if (tr) tr.remove();
        }

        // Still refresh to keep dashboard correct
        loadPendingMakeup();
        loadDashboard();
      } else {
        alert(res.message || "Update failed");
      }
    })
    .catch(console.error);
}
/* ---------- SEARCH PENDING LIST ---------- */
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
      const tbody = qs("#emptyRoomTable tbody");
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="color:red; text-align:center;">
            Failed to load empty rooms
          </td>
        </tr>`;
    });
}

/* ---------- SEARCH EMPTY ROOM LIST ---------- */
function searchEmptyRooms() {
  const term = qid("emptyRoomSearch").value.toLowerCase().trim();
  const rows = qs("#emptyRoomTable tbody").querySelectorAll("tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(term) ? "" : "none";
  });
}

/* ---------- AUTO-FILL MAKEUP FORM ---------- */
function autoFillMakeup(day, time, room) {
  qid("k_time").value = time;
  qid("k_room").value = room;
  alert(`Selected: ${day} | ${time} | ${room}`);
}
/* =========================================================
   SMART SEARCH — TEACHER INITIAL (LIVE SEARCH)
========================================================= */

function enableTeacherSearch() {
  ["m_teacher", "k_teacher"].forEach(id => {
    const select = qid(id);
    if (!select) return;

    select.addEventListener("input", function () {
      const term = this.value.toLowerCase().trim();

      Array.from(select.options).forEach(opt => {
        if (!opt.value) return;
        opt.style.display = opt.value.toLowerCase().includes(term) ? "" : "none";
      });
    });
  });
}

/* =========================================================
   SMART SEARCH — COURSE / SECTION (LIVE SEARCH)
========================================================= */

function enableCourseSearch() {
  ["m_course", "k_course"].forEach(id => {
    const select = qid(id);
    if (!select) return;

    select.addEventListener("input", function () {
      const term = this.value.toLowerCase().trim();

      Array.from(select.options).forEach(opt => {
        if (!opt.value) return;
        opt.style.display = opt.value.toLowerCase().includes(term) ? "" : "none";
      });
    });
  });
}

/* =========================================================
   ✅ FIXED COURSE/SECTION SEARCH — WORKS WITH DIGITS + LETTERS
   (MISSED & MAKEUP ONLY)
========================================================= */

function enableSelect2SmartSearch() {

  function highlightText(text, term) {
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex,
      "<span style='background:yellow; font-weight:bold;'>$1</span>");
  }

  const courseMatcher = function (params, data) {
    if ($.trim(params.term) === "") return data;
    if (!data.text) return null;

    const term = params.term.trim().toLowerCase();

    // 👉 VERY IMPORTANT FIX: check BOTH visible text AND underlying value
    const text = (data.text || "").toLowerCase();
    const value = (data.id || "").toLowerCase();

    // Match if term appears in EITHER text or value (fixes digit issue)
    if (!text.includes(term) && !value.includes(term)) {
      return null;
    }

    const modified = $.extend({}, data, true);
    modified.text = highlightText(data.text, term);
    return modified;
  };

  // 🔹 APPLY ONLY TO COURSE (MISSED & MAKEUP)
  $("#m_course, #k_course").select2({
    width: "100%",
    placeholder: "Type course or section...",
    allowClear: true,
    matcher: courseMatcher,
    escapeMarkup: function (m) { return m; },
    minimumResultsForSearch: 0,
    selectOnClose: false,   // you still click to select
    closeOnSelect: true
  });
}

