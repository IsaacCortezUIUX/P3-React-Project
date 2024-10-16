// src/components/AuthPage.jsx
import React, { useState } from 'react';
import { useUser } from './UserContext'; // Import the context

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State for registration success
  const [loginSuccess, setLoginSuccess] = useState(false); // State for login success
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const { login, registerUser, isEmailRegistered } = useUser();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setRegistrationSuccess(false); // Reset success message on mode change
    setLoginSuccess(false); // Reset login success message on mode change
    setErrorMessage(''); // Reset error message on mode change
  };

  const handleLogin = () => {
    // Check if email is registered before logging in
    if (isEmailRegistered(email)) {
      login(email);
      setLoginSuccess(true); // Set login success
      setErrorMessage(''); // Clear any error message on successful login
    } else {
      setErrorMessage('This email is not registered. Please register first.');
    }
  };

  const handleRegister = () => {
    // Check if the email is already registered
    if (isEmailRegistered(email)) {
      setErrorMessage('This email is already registered. Please log in instead.');
      return;
    }

    // Simple validation for demo purposes
    if (password === confirmPassword) {
      registerUser({ name: email.split('@')[0], email });
      setRegistrationSuccess(true); // Set registration success
      setErrorMessage(''); // Clear error message on successful registration
    } else {
      setErrorMessage('Passwords do not match!');
    }
  };

  return (
    <div className="auth-page">
      {isLogin ? (
        <div className="login-form">
          <h2>Login</h2>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log In</button>
          <p onClick={toggleAuthMode}>Don't have an account? Register</p>
          {/* Display error message if any */}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          {/* Conditionally render the login success message */}
          {loginSuccess && (
            <div className="login-success">
              <p>You're in!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="register-form">
          <h2>Register</h2>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <p onClick={toggleAuthMode}>Already have an account? Log In</p>
          {/* Display error message if any */}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          {/* Conditionally render the registration success message */}
          {registrationSuccess && (
            <div className="registration-success">
              <p>You have registered!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AuthPage;
