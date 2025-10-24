"use client"

import { LayoutDashboard, Phone, Settings, Package, RefreshCcw, Hexagon, Bot, WandIcon  } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

// Menu items
const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Call Logs",
        url: "/Call-logs",
        icon: Phone,
    },
    {
        title: "Assistent",
        url: "/assistant",
        icon: Bot,
    },
    {
        title: "Integartion",
        url: "/Integrations",
        icon: Package,
    },
    {
        title: "Message Automation",
        url: "#",
        icon: RefreshCcw,
    },
    {
        title: "Magento Automation",
        url: "#",
        icon: WandIcon,
    },
    {
        title: "Settigns",
        url: "/settings",
        icon: Settings
    }
]

// Example user data
const user = {
    name: "Ibrahim Mufti",
    email: "ibrahim@example.com",
    avatar: "https://ui-avatars.com/api/?name=Ibrahim+Mufti",
}

const AppSidebar = () => {
    const pathname = usePathname();
    const user = useSelector((state:RootState) => state.user);
    return (
        <Sidebar className="border-r bg-white/5">
            {/* HEADER */}
            <SidebarHeader className="flex-row items-center justify-center border-b py-4">
                <Hexagon className="w-8 h-8"/>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    Keystation
                </h1>
            </SidebarHeader>

            {/* MAIN CONTENT */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2">Application</SidebarGroupLabel>
                    <SidebarGroupContent className="pl-3">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton isActive={pathname === item.url} asChild>
                                        <Link
                                            href={item.url}
                                            className={`${pathname === item.url ? 'text-white' : 'text-white/75'} flex items-center gap-3 rounded-md px-2 py-[18px]  hover:text-white transition-all group`}
                                        >
                                            <item.icon className={`${pathname === item.url ? 'text-white' : 'text-white/75'} h-5! w-5! group-hover:text-white! transition-all`} />
                                            <span className="text-sm font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="border-t px-3 py-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                            {user.first_name
                                .split(" ")
                                .map((n:string) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                            {user.first_name} {user.last_name}
                        </span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
