import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function SignInForm({ onSignIn }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [signInError, setSignInError] = useState(null); // State to track sign-in errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Set the token in a cookie
        cookies.set('authToken', token, { path: '/' });

        // Notify the parent component (App) of the successful sign-in
        onSignIn(token);

        // Navigate to the '/profile' page
        navigate('/profile');
      } else {
        // Handle authentication error here
        setSignInError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {signInError && <p style={{ color: 'red' }}>{signInError}</p>} {/* Display sign-in error */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignInForm;
