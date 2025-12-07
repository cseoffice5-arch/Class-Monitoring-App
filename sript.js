/* ------------------------
   script.js — final
------------------------ */

/* ====== SET YOUR DEPLOYED WEB APP URL ======
   Make sure this matches your deployed Apps Script "Execute the app as: Me" and "Allow anonymous" settings.
*/
const API_URL = "https://script.google.com/macros/s/AKfycbxB-G43bnCLHiAhKaVdT-K30GeVz9niCdwRY0NzB9-57OIONFgzT7giSrSMb4cQGrpqJQ/exec";

/* ---------- DATA ARRAYS (teachers, rooms, times) ----------
   (Full arrays should be pasted here — shortened for readability in examples)
*/
const TEACHERS =  [ "Dr. Sheak Rashed Haider Noori (SRH)", "Dr. S.M Aminul Haque (SMAH)", "Dr. Arif Mahmud (AM)", "Dr. Md. Fokhray Hossain (MFH)", "Professor Dr. Md. Adnan Kiber (MAK)", "Professor Dr. Fernaz Narin Nur (FNN)", "Dr. Md. Zahid Hasan (ZH)", "Ms. Nazmun Nessa Moon (NNM)", "Dr. Fizar Ahmed (FZA)", "Dr. Naznin Sultana (NS)", "Dr. Md. Kamrul Hossain (MKH)", "Dr. Mr. Abdus Sattar (AS)", "Mr. Anuz Kumar Chakrabarty (AKC)", "Dr. Md. Ali Hossain (MAH)", "Dr. Md. Akhtaruzzaman (DAN)", "Dr. Mohammad Nuruzzaman Bhuiyan (MNB)", "Mohammad Salek Parvez (SP)", "Mr. Md. Sadekur Rahman (SR)", "Mr. Shah Md Tanvir Siddiquee (SMTS)", "Most. Hasna Hena (HH)", "Raja Tariqul Hasan Tusher (THT)", "Md. Abbas Ali Khan (AAK)", "Ms. Samia Nawshin (SN)", "Md. Sazzadur Ahamed (SZ)", "Mr. Saiful Islam (SI)", "Mr. Mohammad Monirul Islam (MMI)", "Ms. Masuma Parvin (MPL)", "Fatema Tuj Johora (FTJ)", "Ms. Shirin Sultana (SSL)", "Amit Chakraborty Chhoton (ACC)", "Dewan Mamun Raza (DMR)", "Dr. Md Alamgir Kabir (DMAK)", "Mr. Mohammad Jahangir Alam (MJA)", "Mushfiqur Rahman (MUR)", "Mr. Shahadat Hossain (SH)", "Md Masum Billah (MMB)", "Ms. Sharun Akter Khushbu (SAK)", "Mr. Amir Sohel (ARS)", "Mr. Md Assaduzzaman (MA)", "Mr. Mayen Uddin Mojumdar (MUM)", "Md. Hasanuzzaman Dipu (MHD)", "Fahiba Farhin (FFN)", "Ms. Sakia Shabnam Kader", "Tapasy Rabeya (TRA)", "Ms. Aliza Ahmed Khan (ADK)", "Zakia Sultana Eshita (ZS)", "Mst. Sharmin Akter (SAR)", "Md. Firoz Hasan (FH)", "Israt Jahan (IJN)", "Lamia Rukhsara (LR)", "Eng. Mosharraf Hossain Khan (MHK)", "Mr. Md Mohammad Masum Bakaul (MB)", "Shamim Hossain (SMH)", "MD. RASEDUL ISLAM (MRIS)", "Md. Shah Jalal (MSJ)", "Mr. Md Umaid Hasan (MUH)", "Tanzina Afroz Rimi (TAR)", "Mr. Abdullah Al Mamun (AAM)", "Ms. Syada Tasmia Alvi (STA)", "Ms. Umme Ayman (UA)", "Mr. Md. Mizanur Rahman (MMRN)", "Ms. Tasfia Anika Bushra (TAB)", "Mr. Md. Aynul Hasan Nahid (AHN)", "Ms. Nahid Sultana (NDS)", "Md. Ferdouse Ahmed Foysal (FAF)", "Mr. Partha Dip Sarkar (PDS)", "Mr. Md. Mahedi Hassan (MHS)", "Mr. Mahimul Islam Nadim (MIN)", "Mr. Golam Rabbany (GR)", "Mr. Md. Ashraful Islam Talukder (MAIT)", "Ms. Dristi Saha (DS)", "Ms. Zannatul Mawa Koli (ZMK)", "Mr. Tanvirul Islam (TI)", "Mr. Rahmatul Kabir Rasel Sarker (RKR)", "Mr. Md. Monarul Islam (MIS)", "Atia Sanjida Talulder (AST)", "Umme Habiba (UH)", "Hasnur Jahan (HJ)", "Md. Jahidul Alam (JLA)", "Sakib Mahmood Chowdhury (SMC)", "Anup Kumar Modak (AKM)", "Md. Atikul Islam (MAI)", "Md. Jakaria Zobair (MJZ)", "Md. Abdullah-Al-Kafi (AHAK)", "Shahriar Shakil (MSS)", "Ms Rabeya Khatun (RAK)", "Ms. Nushrat Jahan Oyshi (NJO)", "Ms Sadia Jannat Mitu (SAJ)", "Ms Shahrin Khan (SNK)", "Mr Mehadi Hasan (MHN)", "Mr Mir Safwan Marzouq (MSM)", "Mr Ashaf Uddaula (AUA)", "Ms Faiza Feroz (FFZ)", "Arpita Ghose Tusi (AGT)", "Husne Mubarak (HMK)", "Chayti Saha (CSA)", "Abdullah Al-Amin (AAA)", "Noor Muhammad (NRM)", "Abdullah Al Sakib (AAS)", "Md. Ashik-E-Elahe (AEE)", "Md. Roni Islam (RIM)", "Saida Mahmuda Rahman (SMN)", "Md. Al-Mamun (AMN)", "Abir Saha (ASA)", "Angshuman Rashid (ANR)", "S. M. Sharif Hasan (SMSH)", "Tamanna Sultana (TAS)", "MD. MEZBAUL ISLAM ZION (MIZ)", "Nafiz Ahmed Emon (NAE)", "Shadman Rabby (SHR)", "Jamilul Huq Jami (JHJ)", "Ms. Rowzatul Zannat (ROZ)", "Md. Hefzul Hossain Papon (HHP)", "Syed Eftasum Alam (SEA)", "Mohammed Sami Khan (MSK)", "Shoumik Debnath (SHD)", "Ms. Rimi Akter (RIA)", "Ms. Taslima Akhter (TAK)", "Muhammad Abu Rayan (MAR)", "Md. Zami Al Zunaed Farabe (ZAF)", "Md. Alvee Ehsan (ALE)", "Pranto Protim Choudhury (PPC)", "Md. Shakib Hossain (MSH)", "Mizanur Rahman (MRR)", "Mohiuddin Muhi (MNM)", "Monju Akter Mou (MAM)", "Abdullah Ar Rafi (AAR)", "Nishat Sadaf Lira (NSL)", "Fahim Ahsan (FMA)", "Md. Jubayar Alam Rafi (JAR)", "Showmick Guha Paul (SGP)", "Mir Faiyaz Hossain (MFZ)", "Md. Yousuf Ali (MYA)", "Mushfiqur Rahman Chowdhury (MRC)", "Shreya Nag Riya (SNR)", "Nishat Tasnim Shishir (NTS)", "Z N M Zarif Mahmud (ZZM)", "Fardowsi Rahman (FRN)", "Nawshin Haque (NHE)", "Liza Akter (LAR)", "Md. Mahabul Alom Santo (MAS)", "Md. Jahangir Alam (JAM)", "Jotirmoy Roy (JRY)", "Kridita Ray (KRY)", "Shaswata Bhattacharya (SBA)", "Md. Taufik Hasan (MTN)", "Indrani Sen Toma (IST)", "Shahariar Sarkar (SRS)", "Sadaf M. Anis (SFMA)", "Sourav Majumder (SVM)", "S. M. Faisal (SMF)", "Md. Touhidul Islam Sovon (TIS)", "Tanjir Ahmed Anik (TAA)", "Md. Aman Ullah (MAU)", "Md. Mehefujur Rahman Mubin (MRM)", "Sayeda Parvin (SAP)", "Most. Sanjida Afrin (MSA)", "Mohammad Rony (MRY)", "Khandoker Nosiba Arifin (KNA)", "Pallabi Biswas (PB)", "Tasmiah Rahman (TRN)", "MS. SUBARNA AKTER LIZA (SAL)", "Md. Ridoy Sarkar (RYS)", "Nazia Nuzhat (NNT)", "Yamina Islam (YI)", "Md. Imtiaj Hossain (MIH)", "Professor Dr. Monzur Morshed (MM)", "Mr. Mohammad Mahmudur Rahman (MMR)", "Syeda Maria Rahman (SMR)", "Ms. Shanjida Habib Swarna (SHS)", "Md. Alamgir Hossain (ARH)", "Ms. Ummey Fariha (UF)", "Md. Shamim Hossain (SHN)", "Md. Emad Hossain Likhon (EHL)", "Md. Shadman Mostafa (SMA)", "Bakhtiar Muiz (BM)", "MD TASLIM ARIF (MTF)", "Muha. Humayet Islam (MHI)", "Md. Shihab Uddin (MSU)", "Mohammad Al Rasel (MLR)", "Kazi Hasibur Rahman (KHR)", "Md. Atiqure Rahman Shanto (MRS)", "Indrojit Sarkar (ITS)", "Md. Rashedul Alam (MRA)", "Sadman Sadik Khan (SKN)", "Md. Kamrul Hasan (KH)", "Jannatun Naeem Tanin (JNT)", "Md Ibrahim Patwary Khokan (IPK)", "Sadikur Rahman Sadik (SRS)", "Shumaiya Akter Shammi (SAS)", "Md. Sagar Hossen (MSRH)", "Prottasha Sarker (PS)", "Sadia Afrin Sumi (SAS)", "Sangeeta Kundu (SKU)", "Mst. Ainunnahar Khatun (ARN)", "Mohammad Rifat-Ul Islam (MRI)", "Mohaimenul Khan (MK)", "Sumiya Alam Chowdhury (SAC)", "Atikur Rahman (MARR)", "Md. Anamul Kabir Jewel (AKJ)", "Ayesha Siddka Moon (ASM)", "Ekramul Islam Khan (EIK)", "Arinee Anjum (AEA)", "Md. Rokonuzzaman", "DEWAN ASHIQUZZAMAN (DAA)", "Faisal Ahmed (FLA)", "Muhammad Lutfur Rahman Abrar (LRA)", "Md. Shamim Al Mamun (MSAM)", "Md. Abdul Kader (ALK)", "Nafis-Ul Momin (NUM)", "Ishtiaque Ahmed", "Debanjon Chakraborty", "Sumona Afroz (SA)", "Md. Naymul Islam Nayoun", "Dr. Bimal Chandra Das (BCD)", "Rafi Al Mahmud (RAM)", "Shadab Sheper (SBS)", "Unknown" ];

const ROOMS = [
"201","208","213","216","217","218","219","220","221","222","223","224",
"302","303","304","305","306","307","318(A)","318(B)","320",
"801(A)","801(B)","802","803","804","813(B)",
"514","515","516","517(A)","518","916","919","204",
"G1-026","G1-027","501(A)","501(B)","503","504","510","513",
"G1-001","G1-002","G1-003","G1-004","G1-005","G1-006","G1-007","G1-008",
"G1-009","G1-010","G1-011","G1-012","G1-013","G1-014","G1-016","G1-017",
"G1-018","G1-020","G1-021","G1-022",
"809","810","301","502","103","105","815","816"
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

function wireFilter(inputId, selectId, list) {
  const input = document.getElementById(inputId);
  populateSelectList(selectId, list);
  if (!input) return;
  input.addEventListener('input', (e) => {
    const q = (e.target.value || "").toLowerCase().trim();
    const filtered = q ? list.filter(x => x.toLowerCase().includes(q)) : list;
    populateSelectList(selectId, filtered);
  });
}

/* ---------- ON LOAD ---------- */
window.addEventListener('DOMContentLoaded', () => {
  // populate lists / wire filters
  populateSelectList('m_teacher', TEACHERS);
  populateSelectList('k_teacher', TEACHERS);
  populateSelectList('m_room', ROOMS);
  populateSelectList('k_room', ROOMS);
  populateSelectList('m_time', TIMES);
  populateSelectList('k_time', TIMES);

  wireFilter('m_teacher_filter','m_teacher', TEACHERS);
  wireFilter('k_teacher_filter','k_teacher', TEACHERS);
  wireFilter('m_room_filter','m_room', ROOMS);
  wireFilter('k_room_filter','k_room', ROOMS);
  wireFilter('m_time_filter','m_time', TIMES);
  wireFilter('k_time_filter','k_time', TIMES);

  // watermark updates
  const mTeacherSel = document.getElementById('m_teacher');
  const kTeacherSel = document.getElementById('k_teacher');
  if (mTeacherSel) mTeacherSel.addEventListener('change', e => document.getElementById('m_teacher_watermark').textContent = e.target.value ? "Selected teacher: " + e.target.value : "");
  if (kTeacherSel) kTeacherSel.addEventListener('change', e => document.getElementById('k_teacher_watermark').textContent = e.target.value ? "Selected teacher: " + e.target.value : "");

  // load pending list and today's summary
  loadPendingMakeup();
});

/* ---------- POST using URLSearchParams (form-encoded) ---------- */
async function postForm(payload) {
  const params = new URLSearchParams();
  Object.keys(payload).forEach(k => params.append(k, payload[k] ?? ""));
  const resp = await fetch(API_URL, {
    method: 'POST',
    body: params
  });
  const txt = await resp.text();
  try { return JSON.parse(txt); }
  catch (err) {
    console.error('Server returned non-JSON:', txt);
    return { status: 'error', message: 'Invalid server response' };
  }
}

/* ---------- MISSED SUBMIT ---------- */
document.getElementById('missedForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const payload = {
    action: 'save_missed',
    date: document.getElementById('m_date').value || '',
    department: document.getElementById('m_dept').value || '',
    course: document.getElementById('m_course').value || '',
    timeSlot: document.getElementById('m_time').value || '',
    room: document.getElementById('m_room').value || '',
    teacherInitial: document.getElementById('m_teacher').value || '',
    reason: document.getElementById('m_reason').value || ''
  };
  if (!payload.date || !payload.department || !payload.course || !payload.timeSlot || !payload.room || !payload.teacherInitial) {
    alert('Please fill Date, Department, Course, Time, Room and Teacher.');
    return;
  }
  const res = await postForm(payload);
  if (res.status === 'success') {
    alert('Missed class saved.');
    this.reset();
    loadPendingMakeup(); // refresh summary
  } else {
    alert('Save failed: ' + (res.message || 'Unknown'));
  }
});

/* ---------- MAKEUP SUBMIT ---------- */
document.getElementById('makeupForm').addEventListener('submit', async function(e) {
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
  const res = await postForm(payload);
  if (res.status === 'success') {
    alert('Makeup saved.');
    this.reset();
    loadPendingMakeup();
  } else {
    alert('Save failed: ' + (res.message || 'Unknown'));
  }
});

/* ---------- LOAD PENDING MAKEUP LIST + today's summary ---------- */
async function loadPendingMakeup() {
  // request pending list (pass today's date for summary)
  const today = new Date().toISOString().slice(0,10);
  const res = await postForm({ action: 'list_pending_makeup', date: today });
  const container = document.getElementById('pending_makeup_list');
  const sumMissed = document.getElementById('sum_missed');
  const sumCompleted = document.getElementById('sum_completed');
  const sumPending = document.getElementById('sum_pending');

  if (!res || res.status === 'error') {
    container.innerText = 'Failed to load pending list';
    if (res && res.message) console.warn(res.message);
    return;
  }

  // res should include: pending:[], totals:{missed,completed,pending}
  const pending = res.pending || [];
  container.innerHTML = '';
  if (pending.length === 0) {
    container.innerHTML = '<div style="opacity:0.8">No pending makeup classes.</div>';
  } else {
    pending.forEach(item => {
      // item fields: scheduleDate, department, course, teacherInitial, makeupDate, makeupTime, makeupRoom, status, remarks
      const el = document.createElement('div');
      el.style.padding = '8px';
      el.style.borderBottom = '1px solid #eee';
      el.innerHTML = `
        <div><strong>${item.course || '—'}</strong> (${item.department || '—'})</div>
        <div style="font-size:13px;color:#555">Teacher: ${item.teacherInitial || '—'} | Makeup: ${item.makeupDate || '—'} ${item.makeupTime || ''} | Room: ${item.makeupRoom || '—'}</div>
        <div style="margin-top:6px">
          <button class="btn-edit" data-teacher="${encodeURIComponent(item.teacherInitial||'')}" 
                  data-makeupDate="${encodeURIComponent(item.makeupDate||'')}" 
                  data-makeupTime="${encodeURIComponent(item.makeupTime||'')}"
                  data-remarks="${encodeURIComponent(item.remarks||'')}"
                  style="padding:6px 8px; margin-right:8px">Edit / Mark Completed</button>
        </div>
      `;
      container.appendChild(el);
    });

    // attach handlers
    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const teacherInitial = decodeURIComponent(btn.dataset.teacher || '');
        const makeupDate = decodeURIComponent(btn.dataset.makeupdate || btn.dataset.makeupdate || btn.dataset.makeupDate || '');
        const makeupTime = decodeURIComponent(btn.dataset.makeupTime || btn.dataset.makeuptime || '');
        const currRemarks = decodeURIComponent(btn.dataset.remarks || '');
        // Prompt small edit form (simple)
        const newRemarks = prompt('Update remarks (optional):', currRemarks);
        if (newRemarks === null) return; // cancelled
        // confirm marking Completed
        const confirmComplete = confirm('Mark this makeup as COMPLETED? (OK = Completed, Cancel = no change)');
        if (!confirmComplete) return;
        // send update request
        const upd = {
          action: 'update_makeup',
          teacherInitial,
          makeupDate,
          makeupTime,
          status: 'Completed',
          remarks: newRemarks
        };
        const r2 = await postForm(upd);
        if (r2.status === 'success') {
          alert('Updated to Completed.');
          loadPendingMakeup();
        } else {
          alert('Update failed: ' + (r2.message || 'Unknown'));
        }
      });
    });
  }

  // update summary numbers
  if (sumMissed) sumMissed.textContent = (res.totals && res.totals.missed) != null ? res.totals.missed : '0';
  if (sumCompleted) sumCompleted.textContent = (res.totals && res.totals.completed) != null ? res.totals.completed : '0';
  if (sumPending) sumPending.textContent = (res.totals && res.totals.pending) != null ? res.totals.pending : '0';
}