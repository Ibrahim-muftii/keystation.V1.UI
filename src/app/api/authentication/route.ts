import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const serverUrl:string | undefined = process.env.NEXT_PUBLIC_SERVER_URL;

const login = async (login:any) => {
    try {
        const api:string = '/authentication';
        const method:string = '/login';
        const url:string = serverUrl + api + method;
        const response = await axios.post(url, login);
        
        const res = NextResponse.json({message:response.data.message, user:response.data.user});
        res.cookies.set("AccessToken", response.data.user.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/", 
            maxAge: 60 * 60 * 24 * 7,
        })

        return res

    } catch(error:any) {
        return NextResponse.json({ message: error.response.data.message }, {status:500})
    }
}

const register = async (register:any) => {
    try {
        const api: string = '/authentication';
        const method:string = '/register';
        const url:string = serverUrl + api + method;
        const response = await axios.post(url, register);

        const res = NextResponse.json({ message: response.data.message, user: response.data.user });
        res.cookies.set("AccessToken", response.data.user.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        })

        return res
    } catch (error:any) {
        console.log("REGISTER : ",);
        return NextResponse.json({ message: error.response.data.message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const action = body?.action;
        console.log("Body : ",body);
        
        if(action === 'login') {
            return await login(body.login);
        }
        if(action === 'register') {
            return await register(body.register);
        }
        return NextResponse.json({message:"Invalid URL"}, {status:404})
    }catch(error:any) {
        return NextResponse.json({message:error.message});
    }

}