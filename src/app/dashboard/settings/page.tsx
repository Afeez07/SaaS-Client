"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Bell, Shield, Key, Save, CheckCircle2, Lock, Copy } from "lucide-react"

type TabType = "profile" | "notifications" | "security" | "api"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@wedzine.com",
    phone: "+1 (555) 000-0000",
    newsletter: true,
    weeklyReports: false
  })

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 800)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Personal Information</h3>
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
                  <div className="h-20 w-20 rounded-full bg-slate-200 overflow-hidden relative group cursor-pointer">
                    <img src="https://i.pravatar.cc/150?u=admin" alt="Profile" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">Edit</span>
                    </div>
                  </div>
                  <div>
                    <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium py-2 px-4 rounded-md text-sm transition-colors shadow-sm">
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">Email Newsletter</h4>
                      <p className="text-sm text-slate-500">Get updates on new features and announcements.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={formData.newsletter}
                        onChange={e => setFormData({...formData, newsletter: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand)]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">Weekly Reports</h4>
                      <p className="text-sm text-slate-500">Receive weekly analytical reports to your inbox.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={formData.weeklyReports}
                        onChange={e => setFormData({...formData, weeklyReports: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand)]"></div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )
      case "notifications":
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Notification Settings</h3>
              <p className="text-sm text-slate-500 mb-6">Manage how you receive alerts and notifications.</p>
              
              <div className="space-y-6">
                {['Push Notifications', 'Email Alerts', 'SMS Alerts', 'New Client Alerts'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                    <span className="font-medium text-slate-800">{item}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand)]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      case "security":
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-slate-400" /> Password & Security
              </h3>
              
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors" />
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors mt-2">
                  Update Password
                </button>
              </div>
            </CardContent>
          </Card>
        )
      case "api":
        return (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">API Keys</h3>
                <button className="bg-[var(--brand)] hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors">
                  Generate New Key
                </button>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-800 text-sm">Production Key</h4>
                  <div className="text-xs font-mono text-slate-500 mt-1">pk_live_**********************</div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-2"><Copy className="h-4 w-4" /></button>
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-md flex items-center gap-2 mb-4 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium text-sm">Settings saved successfully!</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Account Settings</h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[var(--brand)] hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors shadow-sm"
        >
          <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium text-sm transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <User className="h-4 w-4" /> Profile
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium text-sm transition-colors ${activeTab === 'notifications' ? 'bg-indigo-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium text-sm transition-colors ${activeTab === 'security' ? 'bg-indigo-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Shield className="h-4 w-4" /> Security
          </button>
          <button 
            onClick={() => setActiveTab("api")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-medium text-sm transition-colors ${activeTab === 'api' ? 'bg-indigo-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Key className="h-4 w-4" /> API Keys
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
