"use client";

import React, { useCallback, useEffect, useState } from 'react' 
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast';

import { Input } from '@/app/component/modal/Input'
import { Button } from '@/app/component/modal/Button';

type Variant = "LOGIN" | "REGISTER"

export const AuthForm = () => {
    const router = useRouter()
    const session = useSession()
   
    const [loading, setLoading] = useState(false)
    const [variant, setVariant] = useState<Variant>("LOGIN")

    useEffect(()=>{
        if(session?.status === "authenticated"){
            router.push("/users")
        }
    }, [session?.status, router])

    const toggleVariant  = useCallback(()=>{
        if(variant == "LOGIN"){
            setVariant("REGISTER")
        }else{
            setVariant("LOGIN")
        }
    }, [variant])

    const {handleSubmit, register, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setLoading(true)

        if(variant === "REGISTER"){
            axios.post("/api/register", data)
            .then(()=>{
                 toast.success("register succesfully")
            })
            .catch(()=>{
                toast.error("can't register")
            })
            .finally(()=>{
                setLoading(false)
            })
        }
        if(variant === "LOGIN"){
            signIn("credentials", {
                ...data,
                redirect: false
            })
            .then((callback: any)=>{
                if(callback?.error){
                    toast.error("can't log in")
                }
                if(callback?.ok && !callback?.error){
                    toast.success("log in succesfully")
                    router.push("/users")
                }
            })
            .finally(()=> setLoading(false))
        }
    }

    const socialAction = (action: string) =>{
        setLoading(true)
        signIn(action, {redirect: false})
        .then((callback) => {
            if(callback?.error){
                toast.error("invalid credentials")
            }
            if(callback?.ok && !callback?.error){
                toast.success("logged in")
            }
        })
        .finally(()=> setLoading(false))
    }
  return(
    <div className='w-4/5 mt-8 bg-white/50 shadow rounded-md md:rounded-lg overflow-hidden mx-auto sm:w-full sm:max-w-md'>
        <div className="w-full bg-white px-4 py-8 shadow  sm:px-10">
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                {variant == "REGISTER" && (
                    <Input id="name" type="text" label="Name: " required register={register}  errors={errors}/>
                )}
                <Input id="email" type="text" label="Email: " required register={register}  errors={errors}/>
                <Input id="password" type="password" label="Password: " required register={register}  errors={errors}/>
                <Button disabled={loading} fullWidth type="submit">
                    {variant === "LOGIN" ? "Sign in" :"Register"}
                </Button>
            </form>

            <div className='w-full mt-4 flex flex-row gap-2 items-center'>
                <p className='w-full h-[1px] bg-gray-400/75'></p>
                <span className=' text-sm text-gray-400/75 whitespace-nowrap'>Or continue with </span>
                <p className='w-full h-[1px] bg-gray-400/75'></p>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-2'>
                <Button disabled={loading}  type="submit" onClick={()=> socialAction("github")}>
                    <BsGithub />
                </Button>
                <Button disabled={loading}  type="submit" onClick={()=> socialAction("google")}>
                    <BsGoogle />
                </Button>
            </div>

            <div className='w-full items-center justify-center gap-2 mt-6 flex flex-row text-sm text-gray-400/50'>
                <p >{variant === "LOGIN" ? "Don't have an account yet?" :"Already have an account?"}</p>
                <span onClick={toggleVariant} className='hover:text-gray-500/75 cursor-pointer hover:font-bold hover:underline underline-offset-4'>{variant === "LOGIN" ? "Register" : "Sign in"} now</span>
            </div>
        </div>
    </div>
  )
}
