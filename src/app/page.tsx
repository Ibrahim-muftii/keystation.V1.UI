import SsrAuthGuard from "@/app/SsrWrapper";

const Page = async () => {
  return (
    <SsrAuthGuard>
      <div className="flex p-4 justify-between items-center">
        <div className="flex-1">
          <h5 className="text-white text-2xl">Analyze Your Assistant Performance</h5>
          <p className="text-white/65">See track of your acitvity on analyztical dashboard</p>
        </div>
      </div>
    </SsrAuthGuard>
  )
}

export default Page;