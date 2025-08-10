
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Signupform() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.first_name + ' ' + form.last_name,
          email: form.email,
          password: form.password
        })
      });
      if (res.ok) {
        window.localStorage.setItem('isFormAuthenticated', 'true');
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <form className='flex flex-col w-full gap-5 mt-4 items-center px-3' onSubmit={handleSubmit}>
        <div className=" flex gap-1 w-full flex-col">
          <input type="text" id="first_name" name="first_name" placeholder='First Name' required className= "px-2  py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border" value={form.first_name} onChange={handleChange} />
        </div>
        <div className=" flex gap-1 w-full flex-col">
          <input type="text" id="last_name" placeholder='Last Name' name="last_name" required className= "px-2  py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border" value={form.last_name} onChange={handleChange} />
        </div>
        <div className="flex gap-1 w-full flex-col">
          <input type="email" placeholder='Email' id="email" name="email" required className= "px-2  py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border" value={form.email} onChange={handleChange} />
        </div>
        <div className=" flex gap-1 w-full flex-col">
          <input type="password" id="password" placeholder='Password' name="password" required className="mt-1  px-2  py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border" value={form.password} onChange={handleChange} />
        </div>
        <div className=" flex gap-1 w-full flex-col">
          <input type="password" id="confirm_password" placeholder='Confirm Password' name="confirm_password" required className="mt-1  px-2  py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border" value={form.confirm_password} onChange={handleChange} />
        </div>
        {error && (
          <div className="text-red-500 text-sm">
            {error}
            {error.toLowerCase().includes('exist') && (
              <span> <a href="/login" className="text-blue-600 underline">Go to Login</a></span>
            )}
          </div>
        )}
        <button type="submit" className="w-[140px] mt-5 bg-blue-600 text-white  py-2 px-5 rounded-md hover:bg-blue-700">Sign Up</button>
      </form>
    </div>
  );
}

export default Signupform;