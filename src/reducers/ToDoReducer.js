import axios from 'axios'

const INITIAL_STATE = {
  todos: [],
  filter: 'ALL'
};

axios.get('https://jsonplaceholder.typicode.com/todos/').then((res) => {
  INITIAL_STATE.todos = res.data.slice(0, 30);
});

const ToDoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      let existingToDo = false;

      state.todos.forEach((toDo) => {
        if (toDo.title === action.title) {
          existingToDo = true;
          alert('Exist');
          return;
        }
      });

      if (existingToDo) return state;

      const newToDos = [
        ...state.todos,
        {
          id: action.id,
          title: action.title,
          completed: false
        }
      ];
      localStorage.setItem('toDo', JSON.stringify(newToDos));
      return {
        todos: newToDos,
          filter: 'ALL'
      };

    case 'REMOVE_TODO':
      const id = action.id;
      const newToDo_1 = state.todos.filter((toDo) => toDo.id !== id);
      localStorage.setItem('toDo', JSON.stringify(newToDo_1));
      return {
        ...state,
        todos: newToDo_1
      };
    case 'DELETE_ALL':
      localStorage.removeItem('todo');

      return {
        todos: [],
          filter: 'ALL'
      };

    case 'SEARCH_TODO':
      const allTodos = JSON.parse(localStorage.getItem('toDo'));
      console.log(allTodos)
      const searchedTodos = allTodos.filter((val) => val.title.includes(action.value));
      return {
        todos: searchedTodos,
          filter: 'ALL'
      };
      
    case 'COMPLETE_TODO':
      const updatedTodos = state.todos.map(
        (toDo) =>
        toDo.id === action.id ? {
          ...toDo,
          completed: !toDo.completed
        } :
        toDo
      );
      localStorage.setItem('toDo', JSON.stringify(updatedTodos));
      return {
        todos: updatedTodos,
          filter: 'ALL'
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

export default ToDoReducer;