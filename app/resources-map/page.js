"use client";
import Image from "next/image";

export default function StaffDirectory() {return (
    <div className="min-h-screen bg-[#faf6ee]">
        <header className="relative px-4 py-8 sm:px-10 sm:py-8 overflow-hidden min-h-50">
            <Image src="/resources_map_bg.png" alt = "Amara community at resources center." fill sizes="100%" className="object-cover object-center" loading="eager" priority/>
            <div className="relative z-10 max-w-6xl mx-auto flex items-start justify-center flex-wrap">
                <div className="bg-white/70 px-6 py-8 sm:px-16 sm:py-12 w-full sm:w-auto">
                    <h1 className="text-black text-2xl sm:text-4xl font-semibold mb-2.5 text-center">Resources Map</h1>
                    <p className="text-lg text-[#127CB3] font-medium text-center">Find trusted, nearby resources for safety, support, and essential needs, all in one place.</p>
                </div>
            </div>
        </header>

        <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-6">
            <div className="bg-[#FFC50C] rounded-2xl shadow-md p-6 md:p-8 space-y-4">
                <input className="rounded-2xl border border-white"placeholder="Search..."></input>
                <div className="rounded-2xl border border-white">Zip Code</div>
                <p className="text-[#113C3B]">Showing results for: Child name</p>
                <p className="text-[#113C3B] underline">Show recommendations for different child</p>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.950445575823!2d-122.29133295903128!3d47.549293192052744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906b270cf6edb5%3A0x51806c82b2572ce0!2sAmara!5e0!3m2!1sen!2sus!4v1772766222679!5m2!1sen!2sus" width="100%" height="550" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            <div className="bg-[#FFC50C] rounded-2xl shadow-md p-6 md:p-8 space-y-4">
                <h3 className="text-xl font-semibold text-[#113C3B]">How We Match Resources</h3>
                <p className="text-[#113C3B]">✓ Age-appropriate matches based on developmental stage.</p>
                <p className="text-[#113C3B]">✓ Interest-based activities aligned with hobbies</p>
                <p className="text-[#113C3B]">✓ Behavioral needs considered for provider compatibility.</p>
                {/* <Image src="/resources_match.png" alt = "A group of children playing with a large, colorful parachute outdoors in a grassy field on a sunny day" fill sizes="100%" className="object-cover object-center" loading="eager" priority/> */}
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-4">
                <h3 className="text-xl font-semibold text-[#1a3a2e]"> Looking for in-network providers? </h3>
                <p className="text-gray-600"> Use the button below to search for providers for your placement child.</p>
                <a href="https://findaprovider.coordinatedcarehealth.com/location" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1a3a2e] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#356143] transition">Search Providers</a>
            </div>
        </main>
    </div>
  );
}