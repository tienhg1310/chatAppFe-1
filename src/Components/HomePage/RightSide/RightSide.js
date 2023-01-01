import React from 'react'
import ChatMessage from './Message/ChatMessage'

import UserContact from './UserContact/UserContact'

export default function RightSide() {
    return (
        <div className='right-side'>
            <UserContact></UserContact>
            <ChatMessage></ChatMessage>

        </div>
    )
}
