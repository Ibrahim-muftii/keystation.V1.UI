import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const SsrAuthGuard = async ({ children }: { children: ReactNode }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('AccessToken')?.value;
    const headersList = await headers();
    const pathname = headersList.get('x-pathname'); 

    if (!token) {
        if(['/login', '/register'].includes(pathname || '')) {
            return children
        }
        redirect('/login');
    }

    if(token) {
        if(['/login', '/register'].includes(pathname || '')) {
            redirect('/');
        }
    }

    return <>{children}</>;
};

export default SsrAuthGuard;