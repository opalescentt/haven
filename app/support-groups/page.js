"use client"

import { useSession } from "next-auth/react"
export default function SupportGroups() {
    const {data: session} = useSession()

    return(
        <div style={{padding:20}}>
            <h1>Support Groups</h1>
            {session ? (
                <button>Join Group</button>
            ): (
                <p>Please sign in to join support groups.</p>
            )}
        </div>
    )
}