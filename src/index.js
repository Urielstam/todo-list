import './style.css';

// TODO Create todoList array object to store all todos
// TODO Create todo items dynamically with factory functions

const todoList = (() => {

    let _defaultTodoList = [];

    const getDefaultTodoList = () => {
        console.log(_defaultTodoList)
        return _defaultTodoList;
    }

    const addTodo = (todo) => {
        _defaultTodoList.push(todo);
    }

    return {
        getDefaultTodoList: getDefaultTodoList,
        addTodo: addTodo
    }

})();


const todoFactory = (title, desc, priority, dueDate, dateCreated) => {

    const deleteTodo = () => {
        // Delete
    }

    const editTodo = () => {
        // Edit
    }

    const viewDetails = () => {
        // View Details
    }

    const addSubTask = () => {
        // Add sub tasks
    }

    return {
        title,
        desc,
        priority,
        dueDate, 
        dateCreated, 
        deleteTodo, 
        editTodo, 
        viewDetails, 
        addSubTask
    };
}

const btn = document.querySelector('.open-aside');
btn.addEventListener('click', (e) => {
    const side = document.querySelector('.sidebar');
    if(side.style.width === "250px") {
        side.style.width = "0";
    } else {
        side.style.width = "250px";
    }

})

const toggleTheme = document.getElementById('theme-mode');
toggleTheme.addEventListener('change', (e) => {
    console.log("toggle")
    if (toggleTheme.checked === true) {
        console.log('checked')
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
        window.localStorage.setItem('mode', 'dark');
      } else {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
        window.localStorage.setItem('mode', 'light');
      }
});

