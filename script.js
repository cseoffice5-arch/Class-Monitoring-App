/* ------------------------
   SET YOUR DEPLOYED WEB APP URL
------------------------- */
const API_URL = "https://script.google.com/macros/s/AKfycbypHtIPYMJq_5Hr5FUVJr3pH2ADTOVGfZTMJS_bCEeVjxaIWqR26q5uYSlGZbqJtUk/exec";

/* ---------- DATA ARRAYS ---------- */
const TEACHERS = [ "Dr. Sheak Rashed Haider Noori (SRH)", "Dr. S.M Aminul Haque (SMAH)", "Dr. Arif Mahmud (AM)", "Dr. Md. Fokhray Hossain (MFH)", "Professor Dr. Md. Adnan Kiber (MAK)", "Professor Dr. Fernaz Narin Nur (FNN)", "Dr. Md. Zahid Hasan (ZH)", "Ms. Nazmun Nessa Moon (NNM)", "Dr. Fizar Ahmed (FZA)", "Dr. Naznin Sultana (NS)", "Dr. Md. Kamrul Hossain (MKH)", "Dr. Mr. Abdus Sattar (AS)", "Mr. Anuz Kumar Chakrabarty (AKC)", "Dr. Md. Ali Hossain (MAH)", "Dr. Md. Akhtaruzzaman (DAN)", "Dr. Mohammad Nuruzzaman Bhuiyan (MNB)", "Mohammad Salek Parvez (SP)", "Mr. Md. Sadekur Rahman (SR)", "Mr. Shah Md Tanvir Siddiquee (SMTS)", "Most. Hasna Hena (HH)", "Raja Tariqul Hasan Tusher (THT)", "Md. Abbas Ali Khan (AAK)", "Ms. Samia Nawshin (SN)", "Md. Sazzadur Ahamed (SZ)", "Mr. Saiful Islam (SI)", "Mr. Mohammad Monirul Islam (MMI)", "Ms. Masuma Parvin (MPL)", "Fatema Tuj Johora (FTJ)", "Ms. Shirin Sultana (SSL)", "Amit Chakraborty Chhoton (ACC)", "Dewan Mamun Raza (DMR)", "Dr. Md Alamgir Kabir (DMAK)", "Mr. Mohammad Jahangir Alam (MJA)", "Mushfiqur Rahman (MUR)", "Mr. Shahadat Hossain (SH)", "Md Masum Billah (MMB)", "Ms. Sharun Akter Khushbu (SAK)", "Mr. Amir Sohel (ARS)", "Mr. Md Assaduzzaman (MA)", "Mr. Mayen Uddin Mojumdar (MUM)", "Md. Hasanuzzaman Dipu (MHD)", "Fahiba Farhin (FFN)", "Ms. Sakia Shabnam Kader", "Tapasy Rabeya (TRA)", "Ms. Aliza Ahmed Khan (ADK)", "Zakia Sultana Eshita (ZS)", "Mst. Sharmin Akter (SAR)", "Md. Firoz Hasan (FH)", "Israt Jahan (IJN)", "Lamia Rukhsara (LR)", "Eng. Mosharraf Hossain Khan (MHK)", "Mr. Md Mohammad Masum Bakaul (MB)", "Shamim Hossain (SMH)", "MD. RASEDUL ISLAM (MRIS)", "Md. Shah Jalal (MSJ)", "Mr. Md Umaid Hasan (MUH)", "Tanzina Afroz Rimi (TAR)", "Mr. Abdullah Al Mamun (AAM)", "Ms. Syada Tasmia Alvi (STA)", "Ms. Umme Ayman (UA)", "Mr. Md. Mizanur Rahman (MMRN)", "Ms. Tasfia Anika Bushra (TAB)", "Mr. Md. Aynul Hasan Nahid (AHN)", "Ms. Nahid Sultana (NDS)", "Md. Ferdouse Ahmed Foysal (FAF)", "Mr. Partha Dip Sarkar (PDS)", "Mr. Md. Mahedi Hassan (MHS)", "Mr. Mahimul Islam Nadim (MIN)", "Mr. Golam Rabbany (GR)", "Mr. Md. Ashraful Islam Talukder (MAIT)", "Ms. Dristi Saha (DS)", "Ms. Zannatul Mawa Koli (ZMK)", "Mr. Tanvirul Islam (TI)", "Mr. Rahmatul Kabir Rasel Sarker (RKR)", "Mr. Md. Monarul Islam (MIS)", "Atia Sanjida Talulder (AST)", "Umme Habiba (UH)", "Hasnur Jahan (HJ)", "Md. Jahidul Alam (JLA)", "Sakib Mahmood Chowdhury (SMC)", "Anup Kumar Modak (AKM)", "Md. Atikul Islam (MAI)", "Md. Jakaria Zobair (MJZ)", "Md. Abdullah-Al-Kafi (AHAK)", "Shahriar Shakil (MSS)", "Ms Rabeya Khatun (RAK)", "Ms. Nushrat Jahan Oyshi (NJO)", "Ms Sadia Jannat Mitu (SAJ)", "Ms Shahrin Khan (SNK)", "Mr Mehadi Hasan (MHN)", "Mr Mir Safwan Marzouq (MSM)", "Mr Ashaf Uddaula (AUA)", "Ms Faiza Feroz (FFZ)", "Arpita Ghose Tusi (AGT)", "Husne Mubarak (HMK)", "Chayti Saha (CSA)", "Abdullah Al-Amin (AAA)", "Noor Muhammad (NRM)", "Abdullah Al Sakib (AAS)", "Md. Ashik-E-Elahe (AEE)", "Md. Roni Islam (RIM)", "Saida Mahmuda Rahman (SMN)", "Md. Al-Mamun (AMN)", "Abir Saha (ASA)", "Angshuman Rashid (ANR)", "S. M. Sharif Hasan (SMSH)", "Tamanna Sultana (TAS)", "MD. MEZBAUL ISLAM ZION (MIZ)", "Nafiz Ahmed Emon (NAE)", "Shadman Rabby (SHR)", "Jamilul Huq Jami (JHJ)", "Ms. Rowzatul Zannat (ROZ)", "Md. Hefzul Hossain Papon (HHP)", "Syed Eftasum Alam (SEA)", "Mohammed Sami Khan (MSK)", "Shoumik Debnath (SHD)", "Ms. Rimi Akter (RIA)", "Ms. Taslima Akhter (TAK)", "Muhammad Abu Rayan (MAR)", "Md. Zami Al Zunaed Farabe (ZAF)", "Md. Alvee Ehsan (ALE)", "Pranto Protim Choudhury (PPC)", "Md. Shakib Hossain (MSH)", "Mizanur Rahman (MRR)", "Mohiuddin Muhi (MNM)", "Monju Akter Mou (MAM)", "Abdullah Ar Rafi (AAR)", "Nishat Sadaf Lira (NSL)", "Fahim Ahsan (FMA)", "Md. Jubayar Alam Rafi (JAR)", "Showmick Guha Paul (SGP)", "Mir Faiyaz Hossain (MFZ)", "Md. Yousuf Ali (MYA)", "Mushfiqur Rahman Chowdhury (MRC)", "Shreya Nag Riya (SNR)", "Nishat Tasnim Shishir (NTS)", "Z N M Zarif Mahmud (ZZM)", "Fardowsi Rahman (FRN)", "Nawshin Haque (NHE)", "Liza Akter (LAR)", "Md. Mahabul Alom Santo (MAS)", "Md. Jahangir Alam (JAM)", "Jotirmoy Roy (JRY)", "Kridita Ray (KRY)", "Shaswata Bhattacharya (SBA)", "Md. Taufik Hasan (MTN)", "Indrani Sen Toma (IST)", "Shahariar Sarkar (SRS)", "Sadaf M. Anis (SFMA)", "Sourav Majumder (SVM)", "S. M. Faisal (SMF)", "Md. Touhidul Islam Sovon (TIS)", "Tanjir Ahmed Anik (TAA)", "Md. Aman Ullah (MAU)", "Md. Mehefujur Rahman Mubin (MRM)", "Sayeda Parvin (SAP)", "Most. Sanjida Afrin (MSA)", "Mohammad Rony (MRY)", "Khandoker Nosiba Arifin (KNA)", "Pallabi Biswas (PB)", "Tasmiah Rahman (TRN)", "MS. SUBARNA AKTER LIZA (SAL)", "Md. Ridoy Sarkar (RYS)", "Nazia Nuzhat (NNT)", "Yamina Islam (YI)", "Md. Imtiaj Hossain (MIH)", "Professor Dr. Monzur Morshed (MM)", "Mr. Mohammad Mahmudur Rahman (MMR)", "Syeda Maria Rahman (SMR)", "Ms. Shanjida Habib Swarna (SHS)", "Md. Alamgir Hossain (ARH)", "Ms. Ummey Fariha (UF)", "Md. Shamim Hossain (SHN)", "Md. Emad Hossain Likhon (EHL)", "Md. Shadman Mostafa (SMA)", "Bakhtiar Muiz (BM)", "MD TASLIM ARIF (MTF)", "Muha. Humayet Islam (MHI)", "Md. Shihab Uddin (MSU)", "Mohammad Al Rasel (MLR)", "Kazi Hasibur Rahman (KHR)", "Md. Atiqure Rahman Shanto (MRS)", "Indrojit Sarkar (ITS)", "Md. Rashedul Alam (MRA)", "Sadman Sadik Khan (SKN)", "Md. Kamrul Hasan (KH)", "Jannatun Naeem Tanin (JNT)", "Md Ibrahim Patwary Khokan (IPK)", "Sadikur Rahman Sadik (SRS)", "Shumaiya Akter Shammi (SAS)", "Md. Sagar Hossen (MSRH)", "Prottasha Sarker (PS)", "Sadia Afrin Sumi (SAS)", "Sangeeta Kundu (SKU)", "Mst. Ainunnahar Khatun (ARN)", "Mohammad Rifat-Ul Islam (MRI)", "Mohaimenul Khan (MK)", "Sumiya Alam Chowdhury (SAC)", "Atikur Rahman (MARR)", "Md. Anamul Kabir Jewel (AKJ)", "Ayesha Siddka Moon (ASM)", "Ekramul Islam Khan (EIK)", "Arinee Anjum (AEA)", "Md. Rokonuzzaman", "DEWAN ASHIQUZZAMAN (DAA)", "Faisal Ahmed (FLA)", "Muhammad Lutfur Rahman Abrar (LRA)", "Md. Shamim Al Mamun (MSAM)", "Md. Abdul Kader (ALK)", "Nafis-Ul Momin (NUM)", "Ishtiaque Ahmed", "Debanjon Chakraborty", "Sumona Afroz (SA)", "Md. Naymul Islam Nayoun", "Dr. Bimal Chandra Das (BCD)", "Rafi Al Mahmud (RAM)", "Shadab Sheper (SBS)", "Unknown" ]; const ROOMS = [ "201","208","213","216","217","218","219","220","221","222","223","224", "302","303","304","305","306","307","318(A)","318(B)","320", "801(A)","801(B)","802","803","804","813(B)", "514","515","516","517(A)","518","916","919","204", "G1-026","G1-027","501(A)","501(B)","503","504","510","513", "G1-001","G1-002","G1-003","G1-004","G1-005","G1-006","G1-007","G1-008", "G1-009","G1-010","G1-011","G1-012","G1-013","G1-014","G1-016","G1-017", "G1-018","G1-020","G1-021","G1-022", "809","810","301","502","103","105","815","816" ]; const TIMES = [ "8:30 AM - 10:00 AM", "10:00 AM - 11:30 AM", "11:30 AM - 1:00 PM", "1:00 PM - 2:30 PM", "2:30 PM - 4:00 PM", "4:00 PM - 5:30 PM" ];

/* ---------- POPULATE DROPDOWNS ---------- */
function populateSelect(id, list, placeholder) {
  const sel = document.getElementById(id);
  if (!sel) return;
  sel.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = "";
  ph.text = placeholder || "-- Select --";
  sel.appendChild(ph);
  list.forEach(v => {
    const o = document.createElement("option");
    o.value = v;
    o.text = v;
    sel.appendChild(o);
  });
}

/* ---------- POPULATE ON LOAD ---------- */
window.addEventListener("DOMContentLoaded", () => {
  populateSelect("m_teacher", TEACHERS, "-- Select Teacher --");
  populateSelect("m_room", ROOMS, "-- Select Room --");
  populateSelect("m_time", TIMES, "-- Select Time Slot --");

  populateSelect("k_teacher", TEACHERS, "-- Select Teacher --");
  populateSelect("k_room", ROOMS, "-- Select Room --");
  populateSelect("k_time", TIMES, "-- Select Time Slot --");

  // Watermark updates
  document.getElementById("m_teacher").addEventListener("change", e => {
    document.getElementById("m_teacher_watermark").textContent = e.target.value ? "Selected teacher: " + e.target.value : "";
  });
  document.getElementById("k_teacher").addEventListener("change", e => {
    document.getElementById("k_teacher_watermark").textContent = e.target.value ? "Selected teacher: " + e.target.value : "";
  });
});

/* ---------- POST DATA AS JSON TO GOOGLE SHEET ---------- */
async function postForm(payload) {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const text = await resp.text();
  try { return JSON.parse(text); }
  catch { return { status: "error", message: "Invalid server response: " + text }; }
}

/* ---------- MISSED CLASS SUBMIT ---------- */
document.getElementById("missedForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const payload = {
    action: "save_missed",
    date: document.getElementById("m_date").value,
    department: document.getElementById("m_dept").value,
    course: document.getElementById("m_course").value,
    room: document.getElementById("m_room").value,
    timeSlot: document.getElementById("m_time").value,
    teacherInitial: document.getElementById("m_teacher").value,
    reason: document.getElementById("m_reason").value
  };
  if (!payload.date || !payload.department || !payload.course || !payload.room || !payload.teacherInitial) {
    return alert("Please fill all required fields.");
  }
  const result = await postForm(payload);
  alert(result.status === "success" ? "Missed Class Saved!" : "Failed: " + result.message);
  if(result.status==="success") this.reset();
});

/* ---------- MAKEUP CLASS SUBMIT ---------- */
document.getElementById("makeupForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const payload = {
    action: "save_makeup",
    scheduleDate: document.getElementById("k_schedule").value,
    department: document.getElementById("k_dept_m").value, // make sure this matches your HTML
    course: document.getElementById("k_course").value,
    teacherInitial: document.getElementById("k_teacher").value,
    makeupDate: document.getElementById("k_date").value,
    makeupTime: document.getElementById("k_time").value,
    makeupRoom: document.getElementById("k_room").value,
    status: document.getElementById("k_status").value,
    remarks: document.getElementById("k_remarks").value
  };
  if (!payload.scheduleDate || !payload.department || !payload.course || !payload.teacherInitial || !payload.makeupDate || !payload.makeupTime || !payload.makeupRoom) {
    return alert("Please fill all required fields.");
  }
  const result = await postForm(payload);
  alert(result.status === "success" ? "Makeup Class Saved!" : "Failed: " + result.message);
  if(result.status==="success") this.reset();
});