import './style.css';
import { createNew, displayAllTasks } from './create-task';
import { openCloseSidebarModule, toggleThemeModule,  } from './theme-layout-utils';
import { formUtilsModule } from "./display-content";

const todoList = document.querySelector('.todo-list');
const allTasks = document.getElementById('all-tasks');
const todaysTasks = document.getElementById('today-tasks')
const mainTitle = document.querySelector('.main-title');

allTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "All Tasks";
})

todaysTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "Today";
})