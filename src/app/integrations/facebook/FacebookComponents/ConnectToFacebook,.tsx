'use client'

import { Button } from "@/components/ui/button";
import { PlugZap2 } from "lucide-react";


const ConnectToFacebookButton = () => {
    // const connectToFacebook = () => {
    //     FB.login(
            
    //     )
    // }

    return (
        <div className="p-4 w-full flex items-center justify-between">
            <p>Connect to your facebook business page</p>
            {/* <Button className="flex items-center" onClick={connectToFacebook} ><PlugZap2/> Connect</Button> */}
        </div>
    )
}

export default ConnectToFacebookButton;