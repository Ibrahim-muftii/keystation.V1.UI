import MagentoAuthForm from "@/app/integrations/magento/MagentoComponents/MagentoAuthForm";
import { checkMagentoExists } from "@/services/user.service";
import { cookies } from "next/headers";


const Page = async () => {
    const token = (await cookies()).get("AccessToken")?.value;
    const response = await checkMagentoExists(token!)
    const exists = response.data.exists;

    return (
        <div className="p-2 flex w-full h-full justify-center items-center">
            <div className="container max-w-sm">
                <div className="flex flex-col rounded-xl bg-[#2f2f2f] overflow-hidden text-center">
                    <div className="w-full border-b-2 border-black py-4">
                        <h5 className="w-full font-bold text-xl ">Magento Authentication</h5>
                    </div>
                    <MagentoAuthForm exists={exists} />
                </div>
            </div>
        </div>
    )
}
export default Page;