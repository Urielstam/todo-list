import './style.css';
import { taskList } from './create-task';
import { openCloseSidebarModule, toggleThemeModule,  } from './theme-layout-utils';
import { formUtilsModule, displayNewTask } from "./display-content";

const todoList = document.querySelector('.todo-list');
const allTasks = document.getElementById('all-tasks');
const todaysTasks = document.getElementById('today-tasks');
const mainTitle = document.querySelector('.main-title');
const projectItemsContainer = document.querySelector('.project-items');
const projectItemList = document.querySelectorAll('.project-item');

const displayAllTasks = (title) => {
    let todoArr = taskList.getDefaultTaskList();
    for (let todo of todoArr) {
        if (todo.project === title || title === "All") {
            // checkifCompleted();
            displayNewTask(todo.id, todo.title, todo.desc, todo.priority, todo.dueDate, todo.project, todo.completed);
        }
    }
}

allTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "All";

    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    displayAllTasks("All");
    console.log(taskList.getDefaultTaskList())
})

todaysTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "Today";
    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    displayAllTasks("Today");
})


projectItemsContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('project-item')) {
        mainTitle.innerText = e.target.lastElementChild.innerText;
    
        while(todoList.hasChildNodes()) {
            todoList.removeChild(todoList.firstChild);
        }
        displayAllTasks(e.target.lastElementChild.innerText);
    }

})
