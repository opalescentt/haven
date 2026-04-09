"use client"

import Link from "next/link" // Next.js Client side route navigation
import {usePathname} from "next/navigation" // To style the active link in nav bar
import Image from "next/image"
export default function Navbar(){
    const pathname = usePathname() // Read current path for active link
    const activeTab = (href) => {
        const isActive =
          href === "/"
            ? pathname === "/"
            : pathname.startsWith(href)
      
        return isActive
          ? "font-medium text-[#113C3B] font-semibold"
          : "font-medium text-[#90A1B9] hover:text-[#113C3B] transition-colors duration-200"
    }
    return(
        <nav className="bg-[#faf6ee] border-b border-[#ede8df] px-5 py-2 flex flex-wrap items-center justify-between sticky top-0 z-50 pr-8 md:pr-30">
            <Link href="/" className="flex items-center gap-1 no-underline shrink-0">
                <Image src="/logo.png" alt="Haven logo" width={40} height={40} />
                <span className="font text-2xl text-[#1a2e1a] font-serif">Haven</span>
            </Link>
            {/* Needs sign-in: Child Profile, Resources Map, Staff-Directory, Support Groups */}
            <Link href="/child-profile" className={activeTab("/child-profile")}>Child Profile</Link>
            <Link href="/resources-map" className={activeTab("/resources-map")}>Resources Map</Link>
            <Link href="/staff-directory" className={activeTab("/staff-directory")}>Staff Directory</Link>
            <Link href="/support-groups" className={activeTab("/support-groups")}>Support Groups</Link>
        </nav>
    )
}