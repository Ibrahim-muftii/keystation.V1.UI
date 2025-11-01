import { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';

export function useVapiVoice(assistantId: string, publicKey: string) {
    const [vapiInstance, setVapiInstance] = useState<Vapi>();
    const [messages, setMessages] = useState<any[]>([]);
    const instanceRef = useRef<any>(null);

    useEffect(() => {
        if (!instanceRef.current) {
            const vapi = new Vapi(publicKey);
            instanceRef.current = vapi;

            vapi.on('message', (msg: any) => {
                setMessages((m) => [...m, msg]);
            });

            vapi.on('call-start', () => {
                console.log('Call started');
            });

            vapi.on('call-end', () => {
                console.log('Call ended');
            });

            setVapiInstance(vapi);
        }
    }, [publicKey]);

    const startVoice = () => {
        console.log("PUBLIC KEY : ",publicKey)
        console.log("ASSISTANT ID : ", assistantId)
        if (!vapiInstance) return;
        vapiInstance.start(assistantId);
    };

    const stopVoice = () => {
        if (!vapiInstance) return;
        vapiInstance.stop();
    };

    return { messages, startVoice, stopVoice };
}
