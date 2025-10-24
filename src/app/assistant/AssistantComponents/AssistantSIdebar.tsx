import { Sidebar } from "@/components/ui/sidebar";
import { getAssistants } from "@/services/Assistants.service";
import { Bot, BotOff } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";



const AssistantSidebar = async () => {
    const token = (await cookies()).get('AccessToken')?.value;

    const assistants = await getAssistants(token || '');
    console.log("Assistants : ",assistants)


    return (
        <aside className="w-84 h-full border-r border-white/10">
            <h3 className="text-xl flex justify-center items-center py-4 border-b border-white/10">
                <Bot className="mr-3"/>
                Your Assistants
            </h3>
            <div className="w-full flex flex-col">
                {
                    !assistants || !assistants.length ?
                        <div className="flex p-4 items-center justify-center">
                            <BotOff className="mr-2 text-white/55"/>
                            <p className=" text-center text-white/55">No Assistant Found at the moment </p>
                        </div>
                    :
                    <React.Fragment>
                        {
                            assistants.map((assistant:any) => (
                                <div key={assistant.id} className="p-2 pb-0">
                                    <div className="flex w-full relative bg-black p-1 rounded-lg border-white/10 flex-row items-center">
                                        <div className="flex shrink-0 bg-black border mr-2 border-white/15 w-16 h-16 rounded-md justify-center items-center">
                                            <h5>{assistant.name[0]}</h5>
                                        </div>
                                        <div className="flex flex-col truncate">
                                            <h5 className="text-base text-white font-semibold truncate">{assistant.name}</h5>
                                            <p className="text-sm text-white/50 truncate" >{assistant.firstMessage}</p>
                                        </div>
                                        <div className="absolute top-1 right-1">
                                            <span className="bg-red-50 border border-red-600 leading-0 rounded-2xl text-[10px] text-red-600 font-semibold px-4 uppercase pb-0.5">{assistant.model.model}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </React.Fragment>
                }
            </div>
        </aside>
    )
}

export default AssistantSidebar;