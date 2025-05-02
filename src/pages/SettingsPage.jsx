// frontend/src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';  // Corrected import
import '../styles/SettingsPage.css';

const SettingsPage = () => {
  const { currentUser } = useAuth(); // Use the correct hook to get the user
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });

  useEffect(() => {
    if (currentUser) {
      setForm({ ...form, name: currentUser.displayName, email: currentUser.email });
    }
  }, [currentUser]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || 'Updated');
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <label>Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>New Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <label>Confirm Password:
          <input type="password" name="password_confirmation" onChange={handleChange} />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default SettingsPage;
