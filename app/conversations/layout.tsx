import React from 'react' 
import { Sidebar } from '../component/sidebar/Sidebar'
import { ConversationList } from './component/ConversationList'
import getConversations from '../actions/getConversations'
import getUsers from '../actions/getUsers'


export default async function ConversationLayout({children}:{children: React.ReactNode}){
    const conversations = await getConversations()
    const users = await getUsers()
  return(
    <Sidebar>
        <div className='h-full'>
            <ConversationList 
                initialItems = {conversations}
                users = {users}
            />
            {children}
        </div>
    </Sidebar>
  )
}
