const lists = document.querySelectorAll(".list");
const btnAdd = document.querySelectorAll(".button__items");
const l1 = document.querySelector(".l1");
const l2 = document.querySelector(".l2");
const l3 = document.querySelector(".l3");
const disk = document.querySelector(".saveDisk");
const infoSave = document.querySelector(".infoSave");

if (localStorage.getItem("l1") !== null) {
  l1.innerHTML = localStorage.getItem("l1");
}
if (localStorage.getItem("l2") !== null) {
  l2.innerHTML = localStorage.getItem("l2");
}
if (localStorage.getItem("l3") !== null) {
  l3.innerHTML = localStorage.getItem("l3");
}

(() => {
  setTimeout(() => {
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
  }, 0);
})();

const interval = setInterval(() => {
  localStorage.setItem("l1", l1.innerHTML);
  localStorage.setItem("l2", l2.innerHTML);
  localStorage.setItem("l3", l3.innerHTML);
  infoSave.style.display = "block";
  setTimeout(() => {
    infoSave.style.display = "none";
  }, 2000);
  return () => {
    clearInterval(interval);
  };
}, 30000);

// event listener
[...btnAdd].map((el) => {
  el.addEventListener("click", addTask);
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

disk.addEventListener("click", save);

// functions
function save() {
  localStorage.setItem("l1", l1.innerHTML);
  localStorage.setItem("l2", l2.innerHTML);
  localStorage.setItem("l3", l3.innerHTML);
  alert("Your progress has been saved");
}

function itemsOption(e) {
  const item = e.target;

  if (item.classList[3] === "trash") {
    const task = item.parentElement;
    task.remove();
  }

  if (item.classList[3] === "edit") {
    const task = item.parentElement;
    task.style.backgroundColor = "#9fe0ff";
    task.children[0].setAttribute("contenteditable", "true");
    task.children[0].style.cursor = "text";
    task.setAttribute("draggable", "false");
    task.children[1].style.display = "none";
    task.children[2].style.display = "none";
    task.children[3].style.display = "block";
    task.children[0].focus();
  }

  if (item.classList[3] === "correct") {
    const task = item.closest(".items-input");
    if (task.children[0].innerText.trim().length === 0) return;
    task.style.backgroundColor = "#ffff";
    task.children[0].removeAttribute("contenteditable");
    task.children[0].style.cursor = "pointer";
    task.setAttribute("draggable", "true");
    task.children[1].style.display = "block";
    task.children[2].style.display = "block";
    task.children[3].style.display = "none";
  }
}

function addTask(e) {
  const parent = e.path[1].children[1];
  const newElement = document.createElement("li");
  const newSpan = document.createElement("span");
  const trashIcon = document.createElement("i");
  const editIcon = document.createElement("i");
  const correctIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-edit", "edit");
  trashIcon.classList.add("fas", "fa-trash", "trash");
  correctIcon.classList.add("fas", "fa-check-circle", "correct");
  trashIcon.style.display = "none";
  editIcon.style.display = "none";
  newSpan.style.cursor = "text";
  newElement.classList.add("items-input");
  newElement.appendChild(newSpan);
  newSpan.setAttribute("contenteditable", "true");
  newElement.setAttribute("draggable", "false");
  newElement.appendChild(trashIcon);
  newElement.appendChild(editIcon);
  newElement.appendChild(correctIcon);
  parent.appendChild(newElement);
  newSpan.focus();

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
