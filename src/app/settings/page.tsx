import DetailsFetcher from "@/app/settings/SettingComponents/DetailsFetcher";
import SsrAuthGuard from "@/app/SsrWrapper";


const Page = () => {
    return (
        <SsrAuthGuard>
            <div className="flex p-4 justify-between items-center">
                <div className="flex-1">
                    <h5 className="text-white text-2xl">Manage Your Account</h5>
                    <p className="text-white/65">Update your credentials and manage your api keys here</p>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2 p-2">
                    <div className="bg-[#171717] flex flex-col w-full py-3 rounded-xl">
                        <h5 className="border-b border-white/15 pb-3">Manage Your Details</h5>
                        <DetailsFetcher/>
                    </div>
                </div>
                <div className="w-1/2 p-2">
              
                </div>
            </div>
        </SsrAuthGuard>
    )
}

export default Page;