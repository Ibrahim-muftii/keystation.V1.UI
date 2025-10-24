import { getUserDetails } from "@/services/user.service";
import { cookies } from "next/headers";

const DetailsFetcher = async () => {
    const token = (await cookies()).get('AccessToken')?.value
    const response = await getUserDetails(token);
    console.log(response)
    return (
        <div>
            
        </div>
    )
}

export default DetailsFetcher;