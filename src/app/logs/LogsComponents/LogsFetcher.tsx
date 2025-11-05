import CallLogsTable from "@/app/logs/LogsComponents/CallLogsTable";
import { getCallLogs } from "@/services/Assistants.service";
import { cookies } from "next/headers";
import React from "react";



const LogsFetcher = async () => {
    const token = (await cookies()).get("AccessToken")?.value;
    const response = await getCallLogs(token!);
    const callLogs = response.data.logs;
    return (
        <React.Fragment>
            <div className="bg-[#171717] h-full w-full  border border-white/10 rounded-xl">
                {
                    callLogs.length ?
                        <CallLogsTable assistantCallLogs={callLogs} />
                    :   
                        <div className="flex w-full h-full items-center justify-center bg-black container max-w-sm">
                            <h1 className="text-3xl ">Could not find any Logs</h1>
                            <p className="text-sm">we could not find any recording of the assistant with the customers.</p>
                        </div>
                }
            </div>
        </React.Fragment>
    ) 
}

export default LogsFetcher;