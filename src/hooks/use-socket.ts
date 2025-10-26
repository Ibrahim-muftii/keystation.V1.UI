import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (): Socket | null => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL!);
        }

        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("🟢 Connected to server:", socket.id);
        });
        
        return () => {
            socket.off("connect");
            socket.off("jobUpdate");
            socket.disconnect();
        };
    }, []);

    return socketRef.current;
};
