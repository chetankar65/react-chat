import React, { useState, useEffect, useContext } from 'react'
import {doc, onSnapshot} from "firebase/firestore"
import {db} from "../firebase"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, updateDoc } from 'firebase/firestore'
import {v4 as uuid} from "uuid"

const Input = () => {
    const {currentUser} = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const [text, setText] = useState("")

    const handleSend = async () => {
        await updateDoc(doc(db, "chats", data.chatId),{
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            })
        })

        setText("")
    }

    return (
        <div className='input'>
            <input type='text' placeholder='Message' onChange={e=>setText(e.target.value)} value={text}/>
            <div className='send'>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input