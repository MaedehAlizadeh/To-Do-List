//Template Name : To Do List
//Author Name : Maedeh Alizadeh

// Add Task to localStorage and go to tasklist
const addTaskBtn = document.querySelector('.add-task-btn');
const inputTask = document.querySelector('.input-task');
const addTaskBox = document.querySelector('.add-task-box');
const taskListBox = document.querySelector('.task-list-box')

addTaskBtn.addEventListener('click' , addTask);

document.addEventListener('pressdown' , addTask);// for keyboard


function addTask(event){
    event.preventDefault();

    const taskVal = inputTask.value;
    saveLocaltask(taskVal);
    addTaskBox.classList.toggle('hidden');
    taskListBox.classList.toggle('show');
}


// Checks the localstorage is empty or not empty
// if localStorage is empty creates an array, push the value entered in it, and then set it to localstorage
// if localstorage is not empty, it takes its values and returns it as an array, push the value entered in it, and then set it to localstorage.
function saveLocaltask(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks))
}