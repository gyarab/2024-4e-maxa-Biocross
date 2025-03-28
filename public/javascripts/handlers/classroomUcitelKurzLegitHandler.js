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

//zobrazi kurzy do sidebaru
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
        <h2>${task.task_name}</h2>
        <p><strong>Termín zadání:</strong> ${extractDate(task.task_dateEntered)}</p>
        <p><strong>Termín odevzdání:</strong> ${extractDate(task.task_deadline)}</p>
        <p><strong>Popis:</strong> ${task.task_description}</p>
</div>`;
        divTasks.appendChild(listOfTask);

        if (i<1){
        //naplneni info o kurzu
        const listOfTaskInfo = document.createElement('div');

        listOfTaskInfo.innerHTML = `<h1>Kurz: ${task.course_name}</h1>
                <div class="course-row">
                    <div class="course-info">
                        <h3>Učitel:</h3>
                        <p>${task.course_teacherName}</p>
                    </div>
                    <div style="justify-self: center;" class="course-info">
                        <h3>Třída:</h3>
                        <p>${task.course_className}</p>
                    </div>
                </div>
                <div class="course-row">
                    <div class="course-info">
                        <h3>Kód kurzu:</h3>
                        <div onclick="copyButton()" id="copyCode" class="course-code">${task.course_code}</div>
                    </div>
                        <button onclick="smazatKurz()" id="smazatKurz" class="leave-button">Smazat kurz</button>
                </div>`
        divTaskInfo.appendChild(listOfTaskInfo);
        i++;
        }
    });
    
}
function extractDate(dateString) {
    return dateString.split('T')[0];
}

function copyButton() {
    var text = document.getElementById("copyCode").innerText;

        navigator.clipboard.writeText(text).then(() => {
            alert("Zkopírováno: " + text);
        }).catch(err => {
            console.error("Chyba při kopírování:", err);
        });
  }