"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteUserNumber, getSavedNumbers, saveUserNumber } from "@/services/user.service";
import { RootState } from "@/store/store";
import { Trash2Icon } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";


const CallForwardingForm = () => {
    const [numbers,setNumbers] = useState<any[]>([]);
    const [number,setNumber] = useState<string>('');
    const token = useSelector((state:RootState) => state.user)?.accessToken;
   
    useEffect(() => {
        getNumbers();
    },[]);

    const getNumbers =  async () => {
        try {
            const data = await getSavedNumbers(token);
            console.log(data);
            setNumbers(data.numbers || []);
        } catch (error:any) {
            toast.error(error);   
        }
    }

    const saveNumber = async () => {
        try {   
            const payload = {
                number,
            }
            const data = await saveUserNumber(token,payload);
            toast.success(data.message);
            setNumber('');
            getNumbers();
        } catch (error:any) {
            toast.error(error);
        }
    }

    const deleteNumber = async (id:string) => {
        try {
            const data = await deleteUserNumber(token,{id:id});
            toast.success(data.message);
            getNumbers();
        } catch (error:any) {
            toast.error(error);
        }
    }

    return (
        <React.Fragment>
            <div className="flex gap-y-2 flex-col p-4">
                {
                    numbers.length > 0 ?
                        numbers.map((number,index) => (
                            <div key={`phone_${index}`} className="flex items-center justify-between flex-row">
                                <p>{number.phoneNumber}</p>
                                <Button className="cursor-pointer" onClick={() => deleteNumber(number.id)}>
                                    <Trash2Icon/>
                                </Button>
                            </div>
                        ))
                    :
                    <p>No forwarding number found</p>
                }

            </div>
            <div className="flex flex-col p-4">
                <label>Call Forwarding Numbers</label>
                <Input value={number || ''} 
                    onChange={(event:ChangeEvent<HTMLInputElement>) => setNumber(event.target.value)}
                    placeholder="Enter call forwarding number"
                />
            </div>
            <div className="flex p-3 justify-end">
                <Button className="cursor-pointer" onClick={saveNumber} > Save Numbers</Button>
            </div>
        </React.Fragment>
    )
}

export default CallForwardingForm;