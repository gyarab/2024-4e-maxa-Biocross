// zobrazeni kurzu v sidebaru
var divCurses = document.getElementById("div-curses");
var divTasks = document.getElementById("task-container");
var divTaskInfo = document.getElementById("course-info")


let doneTasksData = {}; // Objekt, kde budou odevzdané úkoly


fetch(`/classroomUcitel/kurz`+location.search, {headers: {
    'Accept': 'application/json'
}})
    .then(response => response.json())
    .then(data =>  {
        displayCourses(data.courses); // Kurzy
        displayKurz(data.tasks);    // Úkoly

        const doneTasks = data.doneTasks;

        // Uložíme odevzdané úkoly do doneTasksData podle task_id
        doneTasks.forEach(sub => {
            if (!doneTasksData[sub.task_id]) {
                doneTasksData[sub.task_id] = [];
            }
            doneTasksData[sub.task_id].push({
                student_name: `${sub.student_firstname} ${sub.student_lastname}`,
                pdf_url: sub.donetasks_pdf
            });
        });
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

async function fetchDoneTasks() {
    const response = await fetch(`/api/getAllDoneTasks`); // Přidáme nový endpoint
    const data = await response.json();

    // Uložíme data do objektu podle task_id
    data.forEach(sub => {
        if (!doneTasksData[sub.task_id]) {
            doneTasksData[sub.task_id] = [];
        }
        doneTasksData[sub.task_id].push({
            student_name: `${sub.student_firstname} ${sub.student_lastname}`,
            pdf_url: sub.donetasks_pdf
        });
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
        <button class="button-zobrazitUkoly" onclick="toggleSubmissions(${task.task_id})">Zobrazit odevzdané úkoly</button>
        <div id="submissions-${task.task_id}" class="hidden">
            <ul class="taskDone-list" id="submission-list-${task.task_id}"></ul> <!-- Sem se vloží <li> -->
        </div>
</div>`;
        // // Zavolání getTaskTeacher a naplnění seznamu
        // getTaskTeacher(task.task_id).then(submissions => {
        //     const submissionList = document.getElementById(`submission-list-${task.task_id}`);

        //     submissions.forEach(sub => {
        //         const listItem = document.createElement('li');
        //         listItem.innerHTML = `${sub.student_name} - <a href="${sub.pdf_url}" target="_blank">Odevzdaný soubor</a>`;
        //         submissionList.appendChild(listItem);
        //     });
        // });

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

// function toggleSubmissions(task_id) {
//     console.log(task_id);
    
//     document.getElementById(`submissions-${task_id}`).classList.toggle('hidden');
// }

async function getTaskTeacher(task_id) {
    // const response = await fetch(`/getTaskTeacher?id=${task_id}`);
    // const data = await response.json();
    return [{ student_name: "Petr", pdf_url: "file1.pdf" }, { student_name: "Anna", pdf_url: "file2.pdf" }];
}

function toggleSubmissions(task_id) {
    let submissionDiv = document.getElementById(`submissions-${task_id}`);
    let submissionList = document.getElementById(`submission-list-${task_id}`);

    if (!doneTasksData[task_id] || doneTasksData[task_id].length === 0) {
        submissionList.innerHTML = `<li class="taskDone-item">Žádné odevzdané úkoly</li>`;
    } else {
        submissionList.innerHTML = "";

        doneTasksData[task_id].forEach(sub => {
            console.log("PDF data (Buffer):", sub.pdf_url);

            // Převod Bufferu na Uint8Array
            let uint8Array = new Uint8Array(sub.pdf_url.data);

            // Vytvoření Blobu z Uint8Array
            let blob = new Blob([uint8Array], { type: "application/pdf" });
            let blobUrl = URL.createObjectURL(blob);

            const listItem = document.createElement('li');
            listItem.classList.add('taskDone-item');
            listItem.innerHTML = `${sub.student_name} - <a href="${blobUrl}" download="ukol.pdf">Stáhnout PDF</a>`;
            submissionList.appendChild(listItem);
        });
    }

    submissionDiv.classList.toggle('hidden');
}
