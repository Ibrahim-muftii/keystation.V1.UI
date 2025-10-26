import IntergrationLinkBar from "@/app/integrations/IntegrationComponents/IntegrationLinkBar";
import SsrAuthGuard from "@/app/SsrWrapper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


export default function Layout({children}:{children:ReactNode}) {
    return (
        <SsrAuthGuard>
            <div className="flex p-4 justify-between items-center">
                <div className="flex-1">
                    <h5 className="text-white text-2xl">Your Integrations</h5>
                    <p className="text-white/65">Navigate to your integration from the tab here and start modifying the data accordingly</p>
                </div>
            </div>
            <div className="min-h-[calc(100vh-140px)] p-4">
                <div className="bg-[#171717] h-full w-full  border border-white/10 rounded-xl"> 
                    <IntergrationLinkBar/>
                    {children}
                </div>
            </div>
        </SsrAuthGuard>
    )
}