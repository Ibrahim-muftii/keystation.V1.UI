'use client'

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown } from "lucide-react";
import { useEffect, useState } from "react";



const CallLogsTable = ({assistantCallLogs}:any) => {
    const [callLogs, setCallLogs] = useState<any[]>([]);
    
    useEffect(() => {
        console.log(assistantCallLogs)
        setCallLogs(assistantCallLogs)
    },[assistantCallLogs]);

    const openLinkToDownload = (url:string) => {

        window.open(url, "_blank")
    }

    return (
        <div className="container mx-auto h-full max-w-7xl py-10">
            <Table className="border h-full border-black rounded-xl! overflow-hidden">
                <TableHeader className="bg-[#2f2f2f]">
                    <TableRow>
                        <TableHead className="py-5 w-1/5 text-center">Type</TableHead>
                        <TableHead className="py-5 w-1/5 text-center">Duration</TableHead>
                        <TableHead className="py-5 w-1/5 text-center">cost</TableHead>
                        <TableHead className="py-5 w-1/5 text-center">Status</TableHead>
                        <TableHead className="py-5 w-1/5 text-center">Recording</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white/5">
                    {
                        callLogs && callLogs.map((log, index) => (
                            <TableRow key={`table_row_${index}`}>
                                <TableCell className="text-center py-5">{log.type}</TableCell>
                                <TableCell className="text-center py-5">{log.totalDuration}</TableCell>
                                <TableCell className="text-center py-5">{log.totalCost}</TableCell>
                                <TableCell className="text-center py-5">{log.status}</TableCell>
                                <TableCell className="text-center py-5">
                                    <Button className="cursor-pointer px-8!" onClick={() => openLinkToDownload(log.recordingUrl)} variant="outline"><FileDown/> Download</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CallLogsTable;