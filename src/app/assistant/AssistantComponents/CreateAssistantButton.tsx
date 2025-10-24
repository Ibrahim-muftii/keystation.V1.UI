"use client"

import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";


const CreateAssistantButton = () => {
    return (
        <Button onClick={() => {console.log("Clicked ")}} className="cursor-pointer" variant={"default"} >
            <Power />
            Create Assistant
        </Button>
    )
}
export default CreateAssistantButton;