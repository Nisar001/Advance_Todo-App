import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { useRouter } from 'next/router';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { mobile, password });
      if (response.data.success) {
        dispatch(setUser({ name: response.data.name, mobile }));
        router.push('/todos');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-md"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
