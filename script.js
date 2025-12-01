const API_URL = "https://script.google.com/macros/s/AKfycbxJ8pp2zioxwYxKpTkrVdDWudmQUrKXe9KYVosi2EbhuMVdyjqF-1-OzafhtJip_K491w/exec";

/* ------------ MISSED CLASS SUBMIT ------------- */
document.getElementById("missedForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const missedData = {
        action: "save_missed",
        date: document.getElementById("m_date").value,
        department: document.getElementById("m_dept").value,
        course: document.getElementById("m_course").value,
        teacherInitial: document.getElementById("m_teacher").value,
        reason: document.getElementById("m_reason").value
    };

    const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(missedData)
    });
    const result = await res.json();

    if (result.status === "success") {
        alert("Missed Class Saved!");
        document.getElementById("missedForm").reset();
    } else {
        alert("Failed to save missed class.");
    }
});

/* ------------ MAKEUP CLASS SUBMIT ------------- */
document.getElementById("makeupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const makeupData = {
        action: "save_makeup",
        scheduleDate: document.getElementById("k_schedule").value,
        department: document.getElementById("k_dept").value,
        course: document.getElementById("k_course").value,
        teacherInitial: document.getElementById("k_teacher").value,
        makeupDate: document.getElementById("k_date").value,
        makeupTime: document.getElementById("k_time").value,
        makeupRoom: document.getElementById("k_room").value,
        status: document.getElementById("k_status").value
    };

    const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(makeupData)
    });
    const result = await res.json();

    if (result.status === "success") {
        alert("Makeup Class Saved!");
        document.getElementById("makeupForm").reset();
    } else {
        alert("Failed to save makeup class.");
    }
});