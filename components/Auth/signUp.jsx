import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth,name,password)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={e => {
        e.preventDefault();
        handleSignUp();
      }}>
        <div>
          <label>Email:</label>
          <input type="email" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
