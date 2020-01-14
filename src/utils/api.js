export const addItem = (obj) => {
  const data = getData();
  const result = [obj, ...data];
  updateData(result);
};

export const getData = () => JSON.parse(localStorage.getItem('todoList'));

export const updateData = (data) => localStorage.setItem('todoList', JSON.stringify(data));

export const editItem = (obj) => {
  const data = getData();
  const result = data.map((item) => {
    if (item.id === obj.id) {
      return {
        ...item,
        title: obj.title,
        description: obj.description,
        priority: obj.priority,
        deadline: obj.deadline,
        currentTagList: obj.currentTagList,
        file: obj.file,
      };
    }
    return item;
  });
  updateData(result);
};

export const getId = () => {
  let lastId = JSON.parse(localStorage.getItem('lastId'));
  lastId += 1;
  localStorage.setItem('lastId', lastId);
  return lastId;
};

export const deleteItem = (id) => {
  const data = getData();
  const result = data.filter((item) => item.id !== id);
  updateData(result);
};

export const doneItem = (id) => {
  const data = getData();
  const result = data.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        done: !item.done
      };
    }
    return item;
  });
  updateData(result);
};
