"use client"

import Link from "next/link" // Next.js Route Handler
import {signIn, signOut, useSession} from "next-auth/react" // NextAuth.js for authentication handling

export default function Navbar(){
    const{data:session}=useSession() 

    return(
        <nav style ={{padding: 20, borderBottom: "1px solid #FFF9EE"}}>
            <Link href="/">Dashboard</Link>
            <Link href="/child-profile">Child Profile</Link>
            <Link href="/staff-directory">Staff Directory</Link>
            <Link href="/support-groups">Support Groups</Link>

            {session ? (
                <button onClick ={() => signOut()}>Sign Out</button>
            ) : (
                <button onClick ={() => signIn("google")}>Sign In</button>
            )}
        </nav>
    )
}