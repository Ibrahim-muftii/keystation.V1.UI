'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatMilliseconds } from "@/lib/utils";
import { Activity, CircleX, FileDown, MessageSquareText, X } from "lucide-react";
import { useEffect, useState } from "react";



const CallLogsTable = ({assistantCallLogs}:any) => {
    const [callLogs, setCallLogs] = useState<any[]>([]);
    const [drawer, setDrawer] = useState<boolean>(false);
    const [transcription, setTranscription] = useState<any>();
    const [dialog, setDialog] = useState<boolean>(false)

    useEffect(() => {
        console.log(assistantCallLogs)
        setCallLogs(assistantCallLogs)
    },[assistantCallLogs]);

    const openLinkToDownload = (url:string) => {

        window.open(url, "_blank")
    }

    return (
        <div className="h-full w-full">
            <Table className="border h-full border-black rounded-xl! overflow-hidden">
                <TableHeader className="bg-[#2f2f2f] w-full">
                    <TableRow>
                        <TableHead className="py-5 w-1/5 text-center">Type</TableHead>
                        <TableHead className="py-5 w-1/5 text-center">Duration</TableHead>
                        <TableHead className="py-5 w-1/5 text-center">cost</TableHead>
                        <TableHead className="py-5 w-[10%] text-center">Status</TableHead>
                        <TableHead className="py-5 w-1/5 text-center">Recording</TableHead>
                        <TableHead className="py-5 w-[10%] text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white/5">
                    {
                        callLogs && callLogs.map((log, index) => (
                            <TableRow key={`table_row_${index}`}>
                                <TableCell className="text-center py-5">{log.type}</TableCell>
                                <TableCell className="text-center py-5">{formatMilliseconds(log.totalDuration)}</TableCell>
                                <TableCell className="text-center py-5">{log.totalCost} Cr.</TableCell>
                                <TableCell className="text-center py-5">{log.status}</TableCell>
                                <TableCell className="text-center py-5">
                                    <Button className="cursor-pointer px-8!" onClick={() => openLinkToDownload(log.recordingUrl)} variant="outline"><FileDown/> Download</Button>
                                </TableCell>
                                <TableCell className="text-center py-5">
                                    <Dialog >
                                        <DialogTrigger asChild>
                                            <Button onClick={() => { setDialog(true); setTranscription(log.summary) }} className="bg-white cursor-pointer text-black">
                                                <Activity/>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="dark">
                                            <DialogHeader>
                                                <DialogTitle>Call Summary</DialogTitle>
                                            </DialogHeader>
                                                <pre className="whitespace-pre-wrap ">
                                                    {transcription}
                                                </pre>
                                        </DialogContent>
                                    </Dialog>
                                    <Button onClick={() => { setDrawer(true); setTranscription(log.messages.slice(1)) }} className="bg-white cursor-pointer text-black ml-2"> <MessageSquareText/></Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div 
            className={`h-screen z-10 bg-[#2f2f2f] fixed top-0 right-0 transition-all duration-500 ${drawer ? 'w-175' : 'w-0 overflow-hidden'}`}>
                <div className="p-4 flex justify-between items-center border-b border-b-white/15">
                    <h5 className="text-2xl">Transcription</h5>
                    <Button 
                        onClick={() => { setDrawer(false); setTranscription(undefined)}}
                        className="text-white bg-transparent hover:bg-transparent cursor-pointer p-0!"
                    >
                        <X className="w-6! h-6!" />
                    </Button>
                </div>
                <div className="flex flex-col gap-y-8 p-4 h-[calc(100%-100px)] overflow-auto">
                    {
                        drawer && transcription?.map((transObj:any, index:number) => (
                            <div key={`Transcription_${index}`} className={`flex w-full ${transObj.role === 'bot' ? 'justify-start'  : transObj.role === 'user' ? "justify-end" : 'justify-center'}`}>
                                {
                                    transObj.role === 'bot' || transObj.role === 'user' ?
                                        <div className="w-3/5 flex gap-x-2">
                                            <span className="h-8 w-8 mt-1 border border-white/15 text-xl font-extrabold shrink-0 rounded-full bg-white text-black flex justify-center items-center">{transObj.role === 'bot' ? 'A' : 'C'}</span>
                                            <div className="flex flex-col w-full bg-black border border-white/35 rounded-xl">
                                                <p className="font-bold p-3 border-b-2 border-white/15">{transObj.role === 'bot' ? "Assistant" : 'Customer'}</p>
                                                <p className="p-3">{transObj.message}</p>
                                            </div>
                                        </div>
                                    :
                                        <div className="w-3/5 h-20">
                                            <div className="bg-black border  border-white/35 h-full flex justify-center items-center rounded-xl">
                                                <h5>{transObj.name || transObj.role}</h5>
                                            </div>
                                        </div>

                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CallLogsTable;