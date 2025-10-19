document.addEventListener("DOMContentLoaded", () => {
    
    // 2026 की भारतीय छुट्टियाँ (पहले जैसी ही)
    const holidays_2026 = {
        0: { 1: "New Year's Day", 14: "Makar Sankranti / Pongal",22: "Shree Ram Pooja", 26: "Republic Day" },
        1: { 17: "Maha Shivaratri" },
        2: { 8: "Holi", 22: "Eid-ul-Fitr (Approx.)", 29: "Ram Navami" },
        3: { 3: "Mahavir Jayanti / Good Friday" },
        4: { 1: "May Day (Labour Day)", 4: "Buddha Purnima", 29: "Eid-ul-Adha (Approx.)" },
        5: {},
        6: { 28: "Muharram (Approx.)" },
        7: { 15: "Independence Day", 24: "Raksha Bandhan" },
        8: { 4: "Janmashtami" },
        9: { 2: "Gandhi Jayanti", 20: "Dussehra (Vijayadashami)" },
        10: { 8: "Diwali (Deepavali)", 9: "Bhai Dooj", 23: "Guru Nanak Jayanti" },
        11: { 25: "Christmas" }
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const calendarContainer = document.getElementById("calendar-container");
    const year = 2026;

    // सभी 12 महीनों के लिए लूप
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        
        const monthDiv = document.createElement("div");
        monthDiv.className = "month";

        const monthHeader = document.createElement("div");
        monthHeader.className = "month-header";
        monthHeader.textContent = monthNames[monthIndex];
        monthDiv.appendChild(monthHeader);

        const weekdaysDiv = document.createElement("div");
        weekdaysDiv.className = "weekdays";
        dayNames.forEach(day => {
            const dayEl = document.createElement("div");
            dayEl.textContent = day;
            weekdaysDiv.appendChild(dayEl);
        });
        monthDiv.appendChild(weekdaysDiv);

        const daysDiv = document.createElement("div");
        daysDiv.className = "days";

        // --- नया: छुट्टी की लिस्ट के लिए div ---
        const holidayListDiv = document.createElement("div");
        holidayListDiv.className = "holiday-list";

        const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        // खाली डिब्बे
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "day empty";
            daysDiv.appendChild(emptyCell);
        }

        // महीने की सभी तारीखों के लिए लूप
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement("div");
            dayCell.className = "day";
            dayCell.textContent = day;

            const currentDate = new Date(year, monthIndex, day);
            const dayOfWeek = currentDate.getDay();

            if (dayOfWeek === 0) {
                dayCell.classList.add("sunday");
            }

            // छुट्टी की जाँच करें
            if (holidays_2026[monthIndex] && holidays_2026[monthIndex][day]) {
                const holidayName = holidays_2026[monthIndex][day];
                
                // 1. तारीख को हाइलाइट करें
                dayCell.classList.add("holiday");
                
                // 2. (बदलाव) इसे नीचे वाली लिस्ट में जोड़ें
                const holidayItem = document.createElement("div");
                holidayItem.className = "holiday-item";
                // आइकन के साथ HTML सेट करें
                holidayItem.innerHTML = `🗓️ <strong>${day}:</strong> ${holidayName}`;
                holidayListDiv.appendChild(holidayItem);
            }

            daysDiv.appendChild(dayCell);
        }

        // तारीखों के ग्रिड को जोड़ें
        monthDiv.appendChild(daysDiv);
        
        // --- नया: छुट्टियों की लिस्ट को महीने के div में जोड़ें ---
        // (अगर उस महीने में कोई छुट्टी है, तभी लिस्ट को जोड़ें)
        if (holidayListDiv.hasChildNodes()) {
            monthDiv.appendChild(holidayListDiv);
        }

        // पूरे महीने को कैलेंडर में जोड़ें
        calendarContainer.appendChild(monthDiv);
    }
});