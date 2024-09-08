const taskForm = document.getElementById('enter-new-task');
const inputNewTask = document.getElementById('input-task');
const taskList = document.getElementById('tasks');
let list = [];
let colorList = [];
let categoryList = ['pink', 'lightblue', 'dandelion'];

function addTask() {
    if (inputNewTask.value === '') {
        alert('Please enter a task.');
    } else {
        list.push(inputNewTask.value);
        selectCategory(); // Assign a random color to the new task
        renderList();
        saveToDoList(); 
    }
}

function selectCategory() {
    let selectedCategory = categoryList[generateRandomNumber(0, categoryList.length - 1)];
    colorList.push(selectedCategory); 
    console.log(colorList);
}

function renderList() {
    taskList.innerHTML = ''; 

    for (let i = 0; i < list.length; i++) {
        const newTask = document.createElement('div');
        newTask.setAttribute('class', 'task');

        const categoryBtn = document.createElement('div');
        categoryBtn.setAttribute('class', 'category-btn');
        categoryBtn.classList.add(colorList[i]); 

        const taskContentContainer = document.createElement('div');
        taskContentContainer.setAttribute('class', 'task-content');

        const readOnlyTask = document.createElement('input');
        readOnlyTask.setAttribute('class', 'text');
        readOnlyTask.readOnly = true;
        readOnlyTask.type = 'text';
        readOnlyTask.setAttribute('value', list[i]);

        taskContentContainer.append(categoryBtn);
        taskContentContainer.append(readOnlyTask);
        newTask.append(taskContentContainer);

        const btnContainer = document.createElement('div');
        btnContainer.setAttribute('class', 'btn-container');

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.addEventListener('click', function () {
            if (readOnlyTask.readOnly) {
                readOnlyTask.readOnly = false;
                editBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
                readOnlyTask.focus();
            } else {
                readOnlyTask.readOnly = true;
                editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
                list[i] = readOnlyTask.value; 
                saveToDoList();
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.addEventListener('click', function () {
            list.splice(i, 1); 
            colorList.splice(i, 1); 
            saveToDoList(); 
            renderList(); 
        });

        btnContainer.append(editBtn);
        btnContainer.append(deleteBtn);
        newTask.append(btnContainer);
        taskList.append(newTask);
    }

    inputNewTask.value = ''; 
}

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTask();
});

function saveToDoList() {
    localStorage.setItem('savedToDoList', JSON.stringify(list));
    localStorage.setItem('colorList', JSON.stringify(colorList));
}

function getToDoList() {
    list = JSON.parse(localStorage.getItem('savedToDoList')) || [];
    colorList = JSON.parse(localStorage.getItem('colorList')) || [];
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load the task list and colors from localStorage if they exist
if (localStorage.getItem('savedToDoList') !== null && localStorage.getItem('colorList') !== null) {
    getToDoList();
    renderList();
}
