"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"; // added apr 12

export default function SupportGroups() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]); // added apr 12

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then(setEvents)
      .catch(err => console.error("Error fetching events:", err));
  }, []); // added apr 12

  return (
    <div className="min-h-screen bg-[#faf6ee]">
      <div className="bg-[#FFC50C] px-10 py-18">
        <div className="max-w-6xl mx-auto flex items-start justify-center flex-wrap">
          <div>
            <h1 className="text-[#202020] text-4xl font-bold mb-2.5 text-center">
              Caregiver Community
            </h1>
            <p className="text-sm text-[#202020]/60 font-normal text-center">
              You aren&apos;t meant to do this alone. Join a specialized support
              group to <br></br>find connection, shared wisdom, and emotional
              support.
            </p>
          </div>
        </div>
      </div>
      <div className="m-12">
        <h2 className="font-medium text-2xl">Community Schedule</h2>
        <p className="font-thin leading-relaxed">Upcoming sessions for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        {events.map((e, i) => (
          <div key={i} className="mt-4">
            <p className="font-medium">{e.title}</p>
            <p className="text-sm text-gray-500">
              {e.date?.join(", ")} · {e.timeStart}
              {e.timeEnd ? ` - ${e.timeEnd}` : ""}
            </p>
            {e.description && (
              <p className="text-sm text-gray-400">{e.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
