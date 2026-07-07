"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown, MoreVertical, Trash2, Edit } from "lucide-react"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts"

const dailyData = [
  { time: "08:00", red: 400, blue: 250 },
  { time: "02:00", red: 500, blue: 450 },
  { time: "04:00", red: 600, blue: 300 },
  { time: "06:00", red: 750, blue: 400 },
  { time: "08:00", red: 550, blue: 380 },
  { time: "10:00", red: 887, blue: 500 },
  { time: "07:00", red: 700, blue: 300 },
  { time: "09:00", red: 550, blue: 350 },
  { time: "09:00", red: 600, blue: 180 },
  { time: "11:00", red: 500, blue: 300 },
  { time: "10:00", red: 550, blue: 650 },
  { time: "12:00", red: 700, blue: 400 },
]

const monthlyData = [
  { time: "Jan", red: 12000, blue: 8000 },
  { time: "Feb", red: 15000, blue: 10000 },
  { time: "Mar", red: 18000, blue: 12000 },
  { time: "Apr", red: 14000, blue: 11000 },
  { time: "May", red: 22000, blue: 16000 },
  { time: "Jun", red: 25000, blue: 18000 },
  { time: "Jul", red: 21000, blue: 15000 },
  { time: "Aug", red: 28000, blue: 20000 },
  { time: "Sep", red: 30000, blue: 24000 },
  { time: "Oct", red: 27000, blue: 21000 },
  { time: "Nov", red: 35000, blue: 28000 },
  { time: "Dec", red: 40000, blue: 32000 },
]

const donutDataAllTime = [
  { name: "Male", value: 2.17, color: "#1E1B4B" },
  { name: "Female", value: 1.82, color: "#A855F7" },
  { name: "Others", value: 0.24, color: "#06B6D4" },
]

const donutData2024 = [
  { name: "Male", value: 0.85, color: "#1E1B4B" },
  { name: "Female", value: 0.95, color: "#A855F7" },
  { name: "Others", value: 0.10, color: "#06B6D4" },
]

const initialUsersList = [
  { id: 1, name: "Kathryn Murphy", location: "United States", email: "Kathryn@gmail.com", phone: "(201) 555-0123" },
  { id: 2, name: "Jordyn Bator", location: "Canada", email: "Jordyn@gmail.com", phone: "(406) 555-0120" },
  { id: 3, name: "Kripatin Sumpat", location: "Netherland", email: "Sunpat@gmail.com", phone: "(229) 555-0109" },
  { id: 4, name: "Sumpat Sumpat", location: "China", email: "Sunpat@gmail.com", phone: "(302) 555-0105" },
]

const locations = [
  { country: "United States", value: "14056", trend: "+ 5.0%", isUp: true },
  { country: "Canada", value: "8450", trend: "- 2.3%", isUp: false },
  { country: "United Kingdom", value: "6500", trend: "+ 4.1%", isUp: true },
  { country: "Germany", value: "4200", trend: "+ 3.2%", isUp: true },
  { country: "France", value: "1840", trend: "- 1.2%", isUp: false },
  { country: "Switzerland", value: "1231", trend: "+ 3.4%", isUp: true },
  { country: "Netherland", value: "912", trend: "+ 1.5%", isUp: true },
  { country: "United arab emirates", value: "320", trend: "+ 6.2%", isUp: true },
]

export default function DashboardPage() {
  const [chartTab, setChartTab] = useState<"daily" | "monthly">("daily")
  const [audienceFilter, setAudienceFilter] = useState("All Time")
  const [usersList, setUsersList] = useState(initialUsersList)
  const [showAllLocations, setShowAllLocations] = useState(false)
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null)
  const [chartYear, setChartYear] = useState("2024")
  const [usersYear, setUsersYear] = useState("2024")

  const baseLineChartData = chartTab === "daily" ? dailyData : monthlyData
  const yearMultiplier = chartYear === "2024" ? 1 : chartYear === "2023" ? 0.8 : chartYear === "2022" ? 0.6 : 0.4
  const lineChartData = baseLineChartData.map(d => ({
    ...d,
    red: Math.round(d.red * yearMultiplier),
    blue: Math.round(d.blue * yearMultiplier)
  }))

  const donutData = audienceFilter === "All Time" ? donutDataAllTime : donutData2024
  const totalAudience = (donutData.reduce((acc, curr) => acc + curr.value, 0)).toFixed(2)

  const visibleLocations = showAllLocations ? locations : locations.slice(0, 4)

  const handleDeleteUser = (id: number) => {
    setUsersList(usersList.filter(u => u.id !== id))
    setActiveDropdownId(null)
  }

  const filteredUsers = usersList.filter(u => {
    if (usersYear === "2024") return true
    if (usersYear === "2023") return u.id % 2 === 0
    if (usersYear === "2022") return u.id % 2 !== 0
    return u.id === 1
  })

  return (
    <div className="space-y-6 pb-12" onClick={() => setActiveDropdownId(null)}>
      {/* Top Row: KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">New Visitor</p>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">
                +10% <ArrowUp className="h-3 w-3" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">162.9K</h3>
            <p className="text-xs text-slate-400">Total 669.45K Visitors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">Active Users</p>
              <div className="flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">
                -20% <ArrowDown className="h-3 w-3" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">47.23K</h3>
            <p className="text-xs text-slate-400">Total 132.45K Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">New Freelancer</p>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">
                +10% <ArrowUp className="h-3 w-3" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">2.43K</h3>
            <p className="text-xs text-slate-400">Total 23.18K Freelancers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">New Client</p>
              <div className="flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">
                -02% <ArrowDown className="h-3 w-3" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">945</h3>
            <p className="text-xs text-slate-400">Total 6.2K Clients</p>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Daily Visitors</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                  <button 
                    onClick={() => setChartTab("daily")}
                    className={`transition-colors ${chartTab === 'daily' ? 'font-bold text-slate-800' : 'hover:text-slate-700'}`}
                  >
                    Today Vs Yesterday
                  </button>
                  <button 
                    onClick={() => setChartTab("monthly")}
                    className={`transition-colors ${chartTab === 'monthly' ? 'font-bold text-slate-800' : 'hover:text-slate-700'}`}
                  >
                    Monthly Visitors
                  </button>
                </div>
              </div>
              <select 
                value={chartYear}
                onChange={(e) => setChartYear(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-md px-3 py-1 outline-none"
              >
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#f43f5e', color: 'white', borderRadius: '8px', border: 'none', padding: '4px 8px' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Line type="monotone" dataKey="red" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#f43f5e" }} activeDot={{ r: 6, fill: "#f43f5e", stroke: "white" }} />
                  <Line type="monotone" dataKey="blue" stroke="#5c51d2" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Visitor Locations</h3>
              <button 
                onClick={() => setShowAllLocations(!showAllLocations)}
                className="text-xs font-medium text-slate-500 hover:text-[var(--brand)] transition-colors"
              >
                {showAllLocations ? "Show less" : "See all"}
              </button>
            </div>
            <div className="space-y-4">
              {visibleLocations.map((loc) => (
                <div key={loc.country} className="flex justify-between items-center text-sm animate-in fade-in">
                  <span className="text-slate-600">{loc.country}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-slate-800">{loc.value}</span>
                    <span className={`flex items-center gap-1 w-16 justify-end text-xs font-bold ${loc.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {loc.isUp ? <ArrowUp className="h-3 w-3" strokeWidth={3} /> : <ArrowDown className="h-3 w-3" strokeWidth={3} />}
                      {loc.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Users list</h3>
              <select 
                value={usersYear}
                onChange={(e) => setUsersYear(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-md px-3 py-1 outline-none"
              >
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>
            </div>
            <div className="overflow-x-auto min-h-[180px]">
              <table className="w-full text-sm text-left">
                <thead className="text-xs font-bold text-slate-800 bg-white border-b border-slate-100">
                  <tr>
                    <th className="pb-4 font-bold">User Name</th>
                    <th className="pb-4 font-bold">Location</th>
                    <th className="pb-4 font-bold">Email Address</th>
                    <th className="pb-4 font-bold">Mobile Number</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="text-slate-500">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">No users found for this year.</td>
                    </tr>
                  ) : filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
                      <td className="py-3 text-slate-700 font-medium">{user.name}</td>
                      <td className="py-3">{user.location}</td>
                      <td className="py-3">{user.email}</td>
                      <td className="py-3">{user.phone}</td>
                      <td className="py-3 text-right relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveDropdownId(activeDropdownId === user.id ? null : user.id)
                          }}
                          className="text-slate-400 hover:text-slate-800 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {/* Action Dropdown */}
                        {activeDropdownId === user.id && (
                          <div className="absolute right-0 top-10 w-32 bg-white border border-slate-200 rounded-md shadow-lg z-10 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-100">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveDropdownId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <Edit className="h-4 w-4" /> Edit
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Audience</h3>
              <select 
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-md px-3 py-1 outline-none"
              >
                <option>All Time</option>
                <option>2024</option>
              </select>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-[200px] w-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                      animationDuration={800}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-medium">Total</span>
                  <span className="text-2xl font-bold text-slate-800">{totalAudience}M</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                {donutData.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-bold text-slate-500">{item.name}</span>
                    </div>
                    <p className="text-lg font-bold text-slate-800">{item.value}M</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
