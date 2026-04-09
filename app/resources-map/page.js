"use client"

import { useSession } from "next-auth/react" 

// Seed Data Section
const seedChildren = [
    {
        id: 1, name: "Henry Thompson", age: 7, grade_level: '2nd Grade',
        interests: [
            {name: "Basketball", category: "Sports", icon: "🏀"},
            {name: "Reading", category: "Learning", icon: "📚"},
            {name: "Drawing & Art", category: "Creative", icon: "🖼️"},
        ],
        behavioral: ["Needs reassurance during transitions.",
                     "Hypervigilant in new environments.",
                     "Prefers structured schedules.",
                     "Calms with quiet space, drawing, or music."
                    ],
    }
]
const resources= [
    {
        name: "Treehouse", category:"Sports", rating: 4.8, reviews: 118, distance: '6.3 miles', price: 'free', 
        description: "Activities and school events, such as sports, camps, and music programs.", 
        referral_info: "Required from legal guardian, DCYF caseworker. Check Treehouse website for referral process details.",
        tags: ["Free", "Age 5-10", "Referral Required", "Sports", "Camps"],
    },
    {
        name: "Pure Hair", category:"Hair Salons & Barbers", rating: 4.8, reviews: 33, distance: '11.3 miles', price: 'free', 
        description: "Offers free haircuts to foster kids, located in West Seattle.", 
        referral_info: "Not required",
        tags: ["Free", "Foster Kids", "Hair Cuts"],
    },
    {
        name: "Good Hair Salon", category:"Hair Salons & Barbers", rating: 4.4, reviews: 154, distance: '4.8 miles', price: '$$', 
        description: "Beauty salon specializing in locs and braids in an environment that some reviewers say is warm and inviting.", 
        referral_info: "N/A",
        tags: ["Black owned salon", "Locs", "Braids", "Hair Salon", "Hair"],
    },
    {
        name: "Seattle Public Library - Central Library", category:"Learning & Education", rating: 4.7, reviews: 1865, distance: '4.1 miles', price: 'free',
        description: "Free library card for all residents, employees, and students in King County, WA.", 
        referral_info: "N/A",
        tags: ["Free", "Library", "Books", "King County", "Learning", "Education"],
    },
]
// const Map=dynamic(() => import('@/components/Map'), {ssr:false}); /* Render map on client, not server side */
// Add child to profile –> Trigger Modal
// function Modal({title, onClose, children}){
//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
//                 <div className="flex items-center justify-between mb-5">
//                 <h3 className="font-bold text-lg text-[#1a2e1a]">{title}</h3>
//                 <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-xl">✕</button>
//                 </div>
//                 {children}
//             </div>
//         </div>
//     )
// }
export default function ResourcesMap() {
    const {data: session} = useSession()
    // const [children, setChildren] = useState(seedChildren)
    
    return(
        <div className="min-h-screen bg-[#faf6ee]">
            {/* Header & Intro */}
            <div className="bg-[#1a3a2e] px-10 py-8">
                <div className="max-w-6xl mx-auto flex items-start justify-between flex-wrap">
                    <div>
                        <h1 className="text-white text-2xl font-bold mb-1.5">Child Profile & Personalization</h1>
                        <p className="text-sm text-[#9ab89a] font-thin">Finding resources for your placement child? We&apos;re here to help.</p>
                    </div>
                    {/* Select Child Profile */}
                    <div className="flex items-center gap-3">
                        <select className="bg-white/10 text-white border-white/20 rounded-lg px-4 py-2.5 text-sm outline-none">
                            <option>Henry Thompson</option>
                        </select>
                        <button className="bg-[#f5a623] text-[#1a2e1a] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#8aa285] transition">+ Add Child</button>
                    </div>

                    <div className="max-w-6xl mx-auto px-6 py-7">
                        <div className="grid grid-cols-3 gap-5 mb-5"> {/*3 Cards*/}
                            <div className="bg-white rounded-2xl p-6 border border-[#ede8df] shadow-sm">
                                <div className="flex items-center gap-2 mb-5">
                                    <span>ℹ️</span>
                                    <span className="font-bold text-[15px] text-[#1a2e1a]">Basic Info</span>
                                </div>
                                <p className="text-gray-500 text-xs mb-4">What are the basic placement details? This helps personalize recommendations.</p>
                                <div className="flex flex-col gap-2 mb-3">
                                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl">
                                        <div className="text-lg font-bold text-[#113C3B]">Henry Thompson</div>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl">
                                        <div className="text-sm font-semibold text-[#113C3B]">Age: 7 years old</div>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl">
                                        <div className="text-sm font-semibold text-[#113C3B]">Grade Level: 2nd Grade</div>
                                    </div>
                                </div>
                                <button className="w-full bg-[#55a98a55] text-[#1a2e1a] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#8aa285] transition"> Edit</button>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-[#ede8df] shadow-sm">
                                <div className="flex items-center gap-2 mb-5">
                                    <span>✨</span>
                                    <span className="font-bold text-[15px] text-[#1a2e1a]">Interests & Hobbies</span>
                                </div>
                                <p className="text-gray-500 text-xs mb-4">What does your child love? This helps us find activities.</p>
                                <div className="flex flex-col gap-2 mb-3">
                                    <div className="flex items-center justify-between px-3 py-2.5 bg-[#FFF9EE] rounded-xl">
                                        <span>🏀</span>
                                        <div className="text-sm font-semibold text-[#113C3B]">Basketball</div>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d696a1a] text-[#0D696A]">Sports</span>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2.5 bg-[#FFF9EE] rounded-xl">
                                        <span>📚</span>
                                        <div className="text-sm font-semibold text-[#113C3B]">Reading</div>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d696a1a] text-[#0D696A]">Learning</span>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2.5 bg-[#FFF9EE] rounded-xl">
                                        <span>🖼️</span>
                                        <div className="text-sm font-semibold text-[#113C3B]">Drawing & Art</div>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d696a1a] text-[#0D696A]">Creative</span>
                                    </div>
                                </div>
                                <button className="w-full bg-[#FFD588] text-[#1a2e1a] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#8aa285] transition">+ Add</button>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-[#ede8df] shadow-sm">
                                <div className="flex items-center gap-2 mb-5">
                                    <span>📈</span>
                                    <span className="font-bold text-[15px] text-[#1a2e1a]">Behavioral Details</span>
                                </div>
                                <p className="text-gray-500 text-xs mb-4">What helps your child thrive? This matches you with understanding providers.</p>
                                <div className="flex flex-col gap-2 mb-3">
                                    <div className="flex items-center justify-between px-5 py-2.5 bg-[#FAF5FF] rounded-xl">
                                        <span>☑︎</span>
                                        <div className="text-xs font-semibold text-[#113C3B]">Needs reassurance during transitions.</div>
                                    </div>
                                    <div className="flex items-center justify-between px-5 py-2.5 bg-[#FAF5FF] rounded-xl">
                                        <span>☑︎</span>
                                        <div className="text-xs font-semibold text-[#113C3B]">Hypervigilant in new environments.</div>
                                    </div>
                                    <div className="flex items-center justify-between px-5 py-2.5 bg-[#FAF5FF] rounded-xl">
                                        <span>☑︎</span>
                                        <div className="text-xs font-semibold text-[#113C3B]">Prefers structured schedules.</div>
                                    </div>
                                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#FAF5FF] rounded-xl">
                                        <span>☑︎</span>
                                        <div className="text-xs font-semibold text-[#113C3B]">Calms with quiet space, drawing, or music.</div>
                                    </div>
                                </div>
                                <button className="w-full bg-[#EAD5FF] text-[#1a2e1a] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#8aa285] transition">+ Add</button>
                            </div>
                        </div>
                    </div>
                    {/* Guiding Instructions */}
                    <div className="bg-linear-to-br from-[#0D696A] to-[#0b5154] rounded-2xl p-7 mb-6 text-white max-w-6xl mx-auto flex ">
                        <div className="flex gap-4 items-start">
                            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">⚡</div>
                            <div>
                            <h2 className="text-lg font-bold mb-2">How This Profile Helps You</h2>
                            <p className="text-[#c8ecec] text-sm leading-relaxed mb-4 font-regular">
                                Based on your input, we&apos;re automatically showing you resources that are the best fit. No endless searching required.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["✓ Age-appropriate matches", "✓ Interest-based activities", "✓ Behavioral needs considered"].map(t => (
                                <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/10 text-[#c8e0c8]">{t}</span>
                                ))}
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 py-7">
                <div className="grid grid-cols-2 gap-8 mb-5 items-start"> {/*2 Cards*/}
                    <div className="rounded-2xl overflow-hidden shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.950445575823!2d-122.29133295903128!3d47.549293192052744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906b270cf6edb5%3A0x51806c82b2572ce0!2sAmara!5e0!3m2!1sen!2sus!4v1772766222679!5m2!1sen!2sus"
                            width="100%"
                            height="550"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="bg-white rounded-2xl p-5 border border-[#ede8df] shadow-sm">
                            <div className="flex gap-3">
                                <span className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0">📍</span>
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <div className="text-sm font-semibold text-[#113C3B]">Treehouse</div>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d696a1a] text-[#0D696A]">Sports</span>
                                    <p className="text-gray-500 text-xs mb-4">Activities and school events, such as sports, camps, and music programs.</p>
                                    <p className="text-gray-400 text-xs italic">Referral required from legal guardian, DCYF caseworker. Check Treehouse website for referral process details.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-[#ede8df] shadow-sm">
                            <div className="flex gap-3">
                                <span className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0">📍</span>
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <div className="text-sm font-semibold text-[#113C3B]">Pure Hair</div>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d696a1a] text-[#0D696A]">Hair Salon & Barbors</span>
                                    <p className="text-gray-500 text-xs mb-4">Offers free haircuts to foster kids, located in West Seattle.</p>
                                    <p className="text-gray-400 text-xs italic">Free for Foster Kids&apos; Hair Cuts</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-[#ede8df] shadow-sm">
                            <div className="flex gap-3">
                                <span className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0">📍</span>
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <div className="text-sm font-semibold text-[#113C3B]">Good Hair Salon</div>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d696a1a] text-[#0D696A]">Hair Salons & Barbers</span>
                                    <p className="text-gray-500 text-xs mb-4">Beauty salon specializing in locs and braids in an environment that some reviewers say is warm and inviting.</p>
                                    <p className="text-gray-400 text-xs italic">Black owned salon specialized in locs, braids, and Afro hair.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-5 border border-[#ede8df] shadow-sm">
                            <div className="flex gap-3">
                                <span className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0">📍</span>
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <div className="text-sm font-semibold text-[#113C3B]">Seattle Public Library - Central Library</div>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d696a1a] text-[#0D696A]">Learning</span>
                                    <p className="text-gray-500 text-xs mb-4">Free library card for all residents, employees, and students in King County, WA.</p>
                                    <p className="text-gray-400 text-xs italic">Free public Library in King County for borrowing Books, learning and education.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <main className="max-w-6xl mx-auto px-6 py-7">
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-4">
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
                </div>
            </main>
        </div>
    )
}