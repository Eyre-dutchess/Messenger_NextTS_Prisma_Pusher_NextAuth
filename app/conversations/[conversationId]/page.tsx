
import React from 'react'
import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages'
import { EmptyState } from '@/app/component/EmptyState'
import { Header } from './component/Header'
import { Body } from './component/Body'
import { Form } from './component/Form'

interface IParams {
  conversationId: string
}

const ConversationSinglePage = async ({params}:{params:IParams}) =>{

    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if(!conversation){
    return(
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <EmptyState title="No messages yet." />
            </div>
        </div>
  )}

  return(
    <div className="lg:pl-80 min-h-[90vh]">
        <div className="h-full flex flex-col">
            <Header conversation={conversation}/>
            <Body initialMessages={messages}/>
            <Form />
        </div>
    </div>
  )
}

export default ConversationSinglePage;