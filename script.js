document.addEventListener('DOMContentLoaded', displayTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    saveTask(taskText);
    displayTasks();
    taskInput.value = '';
  }
}

function saveTask(taskText) {
  let tasks = getTasksFromStorage();

  tasks.push({
    text: taskText,
    id: new Date().getTime(),
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function displayTasks() {
  const tasksContainer = document.querySelector('.tasks');
  tasksContainer.innerHTML = '';

  const tasks = getTasksFromStorage();

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const labelElement = document.createElement('label');
    labelElement.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteTask(task.id);
      displayTasks();
    });

    taskElement.appendChild(labelElement);
    taskElement.appendChild(deleteButton);

    tasksContainer.appendChild(taskElement);
  });
}

function deleteTask(taskId) {
  let tasks = getTasksFromStorage();

  tasks = tasks.filter(task => task.id !== taskId);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}