import DetailsForm from "@/app/settings/SettingComponents/DetailsForm";
import { getUserDetails } from "@/services/user.service";
import { cookies } from "next/headers";

const DetailsFetcher = async () => {
    const token = (await cookies()).get('AccessToken')?.value
    const response = await getUserDetails(token);
    const user = response.user;
    return (<DetailsForm user={user}/>)
}

export default DetailsFetcher;