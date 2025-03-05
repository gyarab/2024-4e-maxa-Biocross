
// zobrazeni kurzu v sidebaru
var divCurses = document.getElementById("div-curses");

fetch(`/classroom`+location.search, {headers: {
    'Accept': 'application/json'
}})
    .then(response => response.json())
    .then(curses =>  displayCurses(curses))
    .catch(error => console.error('Chyba při vyhledávání:', error));

function displayCurses(curses) {
    divCurses.innerHTML = '';
    curses.forEach(result => {
        const listOfCurses = document.createElement('div');
            
        listOfCurses.innerHTML = '<li><a href="/classroom/kurz?id='+result.course_id+'">'+result.course_className+" "+ result.course_name+'</a></li>';
        divCurses.appendChild(listOfCurses);
        
      });
}

