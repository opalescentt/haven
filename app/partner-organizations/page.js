"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"
import { partners, labelStyles } from "@/lib/constants/partners"

export default function PartnerOrg() {
    const router = useRouter()

    return(
        <div className="min-h-screen bg-linear-to-b from-[#FFC50C]/50 to-[#FFC50C]">
            <div className="relative z-10 max-w-5xl mx-auto px-8 py-16">
                <h2 className="text-center text-4xl font-semibold text-black mb-2 tracking-wide">Our Partner Organizations</h2>
                <p className="text-center font-normal text-s text-m mb-10 text-[#373737]">Trusted agencies working together to support foster and kinship caregivers</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-6">
                    {partners.map((partner) => (
                        <div key={partner.name} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
                            <div className="relative w-full h-36">
                                <Image src={partner.image} alt={partner.name} fill sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" className="object-cover" />
                                <div className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-1 rounded-md shadow-sm ${labelStyles[partner.label] || "bg-gray-100 text-gray-700"}`}>{partner.label}</div>
                            </div>
                            <div className="p-4 flex flex-col grow">
                                <h4 className="text-sm font-semibold mb-1 text-[#113C3B]">{partner.name}</h4>
                                <p className="text-[11px] italic text-[#0D696A] mb-2">{partner.quote}</p>
                                <p className="text-xs text-[#364153] mb-2">{partner.desc}</p>
                                <p className="text-[10px] mb-2 text-[#113C3B]">{partner.location || " "}</p>
                                <a href={partner.url} className="mt-auto text-center text-xs text-white bg-[#1a3a2e] py-2 rounded-lg hover:bg-[#2f5a4a]">Visit →</a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-15">
                    <button className="bg-white text-[#1a3a2e] rounded-full px-8 py-3 text-sm font-semibold hover:bg-[#127CB3] hover:text-white transition-colors" onClick={() => router.push("/")}>← Back to Homepage</button>
                </div>
            </div>
        </div>
    )
}