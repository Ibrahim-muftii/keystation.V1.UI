"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createVapiCall } from "@/services/Assistants.service";
import { RootState } from "@/store/store";
import { PhoneCall } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";



const CreateCallToAssistantButton = () => {
    const token = useSelector((state:RootState) => state.user)?.accessToken;
    const [phoneNo, setPhoneNo] = useState<string>('');

    const initiateVapiCall = async () => {
        try {
            const response = await createVapiCall(token);
            toast.success(response.data.message);
        } catch (error:any) {
            toast.error(error);
        }
    }

    return (
        <Dialog modal>
            <DialogTrigger asChild>
                <div className="flex justify-end p-4">  
                    <Button className="px-10! cursor-pointer"><PhoneCall/>Initiate Call</Button>
                </div>
            </DialogTrigger>
            <DialogContent className="dark sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Create Call</DialogTitle>
                    <DialogDescription>
                        Test your AI assistant by entering any phone number. Click 'Call' to have your assistant call and converse naturally using your knowledge base
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col py-2">
                    <label>Enter Phone Number</label>
                    <Input placeholder="Enter Phone Number..." onChange={(event:ChangeEvent<HTMLInputElement>) => setPhoneNo(event.target.value)} value={phoneNo || ''} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline"> Cancel</Button>
                    </DialogClose>
                    <Button onClick={initiateVapiCall}><PhoneCall/> Call</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}   

export default CreateCallToAssistantButton;