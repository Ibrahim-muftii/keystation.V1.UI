import RegisterForm from "@/app/(authentication)/register/RegisterComponents/RegisterForm";
import SsrAuthGuard from "@/app/SsrWrapper";

const Page = () => {
    return (
        <SsrAuthGuard>
            <main className="w-full h-screen flex justify-center items-center">
                <div className="p-1 rounded-lg bg-white/10 container sm:max-w-xs md:max-w-sm mx-auto">
                    <div className="w-full h-full flex flex-col items-center bg-black p-4 rounded-md">
                        <h5 className="text-xl font-semibold py-5 text-white/80">Register to Keystation</h5>
                        <RegisterForm/>
                    </div>
                </div>
            </main>
        </SsrAuthGuard>


    )
}

export default Page;