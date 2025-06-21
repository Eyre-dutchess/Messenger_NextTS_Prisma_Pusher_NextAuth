
import getCurrentUser from './getCurrentUser'
import prisma from "@/app/libs/prismadb"

export const getConversationById =async (conversationId: string) => {
  try {
    const curUser = await getCurrentUser()
    if(!curUser?.email) return null;

    // const {conversationId} = await params
    //     if(!conversationId || typeof conversationId !== "string"){
    //       throw new Error("invalid ID!")
    //     }

    const conversation = await prisma.conversation.findUnique({
        where:{
            id: conversationId
        },
        include:{
            users: true
        }
    })
    return conversation
  } catch (error: any) {
    return null
  }
}

export default getConversationById