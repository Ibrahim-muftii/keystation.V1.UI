import { cookies } from "next/headers";
import { getUserApiKeys } from "@/services/user.service";
import VapiApiKeyForm from "@/app/settings/SettingComponents/VapiApiKeyForm";
import React from "react";
import ElevenLabKeyForm from "@/app/settings/SettingComponents/ElevenLabKeyForm";
import TwilioNumberImportButton from "@/app/settings/SettingComponents/TwilioNumberImport";

const KeysFetcher = async () => {
    const token = (await cookies()).get("AccessToken")?.value;
    const response = await getUserApiKeys(token!);
    const apiKeys = response.data.keys;

    return (
        <React.Fragment>
            <div className="bg-[#171717] flex flex-col w-full py-3 mb-8 rounded-xl border border-white/15">
                <h5 className="border-b border-white/15 pb-3 px-3 text-white font-semibold text-xl">Manage Your Vapi Api key</h5>
                <VapiApiKeyForm vapiKeys={apiKeys} />
            </div>
            <div className="bg-[#171717] flex flex-col w-full py-3 mb-8 rounded-xl border border-white/15">
                <h5 className="border-b border-white/15 pb-3 px-3 text-white font-semibold text-xl">Manage Your ElevenLab Api key</h5>
                <ElevenLabKeyForm elevenLabKey={apiKeys} />
            </div>
            <div className="bg-[#171717] flex flex-col w-full py-3 rounded-xl border border-white/15 ">
                <h5 className="border-b border-white/15 pb-3 px-3 text-white font-semibold text-xl">Import Your Business Number from twilio</h5>
                <TwilioNumberImportButton apiKey={apiKeys} />
            </div>
        </React.Fragment>
    )
};

export default KeysFetcher;
