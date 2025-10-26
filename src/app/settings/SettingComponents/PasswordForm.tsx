'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserPassword } from "@/services/user.service";
import { RootState } from "@/store/store";
import { Lock } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";


export interface PasswordIT {
    currentPassword:string,
    newPassword:string,
    confirmNewPassword:string,
}

const PasswordForm = () => {
    const [passwords,setPasswords] = useState<PasswordIT>();
    const token = useSelector((state:RootState) => state.user)?.accessToken;
    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPasswords((prev) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
    }

    const changePasswords = async  () => {
        try {
            const response = await updateUserPassword(passwords!, token);
            toast.success(response.data.message);
        } catch (error:any) {
            toast.error(error)
        }
    }
    
    return (
        <div className="p-3 flex">
            <div className="w-3/5 flex flex-col gap-y-6">
                <div className="flex flex-col">
                    <label>Current Password</label>
                    <Input type="password" onChange={handlePasswordChange} name="currentPassword" value={passwords?.currentPassword || ''}/>
                </div>
                <div className="flex flex-col">
                    <label>New Password</label>
                    <Input type="password" onChange={handlePasswordChange} name="newPassword" value={passwords?.newPassword || ''}/>
                </div>
                <div className="flex flex-col">
                    <label>Confirm New Password</label>
                    <Input type="password" onChange={handlePasswordChange} name="confirmNewPassword" value={passwords?.confirmNewPassword || ''}/>
                </div>
                <div className="flex justify-end">
                    <Button onClick={changePasswords} className="px-10! py-3! bg-white flex items-center "><Lock /> Change Password</Button>
                </div>
            </div>
            <div className="flex flex-col w-2/5 p-4 mt-2 justify-start items-center">
                <div className="w-full py-3 rounded-lg bg-[#212121] border border-white/15"> 
                    <h5 className="px-3 pb-3 text-center font-semibold text-white border-b border-white/15"> Instructions </h5>
                    <ul className="py-3">
                        <li className="ml-6 mr-3 text-sm list-disc p">Passowrd length should be greater than 8</li>
                        <li className="ml-6 mr-3 text-sm list-disc p">Passowrd Must contain one upper case</li>
                        <li className="ml-6 mr-3 text-sm list-disc p">Passowrd Must be alpha numeric</li>
                        <li className="ml-6 mr-3 text-sm list-disc p">Password must contain at least one special character</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PasswordForm;