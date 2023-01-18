import { formUtilsModule, displayNewTask, displayNewProject } from "./display-content";
import { updatePopulateStorage, updatePopulateProjectStorage } from "./index";

const exampleTodo = {
    id: "0",
    title: "Example Todo",
    desc: "This is an example of a todo",
    priority: "priority-low",
    dueDate: "2023-01-08",
    dateCreated: "2023-01-18T18:28:44.626Z",
    project: "Today",
    completed: false
}

const exampleTodo2 = {
    id: "1",
    title: "Example Todo 2",
    desc: "This is the second example of a todo",
    priority: "priority-medium",
    dueDate: "2023-01-15",
    dateCreated: "2023-01-18T18:28:44.626Z",
    project: "Today",
    completed: false
}

const exampleProject = {
    id: "0",
    title: "work"
}

// TODO Create todoList array object to store all todos
// TODO Create todo items dynamically with factory functions

export const taskList = (() => {

    let _defaultTaskList = [exampleTodo, exampleTodo2];

    const getDefaultTaskList = () => {
        // if(!localStorage.getItem('todolist')) {
        //     return _defaultTaskList
        // } else {
        //     _defaultTaskList = JSON.parse(localStorage.getItem('todolist'));
        //     console.log(_defaultTaskList)
        // }
        return _defaultTaskList;
    }

    const addTask = (task) => {
        _defaultTaskList.push(task);
    }

    const removeTask = (index) => {
        if(index > -1) {
            _defaultTaskList.splice(index, 1);
        }
    }

    return {
        getDefaultTaskList: getDefaultTaskList,
        addTask: addTask,
        removeTask: removeTask
    }

})();

export const projectList = (() => {

    let _defualtProjectList = [exampleProject];

    const getProjects = () => {
        return _defualtProjectList;
    }

    const addProject = (project) => {
        _defualtProjectList.push(project);
    }

    const removeProject = (index) => {
        if(index > -1) {
            _defualtProjectList.splice(index, 1);
        }
    
    }

    return {
        getProjects: getProjects,
        addProject: addProject,
        removeProject: removeProject
    }
    
})();


const deleteTask = () => {
    // Delete
}

const editTask = () => {
    // Edit
}

const viewDetails = () => {
    // View Details
}

const addSubTask = () => {
    // Add sub tasks
}

// const dateCreated = () => {
//     // Get current date
// }

const taskFactory = (id, title, desc, priority, dueDate, dateCreated, project, completed) => {
    return {
        id,
        title,
        desc,
        priority,
        dueDate,
        dateCreated,
        project,
        completed
    };
}

const projectFactory = (id, title) => {
    return {
        id,
        title
    }
}

const setId = (arr) => {
    let newId;
    if(arr.length < 1) {
        newId = 0;
    } else {
        newId = Number(arr.find(x => x.id === arr[arr.length - 1].id).id);
        newId++
    }
    let stringId = String(newId);
    return stringId;
}

export const createNewTask = (id, title, desc, priority, dueDate, dateCreated, project, completed) => {
    const mainTitle = document.querySelector('.main-title');
    project = mainTitle.innerText;
    dateCreated = new Date();
    if(!id) {
        id = setId(taskList.getDefaultTaskList());
    }
    let newTask = taskFactory(id, title, desc, priority, dueDate, dateCreated, project, completed);
    taskList.addTask(newTask);
    if(id > 1) {
        updatePopulateStorage(taskList.getDefaultTaskList());
    }
    console.log(taskList.getDefaultTaskList());
    displayNewTask(id, title, desc, priority, dueDate, completed);
}

export const createNewProject = (id, title) => {
    if(!id) {
        id = setId(projectList.getProjects());
    }
    let newProject = projectFactory(id, title);
    projectList.addProject(newProject);
    updatePopulateProjectStorage(projectList.getProjects());
    // if(id > 1) {
    // }
    console.log(projectList.getProjects())
    displayNewProject(id, title);
}

// createNewTask(exampleTodo.id, exampleTodo.title, exampleTodo.desc, 
//     exampleTodo.priority, exampleTodo.dueDate, exampleTodo.dateCreated, exampleTodo.project, exampleTodo.completed);
// createNewTask(exampleTodo2.id,exampleTodo2.title, exampleTodo2.desc, 
//     exampleTodo2.priority, exampleTodo2.dueDate, exampleTodo2.dateCreated, exampleTodo2.project, exampleTodo2.completed);
// When form submitted - retrieve the values of inputs - and 
// pass then into createTask()

