import { createNewTask, taskList } from "./create-task";
import format from 'date-fns/format';
import getHours from 'date-fns/getHours'

const todoWrapper = document.getElementById('default0');

// let num = 0;

export const displayNewProject = (title) => {
    const projectItems = document.querySelector('.project-items');
    let newProjectItem = document.createElement('div');
    let newDot = document.createElement('div');
    let newLink = document.createElement('a');
    newProjectItem.classList.add('project-item');
    newDot.classList.add('dot');
    newLink.href = "";
    newLink.innerText = title;
    newProjectItem.append(newDot, newLink);
    projectItems.appendChild(newProjectItem);
}

export const displayNewTask = (id, title, desc, priority, date, project, completed) => {
    const todoList = document.querySelector('.todo-list');
    // let num = Number((todoList.lastElementChild.id).at(-1));
    // let num = taskList.getDefaultTaskList().length - 1;
    const todoClone = todoWrapper.cloneNode(true);
    const todoTitle = todoClone.firstElementChild.firstElementChild.lastElementChild.lastElementChild;
    const checkbox = todoClone.firstElementChild.firstElementChild.firstElementChild;
    const checkboxLabel = todoClone.firstElementChild.firstElementChild.lastElementChild;
    const todoActions = todoClone.firstElementChild.lastElementChild.children;
    const editBtn = todoActions[1];
    const dueDate = todoActions[0];
    const viewDetailsBtn = todoActions[3];
    const deleteItemBtn = todoActions[2];
    

    // let inputId = Number((todoList.lastElementChild.firstElementChild.firstElementChild.firstElementChild.id).at(-1));
    // let inputId = taskList.getDefaultTaskList().length -1;

    // let labelFor = Number((todoList.lastElementChild.firstElementChild.firstElementChild.lastElementChild.getAttribute('for')).at(-1));
    let arr = taskList.getDefaultTaskList();
    // priority = taskList.getDefaultTaskList()[num].priority;
    priority = arr.find(x => x.id === id).priority;

    displayPriorityColor(todoClone, priority);
    
    // console.log(todoTitle)
    
    todoClone.dataset.task = "todo" + (id);
    todoClone.id = "todo" + (id)
    let todoId = Number((todoClone.id).at(-1));
    // console.log(todoId)
    // Change checkbox id and for to work
    checkboxLabel.htmlFor = "cbx" + (id);
    checkbox.id = "cbx" + (id);
    
    completed = arr.find(x => x.id === id).completed;

    if(completed) {
        checkbox.checked = true;
    } 
    else if (!completed) {
        checkbox.checked = false;
    }
    let task = arr.find(x => x.id === id);

    checkbox.addEventListener('click', (e) => {
        if(checkbox.checked) {
            task.completed = true;
            console.log(arr)
        } else {
            task.completed= false;
            console.log('change')
            console.log(arr)
        }
    })
    
    todoTitle.innerText = title;

    let displayFormattedDate = formatDueDate(date);

    dueDate.innerText = displayFormattedDate;
    let description = taskList.getDefaultTaskList().find(x => x.id === id).desc


    editBtn.addEventListener('click', (e) => {
        formUtilsModule.editItem(e,  (id), todoTitle.innerText, description, priority, date)
    })

    viewDetailsBtn.addEventListener('click', (e) => {
        formUtilsModule.viewDetails(e, (id));
    })

    deleteItemBtn.addEventListener('click', (e) => {
        formUtilsModule.openDeleteItemDialogue((id));
    })

    todoList.appendChild(todoClone);

    // num++;
    
    return todoClone;
    
}

const formatDueDate = (date) => {
    const formattedDate = format(new Date(date), 'MMM do');
    return formattedDate;
}

const displayPriorityColor = (todo, priority, high, medium, low) => {
    if(!(high && medium && low)){
        high = "priority-high";
        medium = "priority-medium";
        low = "priority-low";
    } 
    if(priority === "priority-medium") {
        todo.classList.remove(low);
        todo.classList.remove(high);
        todo.classList.add(medium);
    }
    else if(priority === "priority-low") {
        todo.classList.remove(medium);
        todo.classList.remove(high);
        todo.classList.add(low);
    } 
    else if(priority === "priority-high") {
        todo.classList.remove(medium);
        todo.classList.remove(low);
        todo.classList.add(high);
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

    const closeViewDetailsBtns = document.querySelectorAll('.close-view-details');
    
    const formTitle = document.querySelector('input[id="name"]');
    const formDesc = document.querySelector('input[id="description"]');
    const formDate = document.querySelector('#new-due-date');

    const editFormTitle = document.querySelector('input[id="name-edit"]');
    const editFormDesc = document.querySelector('input[id="description-edit"]');
    const editFormDate = document.querySelector('#edit-due-date')
    const editRadios = document.querySelectorAll('input[name="radio-edit"]');


    const veiwDetailsOverlay = document.querySelector('.overlay-view-details');
    const viewTitle = document.querySelector('.view-title');
    const viewDesc = document.querySelector('.view-desc');
    const viewPriority = document.querySelector('.view-priority');
    const viewDueDate = document.querySelector('.view-due-date');
    const viewDateCreated = document.querySelector('.view-date-created');
    const viewPriorityIcon = document.querySelector('.view-detail-priority');

    const closeDeleteItemBtn = document.querySelector('.cancel-dialogue-option');
    const deleteTaskItemBtn = document.querySelector('.delete-dialogue-option');
    const deleteItemDialogueOverlay = document.querySelector('.overlay-delete-item-dialogue');

    const addProjectOverlay = document.querySelector('.overlay-add-new-project');
    const closeAddProjectBtn = document.querySelector('.cancel-project-btn')
    const openAddProjectBtn = document.querySelector('.add-project');
    const newProjectForm = document.querySelector('.add-new-project')
    const newProjectTitleInput = document.querySelector('input[id="new-project-name"]')

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

    const openViewDetails = () => {
        veiwDetailsOverlay.classList.add('is-visible');
    }
    
    const closeViewDetails = () => {
        veiwDetailsOverlay.classList.remove('is-visible');
    }

    const openDeleteItemDialogue = (deleteId) => {
        deleteItemDialogueOverlay.classList.add('is-visible');
        deleteTaskItemAggregator(deleteId);
    }

    const closeDeleteItemDialogue = () => {
        deleteItemDialogueOverlay.classList.remove('is-visible');
    }

    const openAddProject = () => {
        addProjectOverlay.classList.add('is-visible');
        newProjectTitleInput.focus();
    }

    const closeAddProject = () => {
        addProjectOverlay.classList.remove('is-visible');
        newProjectForm.reset();
    }
    
    const submitForm = () => {
        let title = formTitle.value;
        let desc = formDesc.value;
        let dueDate = formDate.value;
        let priority = setPriority(newRadios);
        let id;
        
        if(title) {
            createNewTask(id, title, desc, priority, dueDate);
        }
    }

    let currentEditId;
    let currentViewId;
    let currentDeleteId;

    const editItemForm = (id) => {
        id  = currentEditId;

        let task = taskList.getDefaultTaskList().find(x => x.id === id);
        
        let currentEditItem = document.getElementById(`todo${id}`);
        let currentEditItemTitle = currentEditItem.firstElementChild.firstElementChild.lastElementChild.lastElementChild;
        let currentEditItemDate = currentEditItem.firstElementChild.lastElementChild.firstElementChild;
        task.title = editFormTitle.value;
        task.dueDate = editFormDate.value;

        let formattedDate = formatDueDate(task.dueDate);

        currentEditItemDate.innerText = formattedDate;

        currentEditItemTitle.innerText = task.title;
        task.desc = editFormDesc.value;
        task.priority = setPriority(editRadios);
        displayPriorityColor(currentEditItem, task.priority);

        console.log(taskList.getDefaultTaskList())

    }
    
    const editItem = (el, elId, elTitle, elDesc, priority, dueDate) => {
        currentEditId = elId;
        console.log(currentEditId);
        editItemDetailAggregator(el, elId, elTitle, elDesc, priority, dueDate);
        openEditForm();
    }

    const editItemDetailAggregator = (el, elId, elTitle, elDesc, priority, dueDate) => {
    
        // Maybe need to check if target is icon in if statemant

        // let parentCardEl = el.target.parentNode.parentNode.parentNode.parentNode;
        // console.log(el)
        let elTask = taskList.getDefaultTaskList().find(x => x.id === elId);

        editFormTitle.value = elTitle;
        editFormDesc.value = elTask.desc;
        editFormDate.value = elTask.dueDate;

        priority = elTask.priority;
        console.log(priority)
        checkRadio(priority);
    }

    const viewDetails =  (viewEl, elViewId) => {
        currentViewId = elViewId;
        viewDetailsAggregator(viewEl, elViewId);
        openViewDetails();
    }

    const viewDetailsAggregator = (viewEl, elViewId) => {
        let elViewTask = taskList.getDefaultTaskList().find(x => x.id === elViewId);
        let formattedDueDate = formatDueDate(elViewTask.dueDate)
        let formattedDateCreated = formatDateCreated(elViewTask.dateCreated)
        let formattedPriority = elViewTask.priority.split('-')[1];
        console.log(formattedPriority)

            viewTitle.innerText = elViewTask.title;
            if(elViewTask.desc) {
                viewDesc.innerText = elViewTask.desc;
            } else {
                viewDesc.innerText = "no description..."
            }
            viewPriority.innerText = formattedPriority;

            displayPriorityColor(viewPriorityIcon, elViewTask.priority, "high", "medium", "low");

            viewDueDate.innerText = formattedDueDate;
            viewDateCreated.innerText = formattedDateCreated;
    }

    const deleteTaskItem = (elDeleteId) => {
        elDeleteId = currentDeleteId;
        let arr = taskList.getDefaultTaskList();
        let index = arr.indexOf(arr.find(x => x.id === elDeleteId));
        taskList.removeTask(index);
        let currentDeleteItem = document.getElementById(`todo${elDeleteId}`);
        currentDeleteItem.remove();
        console.log(taskList.getDefaultTaskList());
        closeDeleteItemDialogue();
    }

    const deleteTaskItemAggregator = (elDeleteId) => {
        currentDeleteId = elDeleteId;
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
    
    addTodoBtn.addEventListener('click', (e) => {
        openNewForm();
        dateCreated();
    });

    openAddProjectBtn.addEventListener('click', (e) => {
        openAddProject()
    })

    closeDeleteItemBtn.addEventListener('click', (e) => {
        closeDeleteItemDialogue();
    });

    deleteTaskItemBtn.addEventListener('click', (e) => {
        deleteTaskItem();
    });

    closeAddProjectBtn.addEventListener('click', (e) => {
        closeAddProject();
    })

    Array.from(closeNewFormBtns).forEach(close => {
        close.addEventListener('click', (e) => {
            closeNewForm();
            closeEditForm();
        });
    });

    
    Array.from(closeViewDetailsBtns).forEach(close => {
        close.addEventListener('click', (e) => {
            closeViewDetails();
        });
    })

    const dateCreated = () => {
        const newDate = new Date();
        console.log(newDate)
        return newDate;
    }

    const formatDateCreated = (newDate) => {
        let formattedDateCreated;
        if (newDate) {
            const newDay = format(newDate, 'd');
            const newMonth = format(newDate, 'MMMM');
            const newYear = format(newDate, 'yyyy');
            const newHour = getHours(newDate);
            const newMinutes = format(newDate, 'mm'); 
            const newNoonMid = format(newDate, 'aaa');
    
            formattedDateCreated = `${newMonth} ${newDay} ${newYear} at ${newHour}:${newMinutes}${newNoonMid}`;
            console.log(formattedDateCreated)
        } else {
            formattedDateCreated = undefined;
        }
        return formattedDateCreated;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        submitForm()
        closeNewForm()
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        editItemForm();
        closeEditForm();
    });

    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        displayNewProject(newProjectTitleInput.value);
        closeAddProject();
    })

    return {
        setPriority: setPriority,
        editItem: editItem,
        viewDetails: viewDetails,
        openDeleteItemDialogue: openDeleteItemDialogue
    }
})();