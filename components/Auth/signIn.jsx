import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth,name,password)
      .then((UserCredential)=>{
      })
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={e => {
        e.preventDefault();
        handleSignIn();
      }}>
        <div>
          <label>Email:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
