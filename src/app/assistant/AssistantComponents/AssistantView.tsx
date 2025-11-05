import { getAssistantById } from "@/services/Assistants.service";
import { cookies } from "next/headers";
import React from "react";


const AssistantView = async () => {
    const token = (await cookies()).get('AccessToken')?.value || '';
    const response = await getAssistantById(token);
    const assistant = response?.data.data
    console.log("Assistant : ",assistant)
    return (
        <React.Fragment>
            <div className="flex flex-row flex-wrap">
                <div className="w-2/5 p-2">
                    <div className="relative bg-black flex flex-col rounded-lg py-3 mb-2 border border-white/15">
                        <h5 className="text-white text-lg px-4">Transcriber</h5>
                        <p className="text-white/65 text-sm px-4 pb-3 border-b border-white/15">The transcriber your assistant will use</p>
                        <div className="flex flex-col gap-y-2 p-3">
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">Model</label>
                                <span className="bg-[#1f1f1f] w-full h-10 flex items-center px-2 border border-white/15 rounded-md">{assistant?.transcriber?.model}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">Provider</label>
                                <span className="bg-[#1f1f1f] w-full h-10 flex items-center px-2 border border-white/15 rounded-md">{assistant?.transcriber?.provider}</span>
                            </div>
                        </div>
                        <div title="Assistant Language" className="absolute bg-green-200 border-2 border-green-700 text-green-700 font-semibold px-4 py-2 rounded-2xl top-6 right-6 leading-0">
                            <span className="relative -top-0.5">{assistant?.transcriber?.language}</span>
                        </div>
                    </div>
                    <div className="bg-black flex flex-col rounded-lg py-3 border border-white/15 mb-2">
                        <h5 className="text-white text-lg px-4">Model Configuration</h5>
                        <p className="text-white/65 text-sm px-4 pb-3 border-b border-white/15">The Model your assitant will be using for calling and communication </p>
                        <div className="flex flex-col gap-y-2 p-3">
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">Provider</label>
                                <span className="bg-[#1f1f1f] w-full h-10 flex items-center px-2 border border-white/15 rounded-md">{assistant?.model?.provider}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">model</label>
                                <span className="bg-[#1f1f1f] w-full h-10 flex items-center px-2 border border-white/15 rounded-md">{assistant?.model?.model}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black flex flex-col rounded-lg py-3 border border-white/15">
                        <h5 className="text-white text-lg px-4">Voice Configuration</h5>
                        <p className="text-white/65 text-sm px-4 pb-3 border-b border-white/15">The Voice agent that you assistant is calling and having conversation with the customers </p>
                        <div className="flex flex-col gap-y-2 p-3">
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">Voice Agent</label>
                                <span className="bg-[#1f1f1f] w-full h-10 flex items-center px-2 border border-white/15 rounded-md">{assistant?.voice?.voiceId}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">Provider</label>
                                <span className="bg-[#1f1f1f] w-full h-10 flex items-center px-2 border border-white/15 rounded-md">{assistant?.model?.provider}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/5 p-2">
                    <div className="bg-black rounded-lg py-3 border border-white/15">
                        <h5 className="text-white text-lg px-4">Chats Configuration</h5>
                        <p className="text-white/65 text-sm px-4 pb-3 border-b border-white/15">The agent will call againts this work flow as explained in the below containers </p>
                        <div className="flex flex-col gap-y-2 p-3">
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">First Message</label>
                                <span className="bg-[#1f1f1f] w-full flex items-center p-2 border border-white/15 rounded-md">{assistant?.firstMessage}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">Voice Mail Message</label>
                                <span className="bg-[#1f1f1f] w-full flex items-center p-2 border border-white/15 rounded-md">{assistant?.voicemailMessage || "Not provided"}</span>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <label className="text-white pl-2">Message Flows</label>
                                <pre className="bg-[#1f1f1f] max-h-[485px] overflow-auto w-full whitespace-pre-wrap p-2 border border-white/15 rounded-md">{assistant?.model?.messages?.[0].content}</pre>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default AssistantView;