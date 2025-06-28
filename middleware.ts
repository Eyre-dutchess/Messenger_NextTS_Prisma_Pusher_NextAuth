import {withAuth} from "next-auth/middleware"

export default withAuth({
    pages:{
        signIn:"/users"
    }
})

export const config = {
    matcher:[
        "/users/:path*",
        "/conversations/:path*",
        "/conversations/[conversationId]/:path*"
    ]
}
