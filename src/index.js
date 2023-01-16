import './style.css';
import { taskList } from './create-task';
import { openCloseSidebarModule, toggleThemeModule,  } from './theme-layout-utils';
import { formUtilsModule, displayNewTask } from "./display-content";

const todoList = document.querySelector('.todo-list');
const allTasks = document.getElementById('all-tasks');
const todaysTasks = document.getElementById('today-tasks')
const mainTitle = document.querySelector('.main-title');

const displayAllTasks = (title) => {
    let todoArr = taskList.getDefaultTaskList();
    for (let todo of todoArr) {
        if (todo.project === title || title === "All") {
            displayNewTask(todo.id, todo.title, todo.desc, todo.priority, todo.dueDate);
        } 
    }
}

allTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "All";

    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    displayAllTasks("All");
})

todaysTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "Today";
    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    displayAllTasks("Today");
})