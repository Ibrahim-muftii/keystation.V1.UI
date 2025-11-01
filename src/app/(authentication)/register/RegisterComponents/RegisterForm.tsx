
'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/Authentication.services";
import { setAccessToken, setUser } from "@/slicer/user.slicer";
import { Label } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export interface RegisterationIt {
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    confirmPassword:string,
}


const RegisterForm = () =>  {

    const [registeration, setRegisteration] = useState<RegisterationIt>();
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLoginChange = (event:ChangeEvent<HTMLInputElement>) => {
        setRegisteration((prev) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
    }

    const register = async () => {
        try {
            if(!registeration?.email ||!registeration.firstName || !registeration.lastName || !registeration.password || !registeration.confirmPassword )  {
                return toast.info("Please enter all the field....");
            }
    
            if(registeration.password !== registeration.confirmPassword) {
                return toast.error("Password does not match please try again");
            }

            const response = await registerUser(registeration);
            dispatch(setUser(response.user))
            dispatch(setAccessToken(response.access_token));
            router.push('/')
            router.refresh();
            return toast.success(response.message);
        } catch(error:any) {
            return toast.error(error.message);
        } 

    }

    return (
        <React.Fragment>
            <div className="flex gap-x-2">
                <div className="flex flex-col w-full mb-3">
                    <Label className="text-white/60 text-xs mb-2">First Name</Label>
                    <Input
                        name="firstName"
                        value={registeration?.firstName || ''}
                        onChange={handleLoginChange}
                        placeholder="Enter First Name"
                        className="outline-1 outline-white/30 text-white border-white/50"
                        type="email"
                    />
                </div>
                <div className="flex flex-col w-full mb-3">
                    <Label className="text-white/60 text-xs mb-2">Last Name</Label>
                    <Input
                        name="lastName"
                        value={registeration?.lastName || ''}
                        onChange={handleLoginChange}
                        placeholder="Enter First Name"
                        className="outline-1 outline-white/30 text-white border-white/50"
                        type="email"
                    />
                </div>
            </div>
            <div className="flex flex-col w-full mb-3">
                <Label className="text-white/60 text-xs mb-2">Email</Label>
                <Input 
                    name="email" 
                    value={registeration?.email || ''} 
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
                    value={registeration?.password || ''} 
                    onChange={handleLoginChange}  
                    placeholder="Enter Password" 
                    className={`
                        ${registeration?.password && registeration.password !== '' || registeration?.confirmPassword && registeration.confirmPassword !== '' ? 'border-green-400 ' : ''}
                        ${registeration?.password != registeration?.confirmPassword ? 'border-red-600 ' : 'border-white/50 '} 
                        outline-1 outline-white/30 text-white border-white/50`} 
                    type="password"
                />
            </div>
            <div className="flex flex-col w-full mb-3">
                <Label className="text-white/60 text-xs mb-2">Confirm Password</Label>
                <Input 
                    name="confirmPassword" 
                    value={registeration?.confirmPassword || ''} 
                    onChange={handleLoginChange}  
                    placeholder="Confirm Password" 
                    className={`
                        ${registeration?.password && registeration.password !== '' || registeration?.confirmPassword && registeration.confirmPassword !== '' ? 'border-green-400 ' : ''}
                        ${registeration?.password != registeration?.confirmPassword ? 'border-red-600' : 'border-white/50'} 
                        outline-1 outline-white/30 text-white `} 
                    type="password"
                />
            </div>
            <div className="flex w-full pt-3 pb-5">
                <Button 
                    onClick={register}
                    disabled={!registeration?.email || !registeration?.password || !registeration.firstName || !registeration.lastName || !registeration.confirmPassword }
                    variant="outline"  
                    className="w-full cursor-pointer text-black bg-white!" 
                >Register User</Button>
            </div>
            <p className="text-xs">Already have an account ? <Link className="rounded-md hover:bg-white hover:text-black hover:px-2 hover:py-0.5" href={"/login"}>Sign In</Link></p>
        </React.Fragment>
    )
}


export default RegisterForm;