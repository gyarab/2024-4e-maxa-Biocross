document.addEventListener("DOMContentLoaded", () => {
    var divCurses = document.getElementById("div-curses");
    var selectCourse = document.getElementById("select-course")

    if (!divCurses) {
        console.error("Element #div-curses nebyl nalezen!");
        return;
    }

    fetch('/classroomUcitel/ukoly', { headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            console.log("Data z API:", data);
            displayCurses(data.courses);
        })
        .catch(error => console.error('Chyba při vyhledávání:', error));

    function displayCurses(curses) {
        divCurses.innerHTML = ''; // Vyčištění předchozího obsahu
        selectCourse.innerHTML = ''; // Vyčištění předchozího obsahu
        selectCourse.innerHTML = ''; // nastaveni default 
        curses.forEach(result => {
        //ZOBRZENI KURZU DO SIDEBARU
            const listOfCurses = document.createElement('li'); // Změněno na <li>
            listOfCurses.innerHTML = `<a href="/classroomUcitel/kurz?id=${result.course_id}">${result.course_className} - ${result.course_name} </a>`;
            divCurses.appendChild(listOfCurses);
        //ZOBRZENI KURZU DO FORMLUARE PRO VYTVORENI UKOLU
            const selectListOfCurses = document.createElement('option');
            selectListOfCurses.innerHTML = `<option value="${result.course_id}">${result.course_className} - ${result.course_name} (${result.course_id})</option>`;
            selectCourse.appendChild(selectListOfCurses);
        });
    }
});

