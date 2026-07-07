"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Inbox, Send, File, Trash2, Star, MoreVertical, ArrowLeft, X } from "lucide-react"

type FolderType = 'inbox' | 'sent' | 'drafts' | 'trash'

type Email = {
  id: number
  folder: FolderType
  sender: string
  recipient: string
  subject: string
  preview: string
  body: string
  time: string
  unread: boolean
  starred: boolean
}

const initialEmails: Email[] = [
  { id: 1, folder: 'inbox', sender: "Kathryn Murphy", recipient: "me@wedzine.com", subject: "Project Update: Q3 Deliverables", preview: "Hi team, I've attached the latest wireframes for the...", body: "Hi team,\n\nI've attached the latest wireframes for the Q3 deliverables. Please review them before our sync tomorrow.\n\nBest,\nKathryn", time: "10:30 AM", unread: true, starred: false },
  { id: 2, folder: 'inbox', sender: "Jordyn Bator", recipient: "me@wedzine.com", subject: "Invoice #1024", preview: "Please find attached the invoice for the last month of...", body: "Hello,\n\nPlease find attached the invoice for the last month of our contract. Let me know if you have any questions.\n\nThanks,\nJordyn", time: "Yesterday", unread: true, starred: true },
  { id: 3, folder: 'inbox', sender: "Kripatin Sumpat", recipient: "me@wedzine.com", subject: "Meeting Notes", preview: "Thanks everyone for the great sync today. As discussed...", body: "Thanks everyone for the great sync today. As discussed, we will be moving forward with the new analytics dashboard.\n\nCheers,\nKripatin", time: "Aug 12", unread: false, starred: false },
  { id: 4, folder: 'inbox', sender: "Sumpat Sumpat", recipient: "me@wedzine.com", subject: "Welcome to the team!", preview: "We are so excited to have you on board. Here is a quick...", body: "We are so excited to have you on board. Here is a quick overview of what to expect in your first week.", time: "Aug 10", unread: false, starred: false },
  { id: 5, folder: 'sent', sender: "Me", recipient: "Audin Rushow", subject: "Design System V2", preview: "The new design tokens have been published to Figma...", body: "Hi Audin,\n\nThe new design tokens have been published to Figma. Take a look and let me know your thoughts.\n\nThanks!", time: "Aug 05", unread: false, starred: false },
]

export default function MailPage() {
  const [emails, setEmails] = useState<Email[]>(initialEmails)
  const [activeFolder, setActiveFolder] = useState<FolderType>('inbox')
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Compose State
  const [composeTo, setComposeTo] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeBody, setComposeBody] = useState("")

  const filteredEmails = emails.filter(email => 
    email.folder === activeFolder &&
    (email.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
     email.sender.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const unreadCount = emails.filter(e => e.folder === 'inbox' && e.unread).length

  const handleSend = () => {
    if (!composeTo || !composeSubject) return
    const newEmail: Email = {
      id: Date.now(),
      folder: 'sent',
      sender: "Me",
      recipient: composeTo,
      subject: composeSubject,
      preview: composeBody.substring(0, 50) + "...",
      body: composeBody,
      time: "Just now",
      unread: false,
      starred: false
    }
    setEmails([newEmail, ...emails])
    setIsComposing(false)
    setComposeTo("")
    setComposeSubject("")
    setComposeBody("")
    setActiveFolder('sent')
    setSelectedEmail(null)
  }

  const handleOpenEmail = (email: Email) => {
    if (email.unread) {
      setEmails(emails.map(e => e.id === email.id ? { ...e, unread: false } : e))
    }
    setSelectedEmail({ ...email, unread: false })
  }

  const handleDelete = (id: number) => {
    setEmails(emails.map(e => e.id === id ? { ...e, folder: 'trash' } : e))
    setSelectedEmail(null)
  }

  const toggleStar = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setEmails(emails.map(email => email.id === id ? { ...email, starred: !email.starred } : email))
  }

  return (
    <div className="h-[calc(100vh-8rem)] pb-6 relative">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Mail</h2>
      
      <Card className="h-full flex overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-100 bg-slate-50/50 flex flex-col hidden md:flex">
          <div className="p-4">
            <button 
              onClick={() => setIsComposing(true)}
              className="w-full bg-[var(--brand)] hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-colors shadow-sm"
            >
              Compose
            </button>
          </div>
          <div className="flex-1 py-2">
            <div className="px-3 space-y-1">
              <button 
                onClick={() => { setActiveFolder('inbox'); setSelectedEmail(null) }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium text-sm transition-colors ${activeFolder === 'inbox' ? 'bg-indigo-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="h-4 w-4" /> Inbox
                </div>
                {unreadCount > 0 && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{unreadCount}</span>}
              </button>
              <button 
                onClick={() => { setActiveFolder('sent'); setSelectedEmail(null) }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${activeFolder === 'sent' ? 'bg-indigo-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Send className="h-4 w-4" /> Sent
              </button>
              <button 
                onClick={() => { setActiveFolder('drafts'); setSelectedEmail(null) }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${activeFolder === 'drafts' ? 'bg-indigo-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <File className="h-4 w-4" /> Drafts
              </button>
              <button 
                onClick={() => { setActiveFolder('trash'); setSelectedEmail(null) }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${activeFolder === 'trash' ? 'bg-indigo-50 text-[var(--brand)]' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Trash2 className="h-4 w-4" /> Trash
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {selectedEmail ? (
            /* Email Read View */
            <div className="flex-1 flex flex-col overflow-y-auto">
              <div className="border-b border-slate-100 p-4 flex items-center justify-between bg-white sticky top-0 z-10">
                <button 
                  onClick={() => setSelectedEmail(null)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[var(--brand)] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to {activeFolder}
                </button>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(selectedEmail.id)} className="p-2 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-50 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-8 max-w-3xl">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">{selectedEmail.subject}</h1>
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-[var(--brand)] font-bold">
                      {selectedEmail.sender.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{selectedEmail.sender}</div>
                      <div className="text-xs text-slate-500">to {selectedEmail.recipient}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">{selectedEmail.time}</div>
                </div>
                <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedEmail.body}
                </div>
              </div>
            </div>
          ) : (
            /* Email List View */
            <>
              <div className="border-b border-slate-100 p-4 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search mail..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-[var(--brand)] transition-colors"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredEmails.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <Inbox className="h-12 w-12 mb-4 opacity-20" />
                    <p>No emails in {activeFolder}</p>
                  </div>
                ) : (
                  filteredEmails.map((email) => (
                    <div 
                      key={email.id} 
                      className={`flex items-start gap-4 p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${email.unread ? 'bg-indigo-50/30' : ''}`}
                      onClick={() => handleOpenEmail(email)}
                    >
                      <div className="mt-1 w-2 flex-shrink-0">
                        <div className={`h-2 w-2 rounded-full ${email.unread ? 'bg-[var(--brand)]' : 'bg-transparent'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm ${email.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                            {email.sender}
                          </span>
                          <span className="text-xs text-slate-400">{email.time}</span>
                        </div>
                        <h4 className={`text-sm mb-1 truncate ${email.unread ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>
                          {email.subject}
                        </h4>
                        <p className="text-sm text-slate-500 truncate">{email.preview}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Star 
                          className={`h-4 w-4 hover:text-amber-400 transition-colors ${email.starred ? 'fill-amber-400 text-amber-400' : ''}`} 
                          onClick={(e) => toggleStar(e, email.id)}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Compose Modal */}
        {isComposing && (
          <div className="absolute bottom-0 right-8 w-[500px] h-[500px] bg-white rounded-t-xl shadow-2xl border border-slate-200 flex flex-col z-50">
            <div className="bg-slate-800 text-white p-3 rounded-t-xl flex justify-between items-center">
              <span className="font-medium text-sm">New Message</span>
              <button onClick={() => setIsComposing(false)} className="text-slate-300 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 flex flex-col p-4">
              <div className="border-b border-slate-100 pb-2 mb-2">
                <input 
                  type="email" 
                  placeholder="To" 
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full text-sm outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="border-b border-slate-100 pb-2 mb-4">
                <input 
                  type="text" 
                  placeholder="Subject" 
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full text-sm font-medium outline-none placeholder:text-slate-400"
                />
              </div>
              <textarea 
                className="flex-1 w-full text-sm outline-none resize-none" 
                placeholder="Write something..."
                value={composeBody}
                onChange={(e) => setComposeBody(e.target.value)}
              ></textarea>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <button className="text-slate-400 hover:text-rose-500 transition-colors p-2" onClick={() => setIsComposing(false)}>
                  <Trash2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!composeTo || !composeSubject}
                  className="bg-[var(--brand)] hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm flex items-center gap-2"
                >
                  Send <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
