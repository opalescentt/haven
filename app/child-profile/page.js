"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ChildProfile() {
    const {data: session} = useSession()

    return(
        <div className="min-h-screen bg-[#faf6ee]">
            <header className="relative px-4 py-8 sm:px-10 sm:py-8 overflow-hidden min-h-50">
                <Image src="/child_profile_bg.png" alt = "Amara community at resources center." fill sizes="100%" className="object-cover object-center" loading="eager" priority/>
                <div className="relative z-10 max-w-6xl mx-auto flex items-start justify-center flex-wrap">
                    <div className="bg-white/70 px-6 py-8 sm:px-16 sm:py-12 w-full sm:w-auto">
                        <h1 className="text-black text-2xl sm:text-4xl font-semibold mb-2.5 text-center">Child Profile</h1>
                        <p className="text-lg text-[#127CB3] font-medium text-center">Track observations and connect to resources.</p>
                  </div>
                </div>
            </header>
        
            <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-6">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col z-10 border border-[#FFC50C]">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Welcome, {session?.user?.name}!</h2>
                        <p className="text-gray-700 mb-4">This is your child profile page. Here you can track observations, access resources, and connect with our support team.</p>
                        <p className="text-gray-700 mb-4">Use the navigation menu to explore different sections of your profile and find the information you need.</p>
                        <p className="text-gray-700">If you have any questions or need assistance, please don&apos;t hesitate to reach out to our support team.</p>
                    </div>
                </div>
            </main>
        </div>
    )
}