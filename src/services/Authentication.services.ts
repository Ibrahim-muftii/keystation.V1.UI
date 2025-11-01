import { LoginIT } from "@/app/(authentication)/login/LoginComponents/LoginForm";
import { RegisterationIt } from "@/app/(authentication)/register/RegisterComponents/RegisterForm";
import { api } from "@/lib/interceptor";
import axios from "axios";

const serverUrl:string | undefined = process.env.NEXT_PUBLIC_SERVER_URL;

export const registerUser = async (data:RegisterationIt) => {
    try {
        const serverApi:string = '/authentication';
        const method:string = '/register'
        const url:string = serverUrl + serverApi + method;
        console.log("URL : ", url);
        axios.defaults.withCredentials = true
        const response = await axios.post(url, data, {
            withCredentials:true
        });
        if(response.status == 200) {
            return response.data;
        }
    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.log(error);
            throw new Error(error.response?.data.message || error.response?.data.error || "Failed to logout session at the moment...");
        } else {
            throw new Error("Failed to logout session at the moment...");
        }
    }
}

export const loginUser = async (data:LoginIT) => {
    try {
        const serverApi:string = '/authentication';
        const method:string = '/login'
        const url:string = serverUrl + serverApi + method;
        console.log("URL : ", url);
        axios.defaults.withCredentials = true
        const response = await axios.post(url,data, {
        });
        if(response.status == 200) {
            return response.data;
        }
    } catch(error) {
        if(axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || error.response?.data.error || "Failed to logout session at the moment...");
        } else {
            throw new Error("Failed to logout session at the moment...");
        }
    }
}