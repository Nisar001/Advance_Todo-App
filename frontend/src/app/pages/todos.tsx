import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, removeTodo } from '../redux/slices/todoSlice';
import { RootState } from '../redux/store';
import Link from 'next/link';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) return;
    const fetchTodos = async () => {
      const response = await axios.get('/api/todos');
      dispatch(setTodos(response.data));
    };

    fetchTodos();
  }, [dispatch, user]);

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/todos/${id}`);
    dispatch(removeTodo(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome, {user?.mobile}</h2>
      <Link href="/todos/create" passHref>
        <button className="mb-6 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Create New Todo
        </button>
      </Link>
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{todo.name}</h3>
            <p className="text-sm text-gray-600">{todo.description}</p>
            <button
              onClick={() => handleDelete(todo.id)}
              className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
