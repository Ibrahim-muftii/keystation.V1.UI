'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react";


const VapiForm = ({assistant}:any) => {
    const [vapiAssistant, setVapiAssistant] = useState<any>(assistant);
    
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

    return (
        <React.Fragment>
            <div className="flex flex-col p-4">
                <label>First Message</label>
                <Input type="text" onChange={handleVapiAssistantChange} value={vapiAssistant.firstMessage || ''} placeholder="Enter First Message..." />
            </div>
            <div className="flex flex-col py-2 px-4">
                <label>Voice Message</label>
                <Input type="text" onChange={handleVapiAssistantChange} value={vapiAssistant.voicemailMessage || ''} placeholder="Enter First Message..." />
            </div>
            <div className="flex items-center py-4 px-4">
                <Checkbox onChange={handleVapiAssistantChange} checked={vapiAssistant.firstMessageInterruptionsEnabled} />
                <label className="ml-3">
                    First Message Interruption
                    <p className="text-white/50">This Will Allow the chat to stop if someone start talking between the first message</p>
                </label>
            </div>
            <div className="flex justify-end p-4">
                <Button className="px-10! cursor-pointer" ><Save/> Save Initalization</Button>
            </div>
        </React.Fragment>
    )
}

export default VapiForm;