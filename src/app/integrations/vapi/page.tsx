
import CreateVapiAssistantButton from "@/app/integrations/vapi/VapiComponents/CreateVapiAssistant";
import UploadknowledgeBase from "@/app/integrations/vapi/VapiComponents/UploadKnowledgeBase";
import VapiFormDetailsFetcher from "@/app/integrations/vapi/VapiComponents/VapiFormDetailsFetcher";
import { getAssistant } from "@/services/Assistants.service";
import { cookies } from "next/headers";
import React from "react";


const Page = async () => {
    const token = (await cookies()).get("AccessToken")?.value;
    const response = await getAssistant(token!);
    const vapi = response?.data.vapi;
    
    return (
        <React.Fragment>
            <div className="p-2 flex">
                <div className="w-1/2 p-2">
                    <div className="bg-black flex flex-col rounded-xl py-3 border border-white/15">
                        <h5 className="text-white text-lg px-4">Upload Knowledge Base</h5>
                        <p className="text-white/65 px-4 pb-3 border-b border-white/15">Upload your Knowledge base on vapi so that the agent count have better understanding about how to deal with the custoemr</p>
                        <UploadknowledgeBase/>
                    </div>
                </div>
                <div className="w-1/2 p-2">
                    <div className="bg-black flex flex-col rounded-xl py-3 border border-white/15"> 
                        <h5 className="text-white text-lg px-4">Create Your Assistant</h5>
                        <p className="text-white/65 px-4 pb-3 border-b border-white/15">Create you assistant that will manage your call according to the Knowledge base you provided click on the button below and the app will automatically create you assistant</p>
                        <CreateVapiAssistantButton vapi={vapi}/>
                    </div>
                </div>
            </div>
            {
            vapi ?
                <VapiFormDetailsFetcher/>   
            :
                <div className="w-full p-2">
                    <div className="p-2">
                        <div className="w-full py-10 bg-black border border-white/15 rounded-lg flex flex-col items-center">
                            <h3 className="text-2xl font-bold tracking wide">Assistant Not Created yet</h3>
                            <p>Craete Your assistant To unlock the system prompts and message functionality of the App</p>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
export default Page;