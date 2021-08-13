import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


 
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInuser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useState({
        name: '',
        email: ''
    })
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                
                const {displayName, email} = result.user;
                const signInUser = {
                    name: displayName,
                    email: email
                }
                setUser(signInUser)
                setLoggedInUser(signInUser)
                history.replace(from)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            
                <p>{user.name}</p>
                <p>{user.email}</p>
                
            
        </div>
    );
};

export default Login;