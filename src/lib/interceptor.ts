import axios, {
	AxiosError,
	type AxiosRequestConfig as OriginalAxiosRequestConfig,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";

const serverUrl:string | undefined = process.env.NEXT_PUBLIC_SERVER_URL;

interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
	_retry?: boolean;
}

export const api = axios.create({
	baseURL: serverUrl,
	withCredentials: true,
});

api.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        
    //   try {
    //     const res = await api.post("/Authentication/Refresh-Token");
    //     const user = res?.data?.user;

    //     if (user?.AccExp) {
    //       localStorage.setItem("AEXP", user.AccExp);
    //       localStorage.setItem("Authenticated", "true");
    //     //   setUserToLocalStorage(user, user.Mails);
    //     }

    //     return await api(originalRequest);
    //   } catch (refreshError) {
    //     localStorage.removeItem("Authenticated");
    //     localStorage.removeItem("AEXP");
    //     localStorage.removeItem("CurrentUser");
    //     window.location.href = "/Authentication"; // fallback
    //     return Promise.reject(refreshError);
    //   }
    }

    return Promise.reject(error);
  }
);