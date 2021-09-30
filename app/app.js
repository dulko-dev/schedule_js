const lists = document.querySelectorAll(".list");
const btnAdd = document.querySelectorAll(".button__items");
const items = document.querySelectorAll(".items-input");

[...btnAdd].map((el) => {
  el.addEventListener("click", (e) => {
    const newElement = document.createElement("div");
    newElement.classList.add("items-input");
    newElement.setAttribute("draggable", "true");
    newElement.innerText = "New Text";
    const parent = e.path[1].children[1];
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
    
  });
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
