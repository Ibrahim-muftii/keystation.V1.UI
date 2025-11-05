import CallForwardingForm from "@/app/settings/SettingComponents/CallForwardingForm";
import DetailsFetcher from "@/app/settings/SettingComponents/DetailsFetcher";
import KeysFetcher from "@/app/settings/SettingComponents/KeysFetcher";
import PasswordForm from "@/app/settings/SettingComponents/PasswordForm";
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
                <div className="w-1/2 flex flex-col p-4">
                    <div className="bg-[#171717] flex flex-col w-full py-3 rounded-xl border border-white/15">
                        <h5 className="border-b border-white/15 pb-3 px-3 text-white font-semibold text-xl">Manage Your Details</h5>
                        <DetailsFetcher/>
                    </div>
                    <div className="bg-[#171717] mt-4 flex flex-col w-full py-3 rounded-xl border border-white/15">
                        <h5 className="border-b border-white/15 pb-3 px-3 text-white font-semibold text-xl">Manage Your Credentials</h5>
                        <PasswordForm/>
                    </div>
                    <div className="bg-[#171717] mt-4 flex flex-col w-full py-3 rounded-xl border border-white/15">
                        <h5 className="border-b border-white/15 pb-3 px-3 text-white font-semibold text-xl">Add Call Forwarding Numbers</h5>
                        <CallForwardingForm/>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col p-4">
                    <KeysFetcher/>
                </div>
            </div>
        </SsrAuthGuard>
    )
}

export default Page;