import React, {useContext} from 'react'
import Messages from './Messages'
import Input from './Input'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
    const {currentUser} = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    return (
        <div className='chat'>
            <div className='chatInfo'>
                <span>{data.user.displayName}</span>
            </div>
            <Messages/>
            <Input />
        </div>
    )
}

export default Chat