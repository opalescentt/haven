"use client"

export default function StaffDirectory() {

    return(
        <div className="min-h-screen bg-[#faf6ee]">
            {/* Header & Intro */}
            <div className="bg-[#1a3a2e] px-10 py-8">
                <div className="max-w-6xl mx-auto flex items-start justify-between flex-wrap">
                    <div>
                        <h1 className="text-white text-2xl font-bold mb-1.5">Child Profile & Personalization</h1>
                        <p className="text-sm text-[#9ab89a]">Finding resources for your placement child? We&apos;re here to help.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div style={{padding:20}}>
            <h1 className="text-2xl font-bold">Welcome Home, Caregiver!</h1><br></br>
            <p className="text-sm">Everything you need to connect with our dedicated staff and 
            support network is right here at your fingertips.</p>
            <br></br>
            Make a container card for this section with button linking to their locator
            <p>Looking for in-network providers?</p>
            <a href="https://findaprovider.coordinatedcarehealth.com/location" 
            target="_blank" 
            rel="noopener noreferrer">
            Search for Providers for your placement child
            </a>
        </div>
    )
}