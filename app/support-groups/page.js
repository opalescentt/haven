"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { months, days, legend } from "@/lib/constants/events"
import { attachPrimaryDate, buildGrid, buildCalendarLinks, fmtTime, tagStyle } from "@/lib/utils/calendar";
import { CalIcon, ClockIcon, PinIcon, PersonIcon, ChevronIcon, GridIcon, ListIcon, PhoneIcon, CalAddIcon } from "@/components/icons/support_groups";
import CalendarDropdown from "@/components/ui/calendar_dropdown";

const EventCard = memo(function EventCard({ event, registered, onToggle, expanded, onExpand, registering }) {
  const d = event._parsedDate;
  const dateStr = d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : event.date?.join(", ");
  const calLinks = buildCalendarLinks(event);

  return (
    <div className={`border rounded-2xl transition-shadow hover:shadow-md ${registered ? "border-[#127CB3]" : "border-[#E8E8E8]"}`}>
      <div className="flex items-start gap-4 p-5 cursor-pointer" onClick={onExpand}>
        <div className="flex-0 w-14 text-center">
          {d ? (
            <>
              <div className="text-[11px] font-bold uppercase text-[#127CB3]">{months[d.getMonth()].slice(0, 3)}</div>
              <div className="text-3xl font-black text-[#113C3B] leading-none">{d.getDate()}</div>
            </>
          ) : <div className="text-xs text-gray-400">TBD</div>}
        </div>
 
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {registered && <span className="text-[10px] font-bold bg-[#127CB3] text-white px-2 py-0.5 rounded-full">ADDED</span>}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagStyle(event)}`}>{event.eventType || "Event"}</span>
          </div>
          <h3 className="font-bold text-[#113C3B] text-base leading-snug">{event.title}</h3>
          {event.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{event.description}</p>}
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
            {dateStr       && <span className="flex items-center gap-1"><CalIcon />    {dateStr}</span>}
            {event.timeStart && <span className="flex items-center gap-1"><ClockIcon /> {fmtTime(event.timeStart, event.timeEnd)}</span>}
            {event.location && <span className="flex items-center gap-1"><PinIcon />   {event.location}</span>}
            {event.speaker  && <span className="flex items-center gap-1"><PersonIcon />{event.speaker}</span>}
          </div>
        </div>
 
        <div className={`flex-0 transition-transform duration-200 text-gray-400 ${expanded ? "rotate-180" : ""}`}>
          <ChevronIcon />
        </div>
      </div>
 
      {expanded && (
        <div className="border-t rounded-2xl border-[#F0F0F0] px-5 py-4 bg-[#FAFAFA]">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="text-sm text-gray-600 flex-1">
              {event.format && <p><span className="font-medium">Format:</span> {event.format}</p>}
              {event.rsvp   && <p className="mt-1"><span className="font-medium">RSVP:</span> {event.rsvp}</p>}
              {event.url    && <a href={event.url} target="_blank" rel="noreferrer" className="text-[#127CB3] underline text-xs mt-1 block">More info →</a>}
            </div>
            <div className="relative flex items-center gap-2 z-10">
              <CalendarDropdown links={calLinks} />
              <button onClick={e => { e.stopPropagation(); onToggle(); }} disabled={registering}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap disabled:opacity-60 ${
                  registered ? "bg-white border-2 border-[#127CB3] text-[#127CB3] hover:bg-[#f0fafa]" : "bg-[#FFC50C] text-[#202020] hover:bg-[#e6b000]"
                }`}>
                {registering ? "…" : registered ? "✓ Added" : "Add to My Schedule"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
 
const SidebarCard = memo(function SidebarCard({ event, onRemove, disabled }) {
  const d = event._parsedDate;
  const calLinks = buildCalendarLinks(event);
  return (
    <div className="bg-white rounded-xl border border-[#127CB3]/30 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[#113C3B] truncate">{event.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : event.date?.join(", ")}
            {event.timeStart ? ` · ${event.timeStart}` : ""}
          </p>
          {event.location && <p className="text-xs text-gray-400 mt-0.5 truncate">{event.location}</p>}
        </div>
        <div className="flex items-center gap-1 flex-0">
          <CalendarDropdown links={calLinks} />
          <button onClick={onRemove} disabled={disabled}
            className="text-[10px] border border-[#127CB3] text-[#127CB3] rounded-full px-2 py-0.5 hover:bg-[#f0fafa] disabled:opacity-50">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});
 
const CalendarView = memo(function CalendarView({ events, registeredIds, year, month, onDayClick, selectedDay }) {
  const grid  = useMemo(() => buildGrid(year, month), [year, month]);
  const today = useMemo(() => new Date(), []);
 
  const byDay = useMemo(() => {
    const map = {};
    for (const ev of events) {
      const d = ev._parsedDate;
      if (d && d.getFullYear() === year && d.getMonth() === month) {
        (map[d.getDate()] ??= []).push(ev);
      }
    }
    return map;
  }, [events, year, month]);
 
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden">
      <div className="grid grid-cols-7 border-b border-[#F0F0F0]">
        {days.map(d => (
          <div key={d} className="py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wide">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {grid.map((day, i) => {
          const dayEvents  = day ? (byDay[day] ?? []) : [];
          const isSelected = selectedDay === day;
          const isToday    = day && today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
 
          return (
            <div key={i} onClick={() => day && dayEvents.length && onDayClick(day)}
              className={`min-h-22.5 p-1.5 border-b border-r border-[#F5F5F5] transition-colors
                ${!day ? "bg-[#FAFAFA]" : ""}
                ${dayEvents.length ? "cursor-pointer hover:bg-[#F0F9F9]" : ""}
                ${isSelected ? "bg-[#E8F6F6]" : ""}
              `}
            >
              {day && (
                <>
                  <div className={`w-7 h-7 flex items-center justify-center text-sm font-semibold rounded-full mb-1 ${isToday ? "bg-[#127CB3] text-white" : "text-[#202020]"}`}>{day}</div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map((ev, j) => (
                      <div key={j} title={ev.title}
                        className={`text-[10px] leading-snug px-1.5 py-0.5 rounded truncate ${registeredIds.has(ev._id) ? "bg-[#127CB3] text-white font-semibold" : "bg-[#FFC50C]/30 text-[#7A5C00] font-medium"}`}>
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && <div className="text-[10px] text-gray-400 pl-1">+{dayEvents.length - 3} more</div>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default function SupportGroups() {
  const { data: session} = useSession();
  const [events, setEvents] = useState([]); // added apr 12
  const [registeredIds, setRegisteredIds] = useState(new Set());
  const [registeringId, setRegisteringId] = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [tab,           setTab]           = useState("all");
  const [viewMode,      setViewMode]      = useState("calendar");
  const [search,        setSearch]        = useState("");
  const [expandedId,    setExpandedId]    = useState(null);
  const [selectedDay,   setSelectedDay]   = useState(null);
  const [toastMsg,      setToastMsg]      = useState(null);
 
  const now = useMemo(() => new Date(), []);
  const [calYear,  setCalYear]  = useState(() => now.getFullYear());
  const [calMonth, setCalMonth] = useState(() => now.getMonth());
 
  useEffect(() => {
    fetch("/api/events")
      .then(r => r.json())
      .then(data => { setEvents(data.map(attachPrimaryDate)); setLoading(false); })
      .catch(err => { console.error("Error fetching events:", err); setLoading(false); });
  }, []);
 
  useEffect(() => {
    if (!session || !session.user) return;
    fetch("/api/registrations")
      .then(r => r.json())
      .then(data => setRegisteredIds(new Set(data.map(r => r.eventId ?? r))))
      .catch(err => console.error("Error fetching registrations:", err));
  }, [session]);
 
  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  }, []);
 
  const toggleRegister = useCallback(async (eventId) => {
    if (!session) { showToast("Sign in to add events to your schedule."); return; }
    const isRegistered = registeredIds.has(eventId);
    setRegisteringId(eventId);
    try {
      const res = await fetch("/api/registrations", {
        method: isRegistered ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });
      if (!res.ok) throw new Error();
      setRegisteredIds(prev => {
        const next = new Set(prev);
        isRegistered ? next.delete(eventId) : next.add(eventId);
        return next;
      });
      showToast(isRegistered ? "Removed from schedule." : "Added to your schedule! ✓");
    } catch {
      showToast("Something went wrong. Please try again.");
    } finally {
      setRegisteringId(null);
    }
  }, [session, registeredIds, showToast]);
 
  const prevMonth   = useCallback(() => { setCalMonth(m => { if (m === 0) { setCalYear(y => y - 1); return 11; } return m - 1; }); setSelectedDay(null); }, []);
  const nextMonth   = useCallback(() => { setCalMonth(m => { if (m === 11) { setCalYear(y => y + 1); return 0;  } return m + 1; }); setSelectedDay(null); }, []);
  const goToday     = useCallback(() => { setCalYear(now.getFullYear()); setCalMonth(now.getMonth()); setSelectedDay(null); }, [now]);
  const toggleDay   = useCallback(d  => setSelectedDay(prev => prev === d ? null : d), []);
  const toggleExpand= useCallback(id => setExpandedId(prev => prev === id ? null : id), []);
 
  const filtered = useMemo(() => {
    let list = tab === "registered" ? events.filter(e => registeredIds.has(e._id)) : events;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.title?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.speaker?.toLowerCase().includes(q)
      );
    }
    if (viewMode === "calendar" && selectedDay) {
      list = list.filter(e => {
        const d = e._parsedDate;
        return d && d.getFullYear() === calYear && d.getMonth() === calMonth && d.getDate() === selectedDay;
      });
    }
    return list.slice().sort((a, b) => {
      const da = a._parsedDate, db = b._parsedDate;
      if (!da && !db) return 0; if (!da) return 1; if (!db) return -1;
      return da - db;
    });
  }, [events, tab, search, registeredIds, viewMode, selectedDay, calYear, calMonth]);
 
  const calendarEvents = useMemo(
    () => tab === "registered" ? events.filter(e => registeredIds.has(e._id)) : events,
    [events, tab, registeredIds]
  );
 
  const registeredEvents = useMemo(() => events.filter(e => registeredIds.has(e._id)), [events, registeredIds]);
 
  const upcomingMonthLabel = useMemo(() => {
    const last = [...events].reverse().find(e => e._parsedDate);
    return last ? months[last._parsedDate.getMonth()] : "";
  }, [events]);
 
  const registeredCount = registeredIds.size;
 
  return (
    <div className="min-h-screen bg-[#faf6ee] pb-24">
      <header className="relative px-4 py-8 sm:px-10 sm:py-8 overflow-hidden min-h-50">
        <Image src="/support_header_bg.png" alt="Individuals at an Amara event."  fill sizes="100%" className="object-cover object-center" loading="eager" priority/>
        <div className="relative z-10 max-w-6xl mx-auto flex items-start justify-center flex-wrap">
          <div className="bg-white/70 px-6 py-8 sm:px-16 sm:py-12 w-full sm:w-auto">
            <h1 className="text-black text-2xl sm:text-4xl font-semibold mb-2.5 text-center">Caregiver Community</h1>
            <p className="text-lg text-[#127CB3] font-medium text-center">You aren&apos;t meant to do this alone. Join a specialized support group to<br />find connection, shared wisdom, and emotional support.</p>
          </div>
        </div>
      </header>
 
      <div className="max-w-6xl mx-auto px-6 mt-8">
         <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white border border-[#E8E8E8] rounded-full p-1 gap-1">
            <button onClick={() => { setTab("all"); setSelectedDay(null); }} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${tab === "all" ? "bg-[#127CB3] text-white" : "text-gray-500 hover:text-[#127CB3]"}`}>All Events</button>
            <button onClick={() => { setTab("registered"); setSelectedDay(null); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${tab === "registered" ? "bg-[#127CB3] text-white" : "text-gray-500 hover:text-[#127CB3]"}`}>
              My Scheduled Events
              {registeredCount > 0 && (<span className={`text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold ${tab === "registered" ? "bg-white text-[#0e5a80]" : "bg-[#127CB3] text-white"}`}> {registeredCount} </span>)}
            </button>
          </div>
 
          <div className="flex-1 min-w-45 max-w-xs relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
            </svg>
            <input type="text" placeholder="Search groups and keywords…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-[#E8E8E8] rounded-full bg-white outline-none focus:border-[#127CB3] transition-colors" />
          </div>
 
          <div className="ml-auto flex bg-white border border-[#E8E8E8] rounded-full p-1 gap-1">
            {[["calendar", <GridIcon key="g"/>], ["list", <ListIcon key="l"/>]].map(([mode, icon]) => (
              <button key={mode} title={`${mode} view`}
                onClick={() => { setViewMode(mode); if (mode === "list") setSelectedDay(null); }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${viewMode === mode ? "bg-[#127CB3] text-white" : "text-gray-500 hover:text-[#0e5a80]"}`}>
                {icon}
              </button>
            ))}
          </div>
        </div>
 
        <div className="mt-8 flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-xl text-[#113C3B]">
              {tab === "registered" ? "My Support Group Schedule" : "Community Schedule"}
            </h2>
            <p className="text-sm text-gray-400 font-light">
              Upcoming sessions for {months[calMonth]}{upcomingMonthLabel && upcomingMonthLabel !== months[calMonth] ? ` – ${upcomingMonthLabel}` : ""} {calYear}
            </p>
          </div>
          {viewMode === "calendar" && (
            <div className="flex items-center gap-2">
              <button onClick={goToday} className="text-sm font-semibold text-[#113C3B] px-2 py-1 rounded-full hover:bg-[#f0f0f0] transition-colors">Today</button>
              <button onClick={prevMonth} className="w-7 h-7 rounded-full border border-[#E8E8E8] flex items-center justify-center hover:bg-[#f0f0f0] text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span className="text-sm font-medium text-gray-600 min-w-27.5 text-center">{months[calMonth]} {calYear}</span>
              <button onClick={nextMonth} className="w-7 h-7 rounded-full border border-[#E8E8E8] flex items-center justify-center hover:bg-[#f0f0f0] text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>
 
        {loading && <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading events…</div>}
 
        {!loading && viewMode === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <CalendarView events={calendarEvents} registeredIds={registeredIds}
              year={calYear} month={calMonth} selectedDay={selectedDay} onDayClick={toggleDay} />
 
            <div className="space-y-4">
              {selectedDay ? (
                <>
                  <h3 className="font-semibold text-sm text-[#113C3B] uppercase tracking-wide">
                    {months[calMonth].slice(0, 3)} {selectedDay} Events
                  </h3>
                  {filtered.length === 0
                    ? <p className="text-sm text-gray-400">No events on this day.</p>
                    : filtered.map(ev => (
                        <EventCard key={ev._id} event={ev} registered={registeredIds.has(ev._id)}
                          onToggle={() => toggleRegister(ev._id)} expanded={expandedId === ev._id}
                          onExpand={() => toggleExpand(ev._id)} registering={registeringId === ev._id} />
                      ))
                  }
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-sm text-[#113C3B] uppercase tracking-wide">My Scheduled Groups</h3>
                  {registeredCount === 0
                    ? <p className="text-sm text-gray-400 italic">No scheduled groups yet.</p>
                    : registeredEvents.map(ev => (
                        <SidebarCard key={ev._id} event={ev} onRemove={() => toggleRegister(ev._id)} disabled={registeringId === ev._id} />
                      ))
                  }
                </>
              )}
            </div>
          </div>
        )}
 
        {!loading && viewMode === "list" && (
          <div className="space-y-3">
            {filtered.length === 0
              ? <div className="text-center py-16 text-gray-400">
                  {tab === "registered" ? "You haven't scheduled any events yet." : "No events found."}
                </div>
              : filtered.map(ev => (
                  <EventCard key={ev._id} event={ev} registered={registeredIds.has(ev._id)}
                    onToggle={() => toggleRegister(ev._id)} expanded={expandedId === ev._id}
                    onExpand={() => toggleExpand(ev._id)} registering={registeringId === ev._id} />
                ))
            }
          </div>
        )}
 
        {!loading && viewMode === "calendar" && (
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
            {legend.map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-sm inline-block ${color}`} /> {label}
              </span>
            ))}
          </div>
        )}
      </div>
 
      <div className="fixed bottom-6 right-6 z-50">
        <a href="tel:+12062601700" className="flex items-center gap-2 bg-[#127CB3] border-3 border-[#FFC50C] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-[#335364] transition-colors"><PhoneIcon /> 24/7 Emergency Hotline</a>
      </div>
 
      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#127CB3] text-white text-sm px-5 py-2.5 rounded-full shadow-lg z-50">{toastMsg}</div>
      )}
    </div>
  );
}