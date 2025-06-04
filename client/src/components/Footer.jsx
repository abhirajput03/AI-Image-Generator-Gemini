export const Footer = () => {
  return (
    <footer className="tracking-wide  pt-12 pb-4 px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        <div>
          <h4 className="text-[#6469ff] font-medium text-sm mb-6">Quick Links</h4>
        </div>
        <div>
          <h4 className="text-[#6469ff] font-medium text-sm mb-6">Services</h4>
        </div>
        <div>
          <h4 className="text-[#6469ff] font-medium text-sm mb-6">Platforms</h4>
        </div>
        <div>
          <h4 className="text-[#6469ff] font-medium text-sm mb-6">Company</h4>
        </div>
      </div>
      <div className="border-t text-center border-[#6469ff] pt-4">
        <p className="text-gray-400 text-sm">© GEMINI AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
