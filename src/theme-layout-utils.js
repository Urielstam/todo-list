import { createNewTask } from "./create-task";


export const toggleThemeModule = (() => {
const toggleTheme = document.getElementById('theme-mode');
    toggleTheme.addEventListener('change', (e) => {
        if (toggleTheme.checked === true) {
            document.documentElement.classList.remove("light")
            document.documentElement.classList.add("dark")
            window.localStorage.setItem('mode', 'dark');
        } else {
            document.documentElement.classList.remove("dark")
            document.documentElement.classList.add("light")
            window.localStorage.setItem('mode', 'light');
        }
    });
})()

export const openCloseSidebarModule = (() => {

    const btn = document.querySelector('.open-aside');
    const side = document.querySelector('nav');
    side.style.width = "250px"
    btn.addEventListener('click', (e) => {
        changeWidth(side);
    });

    const changeWidth = (side) => {
        if(side.style.width === "250px") {
            side.style.width = "0";
        } else {
            side.style.width = "250px";
        }
    }
})();

const todoWrapper = document.getElementById('todo0');

export const displayNewTask = (title, priority) => {
    const todoList = document.querySelector('.todo-list');
    let num = Number((todoList.lastElementChild.id).at(-1));

    const todoClone = todoWrapper.cloneNode(true);
    const todoTitle = todoClone.firstElementChild.firstElementChild.lastElementChild.lastElementChild;
    const checkbox = todoClone.firstElementChild.firstElementChild.firstElementChild;
    const checkboxLabel = todoClone.firstElementChild.firstElementChild.lastElementChild;
    
    let inputId = Number((todoList.lastElementChild.firstElementChild.firstElementChild.firstElementChild.id).at(-1));
    
    let labelFor = Number((todoList.lastElementChild.firstElementChild.firstElementChild.lastElementChild.getAttribute('for')).at(-1));
    
    priority = formUtilsModule.setPriority();

    if(priority === "medium") {
        todoClone.classList.remove('priority-low');
        todoClone.classList.add('priority-medium');
    } 
    else if(priority === "high") {
        todoClone.classList.remove('priority-low');
        todoClone.classList.add('priority-high');
    }
    
    // console.log(todoTitle)
    
    todoClone.id = "todo" + (num + 1);
    

    // Change checkbox id and for to work
    checkboxLabel.htmlFor = "cbx" + (inputId + 1);
    checkbox.id = "cbx" + (inputId + 1);

    todoTitle.innerText = title;


    todoWrapper.parentNode.appendChild(todoClone);

    return todoClone;

}


export const formUtilsModule = (() => {
    
    const addOverlay = document.querySelector('.overlay-create-new');
    const form = document.querySelector('form');
    const addTodoBtn = document.querySelector('.add-todo-btn');
    const closeFormBtn = document.querySelector('.cancel-form-btn');
    const addTaskBtn = document.querySelector('button[class="form-btn add-task"]');
    const formTitle = document.querySelector('input[id="name"]');
    const formDesc = document.querySelector('input[id="description"]');
    const priorityRadios = document.querySelector('.priority-radios');
    const radios = document.querySelectorAll('input[type="radio"]');

    console.log(radios)

    const openForm = () => {
        addOverlay.classList.add('is-visible');
    }

    const closeForm = () => {
        addOverlay.classList.remove('is-visible');
        form.reset();
    }

    const submitForm = () => {
        let title = formTitle.value;
        let desc = formDesc.value;
        let priority = "priority-" + setPriority();
        
        if(title) {
            console.log(title + desc);
            createNewTask(title, priority);
        }
    }
    
    const setPriority = () => {
        let radioPriority
        [...radios].forEach((item => {
            if(item.checked) {
                if(item.id === "priotiy-low") {
                    radioPriority = "low";
                } 
                else if (item.id === "priority-medium") {
                    radioPriority = "medium";
                } 
                else if (item.id === "priority-high") {
                    radioPriority = "high"
                }
            }
        }));
        return radioPriority;
    }

    let priority = "priority-" + setPriority();
    console.log(priority);
    
    addTodoBtn.addEventListener('click', (e) => {
        openForm();
    });
    
    closeFormBtn.addEventListener('click', (e) => {
        closeForm();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        submitForm()
        closeForm()
    });

    return {
        setPriority: setPriority
    }
})();

