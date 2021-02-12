//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener("click", addToDo);

todoList.addEventListener("click", deleteCheck);

filterOption.addEventListener("click", filterTodo);

document.addEventListener("DOMContentLoaded", getTodos);
// Functions

function addToDo(event) {
  event.preventDefault(); // Prevents form from submit

  //The structure we want to create:
  // <div className="todo">
  //     <li class="todo-item"></li>
  //     <button>delete</button>
  //     <button>check</button>
  // </div>

  const todoDiv = document.createElement("div"); //Div created

  todoDiv.classList.add("todo"); //class added

  const newTodo = document.createElement("li"); //li created

  newTodo.innerText = todoInput.value; //text added

  newTodo.classList.add("todo-item"); //class added

  saveLocalTodos(todoInput.value); //save todo to local storage

  todoDiv.appendChild(newTodo); // li inside div
  todoInput.value = "";
  //check mark button
  const completedButton = document.createElement("button");

  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  // created an html element directly inside button. Can also be done by creating element first then appendChild

  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Trash button
  const trashButton = document.createElement("button");

  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  // created an html element directly inside button. Can also be done by creating element first then appendChild

  trashButton.classList.add("trash-btn");

  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv); //Append to List
}

function deleteCheck(event) {
  const item = event.target;

  if (item.classList[0] === "trash-btn") {
    const parentItem = item.parentElement;
    parentItem.classList.add("fall");
    parentItem.addEventListener("transitionend", () => {
      parentItem.remove();
    });
  } else if (item.classList[0] === "complete-btn") {
    const parentItem = item.parentElement;
    parentItem.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (eachTodo) {
    switch (e.target.value) {
      case "all":
        eachTodo.style.display = "flex";
        break;
      case "completed":
        if (eachTodo.classList.contains("completed")) {
          eachTodo.style.display = "flex";
        } else {
          eachTodo.style.display = "none";
        }
        break;
      case "pending":
        if (!eachTodo.classList.contains("completed")) {
          eachTodo.style.display = "flex";
        } else {
          eachTodo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check -- do we already have it
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((eachTodo) => {
    const todoDiv = document.createElement("div"); //Div created

    todoDiv.classList.add("todo"); //class added

    const newTodo = document.createElement("li"); //li created

    newTodo.innerText = eachTodo; //text added

    newTodo.classList.add("todo-item"); //class added

    todoDiv.appendChild(newTodo); // li inside div
    todoInput.value = "";
    //check mark button
    const completedButton = document.createElement("button");

    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    // created an html element directly inside button. Can also be done by creating element first then appendChild

    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash button
    const trashButton = document.createElement("button");

    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    // created an html element directly inside button. Can also be done by creating element first then appendChild

    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
