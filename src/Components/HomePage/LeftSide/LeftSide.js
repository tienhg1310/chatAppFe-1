import React from 'react'
import ListUserSearch from './ListUserSearch/ListUserSearch'
import TabControl from './TabControl/TabControl'
import ListUser from './ListUser/ListUser'
export default function LeftSide() {
    return (
        <div className="left-side">
            <h2>Chats</h2>
            <TabControl></TabControl>
            <ListUserSearch></ListUserSearch>
            <ListUser></ListUser>
        </div>
    )
}
