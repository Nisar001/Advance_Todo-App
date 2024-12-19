import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  name: string;
  description: string;
  timeEstimate: string;
  status: 'in progress' | 'completed';
  pinned: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    pinTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.pinned = !todo.pinned;
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, pinTodo } = todoSlice.actions;
export default todoSlice.reducer;
