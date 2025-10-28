"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTwilioNumber, upsertApiKeys } from "@/services/user.service";
import { RootState } from "@/store/store";
import { Import, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const TwilioNumberImportButton = ({apiKey}:any) => {
    const [apiKeys, setapiKeys] = useState<any>(apiKey);
    const token = useSelector((state:RootState) => state.user)?.accessToken;
    const router = useRouter();
    useEffect(() => {
        console.log(apiKey);
        
        setapiKeys(apiKey)
    },[apiKey])

    const handleKeyChange = (event:ChangeEvent<HTMLInputElement>) => {
        setapiKeys((prev:any) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
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
            const response = await getTwilioNumber(token);
            toast.success(response.data.message);
            router.refresh()
        } catch (error:any) {
            toast.error(error);
        }
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
            <div className="flex items-center p-4">
                <p>Phone number: {apiKey.phoneNumber}</p>
                <div className="flex-1 flex justify-end">
                    <Button onClick={importTwilioNumber} disabled={!apiKey?.twilioAccountId || !apiKey?.twilioAccessKey} className="px-10! not-disabled:cursor-pointer"><Import/>Import Number </Button>
                    <Button onClick={setApiKeys} className="px-10! ml-4 cursor-pointer"><Key/> Save Key</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TwilioNumberImportButton;