import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const AppTopbar = () => {
    return (
        <div className="py-3 bg-[#171717] border-b border-white/10 top-0 sticky">
            <div className="flex w-full justify-between px-10">
                <div className="flex-1">

                </div>
                <DropdownMenu >
                    <DropdownMenuTrigger className="outline-none">
                        <div className="flex hover:bg-white/15 cursor-pointer rounded-full border border-white/15 items-center justify-center w-10 h-10">
                            <h5>IM</h5>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark w-60 mr-4 mt-2">
                        <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default AppTopbar