class Todo {
  currentId = 0;

  todos = [];

  constructor() {
    this.load();
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    localStorage.setItem("currentId", this.currentId);
  }

  load() {
    if (localStorage.getItem(`todos`)) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
      this.currentId = Number(localStorage.getItem(`currentId`));
    }
  }

  add(text) {
    if (typeof text !== "string" || text.length < 2) {
      throw new Error(
        "task needs to be at least 2 characters and typeof string"
      );
    }
    const todo = {
      id: this.currentId++,
      text,
      isDone: false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    this.save();
    return todo;
  }

  getTodo(id) {
    for (const todo of this.todos) {
      if (todo.id === id) {
        return todo;
      }
    }

    throw new Error("id was not found");
  }

  getTodos() {
    return this.todos;
  }

  remove(id) {
    const todo = this.getTodo(id);

    const indexToRemove = this.todos.indexOf(todo);
    const removeElement = this.todos.splice(indexToRemove, 1);
    this.save();
    return removeElement[0];
  }

  ChangeDone(id, isDone = null) {
    const todo = this.getTodo(id);

    todo.isDone = typeof isDone === "boolean" ? isDone : !todo.isDone;
    this.save();
    return todo;
  }
}
