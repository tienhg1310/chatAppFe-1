import React from 'react'
import FormSendMessage from './FormSendMessage/FormSendMessage'
import ListMessage from './ListMessage/ListMessage'
import UserContact from './UserContact/UserContact'

export default function RightSide() {
    return (
        <div className='right-side'>
            <UserContact></UserContact>
            <ListMessage></ListMessage>
            <FormSendMessage></FormSendMessage>
        </div>
    )
}
