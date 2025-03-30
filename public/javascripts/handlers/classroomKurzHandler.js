// zobrazeni kurzu v sidebaru
var divCurses = document.getElementById("div-curses");
var divTasks = document.getElementById("task-container");
var divTaskInfo = document.getElementById("course-info")


fetch(`/classroom/kurz`+location.search, {headers: {
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
            
        listOfCurses.innerHTML = '<li><a href="/classroom/kurz?id='+result.course_id+'">'+result.course_className+" "+ result.course_name+'</a></li>';
        divCurses.appendChild(listOfCurses);
        
      });
}

function displayKurz(tasks) {
    var i = 0;
    divTasks.innerHTML = '';
    divTaskInfo.innerHTML = '';
    tasks.forEach(task=>{
        const listOfTask = document.createElement('div');
        listOfTask.innerHTML = `
        <div class="container">
                <h1 style="margin-bottom:10px;margin-top:18px;">Úkol</h1>

                <div class="task-container">
                    <div class="task">
                        <h2>${task.task_name}</h2>
                        <p><strong>Termín zadání:</strong> ${extractDate(task.task_dateEntered)}</p>
                        <p><strong>Termín odevzdání:</strong> ${extractDate(task.task_deadline)}</p>
                        <p><strong>Popis:</strong> ${task.task_description}</p>

                        <button class="button-odevzdat" onclick="odevzdatButton(${task.task_id})">Odevzdat úkol</button>
                
                        <!-- Formulář pro odevzdání souboru, který je zpočátku skrytý -->
                        <div id="uploadForm${task.task_id}" style="display: none; margin-top: 20px;">
                            <form action="/classroom/kurz?id=${task.course_id}" method="POST" enctype="multipart/form-data">
                                <!-- Skrytý input pro ID kurzu -->
                                <input type="hidden" name="taskId" value="${task.task_id}">
                                
                                <p>Vyberte soubor (PDF):</p>
                                <input class="input-pdf" type="file" id="file" name="taskFile" accept="application/pdf" required>
                                <button class="button-odevzdat" type="submit">Odevzdat</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>`;
        divTasks.appendChild(listOfTask);

        if (i<1){
        //naplneni info o kurzu
        const listOfTaskInfo = document.createElement('div');

        listOfTaskInfo.innerHTML = ` <h1>Kurz: ${task.course_name}</h1>
                    <div class="course-row">
                        <div class="course-info">
                            <h3>Učitel:</h3>
                            <p> ${task.course_teacherName}</p>
                        </div>
                        <div style="justify-self: center;" class="course-info">
                            <h3>Třída:</h3>
                            <p>${task.course_className}</p>
                        </div>
                    </div>
            
                    <div class="course-row">
                        <div class="course-info">
                            <h3>Kód kurzu:</h3>
                            <div onclick="copyButton()" id="copyCode" class="course-code">${task.course_code} (Copy)</div>
                        </div>
                            <button class="leave-button">Odejít z kurzu</button>
                    </div>`;
        divTaskInfo.appendChild(listOfTaskInfo);
        i++;
        }
    });
    
}
function extractDate(dateString) {
    return dateString.split('T')[0];
}
//Zkopirovano odsud https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
function copyButton() {
    var text = document.getElementById("copyCode").innerText;

        navigator.clipboard.writeText(text).then(() => {
            alert("Zkopírováno: " + text);
        }).catch(err => {
            console.error("Chyba při kopírování:", err);
        });
}

function odevzdatButton(id) { 
    let uploadForm = document.getElementById(`uploadForm${id}`);
    
    if (uploadForm.style.display === 'block') { 
        uploadForm.style.display = 'none'; 
    } else {
        uploadForm.style.display = 'block'; 
    }
}