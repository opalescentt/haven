"use client";
import Image from "next/image";

export default function StaffDirectory() {
  return (
    <div className="min-h-screen bg-[#faf6ee]">
      <header className="bg-[#1a3a2e] px-6 md:px-10 py-8">
        <div className="flex items-center gap-10">
          <div className="bg-[#1a3a2e] px-10 py-12 flex items-center gap-10">
            <div className="bg-white rounded-2xl w-36 h-36 flex items-center justify-center shrink-0 shadow-md p-4">
              <Image
                src="/amara_logo.png"
                alt="Amara logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
          <div>
              <h1 className="text-white text-4xl font-bold mb-3">Welcome Home!</h1>
              <p className="text-[#add7ad] font-thin max-w-lg leading-relaxed">
              Everything you need to connect with our dedicated staff and support network is right here at your fingertips.
              </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-6">
        <p>Staff Directory</p>
        {/* <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-4">
          <h3 className="text-xl font-semibold text-[#1a3a2e]">
            Looking for in-network providers?
          </h3>
          <p className="text-gray-600">
            Use the button below to search for providers for your placement child.
          </p>
          <a
            href="https://findaprovider.coordinatedcarehealth.com/location"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1a3a2e] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#356143] transition"
          >
            Search Providers
          </a>
        </div> */}
      </main>
    </div>
  );
}