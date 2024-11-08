// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import { signUp, signIn, signOut, getUser } from '../supaBaseClient';
import { useNavigate } from 'react-router-dom';

const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<any>(getUser());

  const navigate: any = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSignUp = async () => {
    const { user, error } = await signUp(email, password);
    if (error) {
      alert('Sign-up failed: ' + error.message);
    } else {
      //send UUID to database and place in user table along with metadata
      alert(user?.email + 'Sign-up successful...check email');
      //setUser(user);
    }
  };

  const handleSignIn = async () => {
    const { user, error } = await signIn(email, password);
    if (error) {
      alert('Sign-in failed: ' + error.message);
    } else {
      setUser(user);
      alert(user?.email + 'Sign-in successful');
      navigate('/map');
      //setUser(user);
    }
  };

  const handleSignOut = async () => {
    const response = await signOut();
    console.log(response);
    if (response?.error) {
      alert('Sign-out failed: ' + response.error.message);
    } else {
      alert('Signed out successfully');
      //setUser(null);
    }
  };
  /*
Going to want to capture additional metaData

Name,username,etc.
*/

  const inputStyle: string =
    'p-5 text-white bg-black focus:ring-violet-900 focus:ring-2 focus:outline-none rounded-lg';
  const buttonStyle: string =
    'border-2 border-transparent bg-zinc-950 hover:border-violet-900';

  return (
    <>
      <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-zinc-800">
        <div className="pointer-events-auto flex w-96 flex-col gap-1 rounded-lg bg-zinc-900 p-5">
          <div className="flex items-center justify-center text-2xl font-bold text-violet-700">
            {' '}
            CLIMB W FRIENDS BITCHESS
          </div>
          <input
            className={inputStyle}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
          />
          <input
            className={inputStyle}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
          />
          <button className={buttonStyle} onClick={handleSignIn}>
            Sign In
          </button>
        </div>

        <div className="pointer-events-auto absolute left-0 top-0">
          <button className={buttonStyle} onClick={handleSignUp}>
            Sign Up
          </button>

          <button className={buttonStyle} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthComponent;
