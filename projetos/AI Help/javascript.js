const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task-button");
const clearTasksButton = document.querySelector("#clear-tasks-button");

const taskList = document.querySelector("#task-list");
let taskCounter = 1;

// Function to add a task
const addTask = () => {
    const taskValue = taskInput.value;
    if (taskValue === "") {
        alert("Tarefa em branco!! Por favor, insira uma tarefa");
        return;
    }
    const task = `
      <li id="task-${taskCounter}">
        <span>${taskCounter}. ${taskValue}</span>
        <button class="edit-task-button">Editar</button>
        <button class="delete-task-button">Apagar</button>
      </li>
    `;
    taskList.innerHTML += task;
    taskInput.value = "";
    taskCounter++;
};

// Function to clear all tasks
const clearTasks = () => {
    if (confirm("Tem certeza que deseja apagar todas as tarefas?")) {
        taskList.innerHTML = "";
        taskCounter = 1;
    }
};

// Function to delete a task
const deleteTask = (event) => {
    const deleteButton = event.target;
    if (!deleteButton.classList.contains("delete-task-button")) return;
    const taskItem = deleteButton.parentElement;
    if (!confirm("Tem certeza de que deseja excluir essa tarefa?")) return;
    taskItem.remove();
};

// Function to edit a task
const editTask = (event) => {
    const editButton = event.target;
    if (!editButton.classList.contains("edit-task-button")) return;
    const taskItem = editButton.parentElement;
    const taskValue = prompt("Insira a nova tarefa", taskItem.querySelector("span").textContent);
    if (!taskValue) return;
    taskItem.querySelector("span").textContent = taskValue;
};

// Event listeners
addTaskButton.addEventListener("click", addTask);
clearTasksButton.addEventListener("click", () => {
    taskList.innerHTML = "";
});
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", editTask);


// Function to export tasks to CSV
function exportToExcel() {
    const taskList = document.querySelector("#task-list");
    const tasks = [...taskList.children].map(task => task.querySelector("span").innerText);
    const csv = Papa.unparse({ fields: ["Task"], data: tasks.map(task => ({ Task: task })) });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "tasks.csv");
    link.click();
  }

