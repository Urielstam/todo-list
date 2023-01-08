import { createNewTask, taskList } from "./create-task";


const todoWrapper = document.getElementById('todo0');

export const displayNewTask = (title, desc, priority, date) => {
    const todoList = document.querySelector('.todo-list');
    let num = Number((todoList.lastElementChild.id).at(-1));
    const todoClone = todoWrapper.cloneNode(true);
    const todoTitle = todoClone.firstElementChild.firstElementChild.lastElementChild.lastElementChild;
    const checkbox = todoClone.firstElementChild.firstElementChild.firstElementChild;
    const checkboxLabel = todoClone.firstElementChild.firstElementChild.lastElementChild;
    const todoActions = todoClone.firstElementChild.lastElementChild.children;
    const editBtn = todoActions[1];
    const dueDate = todoActions[0];
    

    let inputId = Number((todoList.lastElementChild.firstElementChild.firstElementChild.firstElementChild.id).at(-1));
    
    let labelFor = Number((todoList.lastElementChild.firstElementChild.firstElementChild.lastElementChild.getAttribute('for')).at(-1));
    
    priority = taskList.getDefaultTaskList()[inputId].priority;

   
    displayPriorityColor(todoClone, priority);
    
    // console.log(todoTitle)
    
    todoClone.id = "todo" + (num + 1);
    
    
    // Change checkbox id and for to work
    checkboxLabel.htmlFor = "cbx" + (inputId + 1);
    checkbox.id = "cbx" + (inputId + 1);
    
    todoTitle.innerText = title;
    dueDate.innerText = date;
    let description = taskList.getDefaultTaskList()[inputId].desc
    
    editBtn.addEventListener('click', (e) => {
        formUtilsModule.editItem(e,  (inputId + 1), todoTitle.innerText, description, priority)
    })

    todoWrapper.parentNode.appendChild(todoClone);

    return todoClone;

}

const displayPriorityColor = (todo, priority) => {
    if(priority ==="priority-low") {
        todo.classList.remove('priority-medium');
        todo.classList.remove('priority-high');
        todo.classList.add('priority-low');
    }
    else if(priority === "priority-medium") {
        todo.classList.remove('priority-low');
        todo.classList.remove('priority-high');
        todo.classList.add('priority-medium');
    } 
    else if(priority === "priority-high") {
        todo.classList.remove('priority-medium');
        todo.classList.remove('priority-low');
        todo.classList.add('priority-high');
    }
}

const newRadios = document.querySelectorAll('input[name="radio"]');

export const formUtilsModule = (() => {
    
    const newAddOverlay = document.querySelector('.overlay-create-new');
    const editAddOverlay = document.querySelector('.overlay-edit');
    const form = document.querySelector('.create-new');
    const editForm = document.querySelector('form[class="edit"]')
    const addTodoBtn = document.querySelector('.add-todo-btn');
    const closeNewFormBtns = document.querySelectorAll('.cancel-form-btn');
    const addTaskBtn = document.querySelector('button[class="form-btn add-task"]');
    const priorityRadios = document.querySelector('.priority-radios');
    
    const formTitle = document.querySelector('input[id="name"]');
    const formDesc = document.querySelector('input[id="description"]');
    const formDate = document.querySelector('#new-due-date');

    const editFormTitle = document.querySelector('input[id="name-edit"]');
    const editFormDesc = document.querySelector('input[id="description-edit"]');
    const editFormDate = document.querySelector('#edit-due-date')
    const editRadios = document.querySelectorAll('input[name="radio-edit"]');
    console.log(editRadios)
    
    const openNewForm = () => {
        newAddOverlay.classList.add('is-visible');
    }
    
    const closeNewForm = () => {
        newAddOverlay.classList.remove('is-visible');
        form.reset();
    }

    const openEditForm = () => {
        editAddOverlay.classList.add('is-visible');
    }
    
    const closeEditForm = () => {
        editAddOverlay.classList.remove('is-visible');
        editForm.reset();
    }
    
    const submitForm = () => {
        let title = formTitle.value;
        let desc = formDesc.value;
        let dueDate = formDate.value;
        let priority = setPriority(newRadios);
        
        if(title) {
            console.log(title + desc + dueDate);
            createNewTask(title, desc, priority, dueDate);
        }
    }

    let currentId;

    const editItemForm = (id) => {
        id  = currentId;

        let task = taskList.getDefaultTaskList()[id - 1];
        
        let currentEditItem = document.getElementById(`todo${id}`);
        let currentEditItemTitle = currentEditItem.firstElementChild.firstElementChild.lastElementChild.lastElementChild;
        let currentEditItemDate = currentEditItem.firstElementChild.lastElementChild.firstElementChild;
        task.title = editFormTitle.value;
        task.dueDate = editFormDate.value;
        currentEditItemDate.innerText = task.dueDate;
        currentEditItemTitle.innerText = task.title;
        task.desc = editFormDesc.value;
        task.priority = setPriority(editRadios);
        displayPriorityColor(currentEditItem, task.priority);
        console.log(task.priority);

        console.log(task)
        console.log(taskList.getDefaultTaskList())

    }
    
    const editItem = (el, elId, elTitle, elDesc, priority, dueDate) => {
        currentId = elId;
        console.log(currentId);
        editItemDetailAggregator(el, elId, elTitle, elDesc, priority, dueDate);
        openEditForm();
    }

    const editItemDetailAggregator = (el, elId, elTitle, elDesc, priority, dueDate) => {
        if(el.target.tagName.toLowerCase() === 'iconify-icon') {
            // let parentCardEl = el.target.parentNode.parentNode.parentNode.parentNode;
            // console.log(el)
            let elTask = taskList.getDefaultTaskList()[elId - 1];

            editFormTitle.value = elTitle;
            editFormDesc.value = elTask.desc;
            editFormDate.value = elTask.dueDate;

            priority = elTask.priority;
            console.log(priority)
            checkRadio(priority);
            
        }
    }

    const checkRadio = (priority) => {
        if(priority === "priority-low") {
            editRadios[0].checked = true;
        } 
        else if(priority === "priority-medium") {
            editRadios[1].checked = true;
        }
        else if(priority === "priority-high") {
            editRadios[2].checked = true;
        }
        return priority;
    }

    const setPriority = (radios) => {
        let radioPriority;
        [...radios].forEach((item => {
            if(item.checked) {
                if(item.id === "priority-low" || item.id === "priority-low-edit") {
                    radioPriority = "priority-low";
                } 
                else if (item.id === "priority-medium" || item.id === "priority-medium-edit") {
                    radioPriority = "priority-medium";
                } 
                else if (item.id === "priority-high" || item.id === "priority-high-edit") {
                    radioPriority = "priority-high"
                }
            }
        }));
        return radioPriority;
    }
    
    let priority = "priority-" + setPriority(newRadios);
    console.log(priority);
    
    addTodoBtn.addEventListener('click', (e) => {
        openNewForm();
    });

    [...closeNewFormBtns].forEach(close => {
        close.addEventListener('click', (e) => {
            closeNewForm();
            closeEditForm();
        });
    })
    
    
    

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        submitForm()
        closeNewForm()
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        editItemForm();
        closeEditForm();
    })

    return {
        setPriority: setPriority,
        editItem: editItem
    }
})();