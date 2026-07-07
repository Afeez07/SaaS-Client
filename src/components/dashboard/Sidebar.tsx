"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BarChart2, 
  Mail, 
  FileText, 
  Users, 
  UserSquare2, 
  Star, 
  Settings, 
  HelpCircle, 
  LogOut,
  Loader2,
  CheckCircle2
} from "lucide-react"
import { logout } from "@/app/login/actions"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Mail", href: "/dashboard/mail", icon: Mail },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Users", href: "/dashboard/users", icon: UserSquare2 },
  { name: "Reviews", href: "/dashboard/reviews", icon: Star },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      setTimeout(() => setIsConnected(false), 3000)
    }, 1500)
  }

  return (
    <aside className="w-64 flex flex-col bg-white border-r border-slate-200 py-6 h-full shrink-0">
      <div className="flex items-center mb-8 px-8">
        <span className="text-2xl font-bold tracking-tight text-[var(--brand)]">
          <span className="font-medium">Demola</span> Sample
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isCurrent = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 font-medium transition-colors relative ${
                isCurrent
                  ? "bg-[var(--brand-light)] text-[var(--brand)]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {isCurrent && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand)]" />
              )}
              <Icon className={`h-5 w-5 ${isCurrent ? "text-[var(--brand)]" : ""}`} strokeWidth={2} />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
        
        {/* Real Logout Button */}
        <form action={logout} className="mt-2">
          <button
            type="submit"
            className="w-full flex items-center gap-4 px-4 py-3 font-medium transition-colors text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-md"
          >
            <LogOut className="h-5 w-5" strokeWidth={2} />
            <span className="text-sm">Logout</span>
          </button>
        </form>
      </nav>

      <div className="px-6 mt-8 space-y-4">
        <button 
          onClick={handleConnect}
          disabled={isConnecting || isConnected}
          className={`w-full font-medium py-3 rounded text-sm transition-colors shadow-sm flex items-center justify-center gap-2 ${
            isConnected 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
              : 'bg-rose-500 hover:bg-rose-600 text-white'
          } disabled:opacity-80`}
        >
          {isConnecting ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Connecting...</>
          ) : isConnected ? (
            <><CheckCircle2 className="h-4 w-4" /> Connected</>
          ) : (
            "Connect to Admin"
          )}
        </button>
        <div className="text-[10px] text-slate-400 leading-tight">
          <p className="text-rose-500 font-medium">Admin Dashboard</p>
          <p>2024 © All rights reserved</p>
        </div>
      </div>
    </aside>
  )
}
