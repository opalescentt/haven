"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { partners, labelStyles } from "@/lib/constants/partners"
import { items } from "@/lib/constants/features"
import { useEffect, useState } from "react";
import { attachPrimaryDate, fmtTime } from "@/lib/utils/calendar";
import { months } from "@/lib/constants/events";

export default function LandingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const EVENT_COLORS = ["#FDBF41", "#BA9EB7", "#6FAFB0", "#E8957A"];
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/events")
      .then(r => r.json())
      .then(data => {
        const upcoming = data
          .map(attachPrimaryDate)
          .filter(e => e._parsedDate && e._parsedDate >= new Date())
          .sort((a, b) => a._parsedDate - b._parsedDate)
          .slice(0, 2);
        setUpcomingEvents(upcoming);
      })
      .catch(err => console.error("Error fetching events:", err));
  }, [session]);

  return (
    <main className="min-h-screen bg-[#faf6ee] font-sans">
      {session ? (
        <>
          <header className="relative overflow-hidden" style={{ minHeight: '600px' }}>
            <Image src="/landing_banner.png" alt="Kid holding a drawing of a red heart." fill sizes="100%" className="object-cover object-center" loading="eager" priority/>
            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-10 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-md">
                <h1 className="text-black text-2xl sm:text-xl md:text-3xl font-semibold mb-4">Welcome to Haven, {session.user?.name?.split(" ")[0]}</h1>
                <p className="text-black text-base sm:text-lg leading-relaxed">
                  Haven is your trusted hub for foster care and kinship support.
                  We&apos;re here to connect you to resources, community, and the help you need.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 sm:p-6 w-full sm:w-80 shrink-0">
                <div className="flex items-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D696A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <h2 className="font-semibold text-gray-900 text-base">Upcoming Events</h2>
                </div>

                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No upcoming events.</p>
                ) : upcomingEvents.map((event, i) => {
                  const d = event._parsedDate;
                  const month = d ? months[d.getMonth()].slice(0, 3).toUpperCase() : "TBD";
                  const day = d ? d.getDate() : "--";
                  const color = EVENT_COLORS[i % EVENT_COLORS.length];

                  return (
                    <div key={event._id} className="flex items-start gap-3 mb-4">
                      <div
                        className="rounded-lg px-2 py-1 text-center min-w-11 shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        <div className="text-[#113C3B] text-[10px] font-semibold uppercase">{month}</div>
                        <div className="text-[#113C3B] text-xl font-bold leading-none">{day}</div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{event.title}</p>
                        <p className="text-[#6FAFB0] text-xs">
                          {event.location ?? "Virtual"}{event.timeStart ? `, ${fmtTime(event.timeStart, event.timeEnd)}` : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <button className="w-full bg-[#FF9D76] hover:bg-[#ac7059] transition-colors text-white font-medium py-2.5 rounded-xl text-sm" onClick={() => router.push("/support-groups")}>View Full Calendar</button>
              </div>
            </div>
          </header>

          <section className="max-w-5xl mx-auto px-8 py-16">
            <h2 className="text-center text-3xl font-bold text-[#113C3B] mb-1">Ab<span className="underline decoration-[#0D696A] underline-offset-25">out A</span>mara</h2>
            <p className="text-center text-m text-gray-500 mt-10 mb-10">We believe all people, regardless of circumstance, deserve the opportunity to thrive.</p>
            <div className="grid grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="font-bold text-xl text-[#113C3B] mb-3">Amara&apos;s Mission</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Amara serves the evolving needs of children, youth, and families impacted by the child welfare system. Centering equity, we advocate for system change and bridge gaps by providing compassionate wrap-around resources, while helping to reduce trauma and bring healing. Our work helps maintain family and community connections while preventing child welfare involvement when possible.
                </p>
                <h3 className="font-bold text-xl text-[#113C3B] mb-3">Amara&apos;s Vision</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">Amara envisions a just and equitable world where all children, youth, and families experiencing, or at-risk of experiencing, involvement with the child welfare system have equal and plentiful opportunities to grow and thrive.</p>
                <div className="flex gap-8 text-center">
                  {[["2,841", "PEOPLE SERVED"], ["1,410", "CHILDREN SUPPORTED THROUGH AMARA PROGRAMS"], ["1,426", "CAREGIVERS SUPPORTED"]].map(([num, label]) => (
                    <div key={label}>
                      <p className="text-2xl font-bold text-[#0D696A]">{num}</p>
                      <p className="text-xs text-gray-400">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Image src="/about_amara.png" alt="Two licensed caregivers hugging their foster childrens." width={288} height={144} className="rounded-2xl w-full h-50 object-cover col-span-2" />
                <Image src="/community.png" alt="A person looking down to engage with another person during an outdoor gathering." width={288} height={144} className="rounded-2xl w-full h-35 object-cover" />
                <Image src="/support_program.png" alt="Amara&apos;s Caregiver Support program provided compassionate support to help Becca and her grandparents access the medical care and essential equipment she needs." width={288} height={144} className="rounded-2xl w-full h-35 object-cover" />
              </div>
            </div>
          </section>

          <div className="bg-[#F0F9F9] border border-[#6fafb068] rounded-3xl max-w-4xl mx-auto px-9 py-12 mb-16 shadow-sm">
            <h2 className="text-center text-2xl font-bold text-[#113C3B] tracking-wide mb-10">Community I<span className="underline decoration-[#0D696A] underline-offset-25">S the </span> Recovery Plan</h2>
            <p className="text-center text-xs font-semibold text-[#0D696A] uppercase tracking-wide mb-8">A Collaborative Effort Across Pierce & King Counties</p>
            <p className="text-center text-gray-500 text-m leading-relaxed mb-8 max-w-3xl mx-auto">The Community IS the Recovery Plan initiative brings together trusted organizations, agencies, and individuals dedicated to supporting foster and kinship caregivers in the greater sphere of child welfare. Through collaboration and shared resources, this is building a network that ensures no family walks the foster journey alone.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {items.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center p-5 bg-white rounded-2xl shadow-xl w-40">
                <Image src={item.icon} alt={item.label} width={48} height={48} className="mb-4 object-contain"/>
                <p className="text-xs text-[#364153] font-medium w-25 wrap-break-word">{item.label}</p>
              </div>
              ))}
            </div>
            <Image src="/connected_dots.png" alt="Four connected dots in teal, cyan, orange, and yellow from left to right" width={1200} height={2} className="rounded-2xl w-full h-full object-cover col-span-2" />
            <p className="text-center font-light text-xs text-[#4A5565] italic mt-3">Working together to support every family</p>
          </div>

          <section className="max-w-5xl mx-auto px-1">
        <p className="text-center text-xs text-[#6A7282] uppercase tracking-widest mb-8">Community IS the Recovery Plan Partners</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[#99a1afb1] text-xl font-semibold  mb-20">
              {["Tacoma Public Schools", "First5Fundamentals", "Tahoma Indian Center", "Institute for Black Justice", "HopeSparks", "Coordinated Care", "Community Health Care"].map((p) => (
              <span key={p}>{p}</span>
              ))}
          </div>
      </section>
      
      <section className="relative mt-16">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/partner_orgs.png" fill sizes="100vw" loading="eager" priority className="object-cover object-top" alt="Partner Section Background"/>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-16">
          <h2 className="text-center text-4xl font-semibold text-black mt-10 mb-2 tracking-wide">
            Our Partner Organizations
          </h2>
          <p className="text-center font-normal text-s text-m mb-10 text-[#373737]">Trusted agencies working together to support foster and kinship caregivers</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-6">
            {partners.slice(0, 8).map((partner) => (
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
            <button className="bg-white text-[#1a3a2e] rounded-full px-8 py-3 text-sm font-semibold hover:bg-[#127CB3] hover:text-white transition-colors" onClick={() => router.push("/partner-organizations")}>See More ↓</button>
          </div>
        </div>
      </section>
      
      <section className="max-w-5xl mx-auto px-8 mt-20 mb-30 pb-16">
        <h2 className="text-center text-3xl font-bold text-[#1a2e1a] mb-6">Sign up for Amara&apos;s Caregiver Newsletter</h2>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <p className="text-gray-500 mb-4">Each month&apos;s newsletter looks a little different and includes a variety of information and resources! The newsletter is available to caregivers in Amara&apos;s Caregiver Support Program.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email address" className="flex-1 border border-[#ede8df] rounded-md px-5 py-3 outline-none focus:border-[#1a3a2e]"/>
              <button className="bg-[#1a3a2e] text-white rounded-md px-6 py-3 hover:bg-[#0f2a1e] transition-colors">Subscribe</button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <Image src="/newsletter_photo.png" alt="Amara" width={300} height={208} className="object-cover w-full max-w-50 h-auto"/>
          </div>
        </div>
      </section>
        </>
      ) : (
        <section className="bg-[#127CB3] px-8 py-50 text-center relative overflow-hidden">
          <div className="relative max-w-5xl mx-auto flex flex-col items-center gap-8">
            <div className="relative w-full">
              <Image src="/landing_frame.png" alt="Yellow frame background." width={640} height={300} className="w-full object-fill" style={{height:"auto", minHeight: "160px"}} loading="eager"/>
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-16">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">Haven</h1>
                <p className="text-white/80 text-sm m:text-base md:text-xl leading-relaxed">One stop resource hub for Amara&apos;s licensed caregivers.</p>
              </div>
            </div>
          </div>
          <div className="relative max-w-2xl mx-auto mt-10">
            <div className="flex flex-col items-center gap-4 mt-10">
                <button onClick={() => signIn("google", { callbackUrl: "/" })} className="bg-white text-[#1a3a2e] border-none rounded-full px-10 py-4 text-base font-bold cursor-pointer flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <span className="opacity-80 text-sm sm:text-base">Powered by</span>
              <Image src="/amaralogo.png" alt="Amara logo" width={90} height={90} className="object-contain"/>
            </div>
          </div>
        </section>
      )}
  </main>
  )
}