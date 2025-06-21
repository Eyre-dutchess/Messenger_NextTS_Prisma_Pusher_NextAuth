"use client"

import clsx from "clsx"
import useConversations from "../hook/useConversations"
import { EmptyState } from "../component/EmptyState"

const ConversationPage =()=> {
    const {isOpen} = useConversations()

    return (
        <div className={clsx("lg:pl-80 h-full lg:block sm:w-2/3 mx-auto max-w-[600px]",
            isOpen?"block":"hidden"
        )}>
            <EmptyState title="No conversations yet."/>
        </div>
    )
}
export default ConversationPage;