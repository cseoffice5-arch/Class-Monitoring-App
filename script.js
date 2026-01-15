/* =========================
   CONFIG
========================= */
const API_URL =
  "https://script.google.com/macros/s/AKfycbxTV_Z5NP6TseOx8iT3wS6wefpK7hNt-pv0np5grnbuTiLw6h66x6XVs-vnqztAXz_aSA/exec";
function formatBDDateTimeFromInput(dateValue) {
  if (!dateValue) return "";

/* ---------- MASTER LISTS ---------- */
const TEACHERS = [
"Dr. Sheak Rashed Haider Noori (SRH)","Dr. S.M Aminul Haque (SMAH)","Dr. Arif Mahmud (AM)",
"Dr. Md. Fokhray Hossain (MFH)","Professor Dr. Md. Adnan Kiber (MAK)","Professor Dr. Fernaz Narin Nur (FNN)",
"Dr. Md. Zahid Hasan (ZH)","Ms. Nazmun Nessa Moon (NNM)","Dr. Fizar Ahmed (FZA)","Dr. Naznin Sultana (NS)",
"Dr. Md. Kamrul Hossain (MKH)","Dr. Mr. Abdus Sattar (AS)","Mr. Anuz Kumar Chakrabarty (AKC)","Dr. Md. Ali Hossain (MAH)",
"Dr. Md. Akhtaruzzaman (DAN)","Dr. Mohammad Nuruzzaman Bhuiyan (MNB)","Mohammad Salek Parvez (SP)","Mr. Md. Sadekur Rahman (SR)",
"Mr. Shah Md Tanvir Siddiquee (SMTS)","Most. Hasna Hena (HH)","Raja Tariqul Hasan Tusher (THT)","Md. Abbas Ali Khan (AAK)",
"Ms. Samia Nawshin (SN)","Md. Sazzadur Ahamed (SZ)","Mr. Saiful Islam (SI)","Mr. Mohammad Monirul Islam (MMI)",
"Ms. Masuma Parvin (MPL)","Fatema Tuj Johora (FTJ)","Ms. Shirin Sultana (SSL)","Amit Chakraborty Chhoton (ACC)",
"Dewan Mamun Raza (DMR)","Dr. Md Alamgir Kabir (DMAK)","Mr. Mohammad Jahangir Alam (MJA)","Mushfiqur Rahman (MUR)",
"Mr. Shahadat Hossain (SH)","Md Masum Billah (MMB)","Ms. Sharun Akter Khushbu (SAK)","Mr. Amir Sohel (ARS)",
"Mr. Md Assaduzzaman (MA)","Mr. Mayen Uddin Mojumdar (MUM)","Md. Hasanuzzaman Dipu (MHD)","Fahiba Farhin (FFN)",
"Ms. Sakia Shabnam Kader","Tapasy Rabeya (TRA)","Ms. Aliza Ahmed Khan (ADK)","Zakia Sultana Eshita (ZS)",
"Mst. Sharmin Akter (SAR)","Md. Firoz Hasan (FH)","Israt Jahan (IJN)","Lamia Rukhsara (LR)","Eng. Mosharraf Hossain Khan (MHK)",
"Mr. Md Mohammad Masum Bakaul (MB)","Shamim Hossain (SMH)","MD. RASEDUL ISLAM (MRIS)","Md. Shah Jalal (MSJ)",
"Mr. Md Umaid Hasan (MUH)","Tanzina Afroz Rimi (TAR)","Mr. Abdullah Al Mamun (AAM)","Ms. Syada Tasmia Alvi (STA)",
"Ms. Umme Ayman (UA)","Mr. Md. Mizanur Rahman (MMRN)","Ms. Tasfia Anika Bushra (TAB)","Mr. Md. Aynul Hasan Nahid (AHN)",
"Ms. Nahid Sultana (NDS)","Md. Ferdouse Ahmed Foysal (FAF)","Mr. Partha Dip Sarkar (PDS)","Mr. Md. Mahedi Hassan (MHS)",
"Mr. Mahimul Islam Nadim (MIN)","Mr. Golam Rabbany (GR)","Mr. Md. Ashraful Islam Talukder (MAIT)","Ms. Dristi Saha (DS)",
"Ms. Zannatul Mawa Koli (ZMK)","Mr. Tanvirul Islam (TI)","Mr. Rahmatul Kabir Rasel Sarker (RKR)","Mr. Md. Monarul Islam (MIS)",
"Atia Sanjida Talulder (AST)","Umme Habiba (UH)","Hasnur Jahan (HJ)","Md. Jahidul Alam (JLA)","Sakib Mahmood Chowdhury (SMC)",
"Anup Kumar Modak (AKM)","Md. Atikul Islam (MAI)","Md. Jakaria Zobair (MJZ)","Md. Abdullah-Al-Kafi (AHAK)","Shahriar Shakil (MSS)",
"Ms Rabeya Khatun (RAK)","Ms. Nushrat Jahan Oyshi (NJO)","Ms Sadia Jannat Mitu (SAJ)","Ms Shahrin Khan (SNK)","Mr Mehadi Hasan (MHN)",
"Mr Mir Safwan Marzouq (MSM)","Mr Ashaf Uddaula (AUA)","Ms Faiza Feroz (FFZ)","Arpita Ghose Tusi (AGT)","Husne Mubarak (HMK)",
"Chayti Saha (CSA)","Abdullah Al-Amin (AAA)","Noor Muhammad (NRM)","Abdullah Al Sakib (AAS)","Md. Ashik-E-Elahe (AEE)",
"Md. Roni Islam (RIM)","Saida Mahmuda Rahman (SMN)","Md. Al-Mamun (AMN)","Abir Saha (ASA)","Angshuman Rashid (ANR)",
"S. M. Sharif Hasan (SMSH)","Tamanna Sultana (TAS)","MD. MEZBAUL ISLAM ZION (MIZ)","Nafiz Ahmed Emon (NAE)","Shadman Rabby (SHR)",
"Jamilul Huq Jami (JHJ)","Ms. Rowzatul Zannat (ROZ)","Md. Hefzul Hossain Papon (HHP)","Syed Eftasum Alam (SEA)",
"Mohammed Sami Khan (MSK)","Shoumik Debnath (SHD)","Ms. Rimi Akter (RIA)","Ms. Taslima Akhter (TAK)","Muhammad Abu Rayan (MAR)",
"Md. Zami Al Zunaed Farabe (ZAF)","Md. Alvee Ehsan (ALE)","Pranto Protim Choudhury (PPC)","Md. Shakib Hossain (MSH)",
"Mizanur Rahman (MRR)","Mohiuddin Muhi (MNM)","Monju Akter Mou (MAM)","Abdullah Ar Rafi (AAR)","Nishat Sadaf Lira (NSL)",
"Fahim Ahsan (FMA)","Md. Jubayar Alam Rafi (JAR)","Showmick Guha Paul (SGP)","Mir Faiyaz Hossain (MFZ)","Md. Yousuf Ali (MYA)",
"Mushfiqur Rahman Chowdhury (MRC)","Shreya Nag Riya (SNR)","Nishat Tasnim Shishir (NTS)","Z N M Zarif Mahmud (ZZM)",
"Fardowsi Rahman (FRN)","Nawshin Haque (NHE)","Liza Akter (LAR)","Md. Mahabul Alom Santo (MAS)","Md. Jahangir Alam (JAM)",
"Jotirmoy Roy (JRY)","Kridita Ray (KRY)","Shaswata Bhattacharya (SBA)","Md. Taufik Hasan (MTN)","Indrani Sen Toma (IST)",
"Shahariar Sarkar (SRS)","Sadaf M. Anis (SFMA)","Sourav Majumder (SVM)","S. M. Faisal (SMF)","Md. Touhidul Islam Sovon (TIS)",
"Tanjir Ahmed Anik (TAA)","Md. Aman Ullah (MAU)","Md. Mehefujur Rahman Mubin (MRM)","Sayeda Parvin (SAP)","Most. Sanjida Afrin (MSA)",
"Mohammad Rony (MRY)","Khandoker Nosiba Arifin (KNA)","Pallabi Biswas (PB)","Tasmiah Rahman (TRN)","MS. SUBARNA AKTER LIZA (SAL)",
"Md. Ridoy Sarkar (RYS)","Nazia Nuzhat (NNT)","Yamina Islam (YI)","Md. Imtiaj Hossain (MIH)","Professor Dr. Monzur Morshed (MM)",
"Mr. Mohammad Mahmudur Rahman (MMR)","Syeda Maria Rahman (SMR)","Ms. Shanjida Habib Swarna (SHS)","Md. Alamgir Hossain (ARH)",
"Ms. Ummey Fariha (UF)","Md. Shamim Hossain (SHN)","Md. Emad Hossain Likhon (EHL)","Md. Shadman Mostafa (SMA)","Bakhtiar Muiz (BM)",
"MD TASLIM ARIF (MTF)","Muha. Humayet Islam (MHI)","Md. Shihab Uddin (MSU)","Mohammad Al Rasel (MLR)","Kazi Hasibur Rahman (KHR)",
"Md. Atiqure Rahman Shanto (MRS)","Indrojit Sarkar (ITS)","Md. Rashedul Alam (MRA)","Sadman Sadik Khan (SKN)","Md. Kamrul Hasan (KH)",
"Jannatun Naeem Tanin (JNT)","Md Ibrahim Patwary Khokan (IPK)","Sadikur Rahman Sadik (SRS)","Shumaiya Akter Shammi (SAS)",
"Md. Sagar Hossen (MSRH)","Prottasha Sarker (PS)","Sadia Afrin Sumi (SAS)","Sangeeta Kundu (SKU)","Mst. Ainunnahar Khatun (ARN)",
"Mohammad Rifat-Ul Islam (MRI)","Mohaimenul Khan (MK)","Sumiya Alam Chowdhury (SAC)","Atikur Rahman (MARR)","Md. Anamul Kabir Jewel (AKJ)",
"Ayesha Siddka Moon (ASM)","Ekramul Islam Khan (EIK)","Arinee Anjum (AEA)","Md. Rokonuzzaman","DEWAN ASHIQUZZAMAN (DAA)",
"Faisal Ahmed (FLA)","Muhammad Lutfur Rahman Abrar (LRA)","Md. Shamim Al Mamun (MSAM)","Md. Abdul Kader (ALK)","Nafis-Ul Momin (NUM)",
"Ishtiaque Ahmed","Debanjon Chakraborty","Sumona Afroz (SA)","Md. Naymul Islam Nayoun","Dr. Bimal Chandra Das (BCD)","Rafi Al Mahmud (RAM)",
"Shadab Sheper (SBS)","Unknown"
];

const DEPARTMENTS = ["CSE", "Others"];

/* ================= COURSE LIST ================= */
const COURSES = [
  "ACT211","ACT301","ACT322","ACT327","AOL101","BNS101","CSE112","CSE113","CSE114","CSE115","CSE121","CSE122","CSE123","CSE124","CSE131","CSE132","CSE133","CSE134","CSE135","CSE136","CSE212","CSE213","CSE214","CSE215","CSE216","CSE221","CSE222","CSE223","CSE224","CSE225","CSE226","CSE227","CSE228","CSE231","CSE232","CSE233","CSE234","CSE235","CSE236","CSE237","CSE311","CSE312","CSE313","CSE314","CSE315","CSE316","CSE317","CSE321","CSE322","CSE323","CSE324","CSE325","CSE326","CSE328","CSE331","CSE332","CSE333","CSE334","CSE335","CSE336","CSE411","CSE412","CSE413","CSE414","CSE415","CSE416","CSE417","CSE418","CSE421","CSE422","CSE423","CSE426","CSE427","CSE431","CSE444","CSE445","CSE446","CSE450","CSE498","CSE499","ECO237","ECO314","ECO321","ENG101","ENG102","ENG113","ENG123","GED121","GED131","GED201","GED216","GED321","MAT101","MAT102","MAT111","MAT121","MAT211","MAT223","PHY101","PHY102","PHY103","PHY113","PHY114","STA101","STA133","STA221","STA227"
];

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

/* =========================
   HELPER FUNCTIONS
========================= */
function formatBDDateTimeFromInput(dateValue) {
  if (!dateValue) return "";

  const nowBD = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );

  const d = new Date(dateValue);

  const finalDate = new Date(
    d.getFullYear(), d.getMonth(), d.getDate(),
    nowBD.getHours(), nowBD.getMinutes(), 0
  );

  return finalDate.toLocaleString("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true
  }).replace(/(\d{4})/, "$1,");
}

function animateCount(el, to) {
  if (!el) return;
  let start = 0;
  const step = Math.max(Math.ceil(to / 30), 1);
  const timer = setInterval(() => {
    start += step;
    if (start >= to) {
      el.innerText = to;
      clearInterval(timer);
    } else el.innerText = start;
  }, 20);
}

async function postForm(payload) {
  const params = new URLSearchParams(payload);
  const res = await fetch(API_URL, { method: "POST", body: params });
  return await res.json();
}

/* =========================
   DASHBOARD
========================= */
function loadDashboard() {
  fetch(`${API_URL}?action=get_dashboard`)
    .then(r => r.json())
    .then(d => {
      if (d.status !== "success") return;
      animateCount(document.getElementById("totalMissed"), d.totalMissed || 0);
      animateCount(document.getElementById("completed"), d.completed || 0);
      animateCount(document.getElementById("pending"), d.pending || 0);
      animateCount(document.getElementById("extraCount"), d.extra || 0);
    })
    .catch(err => console.error("Dashboard error:", err));
}

/* =========================
   MISSED CLASS
========================= */
document.getElementById("missedForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const res = await postForm({
    action: "save_missed",
    date: formatBDDateTimeFromInput(m_date.value),
    department: m_dept.value.trim(),
    course: m_course.value.trim(),
    room: m_room.value,
    timeSlot: m_time.value,
    teacherInitial: m_teacher.value,
    reason: m_reason.value.trim()
  });
  if (res.status === "success") {
    alert("Missed Class Saved!");
    e.target.reset();
    loadDashboard();
  } else alert(res.message || "Error saving missed class");
});

/* =========================
   MAKEUP CLASS
========================= */
document.getElementById("makeupForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const res = await postForm({
    action: "save_makeup",
    scheduleDate: formatBDDateTimeFromInput(k_schedule.value),
    department: k_dept.value.trim(),
    course: k_course.value.trim(),
    teacherInitial: k_teacher.value,
    makeupDate: formatBDDateTimeFromInput(k_date.value),
    makeupTime: k_time.value,
    makeupRoom: k_room.value,
    status: k_status.value,
    remarks: k_remarks.value.trim()
  });
  if (res.status === "success") {
    alert("Makeup Class Saved!");
    e.target.reset();
    loadPendingMakeup();
    loadDashboard();
  } else alert("Makeup save failed");
});

/* =========================
   PENDING MAKEUP
========================= */
function loadPendingMakeup() {
  fetch(`${API_URL}?action=get_pending_makeup`)
    .then(r => r.json())
    .then(res => {
      const tbody = document.querySelector("#pendingTable tbody");
      if (!tbody) return;
      tbody.innerHTML = "";
      if (!res.data || res.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9">No pending makeup classes</td></tr>`;
        return;
      }
      res.data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.scheduleDate}</td>
          <td>${row.department}</td>
          <td>${row.course}</td>
          <td>${row.teacher}</td>
          <td>${row.makeupDate}</td>
          <td>${row.makeupTime}</td>
          <td>${row.makeupRoom}</td>
          <td>${row.status}</td>
          <td>${row.remarks || ""}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}

/* =========================
   FILTER PENDING BY TEACHER
========================= */
document.addEventListener("input", e => {
  if (e.target.id !== "pendingTeacherSearch") return;
  const q = e.target.value.toLowerCase();
  document.querySelectorAll("#pendingTable tbody tr").forEach(tr => {
    const cell = tr.cells[3];
    tr.style.display = cell && cell.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

/* =========================
   BUTTON TOGGLE (UI)
========================= */
window.addEventListener("DOMContentLoaded", () => {
  const btnMissed = document.getElementById("btn-missed");
  const btnMakeup = document.getElementById("btn-makeup");
  const btnPending = document.getElementById("btn_pending");

  const missedForm = document.getElementById("missedForm");
  const makeupForm = document.getElementById("makeupForm");
  const pendingSection = document.getElementById("pendingSection");

  btnMissed.onclick = () => {
    missedForm.classList.remove("hidden");
    makeupForm.classList.add("hidden");
    pendingSection.classList.add("hidden");
  };

  btnMakeup.onclick = () => {
    makeupForm.classList.remove("hidden");
    missedForm.classList.add("hidden");
    pendingSection.classList.add("hidden");
  };

  btnPending.onclick = () => {
    pendingSection.classList.remove("hidden");
    missedForm.classList.add("hidden");
    makeupForm.classList.add("hidden");
    loadPendingMakeup();
  };

  // Load dashboard on page load
  loadDashboard();
  loadPendingMakeup();
});

/* =========================
   GOOGLE LOGIN
========================= */
let USER_EMAIL = "";

function googleLogin() {
  if (!window.google || !google.accounts) {
    alert("Google API not loaded yet. Please wait 2 seconds and try again.");
    return;
  }

  google.accounts.id.initialize({
    client_id: "YOUR_REAL_CLIENT_ID.apps.googleusercontent.com", // <- replace with your client ID
    callback: handleCredential
  });

  google.accounts.id.prompt();
}

function handleCredential(response) {
  const payload = JSON.parse(atob(response.credential.split(".")[1]));
  USER_EMAIL = payload.email;

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}
