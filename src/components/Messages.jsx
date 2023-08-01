import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { onSnapshot } from 'firebase/firestore'
import {db} from "../firebase"
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc
  } from "firebase/firestore";// now lets find a user


const Messages = () => {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId])

    console.log (messages)

    return (
        <div className='messages'>
            {messages.map(m => (
                <Message message={m} key={m.id}/>
            ))}
        </div>
    )
}

export default Messages