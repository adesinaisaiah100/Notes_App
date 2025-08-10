
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function AuthForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      if (res.ok) {
        window.localStorage.setItem('isFormAuthenticated', 'true');
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message || 'Login failed. Please register.');
      }
    } catch (err) {
      setError('Login failed. Please register.');
    }
  };

  return (
    <form className='flex flex-col gap-3 items-center' onSubmit={handleSubmit}>
      <div className="mb-4 flex gap-1 w-full flex-col">
        <label htmlFor="email" className="block dark:text-gray-200 text-sm font-medium text-gray-800 ">Email</label>
        <input type="email" id="email" name="email" required className="px-2 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border" value={form.email} onChange={handleChange} />
      </div>
      <div className="mb-4 flex gap-1 w-full flex-col">
        <label htmlFor="password" className="block text-sm font-medium dark:text-gray-200 text-gray-800">Password</label>
        <input type="password" id="password" name="password" required className="mt-1 px-2 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border" value={form.password} onChange={handleChange} />
      </div>
      {error && (
        <div className="text-red-500 text-sm">
          {error}
          {error.toLowerCase().includes('not found') && (
            <span> <a href="/Register" className="text-blue-600 underline">Go to Register</a></span>
          )}
        </div>
      )}
      <button type="submit" className="w-[140px] bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700">Login</button>
    </form>
  );
}

export default AuthForm;