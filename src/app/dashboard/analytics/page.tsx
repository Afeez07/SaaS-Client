"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUp, ArrowDown, Activity, Users, MousePointerClick } from "lucide-react"

type TimePeriod = "Last 7 Days" | "This Month" | "This Year"

const dataSets = {
  "Last 7 Days": {
    chart: [
      { name: "Mon", revenue: 400, expenses: 240 },
      { name: "Tue", revenue: 300, expenses: 139 },
      { name: "Wed", revenue: 200, expenses: 980 },
      { name: "Thu", revenue: 278, expenses: 390 },
      { name: "Fri", revenue: 189, expenses: 480 },
      { name: "Sat", revenue: 239, expenses: 380 },
      { name: "Sun", revenue: 349, expenses: 430 },
    ],
    kpis: {
      conversion: "3.8%", bounce: "42.3%", session: "2m 45s",
      conversionTrend: "+1.2%", bounceTrend: "+5.4%", sessionTrend: "+12s",
      conversionIsUp: true, bounceIsUp: true, sessionIsUp: true,
    }
  },
  "This Month": {
    chart: [
      { name: "Week 1", revenue: 4000, expenses: 2400 },
      { name: "Week 2", revenue: 3000, expenses: 1398 },
      { name: "Week 3", revenue: 2000, expenses: 9800 },
      { name: "Week 4", revenue: 2780, expenses: 3908 },
    ],
    kpis: {
      conversion: "4.1%", bounce: "39.1%", session: "3m 12s",
      conversionTrend: "+0.8%", bounceTrend: "-3.2%", sessionTrend: "+25s",
      conversionIsUp: true, bounceIsUp: false, sessionIsUp: true,
    }
  },
  "This Year": {
    chart: [
      { name: "Jan", revenue: 40000, expenses: 24000 },
      { name: "Feb", revenue: 30000, expenses: 13980 },
      { name: "Mar", revenue: 20000, expenses: 98000 },
      { name: "Apr", revenue: 27800, expenses: 39080 },
      { name: "May", revenue: 18900, expenses: 48000 },
      { name: "Jun", revenue: 23900, expenses: 38000 },
      { name: "Jul", revenue: 34900, expenses: 43000 },
      { name: "Aug", revenue: 45000, expenses: 32000 },
      { name: "Sep", revenue: 51000, expenses: 41000 },
      { name: "Oct", revenue: 62000, expenses: 39000 },
      { name: "Nov", revenue: 58000, expenses: 45000 },
      { name: "Dec", revenue: 75000, expenses: 50000 },
    ],
    kpis: {
      conversion: "4.5%", bounce: "35.2%", session: "4m 05s",
      conversionTrend: "+2.1%", bounceTrend: "-8.4%", sessionTrend: "+1m 20s",
      conversionIsUp: true, bounceIsUp: false, sessionIsUp: true,
    }
  }
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<TimePeriod>("Last 7 Days")
  const currentData = dataSets[period]

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Analytics Overview</h2>
        <select 
          className="bg-white border border-slate-200 text-sm rounded-md px-3 py-2 outline-none"
          value={period}
          onChange={(e) => setPeriod(e.target.value as TimePeriod)}
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[var(--brand-light)] flex items-center justify-center text-[var(--brand)]">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Conversion Rate</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-slate-800">{currentData.kpis.conversion}</h3>
                <span className={`text-xs font-bold flex items-center mb-1 ${currentData.kpis.conversionIsUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {currentData.kpis.conversionTrend} {currentData.kpis.conversionIsUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <MousePointerClick className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Bounce Rate</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-slate-800">{currentData.kpis.bounce}</h3>
                <span className={`text-xs font-bold flex items-center mb-1 ${currentData.kpis.bounceIsUp ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {currentData.kpis.bounceTrend} {currentData.kpis.bounceIsUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Session Duration</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-slate-800">{currentData.kpis.session}</h3>
                <span className={`text-xs font-bold flex items-center mb-1 ${currentData.kpis.sessionIsUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {currentData.kpis.sessionTrend} {currentData.kpis.sessionIsUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue vs Expenses</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.chart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="revenue" fill="var(--brand)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
