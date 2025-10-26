'use client';
import { Button } from "@/components/ui/button";
import { createAssistant } from "@/services/Assistants.service";
import { RootState } from "@/store/store";
import { Bot } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface VapiAssistantPropsIT {
    vapi: {
        vapiAssistantName: string
    } | null;
}

const CreateVapiAssistantButton = (props: VapiAssistantPropsIT) => {
    const token = useSelector((state: RootState) => state.user)?.accessToken;

    const createVapiAssistant = async () => {
        try {
            const response = await createAssistant(token!);
            toast.success(response.data.message);
        } catch (error: any) {
            console.log("Error : ", error)
            toast.error(error)
        }
    }

    return (
        <div className="p-3">
            <div className="flex py-2 justify-between items-center">
                <p className="text-white/65">{props?.vapi?.vapiAssistantName ? "Assistant Connected  : " + props.vapi.vapiAssistantName : "You havent Configured any Assistant yer"}</p>
                <Button onClick={createVapiAssistant} className="px-10! cursor-pointer mt-1 flex items-center text-black"><Bot className="w-6 h-6 mr-3" /> Create Assistant</Button>
            </div>
        </div>
    )
}

export default CreateVapiAssistantButton;