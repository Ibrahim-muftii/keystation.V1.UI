import AssistantSidebar from "@/app/assistant/AssistantComponents/AssistantSIdebar";
import AssistantView from "@/app/assistant/AssistantComponents/AssistantView";
import CreateAssistantButton from "@/app/assistant/AssistantComponents/CreateAssistantButton";
import SsrAuthGuard from "@/app/SsrWrapper";
import { getAssistants } from "@/services/Assistants.service";
import { Assistant } from "next/font/google";
import { Suspense } from "react";


const Page = () => {

    return (
        <SsrAuthGuard>
            <div className="flex p-4 justify-between items-center">
                <div className="flex-1">
                    <h5 className="text-white text-2xl">You VAPI calling Assistants</h5>
                    <p className="text-white/65">Access to your vapi api assistant for smart calling and start you calling to the leads </p>
                </div>
            </div>
            <div className="min-h-[calc(100vh-140px)] p-4">
                <div className="bg-[#171717] h-full w-full  border border-white/10 rounded-xl">  
                    <AssistantView/>
                </div>
            </div>
        </SsrAuthGuard>
    )
}

export default Page;