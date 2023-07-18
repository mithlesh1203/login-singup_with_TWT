import React, { useEffect, useState } from 'react';
import { api } from '../../Api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Email is required.');
      return;
    }

    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    try {
      const response = await api.post('/login', { emailId:email, password });

      if (response.status === 200) {
        // Save the token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirect to the home page or a protected route
        navigate('/');
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login.');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Assuming you have a signup route with the path '/signup'
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              Login
            </button>
            <button type="button" onClick={handleSignupClick} className="signup-button">
              New User? Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
