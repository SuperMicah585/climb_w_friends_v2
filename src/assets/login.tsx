// AuthComponent.tsx

import React, { useState } from 'react';
import { signUp, signIn, signOut, getUser } from '../supaBaseClient';

const AuthComponent: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //const [user, setUser] = useState<any>(getUser());

    const handleSignUp = async () => {
        const { user, error } = await signUp(email, password);
        if (error) {
            alert('Sign-up failed: ' + error.message);
        } else {
            //send UUID to database and place in user table along with metadata
            alert( user?.email +  'Sign-up successful...check email');
            //setUser(user);
        }
    };

    const handleSignIn = async () => {
        const { user, error } = await signIn(email, password);
        if (error) {
            alert('Sign-in failed: ' + error.message);
        } else {
            alert(user?.email + 'Sign-in successful');
            //setUser(user);
        }
    };

    const handleSignOut = async () => {
        const response = await signOut();
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
    return (
        <div>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
            />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                value={password}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>

        </div>
    );
};

export default AuthComponent;
