const item_input = document.querySelectorAll(".items-input");
const lists = document.querySelectorAll(".list");

let draggedItem = null;

for (let x = 0; x < item_input.length; x++) {
  const item = item_input[x];

  item.addEventListener("dragstart", () => {
    console.log("dragged");
    draggedItem = item;
    setTimeout(function () {
      item.style.display = "none";
    }, 0);
  });

  item.addEventListener("dragend", () => {
    console.log("dragend");
    setTimeout(function () {
      draggedItem.style.display = "block";
    }, 0);
  });

  for (let z = 0; z < lists.length; z++) {
    const list = lists[z];

    list.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    list.addEventListener("dragenter", (e) => {
      e.preventDefault();
    });

    list.addEventListener("drop", (e) => {
      list.append(draggedItem);
    });
  }
}
