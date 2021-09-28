function schedule() {
  function getItem(col) {
    const column = read().find((el) => el.id == col);
    if (!column) {
      return [];
    }
    return column.items;
  }

  function insert(col, content) {
    const data = read();
    const column = data.find((el) => el.id == col);
    const item = {
      id: Math.floor(Math.random() * 1000),
      content,
    };
    if (!column) {
      throw new Error("Column doesn't exist");
    }
    column.items.push(item);
    save(data);
  }

  function update(itemUpdate, newInfo) {
    const data = read();
    const [item, currentCol] = (() => {
      for (const col of data) {
        const item = col.items.find((el) => el.id == itemUpdate);

        if (item) {
          return [item, col];
        }
      }
    })();

    if (!item) {
      throw new Error("Item not found");
    }

    item.content =
      newInfo.content === undefined ? item.content : newInfo.content;
  }

  function save(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  function read() {
    const data = localStorage.getItem("data");
    if (!data) {
      return [
        {
          id: 1,
          items: [],
        },
        {
          id: 2,
          items: [],
        },
        {
          id: 3,
          items: [],
        },
      ];
    }
    return JSON.parse(data);
  }

  return {
    insert,
    update,
  };
}

export default schedule;
