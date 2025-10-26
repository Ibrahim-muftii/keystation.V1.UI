import { RegisterationIt } from "@/app/(authentication)/register/RegisterComponents/RegisterForm";
import { PasswordIT } from "@/app/settings/SettingComponents/PasswordForm";
import { VapiIT } from "@/app/settings/SettingComponents/VapiApiKeyForm";
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
        console.log(error)
        return null
    }
}

export const updateUserDetails = async (user:RegisterationIt, token:string) => {
    try {
        const serverApi:string = '/user';
        const method:string = '/update-user-details';
        const url:string = serverApi + method;
        const response = await api.put(
            url,
            user,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return response;
    } catch (error:any) {
        throw error.response.data.message || error.response.data.error || "An unexpected error has occurred";
    }
}

export const updateUserPassword = async (passwords:PasswordIT, token:string) => {
    try {
        const serverApi:string = '/user';
        const method:string = '/change-user-password';
        const url:string = serverApi + method;
        const response = await api.put(
            url,
            passwords,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return response;
    } catch (error:any) {
        throw error.response.data.message || error.response.data.error || "An unexpected error has occurred";
    }
}

export const upsertApiKeys = async (keys:any,token:string) => {
    try {
        const serverApi:string = '/user';
        const method:string = '/set-vapi-api-keys';
        const url:string = serverApi + method;
        const response = await api.put(
            url,
            keys,
            {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }
        ) 
        return response
    } catch(error:any) {
        throw error.response.data.message || error.response.data.error || "An unexpected error has occurred";
    }
}

export const getUserApiKeys = async (token:string) => {
    try {
        const serverApi:string = '/user';
        const method:string = '/get-user-api-keys';
        const url:string = serverApi + method;
        const response = await api({
            method:'GET',
            url,
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        return response;
    } catch(error:any) {
        throw error.response.data.message || error.response.data.error || "An unexpected error has occurred";
    }
}