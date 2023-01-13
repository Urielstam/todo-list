import { formUtilsModule, displayNewTask } from "./display-content";


const exampleTodo = {
    id: "0",
    title: "Example Todo",
    desc: "This is an example of a todo",
    priority: "priority-low",
    dueDate: "2023-01-08",
    dateCreated: undefined
}

const exampleTodo2 = {
    id: "",
    title: "Example Todo 2",
    desc: "This is the second example of a todo",
    priority: "priority-medium",
    dueDate: "2023-01-15",
    dateCreated: undefined
}

// TODO Create todoList array object to store all todos
// TODO Create todo items dynamically with factory functions

export const taskList = (() => {

    let _defaultTaskList = [];

    const getDefaultTaskList = () => {
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

const taskFactory = (id, title, desc, priority, dueDate, dateCreated) => {
    return {
        id,
        title,
        desc,
        priority,
        dueDate,
        dateCreated
    };
}

const setId = () => {
    let arr = taskList.getDefaultTaskList()
    let newId;
    if(arr.length < 1) {
        newId = 0;
    } else {
        newId = Number(arr.find(x => x.id === arr[arr.length - 1].id).id);
        newId++
        console.log(newId)
    }
    let stringId = String(newId);
    return stringId;
}

export const createNewTask = (id, title, desc, priority, dueDate, dateCreated) => {
    dateCreated = new Date();
    if(!id) {
        id = setId();
    }
    let newTask = taskFactory(id, title, desc, priority, dueDate, dateCreated);
    taskList.addTask(newTask);
    console.log(taskList.getDefaultTaskList())
    displayNewTask(id, title, desc, priority, dueDate);
}

// export const displayAllTasks = () => {
//     let todoArr = taskList.getDefaultTaskList();
//     for (let todo of todoArr) {
//         displayNewTask(todo.title, todo.desc, todo.priority, todo.dueDate);
//     }
// }

createNewTask(exampleTodo.id, exampleTodo.title, exampleTodo.desc, 
    exampleTodo.priority, exampleTodo.dueDate, exampleTodo.dateCreated);
createNewTask(exampleTodo2.id,exampleTodo2.title, exampleTodo2.desc, 
    exampleTodo2.priority, exampleTodo2.dueDate, exampleTodo2.dateCreated);
// When form submitted - retrieve the values of inputs - and 
// pass then into createTask()

