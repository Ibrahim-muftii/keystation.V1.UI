'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateVapiAssistantData } from "@/services/Assistants.service";
import { RootState } from "@/store/store";
import { Keyboard } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const VapiSystemPrompt = ({ assistant }: any) => {
    const [vapiAssistant, setVapiAssistant] = useState<any>(assistant);
    const token = useSelector((state: RootState) => state.user)?.accessToken;
    const router = useRouter();

    useEffect(() => {
        setVapiAssistant(assistant)
    },[assistant])

    const setVapiSystemPrompt = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setVapiAssistant((prev:any) => ({
            ...prev!,
            model:{
                ...prev.model,
                messages:[{
                    ...prev.model.messages[0],
                    content:event.target.value
                }],
                ...prev.model.messages.slice(1)
            }
        }))
    }

    const updateVapiAssistant = async () => {
        try {
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
                <label>Assistant System prompt</label>
                <code>
                    <Textarea onChange={setVapiSystemPrompt} className="h-full min-h-[500px] max-h-[550px] overflow-y-auto resize-none" value={vapiAssistant?.model?.messages?.[0].content || ''}  />
                </code>
            </div>
            <div className="flex justify-end p-4">  
                <Button onClick={updateVapiAssistant} className="px-10! cursor-pointer"><Keyboard/>Update prompt</Button>
            </div>
        </React.Fragment>
    )
}

export default VapiSystemPrompt;