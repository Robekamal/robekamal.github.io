document.addEventListener("DOMContentLoaded", function () {
  const dateElements = document.querySelectorAll("time[datetime]");

  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  dateElements.forEach(function (el) {
    const isoDate = el.getAttribute("datetime");

    if (!isoDate) return;

    const date = new Date(isoDate);

    if (isNaN(date)) return;

    const parts = formatter.formatToParts(date);

    const day = parts.find(part => part.type === "day")?.value;
    const month = parts.find(part => part.type === "month")?.value;
    const year = parts.find(part => part.type === "year")?.value;

    if (!day || !month || !year) return;

    el.textContent = `${day} ${month} ${year}`;

    el.setAttribute("dir", "rtl");
    el.style.unicodeBidi = "plaintext";
  });
});
