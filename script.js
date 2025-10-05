// Wait until the whole HTML page (DOM) is loaded before running our script.
// This ensures elements like the input and button exist when we try to access them.
document.addEventListener('DOMContentLoaded', function () {
    // Find the "Add Task" button in the page by its id (from index.html).
    // We store the element in a variable so we can attach a click handler to it.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');

    // Find the <ul> (unordered list) where we'll put each task as an <li>.
    const taskList = document.getElementById('task-list');

    // This array will hold all the tasks in memory while the page is open.
    // We also keep it in sync with localStorage so items persist across reloads.
    let tasks = [];

    // 2) Save the tasks array into localStorage so they persist across reloads.
    // We convert the array into a JSON string using JSON.stringify.
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // 3) Create a single task element (<li>) and add it to the task list in the DOM.
    // This function only handles the visual creation and the remove button logic.
    function createTaskElement(taskText) {
        // Create a list item element (<li>) which will hold the task text.
        const li = document.createElement('li');

        // Set the text that the user typed as the content of the <li>.
        // textContent is safe: it treats the value as plain text (not HTML).
        li.textContent = taskText;

        // Create a button that will let the user remove this task.
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';

        // When the remove button is clicked, we need to do two things:
        // 1) Remove the <li> from the visible list on the page.
        // 2) Remove the task from the `tasks` array and update localStorage.
        removeBtn.addEventListener('click', function () {
            // Remove the element from the page (DOM).
            taskList.removeChild(li);

            // Update the tasks array in memory to remove the matching text.
            // filter returns a new array with only the items where the function
            // returns true. Here we keep every task that is NOT equal to taskText.
            // Note: If you have duplicate tasks with the same text, this will
            // remove all copies. If you want to allow duplicates, use unique IDs.
            tasks = tasks.filter(function(t) {
                return t !== taskText;
            });

            // Save the updated tasks array so the change persists.
            saveTasks();
        });

        // Put the remove button inside the <li>, and then add the <li> to the list.
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // 4) Add a new task typed by the user into the input field.
    function addTask() {
        // Read the text the user typed and remove extra spaces at the ends.
        // .trim() removes whitespace from both ends of the string.
        const taskText = taskInput.value.trim();

        // If the input is empty after trimming, don't add a blank task.
        if (taskText === '') {
            // alert() shows a small message box to the user.
            alert('Please enter a task.');
            return; // stop the function early
        }

        // Add the new task to the array we keep in memory.
        tasks.push(taskText);

        // Save the updated array to localStorage so it stays after reload.
        saveTasks();

        // Visually add the task to the page so the user sees it right away.
        createTaskElement(taskText);

        // Clear the input box so the user can type a new task.
        taskInput.value = '';
    }

    // 1) Load tasks from the browser's Local Storage when the page opens.
    // localStorage is a simple key/value store the browser provides for each site.
    // It only stores strings, so we save and load JSON when storing arrays.
    function loadTasks() {
        // localStorage.getItem('tasks') returns either the saved string or null
        // if nothing was saved yet. We check for that before parsing.
        const storedTasks = localStorage.getItem('tasks');

        // If there is something stored, convert the JSON string back into an array.
        if (storedTasks) {
            // JSON.parse transforms a JSON string (like "[\"a\",\"b\"]")
            // back into a JavaScript array (['a', 'b']).
            tasks = JSON.parse(storedTasks);

            // For each saved task text, create a visible list item on the page.
            // tasks.forEach(...) calls the given function once per item in the array.
            tasks.forEach(function(taskText) {
                // createTaskElement creates an <li> with the task text and a remove button.
                createTaskElement(taskText);
            });
        }
    }

    // ----------------------
    // Event listeners: connect user actions (clicks/keys) to functions.
    // ----------------------

    // When the "Add Task" button is clicked, run the addTask function.
    addButton.addEventListener('click', addTask);

    // When the user presses a key while focused on the input, check if it's Enter.
    // If it is, treat it like clicking the Add button.
    // Note: 'keypress' works here but some guides recommend 'keydown' for Enter.
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // When the page loads, read any saved tasks and show them on screen.
    loadTasks();
});
