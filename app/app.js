const lists = document.querySelectorAll(".list");
const btnAdd = document.querySelectorAll(".button__items");
const items = document.querySelectorAll(".items-input");

// event listener
[...btnAdd].map((el) => {
  el.addEventListener("click", addTask);
});

items.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    setTimeout(() => {
      draggable.classList.add("drag");
    }, 0);
  });

  draggable.addEventListener("dragend", () => {
    setTimeout(() => {
      draggable.classList.remove("drag");
    }, 0);
  });
});

lists.forEach((content) => {
  content.addEventListener("dragover", (event) => {
    event.preventDefault();
    const placeElement = placeOfElement(content, event.clientY);
    const dragging = document.querySelector(".drag");
    if (placeOfElement == null) {
      content.appendChild(dragging);
    } else {
      content.insertBefore(dragging, placeElement);
    }
  });
});

lists.forEach((list) => {
  list.addEventListener("click", itemsOption);
});


// functions
function itemsOption(e) {
  const item = e.target;

  if (item.classList[3] === "trash") {
    const task = item.parentElement;
    task.remove();
  }

  if (item.classList[3] === "edit") {
    const task = item.parentElement;
    const correct = document.createElement("i");
    correct.classList.add("correct");
    task.setAttribute("contenteditable", "true");
    task.children[1].style.display = "none";
    task.children[0].style.display = "none";
    task.appendChild(correct);
    task.children[2].innerHTML = '<i class="fas fa-check-circle"></i>';
    task.children[2].style.display = "block";
    task.focus();
  }

  if (item.classList[1] === "fa-check-circle") {
    const task = item.closest(".items-input");
    task.removeAttribute("contenteditable");
    task.children[1].style.display = "block";
    task.children[0].style.display = "block";
    task.children[2].style.display = "none";
  }
}

function addTask(e) {
  const parent = e.path[1].children[1];
  const newElement = document.createElement("li");
  const trashIcon = document.createElement("i");
  const editIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-edit", "edit");
  trashIcon.classList.add("fas", "fa-trash", "trash");
  newElement.classList.add("items-input");
  newElement.setAttribute("draggable", "true");

  newElement.innerText = "New Item";
  newElement.appendChild(trashIcon);
  newElement.appendChild(editIcon);
  parent.appendChild(newElement);

  const items = document.querySelectorAll(".items-input");
  items.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      setTimeout(() => {
        draggable.classList.add("drag");
      }, 0);
    });

    draggable.addEventListener("dragend", () => {
      setTimeout(() => {
        draggable.classList.remove("drag");
      }, 0);
    });
  });
}

function placeOfElement(content, y) {
  const elements = [...content.querySelectorAll(".items-input:not(.drag)")];
  return elements.reduce(
    (close, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > close.offset) {
        return {
          offset: offset,
          element: child,
        };
      } else {
        return close;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
