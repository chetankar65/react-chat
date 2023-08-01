import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db} from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from "firebase/firestore"
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
          console.log(err)
          setErr(true);
          setLoading(false);
        }
      };


    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>React Chat</span><br></br>
                <span className='title'>Login</span><br></br>
                <form onSubmit={handleSubmit}>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Passowrd'/>
                    <button>Sign In</button>
                </form>

                <br></br>
                <p>Register?</p>
            </div>
        </div>
    )
}

export default Login