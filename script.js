document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

   function addTask(taskText, save = true) {
        const taskText = taskInput.value.trim(); // Trim whitespace
        if (taskText === '') {// Prevent adding empty tasks
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');// Create a new list item
        li.textContent = taskText;// Set the text of the listed item

        const removeBtn = document.createElement('button');// Create a remove button
        removeBtn.textContent = 'Remove';// Set button text
        removeBtn.classList.add('remove-btn');// Add a class for styling
        removeBtn.addEventListener('click', function() {// Add event listener to remove the task
            taskList.removeChild(li);// Remove the list item from the task list
        });

        li.appendChild(removeBtn);// Append the remove button to the list item
        taskList.appendChild(li);// Append the list item to the task list
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);// Add event listener to the add button
    taskInput.addEventListener('keypress', function(event) {// Add event listener for Enter key
        if (event.key === 'Enter') {
            addTask();
        }
    });
    //check local storage for an existing list of tasks
});
