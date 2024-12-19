import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/slices/todoSlice';
import { useRouter } from 'next/router';

const CreateTodo = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const todo = { name, description, timeEstimate, status: 'in progress', pinned: false };
    try {
      const response = await axios.post('/api/todos/create', todo);
      dispatch(addTodo(response.data));
      router.push('/todos');
    } catch (error) {
      alert('Failed to create todo');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-6">Create Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Todo Name"
          className="w-full p-2 border rounded-md"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          value={timeEstimate}
          onChange={(e) => setTimeEstimate(e.target.value)}
          placeholder="Time Estimate"
          className="w-full p-2 border rounded-md"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
