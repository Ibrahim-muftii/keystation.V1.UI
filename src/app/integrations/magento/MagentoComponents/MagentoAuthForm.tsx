'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveMagentoDetails } from "@/services/Authentication.services";
import { RootState } from "@/store/store";
import { CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const MagentoAuthForm = ({exists}:any) => {
    const [magentoDetails, setMagentoDetails] = useState<any>();
    const [magentoExists, setMagentExists] = useState<boolean>(exists)
    const token = useSelector((state:RootState) => state.user)?.accessToken;
    const router = useRouter();

    useEffect(() => {
        setMagentExists(exists);
    },[exists])

    const handleMagentoDetailsChange = (event:ChangeEvent<HTMLInputElement>) => {
        setMagentoDetails((prev:any) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
    }

    const authenticateMagento = async () => {
        try {
            if(!magentoDetails.username || !magentoDetails.password) return toast.error("Please Fill All the fields");
            
            const response = await saveMagentoDetails(magentoDetails, token);
            toast.success(response.data.message);
            setMagentExists(true);
            router.refresh();
        } catch (error:any) {
            toast.error(error);

        }
    }

    return (
        <React.Fragment>
            {
                !magentoExists ?
                    <div className=" mb-2 flex flex-col">
                        <div className="flex p-2 px-4 mb-3 items-start flex-col">
                            <label>Username</label>
                            <Input onChange={handleMagentoDetailsChange} type="text" placeholder="Enter Magento Username" name="username" />
                        </div>
                        <div className="flex p-2 px-4 mb-3 items-start flex-col">
                            <label>Password</label>
                            <Input onChange={handleMagentoDetailsChange} type="password" placeholder="Enter Magento Password" name="password" />
                        </div>
                        <div className="border-t-2 p-4 border-black">
                            <Button onClick={authenticateMagento} className="w-full cursor-pointer">Authenticate Magento</Button>
                        </div>
                    </div>
                :
                    <React.Fragment>
                        <div className="flex justify-center items-center px-4 py-8 gap-x-2">
                            <CheckCircleIcon className="w-10 h-10 text-green-600" />
                            <h5>You are already Configured</h5>
                        </div>
                        <div className="flex justify-center p-4">
                            <Button onClick={() => setMagentExists(false)} className="w-full cursor-pointer">Reconfigure Magento</Button>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default MagentoAuthForm;