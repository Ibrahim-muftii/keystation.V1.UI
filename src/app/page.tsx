import SsrAuthGuard from "@/app/SsrWrapper";

const Page = async () => {
  return (
    <SsrAuthGuard>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h5>Home page</h5>
      </div>
    </SsrAuthGuard>
  )
}

export default Page;