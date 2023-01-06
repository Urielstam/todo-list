import { formUtilsModule, displayNewTask } from "./display-content";

const exampleTodo = {
    title: "Example Todo",
    desc: "This is an example of a todo",
    priority: "priority-low",
    duedate: "1/01/23"
}

const exampleTodo2 = {
    title: "Example Todo 2",
    desc: "This is the second example of a todo",
    priority: "priority-medium",
    duedate: "1/01/23"
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
    displayNewTask(title, desc, priority);
    console.log(taskList.getDefaultTaskList());
}

export const displayAllTasks = () => {
    let todoArr = taskList.getDefaultTaskList();
    for (let todo of todoArr) {
        displayNewTask(todo.title, todo.priority);
    }
}


// When form submitted - retrieve the values of inputs - and 
// pass then into createTask()

