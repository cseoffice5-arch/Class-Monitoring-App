# 🎓 Class Monitoring System (Makeup & Missed Class Manager)

## 📌 Overview

The **Class Monitoring System** is a web-based application designed for universities/varsities to manage:

* Missed classes
* Makeup classes
* Pending makeup approvals
* Empty room availability
* Real-time dashboard summary

It helps teachers, coordinators, and administrators efficiently track and manage class schedules and makeup sessions in a structured and automated way.

---

## ✨ Key Features

### ✅ Dashboard

* Total Missed Classes
* Total Completed Makeup
* Total Pending Makeup
* Total Empty Rooms Available

### 📅 Missed Class Entry

Teachers can submit:

* Date
* Time
* Course (Section)
* Teacher Initial
* Room
* Remarks

### 🔁 Makeup Class Management

* Submit new makeup requests
* Track pending makeup list
* Approve/complete makeup classes
* Automatic removal from pending list after completion

### 🏫 Empty Room Checker

* Automatically detects empty rooms from Routine Master
* Displays available rooms by **Day + Time + Room**
* One-click “Book” option for makeup class

### 🔍 Smart Search (Mobile & PC Friendly)

* Search pending makeup by Teacher Initial
* Search missed/makeup records easily

---

## 🏗️ System Architecture

### Frontend (Hosted on GitHub Pages)

* HTML
* CSS (Responsive & Mobile Friendly)
* JavaScript (Fetch API, Dynamic Tables, Filters)

### Backend (Google Apps Script Web App)

Provides API endpoints such as:

* `get_dashboard`
* `get_routine_master`
* `save_missed`
* `save_makeup`
* `get_pending_makeup`
* `update_makeup`
* `check_room`
* `get_empty_rooms`

---

## 🚀 Live App (GitHub Pages)

👉 Replace with your actual GitHub Pages link after publishing:

```
https://yourusername.github.io/Class-Monitoring-System/
```

---

## 🔗 Google Apps Script API (Backend)

Your Web App URL (already working):

```
https://script.google.com/macros/s/AKfycbwFlDrplCzmYeykNATmV8mR86RZmAaJpC8zJTi_pfpjMiMGgtdp8ZkwN8c2k4fFXbaSUA/exec
```

---

## 🛠️ How to Run Locally (Optional)

1. Clone the repository:

```bash
git clone https://github.com/sarower9617-laboni/Class-Monitoring-System.git
```

2. Open `index.html` in your browser.

3. Make sure your Google Apps Script Web App is deployed as:

* **Anyone → Anyone (even anonymous)**

---

## 📂 Google Sheet Structure (Required)

### Sheet: `Routine_Master`

Columns format (example):

```
Day | Time Slot-1 | Room | Course | Teacher | Time Slot-2 | Room | ...
```

### Sheet: `Makeup_Records`

Stores:

* Date
* Time
* Room
* Course
* Teacher Initial
* Status (Pending/Completed)
* Remarks

---

## 📱 Mobile Friendly

Fully responsive for:

* Android
* iPhone
* Tablet
* Laptop / Desktop

---

## 👨‍💼 Developed For

**Department of CSE, Daffodil International University (DIU)**
Built under the guidance of the Head, Department of CSE.

---

## 🧑‍💻 Developed By

**Md. Sarower Mal**
Coordination Officer, CSE (DIU)

---

## 📜 License

Open for academic use within DIU.
For external use, please seek permission.

---

## ⭐ If you find this useful, give a star on GitHub!
