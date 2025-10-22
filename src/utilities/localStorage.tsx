export const saveUserToLocalStorage = (user:any, accessToken:string) => {
    localStorage.setItem("AccessToken", accessToken);
    localStorage.setItem("User",user);
}

