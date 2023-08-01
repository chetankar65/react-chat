import React, { useContext , useRef, useEffect} from 'react'
import Message from './Message'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Messages = ({message}) => {
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message])

    if (message.senderId === currentUser.uid) {
        return (
            <div className='message owner'>
                <div className='messageInfo'>
                <img src={currentUser.photoURL}/>
                </div>
                <div className='messageContent'>
                    <p>{message.text}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className='message'>
                <div className='messageInfo'>
                <img src={data.user.photoURL}/>
                </div>
                <div className='messageContent'>
                    <p>{message.text}</p>
                </div>
            </div>
        )
    }
}

export default Messages