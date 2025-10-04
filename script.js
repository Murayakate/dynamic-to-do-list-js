document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // This array will hold all the tasks
    let tasks = [];

    // 1. Load tasks from Local Storage when page first opens
    function loadTasks() {
        // Get stored tasks from localStorage (or [] if nothing is saved yet)
        const stored = localStorage.getItem('tasks');
        if (stored) {
            tasks = JSON.parse(stored); // turn JSON string into array
            tasks.forEach(taskText => {
                createTaskElement(taskText);
            });
        }
    }

    // 2. Save tasks array into Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // 3. Create a <li> element for a task and add it to the list
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';

        // When remove button is clicked
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li); // remove from screen
            tasks = tasks.filter(t => t !== taskText); // remove from array
            saveTasks(); // update Local Storage
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // 4. Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Add to array and save
        tasks.push(taskText);
        saveTasks();

        // Show it on screen
        createTaskElement(taskText);

        // Clear input
        taskInput.value = '';
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Start by loading any saved tasks
    loadTasks();
});
