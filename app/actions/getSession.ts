import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth].ts";

export default async function getSession(){
    return await getServerSession(authOptions)
}
