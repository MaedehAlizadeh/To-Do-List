//Template Name : To Do List
//Author Name : Maedeh Alizadeh


const addTaskBtn = document.querySelector('.add-task-btn');
const inputTask = document.querySelector('.input-task');
const addTaskBox = document.querySelector('.add-task-box');
const taskListBox = document.querySelector('.task-list-box');
const taskList = document.querySelector('.task-list') // ul tag for task-list
const newTaskBtn = document.querySelector('.new-task-btn')
const filterOption = document.querySelector(".filter-task");

document.addEventListener('DOMContentLoaded', getTasks);

taskList.addEventListener('click' , deleteCompleteTask);
filterOption.addEventListener("click", filterTask);
newTaskBtn.addEventListener('click' , showAddTaskForm); // circle btn for show add task form


addTaskBtn.addEventListener('click' , addTask);
document.addEventListener('pressdown' , addTask);// for keyboard


//show Add Task Form
function showAddTaskForm(event) {
    event.preventDefault();
    taskListBox.style.display = 'none';
    addTaskBox.style.display = 'grid';
}


// Add Task to localStorage and go to tasklist
function addTask(event){
    event.preventDefault();
    const taskVal = inputTask.value;

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const newTask = document.createElement('li');
    newTask.innerText = taskVal;

    saveLocalTask(taskVal);
        
    newTask.classList.add('task-item')
    taskDiv.appendChild(newTask);
    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<img src="./images/216457_tick_icon.svg" alt="tick_icon">';
    completedButton.classList.add('complete-btn');
    taskDiv.appendChild(completedButton);
    //create complete task btn

    
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<img src="./images/7787567_delete_icon.svg" alt="delete_icon">';
    trashButton.classList.add('trash-btn');
    taskDiv.appendChild(trashButton);
    //create delete task btn
        
    taskList.appendChild(taskDiv);

    addTaskBox.style.display = 'none';

    taskListBox.style.display = 'block'; // show tasks list

    inputTask.value = '';
}



function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        taskListBox.style.display = 'none';
    } else {
        addTaskBox.style.display = 'none';
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    };
    tasks.forEach(function (task) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task')

        const newTask = document.createElement('li');
        newTask.innerText = task;
        
        newTask.classList.add('task-item')
        taskDiv.appendChild(newTask);
        
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<img src="./images/216457_tick_icon.svg" alt="tick_icon">';
        completedButton.classList.add('complete-btn');
        taskDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<img src="./images/7787567_delete_icon.svg" alt="delete_icon">';
        trashButton.classList.add('trash-btn');
        taskDiv.appendChild(trashButton);
        
        taskList.appendChild(taskDiv);
    })
}



// Checks the localstorage is empty or not empty
function saveLocalTask(task) {
    let tasks;

    // if localStorage is empty creates an array, push the value entered in it, 
    // and then set it to localstorage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } 
    // if localstorage is not empty, it takes its values and returns it as an array, 
    // push the value entered in it, and then set it to localstorage.
    else { 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// remove task from local storage
function removeLocalTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    const taskIndex = task.children[0].innerText;
    //Get a value of task that is in the li tag.
    // In each task, the li tag is the first child, children[0]

    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//remove and Complete Btn
function deleteCompleteTask(event) {

    const item = event.target;
    //The item variable specifies the button that is clicked

    if (item.classList.contains('trash-btn')) {
        const task = item.parentElement;
        removeLocalTask(task);
        task.remove();
    }
    // If the button classes contain trash-btn, it takes the parent tag, which is the entire task. 
    //removes it from the local storage, and then removes the parent tag itself.

    if (item.classList.contains('complete-btn')) {
        const task = item.parentElement;
        task.classList.toggle('completed');
    }
    // If the class contains a complete-btn, it takes the parent tag, 
    // which is the entire task, and gives it the completed class

}


//Filter tasks to display them between the options: all tasks, completed tasks and uncompleted tasks
function filterTask(event) {
    //take all children of ul means all tasks and made an array
    const tasks = taskList.childNodes;

    tasks.forEach(function (task) {
        switch (event.target.value) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (task.classList.contains('completed')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = 'flex';
                }
                break;
        }
    })
}