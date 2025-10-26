'use client'

import { RegisterationIt } from "@/app/(authentication)/register/RegisterComponents/RegisterForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserDetails } from "@/services/user.service";
import { RootState } from "@/store/store";
import { Save } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";


interface DetailsFormsPropsIT {
    user:RegisterationIt
}

const DetailsForm = (props:DetailsFormsPropsIT) => {

    const [user,setUser] = useState<RegisterationIt>(props.user);
    const token = useSelector((state:RootState) => state.user)?.accessToken;

    useEffect(() => {
        setUser(props.user);
    },[props.user]);

    const handleDetailsChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
    }

    const updateDetails = async () => {
        try {
            const response = await updateUserDetails(user,token);
            toast.success(response.data.message);
        } catch (error:any) {
            toast.error(error);
        }   
    }

    return (
        <div className="p-3 flex flex-col">
            <div className="flex flex-row">
                <div className="w-1/2 pr-3 flex flex-col">
                    <label>First Name</label>
                    <Input name="firstName" onChange={handleDetailsChange} value={user?.firstName || ''}/>
                </div>
                <div className="w-1/2 pl-3 flex flex-col">
                    <label>Last Name</label>
                    <Input name="lastName" onChange={handleDetailsChange} value={user?.lastName || ''} />
                </div>
            </div>
            <div className="w-full flex pt-6 flex-col">
                <label>Email</label>
                <Input name="email" onChange={handleDetailsChange} value={user?.email || ''} />
            </div>
            <div className="w-full pt-6  flex justify-end">
                <Button onClick={updateDetails} className="px-10! cursor-pointer py-3! bg-white flex items-center "><Save/> Update Details</Button>
            </div>
        </div>
    )
}

export default DetailsForm;