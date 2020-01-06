import uuid from "uuid";

export const addToDo = title => {
  return {
    type: "ADD_TODO",
    id: uuid(),
    title,
    completed: false
  };
};

export const removeToDo = id => {
  return {
    type: "REMOVE_TODO",
    id
  };
};

/*
export const editToDo = id =>{
  return {
    type: "Edit_TODO",
    id: uuid(),
    title: id.title,
    completed: true
  };
}
*/

export const searchToDo = value => {
  return {
    type: "SEARCH_TODO",
    value
  };
};

export const completeToDo = id => {
  return {
    type: "COMPLETE_TODO",
    id
  };
};

export const setFilter = filter => {
  return {
    type: "SET_FILTER",
    payload: filter
  };
};