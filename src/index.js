import './style.css';
import { taskList, createNewProject, projectList } from './create-task';
import { openCloseSidebarModule, toggleThemeModule, changeWidth } from './theme-layout-utils';
import { formUtilsModule, displayNewTask, displayNewProject, displayAllProjects, displayAllTasks } from "./display-content";

const todoList = document.querySelector('.todo-list');
const allTasks = document.getElementById('all-tasks');
const todaysTasks = document.getElementById('today-tasks');
const mainTitle = document.querySelector('.main-title');
const projectItemsContainer = document.querySelector('.project-items');
const projectItemList = document.querySelectorAll('.project-item');
const side = document.querySelector('nav');
const mediaQuery = window.matchMedia('(max-width: 625px)');


const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log("storage available")
}
else {
    // Too bad, no localStorage for us
    console.log("storage not available")
}

let todoListArray;
let projectListArray;

const populateStorage = () => {
    localStorage.setItem('todolist', JSON.stringify(taskList.getDefaultTaskList()));
    getStorage();
}

const populateProjectStorage = () => {
    localStorage.setItem('projectlist', JSON.stringify(projectList.getProjects()))
    getProjectStorage();
}


const getStorage = () => {
    todoListArray = JSON.parse(localStorage.getItem('todolist'));
}

const getProjectStorage = () => {
    projectListArray = JSON.parse(localStorage.getItem('projectlist'));
}

export const updatePopulateStorage = (taskList) => {
    localStorage.setItem('todolist', JSON.stringify(taskList));
    getStorage();
}

export const updatePopulateProjectStorage = (projectList) => {
    localStorage.setItem('projectlist', JSON.stringify(projectList));
    getProjectStorage();
}


if(!localStorage.getItem('todolist')) {
    populateStorage();
    
} else {
    getStorage();
    if(JSON.stringify(todoListArray) !==  JSON.stringify(taskList.getDefaultTaskList())) {
        let arr = taskList.getDefaultTaskList()
        arr.splice(0, arr.length)
        for(let item of todoListArray) {
            arr.push(item);
        } 
    }
    console.log("Todo stuff");
    console.log(todoListArray)
    console.log(taskList.getDefaultTaskList());
}

if(!localStorage.getItem('projectlist')) {
    populateProjectStorage();
} else {
    getProjectStorage();
    if(JSON.stringify(projectListArray) !== JSON.stringify(projectList.getProjects())) {
        let projectArr = projectList.getProjects();
        projectArr.splice(0, projectArr.length);
        for(let item of projectListArray) {
            projectArr.push(item);
        }
    }
    console.log("Project-stuff");
    console.log(projectListArray);
    console.log(projectList.getProjects());
}


displayAllTasks("Today", todoListArray);
displayAllProjects(projectListArray)

allTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "All";

    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    displayAllTasks("All", todoListArray);
    console.log(todoListArray)
    if (mediaQuery.matches) {
        console.log("matched")
        changeWidth(side)
      }
})

todaysTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "Today";
    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    displayAllTasks("Today", todoListArray);
    console.log(taskList.getDefaultTaskList())
    if (mediaQuery.matches) {
        console.log("matched")
        changeWidth(side)
      }
})


projectItemsContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('project-item')) {
        mainTitle.innerText = e.target.children[1].innerText;
    
        while(todoList.hasChildNodes()) {
            todoList.removeChild(todoList.firstChild);
        }
        displayAllTasks(e.target.children[1].innerText, todoListArray);
        console.log(projectListArray)
        if (mediaQuery.matches) {
            console.log("matched")
            changeWidth(side)
          }
    }

})
