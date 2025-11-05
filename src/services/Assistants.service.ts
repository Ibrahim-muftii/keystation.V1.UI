import { api } from "@/lib/interceptor"


export const getAssistant = async (token:string) => {
    try {
        const serverApi:string = '/assistant'
        const method:string = '/get-assistant';
        const url:string = serverApi + method;

        const response = await api({
            url,
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return response;
    } catch (error) {
        return null
    }
}

export const getAssistantById = async (token:string) => {
    try {
        const serverApi:string = '/assistant';
        const method:string = '/get-assistant-by-id';
        const url:string = serverApi + method;
        const headers = {
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
        const response = await api({
            method:"GET",
            url,
            headers
        })

        return response;
    } catch(error) {
        return null;
    }
}

export const uploadFileToVapi = async (data:FormData, token:string) => {
    try {
        const serverApi:string = '/assistant';
        const method:string = '/start-uploading';
        const url:string = serverApi + method;
        const response = await api.put(url,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
    } catch(error:any) {
        throw error.response.data.message || error.response.data.error || "An unexpected error has occurred";
    }
}

export const createAssistant = async (token:string) => {
    try {
        const serverApi:string = '/assistant';
        const method:string = '/create-vapi-assistant';
        const url:string = serverApi + method;
        const response = await api.post(url, {}, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response;
    } catch (error:any) {
        throw error?.response?.data?.message || error?.response?.data?.error || "An unexpected error has occurred";
    }
}

export const updateVapiAssistantData = async (data: any, token: string,) => {
    try {
        const serverApi: string = '/assistant';
        const method: string = '/update-vapi-assistant';
        const url: string = serverApi + method;
        const response = await api.put(url, data, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        return response;
    } catch(error:any) {
        throw error?.response?.data?.message || error?.response?.data?.error || "An unexpected error has occurred";
    }
}

export const createVapiCall = async (token:string) => {
    try {
        const serverApi: string = '/assistant';
        const method: string = '/create-call';
        const url:string = serverApi + method;
        const response = await api.post(url, {}, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        });
        return response;
    } catch (error:any) {
        throw error?.response?.data?.message || error?.response?.data?.error || "An unexpected error has occurred";

    }
}

export const getCallLogs = async (token:string) => {
    try {   
        const serverApi:string = '/assistant';
        const method:string = '/get-assistant-call-logs';
        const url:string = serverApi + method;
        const response = await api.get(url,{
            headers:{Authorization:`Bearer ${token}`}
        });
        return response;
    }catch(error:any) {
        return error?.response?.data?.message || error?.response?.data?.error || "An unexpected error has occurred";
    }
}