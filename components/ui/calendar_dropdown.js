"use client";

import { useState, useRef, useEffect } from "react";
import { CalAddIcon } from "@/components/icons/support_groups";

export default function CalendarDropdown({ links }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!links) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        title="Add to Calendar"
        className="w-9 h-9 rounded-full border border-[#E8E8E8] bg-white flex items-center justify-center hover:bg-[#f0fafa] transition-colors"
      >
        <CalAddIcon />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E8E8] rounded-xl shadow-xl z-[9999]">
          <a
            href={links.google}
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2 text-sm hover:bg-gray-50"
          >
            Google Calendar
          </a>

          <a
            href={links.outlook}
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2 text-sm hover:bg-gray-50"
          >
            Outlook
          </a>

          <a
            href={links.office365}
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2 text-sm hover:bg-gray-50"
          >
            Office 365
          </a>

          <a
            href={links.yahoo}
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2 text-sm hover:bg-gray-50"
          >
            Yahoo Calendar
          </a>

          <a
            href={links.ics}
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2 text-sm hover:bg-gray-50 border-t"
          >
            Download .ics
          </a>
        </div>
      )}
    </div>
  );
}