document.addEventListener("DOMContentLoaded", () => {
    var divCurses = document.getElementById("div-curses");

    if (!divCurses) {
        console.error("Element #div-curses nebyl nalezen!");
        return;
    }

    fetch('/classroomUcitel/ukoly', { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            console.log("Data z API:", data);
            displayCurses(data);
        })
        .catch(error => console.error('Chyba při vyhledávání:', error));

    function displayCurses(curses) {
        divCurses.innerHTML = ''; // Vyčištění předchozího obsahu
        curses.forEach(result => {
            const listOfCurses = document.createElement('li'); // Změněno na <li>
            listOfCurses.innerHTML = `<a href="#">${result.course_className} - ${result.course_teacherName} (${result.course_year})</a>`;
            divCurses.appendChild(listOfCurses);
        });
    }
});
