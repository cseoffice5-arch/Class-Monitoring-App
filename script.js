/* ------------------------
   script.js — final
   ------------------------ */

/* ====== SET YOUR DEPLOYED WEB APP URL ======
   Replace this with your own deployed Apps Script URL if different.
   The script expects form-encoded (application/x-www-form-urlencoded) POST.
*/
const API_URL = "https://script.google.com/macros/s/AKfycbypHtIPYMJq_5Hr5FUVJr3pH2ADTOVGfZTMJS_bCEeVjxaIWqR26q5uYSlGZbqJtUk/exec";

/* ---------- DATA ARRAYS (teachers, rooms, times) ---------- */
/* Keep the full list provided earlier. Shortened here for brevity in the sample;
   paste your full TEACHERS array as you had before.
*/
const TEACHERS = [
  "Dr. Sheak Rashed Haider Noori (SRH)",
  "Dr. S.M Aminul Haque (SMAH)",
  "Dr. Arif Mahmud (AM)",
  "Dr. Md. Fokhray Hossain (MFH)",
  "Professor Dr. Md. Adnan Kiber (MAK)",
  "Professor Dr. Fernaz Narin Nur (FNN)",
  "Dr. Md. Zahid Hasan (ZH)",
  "Ms. Nazmun Nessa Moon (NNM)",
  "Dr. Fizar Ahmed (FZA)",
  "Unknown"
  // ... (paste remaining items here)
];

const ROOMS = [
  "201","208","213","216","217","218","219","220","221","222",
  "302","303","304","305","306","307","318(A)","318(B)","320",
  "801(A)","801(B)","802","803","804"
  // ... (add remaining)
];

const TIMES = [
  "8:30 AM - 10:00 AM",
  "10:00 AM - 11:30 AM",
  "11:30 AM - 1:00 PM",
  "1:00 PM - 2:30 PM",
  "2:30 PM - 4:00 PM",
  "4:00 PM - 5:30 PM"
];

/* ---------- HELPERS ---------- */
function populateSelectList(selectId, list) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = "";
  list.forEach(v => {
    const o = document.createElement("option");
    o.value = v;
    o.textContent = v;
    sel.appendChild(o);
  });
}

/* client-side filter for a select (search box + select) */
function wireFilter(inputId, selectId, list) {
  const input = document.getElementById(inputId);
  const sel = document.getElementById(selectId);
  // initial populate
  populateSelectList(selectId, list);
  // when typing, filter
  input && input.addEventListener('input', (e) => {
    const q = (e.target.value || "").toLowerCase().trim();
    const filtered = q ? list.filter(x => x.toLowerCase().includes(q)) : list;
    populateSelectList(selectId, filtered);
  });
}

/* ---------- ON LOAD: populate + wire filters + watermark ---------- */
window.addEventListener('DOMContentLoaded', () => {
  // Missed
  wireFilter('m_teacher_filter', 'm_teacher', TEACHERS);
  wireFilter('m_room_filter', 'm_room', ROOMS);
  wireFilter('m_time_filter', 'm_time', TIMES);

  // Makeup
  wireFilter('k_teacher_filter', 'k_teacher', TEACHERS);
  wireFilter('k_room_filter', 'k_room', ROOMS);
  wireFilter('k_time_filter', 'k_time', TIMES);

  // watermark updates (display currently selected teacher)
  const mTeacherSel = document.getElementById('m_teacher');
  const kTeacherSel = document.getElementById('k_teacher');
  mTeacherSel && mTeacherSel.addEventListener('change', e => {
    document.getElementById('m_teacher_watermark').textContent = e.target.value ? "Selected teacher: " + e.target.value : "";
  });
  kTeacherSel && kTeacherSel.addEventListener('change', e => {
    document.getElementById('k_teacher_watermark').textContent = e.target.value ? "Selected teacher: " + e.target.value : "";
  });

  // make selects single-click choose value into an input (helpful on mobile)
  ['m_room','m_time','m_teacher','k_room','k_time','k_teacher'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.addEventListener('dblclick', function(){ /* ignore double */ });
    sel.addEventListener('change', () => {
      // keep selection; nothing else required
    });
  });
});

/* ---------- POST using URLSearchParams (form-encoded) ---------- */
async function postForm(payload) {
  const params = new URLSearchParams();
  Object.keys(payload).forEach(k => params.append(k, payload[k] ?? ""));
  const resp = await fetch(API_URL, {
    method: 'POST',
    body: params // browser sets application/x-www-form-urlencoded
  });
  const txt = await resp.text();
  try {
    return JSON.parse(txt);
  } catch (err) {
    console.error('Server returned non-JSON:', txt);
    return { status: 'error', message: 'Invalid server response' };
  }
}

/* ---------- MISSED FORM SUBMIT ---------- */
document.getElementById('missedForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const payload = {
    action: 'save_missed',
    date: document.getElementById('m_date').value || '',
    department: document.getElementById('m_dept').value || '',
    course: document.getElementById('m_course').value || '',
    room: document.getElementById('m_room').value || '',
    timeSlot: document.getElementById('m_time').value || '',
    teacherInitial: document.getElementById('m_teacher').value || '',
    reason: document.getElementById('m_reason').value || ''
  };

  if (!payload.date || !payload.department || !payload.course || !payload.room || !payload.teacherInitial) {
    alert('Please fill Date, Department, Course, Room and Teacher.');
    return;
  }

  try {
    const result = await postForm(payload);
    if (result.status === 'success') {
      alert(result.message || 'Missed class saved!');
      this.reset();
      document.getElementById('m_teacher_watermark').textContent = '';
      // re-populate lists (because reset clears select selection)
      populateSelectList('m_teacher', TEACHERS);
      populateSelectList('m_room', ROOMS);
      populateSelectList('m_time', TIMES);
    } else {
      alert('Save failed: ' + (result.message || 'Unknown'));
    }
  } catch (err) {
    console.error(err);
    alert('Submit error — see console.');
  }
});

/* ---------- MAKEUP FORM SUBMIT ---------- */
document.getElementById('makeupForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const payload = {
    action: 'save_makeup',
    scheduleDate: document.getElementById('k_schedule').value || '',
    department: document.getElementById('k_dept_m').value || '',
    course: document.getElementById('k_course').value || '',
    teacherInitial: document.getElementById('k_teacher').value || '',
    makeupDate: document.getElementById('k_date').value || '',
    makeupTime: document.getElementById('k_time').value || '',
    makeupRoom: document.getElementById('k_room').value || '',
    status: document.getElementById('k_status').value || '',
    remarks: document.getElementById('k_remarks').value || ''
  };

  if (!payload.scheduleDate || !payload.department || !payload.course || !payload.teacherInitial || !payload.makeupDate || !payload.makeupTime || !payload.makeupRoom) {
    alert('Please fill required fields.');
    return;
  }

  try {
    const result = await postForm(payload);
    if (result.status === 'success') {
      alert(result.message || 'Makeup class saved!');
      this.reset();
      document.getElementById('k_teacher_watermark').textContent = '';
      populateSelectList('k_teacher', TEACHERS);
      populateSelectList('k_room', ROOMS);
      populateSelectList('k_time', TIMES);
    } else {
      alert('Save failed: ' + (result.message || 'Unknown'));
    }
  } catch (err) {
    console.error(err);
    alert('Submit error — see console.');
  }
});