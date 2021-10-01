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

lists.forEach((list) => {
  list.addEventListener("click", confirmChange);
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
    task.setAttribute("contenteditable", "true");
    task.children[1].innerHTML = '<i class="fas fa-check-circle"></i>';
    task.children[0].style.display = "none";
    task.classList.add("editable");
    task.focus();
  }
}

function confirmChange(e) {
  const item = e.target;
  console.log(item)
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
