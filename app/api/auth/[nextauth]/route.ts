import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/app/libs/prismadb"
import bcrypt from "bcryptjs";

export const authOptions :AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label:"email", type:"text"},
                password:{label:"password", type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid Credentials")
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })
                
                if(!user || !user?.hashedPassword){
                    throw new Error("can't find user")
                }

                const isCorrect = await bcrypt.compare(
                    user.hashedPassword,
                    credentials.password
                )
                if(!isCorrect){
                    throw new Error("wrong password")
                }

                return user
            }
        })
    ],
    session:{
        strategy: "jwt",
        maxAge: 1000 * 60 * 60
    },
    pages:{
        signIn:"/"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}
const handler = NextAuth(authOptions)
export  {handler as GET, handler as POST};
