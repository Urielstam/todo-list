import './style.css';
import { taskList } from './create-task';
import { openCloseSidebarModule, toggleThemeModule,  } from './theme-layout-utils';
import { formUtilsModule, displayNewTask, displayNewProject, displayAllTasks } from "./display-content";

const todoList = document.querySelector('.todo-list');
const allTasks = document.getElementById('all-tasks');
const todaysTasks = document.getElementById('today-tasks');
const mainTitle = document.querySelector('.main-title');
const projectItemsContainer = document.querySelector('.project-items');
const projectItemList = document.querySelectorAll('.project-item');

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

const populateStorage = () => {
    localStorage.setItem('todolist', JSON.stringify(taskList.getDefaultTaskList()));
    getStorage();
}

export const updatePopulateStorage = (taskList) => {
    localStorage.setItem('todolist', JSON.stringify(taskList));
    getStorage();
}

const getStorage = () => {
    todoListArray = JSON.parse(localStorage.getItem('todolist'));
}

if(!localStorage.getItem('todolist')) {
    populateStorage();
} else {
    getStorage();
    if(JSON.stringify(todoListArray) !==  JSON.stringify(taskList.getDefaultTaskList())) {
        let arr = taskList.getDefaultTaskList()
        arr.splice(0, arr.length)
        // for(let item of arr) {
        //     let index = arr.indexOf(item);
        //     taskList.removeTask(index);
        // }
        for(let item of todoListArray) {
            arr.push(item);
        } 
    }
    console.log(todoListArray)
    console.log(taskList.getDefaultTaskList())
}

displayNewProject("Work");
displayAllTasks("Today", todoListArray)

allTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "All";

    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    displayAllTasks("All", todoListArray);
    console.log(todoListArray)
})

todaysTasks.addEventListener('click', (e) => {
    mainTitle.innerText = "Today";
    while(todoList.hasChildNodes()) {
        todoList.removeChild(todoList.firstChild);
    }
    displayAllTasks("Today", todoListArray);
    console.log(taskList.getDefaultTaskList())
})


projectItemsContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('project-item')) {
        mainTitle.innerText = e.target.children[1].innerText;
    
        while(todoList.hasChildNodes()) {
            todoList.removeChild(todoList.firstChild);
        }
        displayAllTasks(e.target.children[1].innerText, taskList.getDefaultTaskList());
    }

})
