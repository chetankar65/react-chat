import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db} from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from "firebase/firestore"
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        console.log(displayName, email, password)
        try {
          //Create user
          const res = await createUserWithEmailAndPassword(auth, email, password);
    
          //Create a unique image name
          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);
    
          await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                //Update profile
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/")
                //create empty user chats on firestore
              } catch (err) {
                console.log(err);
                setErr(true);
                setLoading(false);
              }
            });
          });
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
                <span className='title'>Register</span><br></br>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Display name'/>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Passowrd'/>
                    <input style={{display:'none'}} type='file' id='file'/>
                    <label style={{fontSize: 15}} htmlFor='file' id='file' className='title'>Upload Avatar</label>
                    <button>Sign up</button>
                </form>

                <br></br>
                <p>Login?</p>
            </div>
        </div>
    )
}

export default Register