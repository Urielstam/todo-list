
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


export const displayNewTask = (title) => {
    const todoList = document.querySelector('.todo-list');
    const todoWrapper = document.getElementById('todo0');
    let num = Number((todoList.lastElementChild.id).at(-1));

    const todoClone = todoWrapper.cloneNode(true);
    const todoTitle = todoClone.firstElementChild.firstElementChild.lastElementChild.lastElementChild;
    const checkbox = todoClone.firstElementChild.firstElementChild.firstElementChild;
    const checkboxLabel = todoClone.firstElementChild.firstElementChild.lastElementChild;
    
    let inputId = Number((todoList.lastElementChild.firstElementChild.firstElementChild.firstElementChild.id).at(-1));
    
    let labelFor = Number((todoList.lastElementChild.firstElementChild.firstElementChild.lastElementChild.getAttribute('for')).at(-1));
    
    
    // console.log(todoTitle)
    
    todoClone.id = "todo" + (num + 1);

    // Change checkbox id and for to work
    checkboxLabel.htmlFor = "cbx" + (inputId + 1);
    checkbox.id = "cbx" + (inputId + 1);

    todoTitle.innerText = title;

    todoWrapper.parentNode.appendChild(todoClone);

}

export const formUtilsModule = (() => {
    
    const addOverlay = document.querySelector('.overlay-create-new');
    const form = document.querySelector('form');

    const openForm = () => {
        addOverlay.classList.add('is-visible');
    }
    
    const closeForm = () => {
        addOverlay.classList.remove('is-visible');
        form.reset();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        closeForm();
    })


    const addTodoBtn = document.querySelector('.add-todo-btn');
    addTodoBtn.addEventListener('click', (e) => {
        openForm();
    });
    
    
    const closeFormBtn = document.querySelector('.cancel-form-btn');
    closeFormBtn.addEventListener('click', (e) => {
        closeForm();
    });

    return {
        closeForm: closeForm,
        openForm: openForm
    }
})();

