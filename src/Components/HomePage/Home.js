import React from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'

export default function Home() {
  return (
    <div>
        <div className='container'>
            <div className='conversation-container'>
                <LeftSide></LeftSide>
                <RightSide></RightSide>
            </div>
        </div>        
    </div>
  )
}
