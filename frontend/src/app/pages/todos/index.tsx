import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTodos, deleteTodo, pinTodo } from '../../redux/slices/todoSlice';
import TodoItem from '../../components/TodoItem';
import Layout from '../../components/Layout';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        dispatch(setTodos(response.data));
      } catch (error) {
        alert('Failed to load todos');
      }
    };
    fetchTodos();
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
    axios.delete(`/api/todos/${id}`);
  };

  const handlePin = (id: number) => {
    dispatch(pinTodo(id));
    axios.put(`/api/todos/${id}`);
  };

  return (
    <Layout>
      <h2 className="text-2xl mb-4">My Todos</h2>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onPin={handlePin}
          />
        ))}
      </div>
    </Layout>
  );
};

export default TodoList;
