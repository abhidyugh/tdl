//Working JS file
const task_text = document.getElementById('task_text');
const task_list = document.getElementById('task_list');
const textarea = document.getElementById("task_text");

let tasks = []; // This will hold the array of tasks

function loadTasks() {
    // Load tasks from localStorage, if any
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks && Array.isArray(storedTasks)) {
        tasks = storedTasks;
        tasks.forEach(taskText => {
            addTasktoDOM(taskText);
        });
    }
}

function addTasktoDOM(taskText) {
    const li = document.createElement("li");
    li.classList.add("task_item"); // Adding a class to the <li>
    li.innerHTML = `${taskText} <img src="delete_icon.png" alt="Delete task" class="delete-btn">`;
    task_list.appendChild(li);
}

function addTask() {
    const task = task_text.value;
    if (task) {
        tasks.push(task); // Add the new task to the tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated tasks array to localStorage
        addTasktoDOM(task); // Add task to the DOM
        task_text.value = ''; // Clear the input
        textarea.style.height = "auto"; // Reset textarea height
    } else {
        alert('Please enter a task!');
    }
}

document.getElementById('task_list').addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) { // Check if delete button was clicked
        const taskElement = event.target.parentElement; // Get the task element (li)
        const taskText = taskElement.innerText.replace('Delete task', '').trim(); // Extract the task text

        // Remove task from the array
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks array to localStorage

        taskElement.remove(); // Remove the task from the DOM
    }
});

document.getElementById('button-64').onclick = addTask;

document.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById('button-64').click();
    }
})

textarea.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height to recalculate
    this.style.height = this.scrollHeight + "px"; // Adjust height
});

// Load tasks when the page loads
loadTasks();