"use client"

import { useState } from "react"
import { Search, MessageSquare, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { logout } from "@/app/login/actions"

export function Header() {
  const [langOpen, setLangOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="flex h-20 items-center justify-between px-8 bg-transparent" onClick={() => {
      setLangOpen(false)
      setProfileOpen(false)
      setMessagesOpen(false)
      setNotificationsOpen(false)
    }}>
      <h1 className="text-xl font-bold text-slate-800">
        Admin Dashboard
      </h1>
      
      <div className="flex items-center gap-8">
        <form onSubmit={(e) => { e.preventDefault(); alert(`Searching for: ${searchQuery}`); setSearchQuery("") }} className="relative w-64 hidden md:block">
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search" 
            className="pl-4 pr-10 bg-white border-none rounded-full shadow-sm text-sm outline-none focus-visible:ring-1 focus-visible:ring-slate-300"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 text-slate-400 hover:text-[var(--brand)] transition-colors" />
          </button>
        </form>

        <div className="flex items-center gap-6">
          {/* Language Dropdown */}
          <div className="relative">
            <div 
              onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); setProfileOpen(false); setMessagesOpen(false); setNotificationsOpen(false) }}
              className="flex items-center gap-1 cursor-pointer text-sm font-bold text-slate-700 hover:text-[var(--brand)] transition-colors"
            >
              EN <ChevronDown className="h-3 w-3" />
            </div>
            {langOpen && (
              <div className="absolute right-0 top-8 w-24 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 text-sm animate-in fade-in zoom-in-95 duration-100">
                <button className="block w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors">EN (US)</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors">FR (FR)</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors">ES (ES)</button>
              </div>
            )}
          </div>
          
          {/* Messages */}
          <div className="relative">
            <div 
              onClick={(e) => { e.stopPropagation(); setMessagesOpen(!messagesOpen); setLangOpen(false); setProfileOpen(false); setNotificationsOpen(false) }}
              className="relative cursor-pointer text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">4</span>
            </div>
            {messagesOpen && (
              <div className="absolute right-0 top-8 w-64 bg-white border border-slate-200 rounded-md shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 font-bold text-sm border-b border-slate-100">Messages (4)</div>
                <div className="px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors">New message from Kathryn</div>
                <div className="px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors">Project update from team</div>
                <div className="px-4 py-2 text-center text-xs font-bold text-[var(--brand)] hover:underline cursor-pointer border-t border-slate-100 mt-1">View all</div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <div 
              onClick={(e) => { e.stopPropagation(); setNotificationsOpen(!notificationsOpen); setLangOpen(false); setProfileOpen(false); setMessagesOpen(false) }}
              className="relative cursor-pointer text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">4</span>
            </div>
            {notificationsOpen && (
              <div className="absolute right-0 top-8 w-64 bg-white border border-slate-200 rounded-md shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 font-bold text-sm border-b border-slate-100">Notifications (4)</div>
                <div className="px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors">System maintenance tonight</div>
                <div className="px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors">New user registered</div>
                <div className="px-4 py-2 text-center text-xs font-bold text-[var(--brand)] hover:underline cursor-pointer border-t border-slate-100 mt-1">View all</div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <div 
              onClick={(e) => { e.stopPropagation(); setProfileOpen(!profileOpen); setLangOpen(false); setMessagesOpen(false); setNotificationsOpen(false) }}
              className="flex items-center gap-2 cursor-pointer pl-2 group"
            >
              <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
                <img
                  src="https://i.pravatar.cc/150?u=audin"
                  alt="Audin Rushow"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-[var(--brand)] transition-colors">Audin Rushow</span>
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-[var(--brand)] transition-colors" strokeWidth={2} />
            </div>
            {profileOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900">Audin Rushow</p>
                  <p className="text-xs text-slate-500">audin@stoodeo.com</p>
                </div>
                <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left mt-1 transition-colors">
                  <User className="h-4 w-4" /> My Profile
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left transition-colors">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <form action={logout}>
                    <button 
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 w-full text-left transition-colors"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
