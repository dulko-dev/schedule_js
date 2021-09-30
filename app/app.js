const item_input = document.querySelectorAll(".items-input");
const lists = document.querySelectorAll(".list");

item_input.forEach((draggable) => {
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
