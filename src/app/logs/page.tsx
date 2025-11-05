import LogsFetcher from "@/app/logs/LogsComponents/LogsFetcher";
import SsrAuthGuard from "@/app/SsrWrapper";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Suspense } from "react";


const Page = () => {
    return (
        <SsrAuthGuard>
            <div className="flex p-4 justify-between items-center">
                <div className="flex-1">
                    <h5 className="text-white text-2xl">See your calls</h5>
                    <p className="text-white/65">Have a loot at your call logs how many were made and what are the duration of the call</p>
                </div>
            </div>
            <div className="min-h-[calc(100vh-140px)] p-4">
                <Suspense fallback={"Loading Please Wait"}>
                    <LogsFetcher/>
                </Suspense>
            </div>
        </SsrAuthGuard>
    )
}

export default Page;