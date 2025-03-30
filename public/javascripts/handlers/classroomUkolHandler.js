var divCourses = document.getElementById("div-curses");       
var divTasks = document.getElementById("task-container");


fetch(`/classroom/ukoly` + location.search, { headers: { 'Accept': 'application/json' } })
    .then(response => response.json())  // Převeď odpověď na JSON
    .then(data => {
        displayCourses(data.courses); // Kurzy
        displayTasks(data.tasks);    // Úkoly
    })
    .catch(error => console.error('Chyba při vyhledávání:', error));

function displayTasks(tasks) {
    divTasks.innerHTML = '';  // Vyprázdni div před přidáním nových dat

    tasks.forEach(task => {
        const taskCard = document.createElement('div');

        taskCard.innerHTML = `  <div class="task-card" onclick="goToCourse(${task.course_id})">
                <div class="task-title">${task.task_name}</div>
                <div class="task-info"><b>Kurz:</b> ${task.course_name}</div>
                <div class="task-info"><b>Učitel:</b>${task.course_teacherName}</div>
            </div>`;

        
        
        divTasks.appendChild(taskCard);
    });
}
function displayCourses(courses) {
    divCourses.innerHTML = '';
    courses.forEach(result => {
        const listOfCourses = document.createElement('div');
            
        listOfCourses.innerHTML = `<li><a href="/classroom/kurz?id=${result.course_id}">${result.course_className}  ${result.course_name}</a></li>`;
        divCourses.appendChild(listOfCourses);
        
      });
}