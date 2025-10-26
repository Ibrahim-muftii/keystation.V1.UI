'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upsertApiKeys } from "@/services/user.service";
import { RootState } from "@/store/store";
import { Key } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export interface VapiIT {
    vapiKey:string,
    vapiAssistantId:string,
}

interface VapiFormProps {
    vapiKeys:VapiIT;
}

const VapiApiKeyForm = (props:VapiFormProps) => {

    const [vapiKeys, setVapiKeys] = useState<VapiIT>(props.vapiKeys);
    const token = useSelector((state:RootState) => state.user).accessToken;

    useEffect(() => {
        setVapiKeys(props.vapiKeys);
    },[props.vapiKeys])

    const hanldeVapiKeyChange = (event:ChangeEvent<HTMLInputElement>) => {
        setVapiKeys((prev) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
    }

    const setApiKeys = async  () => {
        try {
            const response = await upsertApiKeys(vapiKeys!,token)
            toast.success(response.data.message);
        } catch (error:any) {
            toast.error(error);
        }
    }

    return (
        <div className="p-3 flex w-full">
            <div className="flex flex-col w-full gap-y-6">
                <div className="flex flex-col w-full">
                    <label>Vapi API key</label>
                    <Input onChange={hanldeVapiKeyChange} value={vapiKeys.vapiKey || ''} type="password" name="vapiKey" />
                </div>
                {/* <div className="flex flex-col w-full">
                    <label>Vapi Assitant ID</label>
                    <Input onChange={hanldeVapiKeyChange} value={vapiKeys.vapiAssistantId || ''} type="password" name="vapiAssistantId" />
                </div> */}
                <div className="flex justify-end ">
                    <Button onClick={setApiKeys} className="px-10! py-3! bg-white flex items-center "><Key /> Set Vapi Keys</Button>
                </div>
            </div>
        </div>
    )
}
export default VapiApiKeyForm;