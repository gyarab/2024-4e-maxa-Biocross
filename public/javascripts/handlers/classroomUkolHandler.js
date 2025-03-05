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
        taskCard.classList.add('task-card');
        taskCard.setAttribute('onclick', 'toggleTask(this)');

        taskCard.innerHTML = `
            <div class="task-header">
                <h2>${task.task_name}</h2>
            </div>
            <div class="task-body">
                <p><strong>Kurz:</strong> ${task.course_name}</p>
                <p><strong>Učitel:</strong> ${task.course_teacherName}</p>
            </div>
            <div class="task-details">
                <p><strong>Popis úkolu:</strong> ${task.task_description}</p>
            </div>
        `;
        
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