
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: Request) :Promise<NextResponse> =>{
    try {
        const resp = await request.json()
        const {name, email,  password} = resp
        if(!name || !email || !password){
            return NextResponse.json({error:"missing infor"}, {status:400})
        }
        const hashedPassword =await bcrypt.hash(password, 12)
        const user = await prisma?.user.create({
            data:{
                name, email , hashedPassword
            }
        })
        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json({error:"something went wrong"}, {status:500})
    }

}