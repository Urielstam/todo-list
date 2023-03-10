import { createNewTask, taskList, createNewProject, projectList } from "./create-task";
import { updatePopulateStorage, updatePopulateProjectStorage } from "./index";
import format from 'date-fns/format';
import getHours from 'date-fns/getHours';
import { utcToZonedTime } from 'date-fns-tz'



const mainTitle = document.querySelector('.main-title');
const todoList = document.querySelector('.todo-list');



const todoWrapper = document.getElementById('default0');
const projectItem = document.querySelector('.project-item');
const deleteProjectDiv = document.querySelector('.delete-project');
deleteProjectDiv.addEventListener('click', (e) => {
    formUtilsModule.openDeleteProjectDialogue()
})
// let num = 0;

export const displayAllTasks = (title, todolist) => {
    console.log(todolist)
    // todolist = taskList.getDefaultTaskList();
    for (let todo of todolist) {
        if (todo.project === title || title === "All") {
            // checkifCompleted();
            displayNewTask(todo.id, todo.title, todo.desc, todo.priority, todo.dueDate, todo.dateCreated, todo.project, todo.completed);
        }
    }
}

export const displayAllProjects = (projectlist) => {
    for(let project of projectlist) {
        displayNewProject(project.id, project.title)
    }
}

export const displayNewProject = (id, title) => {
    let projectTitle = title
    let dataCard = id;
    const projectItems = document.querySelector('.project-items');
    const projectClone = projectItem.cloneNode(true);
    // if(projectItems.children.length > 0) {
    //     dataCard = Number(projectItems.lastElementChild.dataset.project);
    // } else {
    //     dataCard = 0;
    // }
    projectClone.dataset.project = id;
    let newLink = projectClone.children[1];
    let deleteBtn = projectClone.lastElementChild;
    deleteBtn.addEventListener('click', (e) => {
        console.log("hey");
        let parent = deleteBtn.parentNode;
        let deleteProjectId = parent.dataset.project.at(-1);
        console.log(parent)
        formUtilsModule.openDeleteProjectDialogue(id, projectTitle);
    })
    newLink.innerText = projectTitle;
    projectItems.appendChild(projectClone);
}


export const displayNewTask = (id, title, desc, priority, date, dateCreate, project, completed) => {
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
            updatePopulateStorage(arr);
        } else {
            task.completed= false;
            console.log('change')
            updatePopulateStorage(arr);
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
    let newDate = utcToZonedTime(date, 'UTC');
    const formattedDate = format(new Date(newDate), 'MMM do');
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
    const addTodoText = document.querySelector('.add-todo-text');

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
    const viewProject = document.querySelector('.view-project-title');

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

    const closeDeleteProjectBtn = document.querySelector('.cancel-project-dialogue-option');
    const deleteProjectBtn = document.querySelector('.delete-project-dialogue-option');
    const deleteProjectDialogueOverlay = document.querySelector('.overlay-delete-project-dialogue');

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
        if(deleteId) {
            deleteTaskItemAggregator(deleteId);
        }
    }

    const closeDeleteItemDialogue = () => {
        deleteItemDialogueOverlay.classList.remove('is-visible');
    }

    const openAddProject = (deleteId) => {
        addProjectOverlay.classList.add('is-visible');
        newProjectTitleInput.focus();
    }

    const closeAddProject = () => {
        addProjectOverlay.classList.remove('is-visible');
        newProjectForm.reset();
    }

    const openDeleteProjectDialogue = (deleteProjectId, projectTitle) => {
        deleteProjectDialogueOverlay.classList.add('is-visible');
        deleteProjectAggregator(deleteProjectId, projectTitle);
    }

    const closeDeleteProjectDialogue = () => {
        deleteProjectDialogueOverlay.classList.remove('is-visible');
    }
    
    const submitForm = () => {
        let title = formTitle.value;
        let desc = formDesc.value;
        let dueDate = formDate.value;
        let priority = setPriority(newRadios);
        let id;
        
        if(title) {
            createNewTask(id, title, desc, priority, dueDate);
            updatePopulateStorage(taskList.getDefaultTaskList());
        }
    }

    let currentEditId;
    let currentViewId;
    let currentDeleteId;
    let currentDeleteProjectId;
    let currentProjectTitle;

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
        updatePopulateStorage(taskList.getDefaultTaskList());

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
        console.log(elViewTask.dateCreated)
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
            viewProject.innerText = elViewTask.project;

            displayPriorityColor(viewPriorityIcon, elViewTask.priority, "high", "medium", "low");

            viewDueDate.innerText = formattedDueDate;
            viewDateCreated.innerText = formattedDateCreated;
            // updatePopulateStorage(taskList.getDefaultTaskList());
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
        updatePopulateStorage(taskList.getDefaultTaskList());

    }

    const deleteTaskItemAggregator = (elDeleteId) => {
        currentDeleteId = elDeleteId;
    }

    const deleteProject = (projectDeleteId, projectTitle) => {
        projectDeleteId = currentDeleteProjectId;
        projectTitle = currentProjectTitle;
        console.log(projectTitle);
        let arr = taskList.getDefaultTaskList();
        console.log(arr);
        arr.forEach(element => {
            if(element.project === projectTitle) {
                console.log(element)
                let index = arr.indexOf(arr.find(x => x.id === element.id))
                // console.log(index)
                taskList.removeTask(index);
                updatePopulateStorage(taskList.getDefaultTaskList());
                console.log(taskList.getDefaultTaskList())
            }
        })
        mainTitle.innerText = "Today";
        while(todoList.hasChildNodes()) {
            todoList.removeChild(todoList.firstChild);
        }
        displayAllTasks("Today", taskList.getDefaultTaskList());

        let projectArr = projectList.getProjects();
        let index = projectArr.indexOf(projectArr.find(x => x.id === projectDeleteId));
        projectList.removeProject(index);
        updatePopulateProjectStorage(projectList.getProjects())
        let currentProjectItem = document.querySelector(`[data-project="${projectDeleteId}"]`);
        currentProjectItem.remove();
        console.log(arr);
        console.log(projectList.getProjects());
        closeDeleteProjectDialogue();

    }

    const deleteProjectAggregator = (projectDeleteId, projectTitle) => {
        currentDeleteProjectId = projectDeleteId;
        currentProjectTitle = projectTitle;
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

    addTodoText.addEventListener('click', (e) => {
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
    });

    closeDeleteProjectBtn.addEventListener('click', (e) => {
        closeDeleteProjectDialogue();
    })

    deleteProjectBtn.addEventListener('click', (e) => {
        deleteProject();
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

    const formatDateCreated = (date) => {
        let newDate = utcToZonedTime(date, 'UTC');
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
        let id;
        createNewProject(id, newProjectTitleInput.value);
        updatePopulateProjectStorage(projectList.getProjects());
        closeAddProject();
    })

    return {
        setPriority: setPriority,
        editItem: editItem,
        viewDetails: viewDetails,
        openDeleteItemDialogue: openDeleteItemDialogue,
        openDeleteProjectDialogue: openDeleteProjectDialogue
    }
})();