class Todo {
  constructor(key, description) {
    this.key = key;
    this.description = description;
  }
}

const randomID = () => {
  return Math.floor(Math.random() * 1000000);
};

class TodoActions {
  static displayTodos() {
    const todos = [];

    todos.forEach((description) => TodoActions.addTodosToList(description));
  }

  static createButton(buttonName, symbol) {
    const btn = document.createElement("button");
    btn.id = buttonName;
    btn.classList.add(buttonName);
    btn.textContent = symbol;
    return btn;
  }

  static createTodo(todo) {
    const newDiv = document.createElement("div");
    const btnDiv = document.createElement("div");

    btnDiv.classList.add("fr-buttons");

    const todoText = document.createElement("h3");

    todoText.textContent = todo.description;
    todoText.classList.add("new-div-description");

    const finishBtn = TodoActions.createButton("finish-btn", "✓");
    const deleteBtn = TodoActions.createButton("delete-btn", "X");

    finishBtn.addEventListener("click", (e) =>
      TodoActions.finishTodos(e.target)
    );
    deleteBtn.addEventListener("click", (e) =>
      TodoActions.deleteTodos(e.target)
    );

    btnDiv.appendChild(finishBtn);
    btnDiv.appendChild(deleteBtn);
    newDiv.appendChild(todoText);
    newDiv.appendChild(btnDiv);
    return newDiv;
  }

  static addTodosToList(todo) {
    const list = document.getElementById("input-list");
    const newDiv = TodoActions.createTodo(todo);
    list.appendChild(newDiv);

    // newDiv.innerHTML = `
    // <h3 class="new-div-description" id="new-div-description">${
    //   todo.description
    // }</h3>${" "}
    // <div class="fr-buttons">
    //   <button class="finish-button" id="finish-button" type="button" name="button">✓</button>
    //   <button class="remove-button" type="button" name="button">X</button>
    // </div>
    // `;
  }

  static deleteTodos(element) {
    element.parentElement.parentElement.remove();
  }

  static finishTodos(element) {
    const textElement = element.parentElement.parentElement.firstElementChild;
    textElement.classList.contains("completed")
      ? textElement.classList.remove("completed")
      : textElement.classList.add("completed");
  }

  static clear() {
    document.getElementById("description").value = "";
  }
}

document.addEventListener("DOMContentLoaded", TodoActions.displayTodos);

document.getElementById("submit-button").addEventListener("click", (e) => {
  const key = randomID();
  const description = document.getElementById("description").value;

  if (description === "") {
    return;
  } else {
    const newTodos = new Todo(key, description);
    TodoActions.addTodosToList(newTodos);
    TodoActions.clear();
  }
});
