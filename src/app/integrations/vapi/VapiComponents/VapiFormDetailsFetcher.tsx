import CreateCallToAssistantButton from "@/app/integrations/vapi/VapiComponents/callToAssistantButton";
import TalkToAssistant from "@/app/integrations/vapi/VapiComponents/TalkToAssistant";
import VapiForm from "@/app/integrations/vapi/VapiComponents/VapiForm";
import VapiSystemPrompt from "@/app/integrations/vapi/VapiComponents/VapiSystemPrompt";
import { Button } from "@/components/ui/button";
import { getAssistantById } from "@/services/Assistants.service";
import { cookies } from "next/headers";



const VapiFormDetailsFetcher = async () => {
    const token = (await cookies()).get('AccessToken')?.value!;
    const response = await getAssistantById(token);
    const assistant = response?.data.data;

    return (
        <div className="px-2 pt-0 flex flex-row-reverse">
            <div className="w-1/2 flex flex-col p-2">
                <div className="bg-black flex flex-col rounded-xl py-3 mb-2 border border-white/15">
                    <h5 className="text-white text-lg px-4">Talk To Assistant</h5>
                    <p className="text-white/65 px-4 pb-3 border-b border-white/15">Call your assistant, and have a full on conversation with so that you know where your assistant might be lacking improve your prompt for better understanding.</p>
                    <TalkToAssistant assistant={assistant} />
                </div>
                <div className="bg-black flex flex-col rounded-xl py-3 mb-2 border border-white/15">
                    <h5 className="text-white text-lg px-4">Assistant Info</h5>
                    <p className="text-white/65 px-4 pb-3 border-b border-white/15">Manage your account Assistant info here fill out the assistant field according to your needs, make sure to use right message for the Assistant</p>
                    <CreateCallToAssistantButton/>
                </div>
                <div className="bg-black flex flex-col rounded-xl py-3 mb-2 border border-white/15">
                    <h5 className="text-white text-lg px-4">Assistant Info</h5>
                    <p className="text-white/65 px-4 pb-3 border-b border-white/15">Manage your account Assistant info here fill out the assistant field according to your needs, make sure to use right message for the Assistant</p>
                    <VapiForm assistant={assistant}/>
                </div>
            </div>
            <div className="w-1/2 p-2" >
                <div className="bg-black flex flex-col rounded-xl py-3 border border-white/15"> 
                    <h5 className="text-white text-lg px-4">Create your System Prompt</h5>
                    <p className="text-white/65 px-4 pb-3 border-b border-white/15">Create your system prompt for better communication on call that the bot will use while talking with customer</p>
                    <VapiSystemPrompt assistant={assistant} />
                </div> 
            </div>
        </div>
    )
}

export default VapiFormDetailsFetcher;