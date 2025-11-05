import { api } from "@/lib/interceptor";



const fetchTwilioNumbers = async (token:string) => {
    try {  
        const serverApi:string = '/user';
        const method:string = '/get-twilio-numbers';
        const url:string = serverApi + method;
        const response = await api.get(url, {
            headers: {Authorization:`Bearer ${token}`}
        });

        return response.data;
    } catch(error:any) {
        throw error.response.data.message || "An unexpected error has occurred...";
    }
}
export default fetchTwilioNumbers;