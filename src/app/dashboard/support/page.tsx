"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Trash2, MessageSquare } from "lucide-react"
import { useData } from "@/lib/DataContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SupportTicket } from "@/types"

export default function SupportPage() {
  const { supportTickets, deleteSupportTicket, addCommentToTicket } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [newComment, setNewComment] = useState("")

  const filteredTickets = supportTickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Support</h2>
        <Button asChild>
          <Link href="/support/new">
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Link>
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search support tickets..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTickets.map((ticket) => (
          <Sheet key={ticket.id}>
            <SheetTrigger asChild>
              <div 
                onClick={() => {
                  setSelectedTicket(ticket)
                  setNewComment("")
                }}
                className="cursor-pointer transition-transform hover:-translate-y-1"
              >
                <Card className="h-full relative overflow-hidden">
                  {ticket.active && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--brand)]" />
                  )}
                  <CardContent className="p-6 flex justify-between items-start">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{ticket.category}</p>
                      <p className="text-sm font-bold text-slate-800">{ticket.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-medium">{ticket.date}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[var(--brand)]">
                        <MessageSquare className="h-3 w-3" />
                        <span className="text-xs font-bold">{ticket.comments.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetTrigger>

            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{selectedTicket?.title}</SheetTitle>
                <SheetDescription>{selectedTicket?.category}</SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-8">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Comments</h4>
                  <div className="space-y-4 mb-4">
                    {selectedTicket?.comments.map(comment => (
                      <div key={comment.id} className="bg-slate-50 border border-slate-100 p-3 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-bold text-slate-900">{comment.author}</span>
                          <span className="text-xs text-slate-400">{comment.date}</span>
                        </div>
                        <p className="text-sm text-slate-600">{comment.text}</p>
                      </div>
                    ))}
                    {selectedTicket?.comments.length === 0 && (
                      <p className="text-sm text-slate-500 italic">No comments yet.</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a comment..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && selectedTicket && newComment.trim()) {
                          addCommentToTicket(selectedTicket.id, newComment)
                          setNewComment("")
                          // Update selected ticket so UI reflects new comment
                          setSelectedTicket(prev => prev ? {
                            ...prev, 
                            comments: [...prev.comments, { id: 'temp', text: newComment, author: 'You', date: 'Just now' }]
                          } : null)
                        }
                      }}
                    />
                    <Button 
                      onClick={() => {
                        if (selectedTicket && newComment.trim()) {
                          addCommentToTicket(selectedTicket.id, newComment)
                          setNewComment("")
                          setSelectedTicket(prev => prev ? {
                            ...prev, 
                            comments: [...prev.comments, { id: 'temp', text: newComment, author: 'You', date: 'Just now' }]
                          } : null)
                        }
                      }}
                    >
                      Post
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => {
                      if (selectedTicket) deleteSupportTicket(selectedTicket.id)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Ticket
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ))}
        {filteredTickets.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
            No support tickets found. Try adjusting your search or create a new one.
          </div>
        )}
      </div>
    </div>
  )
}
