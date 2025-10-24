import { api } from "@/lib/interceptor";


export const getUserDetails = async (token?:string) => {
    try {
        const serverApi:string = '/user';
        const method:string = '/get-user-details';
        const url:string = serverApi + method;
        const headers = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const response = await api({
            method:'GET',
            url,
            headers
        })
        return response.data;
    } catch(error) {
        return null
    }
}