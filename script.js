const todoManager = new Todo();

const todoInput = document.getElementById("todo-input");
const todoBtn = document.getElementById("todo-input-btn");
const todoList = document.getElementById("todo-list-ul");
const errorMassage = document.getElementById("error-message");

render();

function addTodoToList() {
  try {
    todoManager.add(/* todoManager */ todoInput.value);
    render();
    resetInputText();
    clearErrorMassage();
    console.log(todoManager);
  } catch (error) {
    throwErrorMessage(error.message);
  }
}

function resetInputText() {
  todoInput.value = "";
}

function render() {
  const todos = todoManager.getTodos();

  let todosListOnHtml = "";
  for (const todo of todos) {
    todosListOnHtml += `<div data-todo-id="${todo.id}" class="tasks">
    <div class="mx-auto w-75 mt-1 d-flex justify-content-between border border-dark rounded-2 pt-2 ">
    <i class="bi-trash3-fill text-danger ms-2 "></i>
    <p class="font-monospace ${
      todo.isDone ? "text-success text-decoration-line-through " : ""
    }">${todo.text}</p>
      <div class="item-btn">
        <button class="bi bi-pen me-3 text-primary"></button>
      </div>
    </div>
  </div>`;
  }

  todoList.innerHTML = todosListOnHtml;
}

function throwErrorMessage(error) {
  errorMassage.innerHTML = `<span>${error}</span>`;
}

function clearErrorMassage() {
  errorMassage.innerHTML = "";
}

todoBtn.addEventListener("click", addTodoToList);

todoList.addEventListener(`click`, function (e) {
  const todoId = Number(e.target.closest(`div[data-todo-id]`).dataset.todoId);
  const shouldRemove = e.target.classList.contains("bi-trash3-fill");
  const editBtn = e.target.classList.contains("bi-pen");

  if (shouldRemove) {
    todoManager.remove(todoId);
    console.log(this.todos);
  } else if (editBtn) {
    const editValue = prompt("please fill here", "edit");
    if (editValue != null) {
      todoManager.todos[todoId].text = editValue;

      console.log(this.todos);
    }
  } else {
    todoManager.ChangeDone(todoId);
  }

  render();
  console.log(todoManager);
});
