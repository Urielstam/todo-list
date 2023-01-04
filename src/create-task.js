import { formUtilsModule, displayNewTask } from "./theme-layout-utils";

const exampleTodo = {
    title: "Exanple Todo",
    desc: "This is an example of a todo",
    priority: "low",
    duedate: "1/01/23"
}

// TODO Create todoList array object to store all todos
// TODO Create todo items dynamically with factory functions

const taskList = (() => {

    let _defaultTaskList = [exampleTodo, 
                            ];

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

const dateCreated = () => {
    // Get current date
}

const taskFactory = (title, desc, priority, dueDate) => {
    return {
        title,
        desc,
        priority,
        dueDate
    };
}

export const createNewTask = (title, desc, priority, dueDate) => {
    let newTask = taskFactory(title, desc, priority, dueDate);
    taskList.addTask(newTask);
    displayNewTask(title);
    console.log(taskList.getDefaultTaskList());
}

export const displayAllTasks = () => {
    let todoArr = taskList.getDefaultTaskList();
    for (let todo in todoArr) {
        displayNewTask(exampleTodo.title);
    }
}


// When form submitted - retrieve the values of inputs - and 
// pass then into createTask()

