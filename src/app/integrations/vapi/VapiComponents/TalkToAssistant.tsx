'use client'

import { Button } from "@/components/ui/button";
import { PhoneCall, Voicemail } from "lucide-react";
import Vapi from '@vapi-ai/web';
import { useEffect, useState } from "react";
import { useVapiVoice } from "@/hooks/use-vapi";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import './Vapi.css';

const VAPI_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const TalkToAssistant = ({assistant}:any) => {

    const { messages, startVoice, stopVoice } = useVapiVoice(assistant.id, VAPI_KEY!);
    const [communicate, setCommunicate] = useState<boolean>(false);
    return (
        <div className="flex flex-row justify-end p-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="px-10! cursor-pointer"><PhoneCall />Talk to assistant</Button>
                </DialogTrigger>
                <DialogContent className="dark">
                    <DialogHeader>
                        <DialogTitle>Communicate with assistant</DialogTitle>
                        <DialogDescription>
                            Do a ono on one conversation with you assistant and analyze according to your need
                        </DialogDescription>
                    </DialogHeader>
                    <div id="bars">
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                        <div className={`${communicate ? 'bar' : 'bar-not-moving'} `}></div>
                    </div>
                    <DialogFooter> 
                        <DialogClose asChild>
                            <Button className="cursor-pointer" onClick={() => {stopVoice(); setCommunicate(false)}}> End Conversation</Button>
                        </DialogClose>
                        <Button className="cursor-pointer" onClick={() => { startVoice(); setCommunicate(true)}}><Voicemail/> Start Conversation</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default TalkToAssistant;