// zobrazeni kurzu v sidebaru
var divCurses = document.getElementById("div-curses");
var divTasks = document.getElementById("task-container");
var divTaskInfo = document.getElementById("course-info")


fetch(`/classroomUcitel/kurz`+location.search, {headers: {
    'Accept': 'application/json'
}})
    .then(response => response.json())
    .then(data =>  {
        displayCourses(data.courses); // Kurzy
        displayKurz(data.tasks);    // Úkoly
    })
    .catch(error => console.error('Chyba při vyhledávání:', error));

function displayCourses(courses) {
    divCurses.innerHTML = '';
    courses.forEach(result => {
        const listOfCurses = document.createElement('div');
            
        listOfCurses.innerHTML = '<li><a href="/classroomUcitel/kurz?id='+result.course_id+'">'+result.course_className+" "+ result.course_name+'</a></li>';
        divCurses.appendChild(listOfCurses);
        
      });
}

function displayKurz(tasks) {
    var i = 0;
    divTasks.innerHTML = '';
    divTaskInfo.innerHTML = '';
    tasks.forEach(task=>{
        const listOfTask = document.createElement('div');
        listOfTask.innerHTML = `<div class="task">
                        <p><strong>Název:</strong>${task.task_name}</p>
                        <p><strong>Termín zadání:</strong>${extractDate(task.task_dateEntered)}</p>
                        <p><strong>Termín odevzdání:</strong>${extractDate(task.task_deadline)}</p>
                        <p><strong>Popis:</strong>${task.task_description}</p>
                    </div>`;
        divTasks.appendChild(listOfTask);

        if (i<1){
        //naplneni info o kurzu
        const listOfTaskInfo = document.createElement('div');

        listOfTaskInfo.innerHTML = `<p><strong>Název kurzu:</strong> ${task.course_name}</p>
                    <p><strong>Kód kurzu:</strong> ${task.course_code}</p>
                    <p><strong>Jméno učitele:</strong> ${task.course_teacherName}</p>
                    <p><strong>Třída:</strong> ${task.course_className}</p>`;
        divTaskInfo.appendChild(listOfTaskInfo);
        i++;
        }
    });
    
}
function extractDate(dateString) {
    return dateString.split('T')[0];
}