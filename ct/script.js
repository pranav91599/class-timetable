document.addEventListener("DOMContentLoaded", function () {
    let slots = [
        { start: 9 * 60 + 20, end: 10 * 60 + 10 },
        { start: 10 * 60 + 10, end: 11 * 60 },
        { start: 11 * 60 + 15, end: 12 * 60 + 5 },
        { start: 12 * 60 + 5, end: 12 * 60 + 55 },
        { start: 14 * 60 + 5, end: 14 * 60 + 50 },
        { start: 14 * 60 + 50, end: 15 * 60 + 35 },
        { start: 15 * 60 + 50, end: 16 * 60 + 35 },
        { start: 16 * 60 + 35, end: 17 * 60 + 20 },
    ];

    setInterval(updateCurrentClass, 1000);
    updateCurrentClass();

    function updateCurrentClass() {
        let now = new Date();
        let currentTime = now.getHours() * 60 + now.getMinutes();
        let dayIndex = now.getDay() - 1;

        document.getElementById("device-time").innerText = formatAMPM(now);

        if (dayIndex < 0 || dayIndex > 5) return;

        let cells = document.querySelectorAll("td");
        cells.forEach(cell => cell.classList.remove("current"));

        document.getElementById("current-subject").innerText = "None";
        document.getElementById("time-remaining").innerText = "--";

        for (let i = 0; i < slots.length; i++) {
            if (currentTime >= slots[i].start && currentTime < slots[i].end) {
                let row = document.querySelectorAll("tbody tr")[dayIndex];
                let cell = row.children[i + 1];
                if (cell) {
                    cell.classList.add("current");
                    document.getElementById("current-subject").innerText = cell.innerText;
                    let remainingTime = (slots[i].end * 60) - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
                    document.getElementById("time-remaining").innerText = formatCountdown(remainingTime);
                }
                break;
            }
        }
    }

    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${ampm}`;
    }

    function formatCountdown(seconds) {
        let h = Math.floor(seconds / 3600);
        let m = Math.floor((seconds % 3600) / 60);
        let s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    }
});
