"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageSquare, Trash2, CornerDownRight, X, Send } from "lucide-react"

type Review = {
  id: number
  author: string
  date: string
  rating: number
  content: string
  adminReply?: string
}

const initialReviews: Review[] = [
  { id: 1, author: "Alex Johnson", date: "Aug 14, 2024", rating: 5, content: "Absolutely love this platform. It has completely transformed the way my team manages our digital assets. Highly recommended!" },
  { id: 2, author: "Maria Garcia", date: "Aug 10, 2024", rating: 4, content: "Great tool with a lot of potential. The UI is clean and intuitive. However, I wish there were more integration options available out of the box." },
  { id: 3, author: "James Wilson", date: "Aug 02, 2024", rating: 5, content: "Customer support is top-notch. I ran into a minor billing issue and it was resolved within minutes. The app itself is flawless." },
  { id: 4, author: "Linda Martinez", date: "Jul 28, 2024", rating: 3, content: "It's decent, but occasionally suffers from slow loading times on the analytics dashboard. If they fix performance, it'd be a solid 5 stars." },
  { id: 5, author: "Robert Chen", date: "Jul 15, 2024", rating: 5, content: "Best in class. We switched from a competitor last month and the difference is night and day. Setup was a breeze." },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [replyingToId, setReplyingToId] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : "0.0"
  
  const totalReviews = reviews.length

  const getPercentage = (stars: number) => {
    if (totalReviews === 0) return 0
    return Math.round((reviews.filter(r => r.rating === stars).length / totalReviews) * 100)
  }

  const handleReplySubmit = (id: number) => {
    if (!replyText.trim()) return
    setReviews(reviews.map(r => r.id === id ? { ...r, adminReply: replyText } : r))
    setReplyingToId(null)
    setReplyText("")
  }

  const handleDelete = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id))
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Customer Reviews</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <h1 className="text-6xl font-bold text-slate-800 mb-2">{averageRating}</h1>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-5 w-5 ${star <= Math.round(Number(averageRating)) ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
                ))}
              </div>
              <p className="text-sm text-slate-500 mb-8">Based on {totalReviews} reviews</p>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const percent = getPercentage(stars)
                  return (
                    <div key={stars} className="flex items-center gap-3 text-sm">
                      <span className="w-12 text-slate-600 font-medium">{stars} Stars</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span className="w-8 text-right text-slate-500">{percent}%</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List Column */}
        <div className="lg:col-span-2 space-y-4">
          {reviews.length === 0 ? (
            <Card className="p-12 text-center text-slate-400">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No reviews found.</p>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardContent className="p-6 relative group">
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex justify-between items-start mb-4 pr-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-[var(--brand)] font-bold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{review.author}</h4>
                        <span className="text-xs text-slate-500">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                    "{review.content}"
                  </p>

                  {review.adminReply ? (
                    <div className="bg-slate-50 rounded-lg p-4 mt-4 ml-6 border-l-2 border-[var(--brand)]">
                      <div className="flex items-center gap-2 mb-2">
                        <CornerDownRight className="h-4 w-4 text-[var(--brand)]" />
                        <span className="font-bold text-xs text-slate-800">You replied</span>
                      </div>
                      <p className="text-sm text-slate-600 pl-6">{review.adminReply}</p>
                    </div>
                  ) : replyingToId === review.id ? (
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <div className="flex gap-2">
                        <textarea 
                          autoFocus
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply here..."
                          className="flex-1 min-h-[80px] p-3 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-[var(--brand)] resize-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button 
                          onClick={() => { setReplyingToId(null); setReplyText(""); }}
                          className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleReplySubmit(review.id)}
                          disabled={!replyText.trim()}
                          className="px-4 py-2 text-sm bg-[var(--brand)] hover:bg-indigo-700 disabled:opacity-50 text-white rounded-md flex items-center gap-2 transition-colors"
                        >
                          Send Reply <Send className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { setReplyingToId(review.id); setReplyText(""); }}
                      className="text-xs font-medium text-slate-500 hover:text-[var(--brand)] flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare className="h-3 w-3" /> Reply
                    </button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
