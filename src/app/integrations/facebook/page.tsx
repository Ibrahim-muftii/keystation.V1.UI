import ConnectToFacebookButton from "@/app/integrations/facebook/FacebookComponents/ConnectToFacebook,";


const Page = () => {
    return (
        <div className="p-2 flex">
            <div className="w-1/2 p-2">
                <div className="bg-black flex flex-col rounded-xl py-3 border border-white/15">
                    <h5 className="text-left px-3 border-b border-white/15 pb-3 text-xl text-white">Connect to facebook account</h5>
                    <ConnectToFacebookButton/>
                </div>
            </div>
        </div>
    )
}
export default Page;