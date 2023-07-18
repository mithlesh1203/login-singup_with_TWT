import React, { useEffect, useState } from 'react';
import {  message, Input } from 'antd';
import { api } from '../../Api';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [usersName, setUsersName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  // Error state variables for each field
  const [usersNameError, setUsersNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cPasswordError, setCPasswordError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setUsersNameError('');
    setEmailError('');
    setPhoneNoError('');
    setPasswordError('');
    setCPasswordError('');

    let isValid = true;

    if (!usersName) {
      setUsersNameError('Full Name is required.');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    }

    // Add other validations for phoneNo, work, age, password, and cPassword

    if (!isValid) {
      return;
    }


    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{6,30}$/))    {
      setPasswordError(
        'Password should contain at least one uppercase letter, one lowercase letter, one digit, and be between 6 and 30 characters long.'
      );
      isValid = false;
    }

    if (!cPassword) {
      setCPasswordError('Confirm Password is required.');
      isValid = false;
    } else if (password !== cPassword) {
      setCPasswordError('Passwords do not match. Please enter the same password in both fields.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const payload = {
        fullName: usersName,
        emailId: email,
        phoneNo: phoneNo,
        password: password,
        cPassword: cPassword,
      };

      const usersdata = await api.post('/register', payload);
      console.log("🚀 ~ file: SignUp.js:96 ~ handleSubmit ~ usersdata:", usersdata)
      if (usersdata.status === 200) {
        navigate('/login');
      } else {
        window.alert('Invalid Registration');
        console.log('Invalid Registration');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // message.error('An error occurred during registration.');
      error && error.response && error.response && error.response.data &&  error.response.data.error === 'Email alredy Exist' ? message.error('Email alredy Exist') : message.error('An error occurred during registration.');
    }
  };

  const handleExistingUserClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="signup-container">
        <h2>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <Input value={usersName} onChange={(e) => setUsersName(e.target.value)} />
            <div className="error-message">{usersNameError}</div>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="error-message">{emailError}</div>
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <Input type="Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            <div className="error-message">{phoneNoError}</div>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="error-message">{passwordError}</div>
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <Input.Password value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
            <div className="error-message">{cPasswordError}</div>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">
              Sign Up
            </button>
            <button type="button" onClick={handleExistingUserClick} className="signup-button">
              Existing User? Login in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
