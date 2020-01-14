export const addTagItem = (tag) => {
  const data = getTags();
  const result = [...data, tag];
  updateTags(result);
};

export const getTags = () => JSON.parse(localStorage.getItem('tagList')) || [];

export const updateTags = (data) => localStorage.setItem('tagList', JSON.stringify(data));

export const deleteTagItem = (tag) => {
  const data = getTags();
  const result = data.filter((item) => item !== tag);
  updateTags(result);
};
