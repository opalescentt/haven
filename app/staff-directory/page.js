"use client";
import Image from "next/image";
import {useState} from "react";

export default function StaffDirectory() {
  // TODO: Implement excel sharepoint and search functionality

  // const formatName = (raw) => {
  //   const [last, first] = raw.split(",").map((s) => s.trim());
  //   const toTitle = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  //   return `${toTitle(first)} ${toTitle(last)}`;
  // };
  
  // assign color to each category
  // const categorys = [ category: "Foster Care", color: "blue-400" ]

  const employees = [
    {
      name: "Jane Anderson",
      role: "Foster Care Specialist",
      category: "Foster Care",
      email: "janeand@amarafamily.org",
    },
    {
      name: "John Doe",
      role: "Case Manager",
      category: "Adoption Services",
      email: "johndoe@amarafamily.org",
    },
    {
      name: "Emily Smith",
      role: "Therapist",
      category: "Mental Health",
      email: "emilysmith@amarafamily.org",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.role.toLowerCase().includes(query) ||
      employee.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#faf6ee]">
      <header className="relative px-4 py-10 sm:px-10 sm:py-15 overflow-hidden min-h-50">
        <Image src="/staff_dir_bg.png" alt = "Amara community at resources center." fill sizes="100%" className="object-cover object-center" loading="eager" priority/>
        <div className="relative z-10 max-w-6xl mx-auto flex items-start justify-center flex-wrap">
          <div className="bg-white/70 px-6 py-8 sm:px-16 sm:py-12 w-full sm:w-auto">
            <h1 className="text-black text-2xl sm:text-4xl font-semibold mb-2.5 text-center">Amara Staff Directory</h1>
            <p className="text-lg text-[#127CB3] font-medium text-center">Meet our dedicated team committed to supporting families and children</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-6">
        <div className="relative px-4 py-10 sm:px-10 sm:py-15 overflow-hidden min-h-50">
          <Image src="/staff_dir_backdrop.png" alt = "Light grey scribbles with dots as background." fill sizes="100%" className="object-cover object-center" loading="eager" priority/>

          <div className="bg-white rounded-2xl shadow-md p-6 md:p-3 space-y-4 relative z-10">
            <div className="flex items-center rounded-md overflow-hidden">
              <span className="px-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                  />
                </svg>
              </span>
              <input type="text" placeholder="Search by name, role, or category..." className="w-full px-3 py-2 outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              <button className="px-3 py-2 bg-[#127CB3] hover:bg-[#127db37c] text-white border border-white rounded-2xl">All</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-10">
            {filteredEmployees.map((employee, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col z-10 border border-[#FFC50C]"
              >
                <div className="p-6 flex flex-col items-center text-center grow">
                  <div className="w-14 h-14 rounded-full bg-[#f5a623] flex items-center justify-center text-white font-bold text-lg mb-4">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h4 className="text-sm font-semibold mb-1 text-[#113C3B]">
                    {employee.name}
                  </h4>
                  <span className="text-[11px] text-gray-500 border border-gray-200 rounded-full px-3 py-0.5 mb-3">
                    {employee.role}
                  </span>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
                    <span className="text-xs text-gray-500">
                      {employee.category}
                    </span>
                  </div>
                  <a
                    className="text-xs text-[#0D696A] flex items-center gap-1"
                    href={`mailto:${employee.email}`}
                  >
                    ✉ {employee.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}