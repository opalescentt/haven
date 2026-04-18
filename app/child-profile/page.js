"use client"

import { useSession } from "next-auth/react"
export default function ChildProfile() {
    const {data: session} = useSession()

    return(
        <div className="min-h-screen bg-[#faf6ee]">
            <div className="bg-[#1a3a2e] px-10 py-18">
                <div className="max-w-6xl mx-auto flex items-start justify-center flex-wrap">
                    <div>
                        <h1 className="text-white text-4xl font-bold mb-2.5 text-center">Child Profile</h1>
                        <p className="text-sm text-[#9ab89a] font-thin text-center">Track observations and connect to resources</p>
                    </div>
                </div>
            </div>
            <div className="m-12">
                <h2 className="font-medium text-2xl">Community Schedule</h2>
                <p className="font-thin leading-relaxed">Upcoming sessions for February 2026</p>
            </div>
            {/* Add Calendar-maybe use existing calendar/scheduling services to do implement+automate this step */}

            <div>
                
            </div>
        </div>
    )
}