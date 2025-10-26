'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upsertApiKeys } from "@/services/user.service";
import { RootState } from "@/store/store";
import { Key } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export interface ElevenLabFormIT {
    elevenLabKey:string
}

interface ElevenLabFormProps {
    elevenLabKey:ElevenLabFormIT;
}

const ElevenLabKeyForm = (props:ElevenLabFormProps) => {

    const [elevenLabKeys, setElevenLabKeys] = useState<ElevenLabFormIT>(props.elevenLabKey);
    const token = useSelector((state:RootState) => state.user).accessToken;

    useEffect(() => {
        setElevenLabKeys(props.elevenLabKey);
    }, [props.elevenLabKey])

    const hanldeVapiKeyChange = (event:ChangeEvent<HTMLInputElement>) => {
        setElevenLabKeys((prev) => ({
            ...prev!,
            [event.target.name]:event.target.value
        }))
    }

    const setApiKeys = async  () => {
        try {
            const response = await upsertApiKeys(elevenLabKeys!,token)
            toast.success(response.data.message);
        } catch (error:any) {
            toast.error(error);
        }
    }

    return (
        <div className="p-3 flex w-full">
            <div className="flex flex-col w-full gap-y-6">
                <div className="flex flex-col w-full">
                    <label>ElevenLab API key</label>
                    <Input onChange={hanldeVapiKeyChange} value={elevenLabKeys.elevenLabKey || ''} type="password" name="elevenLabKey" />
                </div>

                <div className="flex justify-end ">
                    <Button onClick={setApiKeys} className="px-10! py-3! bg-white flex items-center "><Key /> Set ElevenLab Keys</Button>
                </div>
            </div>
        </div>
    )
}
export default ElevenLabKeyForm;