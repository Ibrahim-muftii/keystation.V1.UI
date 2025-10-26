"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const IntergrationLinkBar = () => {
    const pathname = usePathname();
    return (
        <div className="w-full p-4">
            <div className="flex bg-[#212121] border border-white/15 rounded-lg">
                <Link href={'/integrations/vapi'} className={`${pathname === '/integrations/vapi' ? 'bg-[#2f2f2f] text-white' : ''} flex-1 border-r border-white/15 py-3 text-center text-white/65 hover:text-white transition-all duration-300`} >Vapi</Link>
                <Link href={'/integrations/twillio'} className={`${pathname === '/integrations/twillio' ? 'bg-[#2f2f2f] text-white' : ''} flex-1 border-r border-white/15 py-3 text-center text-white/65 hover:text-white transition-all duration-300`} >Twillio</Link>
                <Link href={'/integrations/whatsapp'} className={`${pathname === '/integrations/whatsapp' ? 'bg-[#2f2f2f] text-white' : ''} flex-1 border-r border-white/15 py-3 text-center text-white/65 hover:text-white transition-all duration-300`} >Whatsapp</Link>
                <Link href={'/integrations/magento'} className={`${pathname === '/integrations/magento' ? 'bg-[#2f2f2f] text-white' : ''} flex-1 py-3 text-center text-white/65 hover:text-white transition-all duration-300`} >Magento</Link>
            </div>
        </div>
    )
}

export default IntergrationLinkBar;