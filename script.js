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

  static addTodosToList(todo) {
    const list = document.getElementById("input-list");
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
    <h3 class="new-div-description" id="new-div-description">${
      todo.description
    }</h3>${" "}
    <div class="fr-buttons">
      <button class="finish-button" id="finish-button" type="button" name="button">✓</button>
      <button class="remove-button" type="button" name="button">X</button>
    </div>
    `;

    list.appendChild(newDiv);
  }

  static deleteTodos(element) {
    if (element.classList.contains("remove-button")) {
      element.parentElement.parentElement.remove();
    }
  }

  static finishTodos(element) {
    if (element.classList.contains("finish-button")) {
      if (
        element.parentElement.parentElement.firstElementChild.style
          .textDecoration !== "line-through"
      ) {
        element.parentElement.parentElement.firstElementChild.style.textDecoration =
          "line-through";
      } else {
        element.parentElement.parentElement.firstElementChild.style.textDecoration =
          "none";
      }
    }
  }

  static clear() {
    document.getElementById("description").value = "";
  }
}

document.addEventListener("DOMContentLoaded", TodoActions.displayTodos);

document.getElementById("input-list").addEventListener("click", (e) => {
  TodoActions.deleteTodos(e.target);
});

document.getElementById("input-list").addEventListener("click", (e) => {
  TodoActions.finishTodos(e.target);
});

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
