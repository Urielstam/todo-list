import { formUtilsModule, displayNewTask } from "./display-content";


const exampleTodo = {
    title: "Example Todo",
    desc: "This is an example of a todo",
    priority: "priority-low",
    dueDate: "2023-01-08",
    dateCreated: undefined
}

const exampleTodo2 = {
    title: "Example Todo 2",
    desc: "This is the second example of a todo",
    priority: "priority-medium",
    dueDate: "2023-01-08",
    dateCreated: undefined
}

// TODO Create todoList array object to store all todos
// TODO Create todo items dynamically with factory functions

export const taskList = (() => {

    let _defaultTaskList = [exampleTodo, exampleTodo2];

    const getDefaultTaskList = () => {
        return _defaultTaskList;
    }

    const addTask = (task) => {
        _defaultTaskList.push(task);
    }

    return {
        getDefaultTaskList: getDefaultTaskList,
        addTask: addTask
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

const taskFactory = (title, desc, priority, dueDate, dateCreated) => {
    return {
        title,
        desc,
        priority,
        dueDate,
        dateCreated
    };
}

export const createNewTask = (title, desc, priority, dueDate, dateCreated) => {
    dateCreated = new Date();
    let newTask = taskFactory(title, desc, priority, dueDate, dateCreated);
    taskList.addTask(newTask);
    displayNewTask(title, desc, priority, dueDate);
    console.log(taskList.getDefaultTaskList());
}

export const displayAllTasks = () => {
    let todoArr = taskList.getDefaultTaskList();
    for (let todo of todoArr) {
        displayNewTask(todo.title, todo.desc, todo.priority, todo.dueDate);
    }
}


// When form submitted - retrieve the values of inputs - and 
// pass then into createTask()

