"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react"
import { sendContactEmail } from "./actions"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    // Call the server action to send via Resend
    const result = await sendContactEmail(formData)
    
    setIsSubmitting(false)
    
    if (result.success) {
      setIsSubmitted(true)
    } else {
      alert("Failed to send message: " + result.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF9F1] flex flex-col font-sans text-slate-900 selection:bg-purple-200">
      
      {/* Navbar Minimal */}
      <header className="flex items-center px-6 md:px-12 py-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full border-[1.5px] border-slate-900 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-[2px]" />
          </div>
          <span className="font-extrabold text-base tracking-[0.1em] uppercase text-slate-900">Demola AI</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl bg-white rounded-[2rem] border-[1.5px] border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Contact Form */}
          <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-200">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-purple-600 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            
            <h1 className="text-4xl font-black tracking-tighter text-[#222] mb-2">Get in touch</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Interested in our Enterprise plan or have a question? Fill out the form below and our team will get back to you shortly.
            </p>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 px-6 animate-in fade-in zoom-in duration-500 bg-emerald-50 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Message Sent!</h3>
                <p className="text-emerald-700">
                  Thanks for reaching out! We've forwarded your message to afeez.onabekun@gmail.com and will be in touch shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-xs font-extrabold tracking-widest uppercase text-slate-700">First Name</label>
                    <input type="text" name="firstName" id="firstName" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-xs font-extrabold tracking-widest uppercase text-slate-700">Last Name</label>
                    <input type="text" name="lastName" id="lastName" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-extrabold tracking-widest uppercase text-slate-700">Work Email</label>
                  <input type="email" name="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none" placeholder="jane@company.com" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-extrabold tracking-widest uppercase text-slate-700">Message</label>
                  <textarea id="message" name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none" placeholder="How can we help you?" />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-purple-600 text-white text-sm font-extrabold tracking-widest uppercase hover:bg-purple-700 hover:shadow-lg transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Right Side: Contact Details */}
          <div className="w-full md:w-[400px] bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-black tracking-tighter mb-8 text-white">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-widest uppercase text-slate-400 mb-1">Email Us</h3>
                  <a href="mailto:afeez.onabekun@gmail.com" className="text-lg font-bold hover:text-purple-400 transition-colors">
                    afeez.onabekun@gmail.com
                  </a>
                  <p className="text-slate-400 text-sm mt-1">We'll respond within 24 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-purple-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-widest uppercase text-slate-400 mb-1">Call Us</h3>
                  <a href="tel:+15551234567" className="text-lg font-bold hover:text-purple-400 transition-colors">
                    +1 (555) 123-4567
                  </a>
                  <p className="text-slate-400 text-sm mt-1">Mon-Fri from 9am to 6pm PST.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-widest uppercase text-slate-400 mb-1">Headquarters</h3>
                  <p className="text-lg font-bold leading-snug">
                    123 Analytics Way<br />
                    Suite 400<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
    </div>
  )
}
