function schedule() {
  const save = (data) => {
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
    read,
    save
  };
}

export default schedule;
