import axios from "axios";
import { userService } from "./userService";
import { v4 } from "uuid";

export const todoService = {
  getTodos: async () => {
    const userId = userService.auth();
    const API_URL = "http://localhost:3000/users" + "/" + userId;

    const res = await axios.get(API_URL);

    const data = res.data.todos;
    console.log(data);

    return data;
  },

  createTodo: async (todo) => {
    const userId = userService.auth();
    const API_URL = "http://localhost:3000/users" + "/" + userId;
    
    const user = (await axios.get(API_URL)).data;
    const newTodos = todo.id
      ? user.todos.map((td) => (td.id === todo.id ? todo : td))
      : [...user.todos, { ...todo, status: false, id: v4() }];

    const res = await axios.put(API_URL, {
      ...user,
      todos: newTodos,
    });

    const data = res.data.todos;

    console.log(data);

    return data;
  },

  markTodo: async (id) => {
    const userId = userService.auth();
    const API_URL = "http://localhost:3000/users" + "/" + userId;

    const user = (await axios.get(API_URL)).data;
    const todo = user.todos.find((td) => td.id === id);
    const res = await axios.put(API_URL, {
      ...user,
      todos: user.todos.map((td) =>
        td.id === id ? { ...todo, status: !todo.status } : td
      ),
    });

    const data = res.data.todos;

    console.log(data);

    return data;
  },

  deleteTodo: async (id) => {
    const userId = userService.auth();
    const API_URL = "http://localhost:3000/users" + "/" + userId;

    const user = (await axios.get(API_URL)).data;
    const res = await axios.put(API_URL, {
      ...user,
      todos: user.todos.filter((td) => td.id !== id),
    });

    const data = res.data.todos;

    console.log(data);

    return data;
  },
};
