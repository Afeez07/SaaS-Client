"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, MoreVertical, UserPlus, Shield, User, PenTool, X, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

type Role = "Admin" | "Editor" | "User"

type UserData = {
  id: number
  name: string
  email: string
  location: string
  role: Role
  lastLogin: string
  avatar: string
  status: "online" | "offline"
}

const initialUsers: UserData[] = [
  { id: 1, name: "Arlene McCoy", email: "arlene@example.com", location: "Beijing", role: "Admin", lastLogin: "2 mins ago", avatar: "https://i.pravatar.cc/150?u=1", status: "online" },
  { id: 2, name: "Eleanor Pena", email: "eleanor@example.com", location: "France", role: "User", lastLogin: "1 day ago", avatar: "https://i.pravatar.cc/150?u=2", status: "offline" },
  { id: 3, name: "Wade Warren", email: "wade@example.com", location: "London", role: "Editor", lastLogin: "5 hrs ago", avatar: "https://i.pravatar.cc/150?u=3", status: "online" },
  { id: 4, name: "Jacob Jones", email: "jacob@example.com", location: "Tokyo", role: "User", lastLogin: "Just now", avatar: "https://i.pravatar.cc/150?u=4", status: "online" },
  { id: 5, name: "Dianne Russell", email: "dianne@example.com", location: "New York", role: "Editor", lastLogin: "2 days ago", avatar: "https://i.pravatar.cc/150?u=5", status: "offline" },
  { id: 6, name: "Ralph Edwards", email: "ralph@example.com", location: "Berlin", role: "User", lastLogin: "10 mins ago", avatar: "https://i.pravatar.cc/150?u=6", status: "online" },
]

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<Role | "All">("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    role: "User" as Role
  })

  const filteredUsers = users.filter(user => 
    (filterRole === "All" || user.role === filterRole) &&
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const openNewModal = () => {
    setFormData({ name: "", email: "", location: "", role: "User" })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const openEditModal = (user: UserData) => {
    setFormData({ name: user.name, email: user.email, location: user.location, role: user.role })
    setEditingId(user.id)
    setIsModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
    setOpenMenuId(null)
  }

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) return

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u))
    } else {
      const newUser: UserData = {
        id: Date.now(),
        ...formData,
        lastLogin: "Never",
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        status: "offline"
      }
      setUsers([newUser, ...users])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6 pb-12" onClick={() => { setOpenMenuId(null); setIsFilterOpen(false) }}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Users Directory</h2>
        <button 
          onClick={(e) => { e.stopPropagation(); openNewModal() }}
          className="flex items-center gap-2 bg-[var(--brand)] hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors shadow-sm"
        >
          <UserPlus className="h-4 w-4" /> Invite User
        </button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
            />
          </div>
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFilterOpen(!isFilterOpen) }}
              className={`flex items-center gap-2 border font-medium py-2 px-4 rounded-md text-sm transition-colors ${filterRole !== 'All' ? 'bg-indigo-50 border-indigo-200 text-[var(--brand)]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Filter className="h-4 w-4" /> {filterRole === 'All' ? 'Filter' : filterRole}
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg border border-slate-100 py-1 z-20">
                <button onClick={() => setFilterRole("All")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">All Roles</button>
                <button onClick={() => setFilterRole("Admin")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Admin</button>
                <button onClick={() => setFilterRole("Editor")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Editor</button>
                <button onClick={() => setFilterRole("User")} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">User</button>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image src={user.avatar} alt={user.name} width={36} height={36} className="rounded-full" unoptimized />
                          <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        </div>
                        <span className="font-bold text-slate-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
                        ${user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 
                          user.role === 'Editor' ? 'bg-amber-100 text-amber-700' : 
                          'bg-slate-100 text-slate-600'}`}
                      >
                        {user.role === 'Admin' && <Shield className="h-3 w-3" />}
                        {user.role === 'Editor' && <PenTool className="h-3 w-3" />}
                        {user.role === 'User' && <User className="h-3 w-3" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === user.id ? null : user.id) }}
                          className="text-slate-400 hover:text-slate-600 p-1"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === user.id && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-slate-100 py-1 z-20">
                            <button 
                              onClick={(e) => { e.stopPropagation(); openEditModal(user) }}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Pencil className="h-4 w-4" /> Edit
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDelete(user.id) }}
                              className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit User' : 'Invite New User'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Full Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as Role})}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                  >
                    <option value="User">User</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={!formData.name.trim() || !formData.email.trim()}
                className="w-full bg-[var(--brand)] hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors mt-4"
              >
                {editingId ? 'Save Changes' : 'Send Invite'}
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
