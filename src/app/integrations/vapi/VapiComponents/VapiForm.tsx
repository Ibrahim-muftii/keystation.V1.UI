'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { updateVapiAssistantData } from "@/services/Assistants.service";
import { RootState } from "@/store/store";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";


const VapiForm = ({assistant}:any) => {
    const [vapiAssistant, setVapiAssistant] = useState<any>(assistant);
    const token = useSelector((state:RootState) => state.user)?.accessToken;
    const router = useRouter();
    useEffect(() => {
        setVapiAssistant(assistant);
    },[assistant])

    const handleVapiAssistantChange = (event:any) => {
        const { name,checked,value, type } = event.target;
        setVapiAssistant((prev:any) => ({
            ...prev!,
            [name]:type === 'checked' ? checked : value
        }))
    }

    const updateVapiAssistant = async () => {
        try {
            console.log(vapiAssistant)
            const response = await updateVapiAssistantData(vapiAssistant, token);
            toast.success(response?.data?.message);
            router.refresh();
        } catch (error:any) {
            toast.error(error);
        }
    } 

    return (
        <React.Fragment>
            <div className="flex flex-col p-4">
                <label>First Message</label>
                <Input name="firstMessage" type="text" onChange={handleVapiAssistantChange} value={vapiAssistant.firstMessage || ''} placeholder="Enter First Message..." />
            </div> 
            <div className="flex flex-col py-2 px-4">
                <label>Voice Message</label>
                <Input name="voicemailMessage" type="text" onChange={handleVapiAssistantChange} value={vapiAssistant.voicemailMessage || ''} placeholder="Enter First Message..." />
            </div>
            <div className="flex justify-end p-4">
                <Button onClick={updateVapiAssistant} className="px-10! cursor-pointer" ><Save/> Save Initalization</Button>
            </div>
        </React.Fragment>
    )
}

export default VapiForm;