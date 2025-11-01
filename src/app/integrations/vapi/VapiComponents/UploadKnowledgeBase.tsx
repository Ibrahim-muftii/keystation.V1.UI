'use client'

import { Button } from "@/components/ui/button";
import { uploadFileToVapi } from "@/services/Assistants.service";
import { RootState } from "@/store/store";
import { File, LoaderIcon, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";
// import { useSocket } from "@/hooks/use-socket";



const UploadknowledgeBase = () => {
    const [fileName, setFileName] = useState<string>();
    const [status, setStatus] = useState<string>();
    const token = useSelector((state:RootState) => state.user)?.accessToken;
    
    useEffect(() => {
        const socket: Socket = io("http://localhost:5400");

        socket.on("connect", () => {
            console.log("🟢 Connected! Socket ID:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Disconnected");
        });

        socket.on("jobUpdate", (data) => {
            console.log("Status : ",data.status)
            setStatus(data.status);
            if(data.status === 'completed'){
                setTimeout(() => {
                    setStatus("");
                },2500)
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const uploadFile = async  (event:ChangeEvent<HTMLInputElement>) => {
        setStatus("Uploading")
        try {
            const file = event?.target?.files?.[0];
            if(!file) {
                toast.error("No Filed has been selected");
            }
            setFileName(file?.name);
            const formData = new FormData();
            formData.append("calls", file!);
            const response = await uploadFileToVapi(formData, token);
            toast.info("Filed Uploaded to server")
        } catch (error:any) {
            console.log("Error : ", error);
            toast.error(error);
        }
    }

    return (
        <div className="flex justify-between items-center p-4">
            <div className={`fixed top-19 right-6 ${status ? 'scale-100 ' : 'scale-0'} transition-all duration-200`}>
                <div className="bg-white flex items-center w-100 p-3 rounded-xl">
                    <LoaderIcon className="animate-spin w-8! h-8! text-black"/>
                    <div className="flex flex-col ml-3">
                        <h5 className="text-black flex justify-between text-base">File Uploading Status <p className="text-right inline-block text-sm relative -top-2 -right-2 uppercase bg-black leading-3 text-white px-3 py-2 rounded-lg">{status}</p></h5>
                        <p className="text-sm text-black/65">Please wait while we upload your file to Knowledge base </p>
                    </div>
                </div>
            </div>
            <p className="flex items-center text-white/50">
                <File className="mr-3"/>
                {
                    fileName ? fileName : "No file Has been selected" 
                }
            </p>
            <label className="px-10 py-2 mt-3 text-sm cursor-pointer rounded-md flex items-center justify-center bg-white/85 hover:bg-white/65 text-black" htmlFor="upload-file">
                <Upload className="mr-3 w-4 h-4"/>
                Add Knowledge Base
            </label>
            <input type="file" hidden onChange={uploadFile} accept=".zip" id="upload-file"/>
        </div>
    )
}
export default UploadknowledgeBase;