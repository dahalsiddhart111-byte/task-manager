let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// page load हुँदा task देखाउने
window.onload = function () {
  tasks.forEach(task => {
    createTaskElement(task.text, task.done);
  });
};

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value;

  if (taskText === "") return;

  let task = { text: taskText, done: false };
  tasks.push(task);

  saveTasks();
  createTaskElement(task.text, task.done);

  input.value = "";
}

// task UI बनाउने function
function createTaskElement(text, done) {
  let li = document.createElement("li");
  li.textContent = text;

  if (done) {
    li.style.textDecoration = "line-through";
  }

  // DONE button
  let doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";

  doneBtn.onclick = function () {
    li.style.textDecoration =
      li.style.textDecoration === "line-through" ? "none" : "line-through";

    updateTaskStatus(text);
  };

  // DELETE button
  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  delBtn.onclick = function () {
    li.remove();
    deleteTask(text);
  };

  li.appendChild(doneBtn);
  li.appendChild(delBtn);

  document.getElementById("taskList").appendChild(li);
}

// save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// delete
function deleteTask(text) {
  tasks = tasks.filter(t => t.text !== text);
  saveTasks();
}
function handleKey(event) {
  if (event.key === "Enter") {
    addTask();
  }
}

// done toggle update
function updateTaskStatus(text) {
  tasks = tasks.map(t => {
    if (t.text === text) {
      t.done = !t.done;
    }
    let editBtn = document.createElement("button");
editBtn.textContent = "Edit";

editBtn.onclick = function () {
  let newText = prompt("Edit task:", text);
  if (newText) {
    li.firstChild.textContent = newText;
    updateTaskText(text, newText);
  }
};
function updateTaskText(oldText, newText) {
  tasks = tasks.map(t => {
    if (t.text === oldText) {
      t.text = newText;
    }
    return t;
  });
  saveTasks();
}

li.appendChild(editBtn);
    return t;
  });
  saveTasks();
}
