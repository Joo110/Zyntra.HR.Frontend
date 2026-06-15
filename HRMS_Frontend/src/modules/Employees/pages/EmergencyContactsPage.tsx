import React, { useState } from "react";
import { Pencil, Trash2, User, Phone, Mail, MapPin } from "lucide-react";
import AddEmergencyContactModal from "./AddEmergencyContactModal";

interface EmergencyContact {
  id: number;
  name: string;
  empId: string;
  contactName: string;
  relationship: string;
  phone: string;
  altPhone: string;
  email: string;
  address: string;
  notes: string;
}

const mockContacts: EmergencyContact[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  name: "Ahmed Hassan Al-Mansouri",
  empId: "EMP-1024",
  contactName: "Sarah Al-Mansouri",
  relationship: i % 2 === 0 ? "Spouse" : "Parent",
  phone: "+971 50 765 4321",
  altPhone: "+971 4 123 4567",
  email: "sarah.almansouri@email.com",
  address: "Villa 42, Al Wasl District, Dubai, UAE",
  notes: "Available 24/7",
}));

export default function EmergencyContactsPage() {
  const [search, setSearch] = useState("");
  const [relFilter, setRelFilter] = useState("All Relationship");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f7f8fc]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Emergency Contacts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage employee emergency contact information</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Contacts
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Contacts"
          className="flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white"
        />
        <select value={relFilter} onChange={(e) => setRelFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white">
          {["All Relationship", "Spouse", "Parent", "Sibling", "Friend"].map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white">
          {["All Departments", "Engineering", "IT Technology", "HR"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockContacts.map((c) => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition relative">
            {/* Actions */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button className="text-gray-400 hover:text-gray-600"><Pencil size={14} /></button>
              <button className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>

            {/* Avatar + Name */}
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-lg mb-2">
                AH
              </div>
              <p className="text-sm font-semibold text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-400">{c.empId}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <User size={13} className="text-gray-400 shrink-0" />
                <span>{c.contactName}</span>
                <span className="text-gray-400">— {c.relationship}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Phone size={13} className="text-gray-400 shrink-0" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Phone size={13} className="text-gray-400 shrink-0" />
                <span>Alt: {c.altPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Mail size={13} className="text-gray-400 shrink-0" />
                <span className="truncate">{c.email}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-600">
                <MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{c.address}</span>
              </div>
            </div>

            {c.notes && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">Notes:</p>
                <p className="text-xs text-gray-600">{c.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAdd && <AddEmergencyContactModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}