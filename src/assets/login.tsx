// AuthComponent.tsx

import React, { useState,useEffect } from 'react';
import { signUp, signIn, signOut, getUser } from '../supaBaseClient';
import Map from './map';

const AuthComponent: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, setUser] = useState<any>(getUser());
    

    useEffect(()=>{

        console.log(user)
    },[user])

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
            setUser(user)
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

const inputStyle:string = 'p-5 text-white focus:ring-violet-900 focus:ring-2 focus:outline-none rounded-lg'
const buttonStyle:string = 'border-2 border-transparent bg-zinc-800 hover:border-violet-900'

    return (
        <> 
        <div className = 'absolute left-0 top-0 opacity-75'> <Map zoomLevel ={2} /></div>
        <div className = 'absolute z-25 pointer-events-none top-0 left-0 flex items-center justify-center w-screen h-screen'> 
        <div className = 'flex p-5 pointer-events-auto bg-zinc-900 rounded-lg flex-col w-96 gap-1'>
            <div className = 'flex justify-center items-center text-2xl font-bold text-violet-700'> CLIMB W FRIENDS BITCHESS</div>
            <input
                className = {inputStyle}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
            />
            <input
                className = {inputStyle}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                value={password}
            />
            <button className = {buttonStyle} onClick={handleSignIn}>Sign In</button>

            </div>

            <div className = 'absolute pointer-events-auto left-0 top-0'> 
            <button className = {buttonStyle} onClick={handleSignUp}>Sign Up</button>
            
            <button className = {buttonStyle} onClick={handleSignOut}>Sign Out</button>
            </div>
        
        </div>
        </>
    );
};

export default AuthComponent;
