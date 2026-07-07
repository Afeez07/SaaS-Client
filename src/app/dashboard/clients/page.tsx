"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, MoreVertical, Plus, ExternalLink, X, Pencil, Trash2, Loader2 } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

type Client = {
  id: number
  name: string
  status: "Active" | "Inactive"
  contact: string
  email: string
  revenue: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    revenue: "",
    status: "Active" as "Active" | "Inactive"
  })

  const supabase = createClient()

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('id', { ascending: false })
      
    if (error) {
      console.error("Fetch Error:", error)
      alert("Error fetching clients: " + error.message)
    } else if (data) {
      setClients(data)
    }
    setLoading(false)
  }

  const openNewModal = () => {
    setFormData({ name: "", contact: "", email: "", revenue: "", status: "Active" })
    setEditingId(null)
    setIsModalOpen(true)
  }

  const openEditModal = (client: Client) => {
    setFormData({ 
      name: client.name, 
      contact: client.contact, 
      email: client.email, 
      revenue: client.revenue, 
      status: client.status 
    })
    setEditingId(client.id)
    setIsModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (error) {
      alert("Error deleting: " + error.message)
    } else {
      setClients(clients.filter(c => c.id !== id))
    }
    setOpenMenuId(null)
  }

  const handleSave = async () => {
    if (!formData.name.trim()) return
    setIsSaving(true)

    if (editingId) {
      const { data, error } = await supabase
        .from('clients')
        .update(formData)
        .eq('id', editingId)
        .select()
        .single()
        
      if (error) {
        alert("Error updating: " + error.message)
      } else if (data) {
        setClients(clients.map(c => c.id === editingId ? data : c))
        setIsModalOpen(false)
      }
    } else {
      const { data, error } = await supabase
        .from('clients')
        .insert([formData])
        .select()
        .single()
        
      if (error) {
        alert("Error creating: " + error.message)
      } else if (data) {
        setClients([data, ...clients])
        setIsModalOpen(false)
      }
    }
    
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 pb-12 relative" onClick={() => setOpenMenuId(null)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Clients</h2>
        <button 
          onClick={(e) => { e.stopPropagation(); openNewModal(); }}
          className="flex items-center gap-2 bg-[var(--brand)] hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" /> New Client
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--brand)]" />
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          No clients found. Click "New Client" to create one or run the SQL setup script.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[var(--brand)]">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{client.name}</h3>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${client.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {client.status}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === client.id ? null : client.id) }}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    {openMenuId === client.id && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-slate-100 py-1 z-10">
                        <button 
                          onClick={(e) => { e.stopPropagation(); openEditModal(client) }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Pencil className="h-4 w-4" /> Edit
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(client.id) }}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 border-t border-slate-50 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Contact</span>
                    <span className="font-medium text-slate-800">{client.contact}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Email</span>
                    <a href={`mailto:${client.email}`} className="font-medium text-[var(--brand)] flex items-center gap-1 hover:underline">
                      {client.email} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total Revenue</span>
                    <span className="font-bold text-slate-800">
                      {(() => {
                        const cleaned = client.revenue.replace(/[\$,]/g, '').trim()
                        const num = Number(cleaned)
                        if (!isNaN(num) && cleaned !== '') {
                          return new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                          }).format(num)
                        }
                        return client.revenue
                      })()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Client' : 'Add New Client'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Company Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Contact Person</label>
                <input 
                  type="text" 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Revenue</label>
                  <input 
                    type="text" 
                    placeholder="$0"
                    value={formData.revenue}
                    onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Active" | "Inactive"})}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={!formData.name.trim() || isSaving}
                className="flex items-center justify-center w-full bg-[var(--brand)] hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors mt-4"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : (editingId ? 'Save Changes' : 'Create Client')}
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
