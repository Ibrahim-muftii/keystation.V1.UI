'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/Authentication.services";
import { setAccessToken, setUser } from "@/slicer/user.slicer";
import { Label } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export interface LoginIT {
    email:string,
    password:string,
}

const LoginForm = () => {
    const [login, setLogin] = useState<LoginIT>();
    const [loading,setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLoginChange = (event:ChangeEvent<HTMLInputElement>) => {
        setLogin((prev) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
    }

    const authenticate = async () => {
        setLoading(true);
        try {
            if(!login?.email || !login.password) {
                return toast.info("Please Enter All the fields");
            }
            const response = await loginUser(login);
            console.log("Login Response : ",response);
            dispatch(setUser(response.user))
            dispatch(setAccessToken(response.access_token));
            router.push("/")
            toast.success(response.message);
        } catch (error:any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            <div className="flex flex-col w-full mb-3">
                <Label className="text-white/60 text-xs mb-2">Email</Label>
                <Input 
                    name="email" 
                    value={login?.email || ''} 
                    onChange={handleLoginChange} 
                    placeholder="Enter Email" 
                    className="outline-1 outline-white/30 text-white border-white/50" 
                    type="email"
                />
            </div>
            <div className="flex flex-col w-full mb-3">
                <Label className="text-white/60 text-xs mb-2">Password</Label>
                <Input 
                    name="password" 
                    value={login?.password || ''} 
                    onChange={handleLoginChange}  
                    placeholder="Enter Password" 
                    className="outline-1 outline-white/30 text-white border-white/50" 
                    type="password"
                />
            </div>
            <div className="flex w-full pt-3 pb-5">
                <Button 
                    onClick={authenticate}
                    disabled={!login?.email || !login?.password }
                    variant="outline"  
                    className="w-full cursor-pointer light text-black bg-white!" 
                >Login User</Button>
            </div>
            <p className="text-xs">dont have an account ? <Link className="rounded-md hover:bg-white hover:text-black hover:px-2 hover:py-0.5" href={"/register"}>Create Account</Link></p>
        </React.Fragment>
    )
}

export default LoginForm;