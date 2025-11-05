"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; 
import fetchTwilioNumbers from "@/services/Twilio.service";
import { getTwilioNumber, upsertApiKeys } from "@/services/user.service";
import { RootState } from "@/store/store";
import { Import, Key, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const TwilioNumberImportButton = ({apiKey}:any) => {
    const [apiKeys, setapiKeys] = useState<any>(apiKey);
    const [numbers,setNumbers] = useState<any[]>([]);
    const [number,setNumber] = useState<any>();
    const token = useSelector((state:RootState) => state.user)?.accessToken;
    const router = useRouter();
    useEffect(() => {
        if (apiKey.twilioAccountId && apiKey.twilioAccessKey) {
            getTwilioNumbers();   
        }
        
        setapiKeys(apiKey)
    },[apiKey])

    const handleKeyChange = (event:ChangeEvent<HTMLInputElement>) => {
        setapiKeys((prev:any) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
    }

    const getTwilioNumbers = async () => {
        try {
            const data = await fetchTwilioNumbers(token);
            setNumbers(data.numbers);
        } catch(error:any) {
            toast.error(error);
        }
    }

    const setApiKeys = async () => {
        try {
            console.log("Api Keys : ",apiKeys)
            const response = await upsertApiKeys(apiKeys!, token)
            toast.success(response.data.message);
            router.refresh();
        } catch (error: any) {
            toast.error(error);
        }
    }

    const importTwilioNumber = async () => {
        try {
            console.log("Number : ", number);
            
            const response = await getTwilioNumber(token, number);
            console.log(response);
            toast.success(response.data.message);
            router.refresh()
        } catch (error:any) {
            toast.error(error);
        }
    }

    const onChangeNumber = (val:string) => {
        setNumber(JSON.parse(val));
    }

    return (
        <React.Fragment>
            <div className="flex flex-col p-4">
                <label>Twilio Account Id</label>
                <Input type="password" onChange={handleKeyChange} name="twilioAccountId" value={apiKeys?.twilioAccountId || ''} />
            </div>
            <div className="flex flex-col p-4">
                <label>Twilio Token</label>
                <Input type="password" onChange={handleKeyChange} name="twilioAccessKey" value={apiKeys?.twilioAccessKey || ''} />
            </div>
            {
                numbers.length > 0 &&
                    <div className="flex flex-col p-4">
                        <label>Select Phone Number</label>
                        <div id="number-options" className="flex w-full">
                            <Select  onValueChange={onChangeNumber}>
                                <SelectTrigger className="w-full bg-black text-white border border-white/25">
                                    <SelectValue placeholder="Select phone number" />
                                </SelectTrigger>

                                <SelectContent className="w-full  bg-black text-white border border-white/25">
                                    {numbers.map((number, index) => (
                                        <SelectItem
                                            key={`Phone_number ${index}`}
                                            value={JSON.stringify({value:number.value,label:number.label})}
                                            className="select-item"
                                        >
                                            {number.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
            }
            <div className="flex items-center p-4">
                <div className="flex-1 flex justify-end">
                    <Button onClick={importTwilioNumber} disabled={!number} className="px-10! not-disabled:cursor-pointer"><Import/>Import Number </Button>
                    <Button onClick={setApiKeys} className="px-10! ml-4 cursor-pointer"><Key/> Save Key</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TwilioNumberImportButton;