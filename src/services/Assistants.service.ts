import { api } from "@/lib/interceptor"
import { AxiosHeaders } from "axios";




export const getAssistants = async (token:string) => {
    try {
        const serverApi:string = '/assistants'
        const method:string = '/get-assistants';
        const url:string = serverApi + method;
        const headers = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

        const response = await api({
            url,
            method:"GET",
            headers:headers
        })

        return response.data;
    } catch (error) {
        return null
    }
}

export const getAssistantById = async (token:string) => {
    try {
        const serverApi:string = '/assistants';
        const method:string = '/get-assistant-by-id';
        const url:string = serverApi + method;
        const headers = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const response = await api({
            method:"GET",
            url,
            headers
        })

        return response.data;
    } catch(error) {
        return null;
    }
}

