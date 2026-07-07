import Link from "next/link"
import { ArrowRight, User, Phone, ArrowDown } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDF9F1] flex flex-col font-sans text-slate-900 selection:bg-purple-200">
      
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-[1.5px] border-slate-900 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-[2px]" />
          </div>
          <span className="font-extrabold text-base tracking-[0.1em] uppercase text-slate-900">Demola AI</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12 text-sm font-extrabold tracking-[0.1em] text-slate-600">
          <Link href="#how-it-works" className="hover:text-purple-600 transition-colors">HOW IT WORKS</Link>
          <Link href="#use-cases" className="hover:text-purple-600 transition-colors">USE CASES</Link>
          <Link href="#features" className="hover:text-purple-600 transition-colors">FEATURES</Link>
          <Link href="#pricing" className="hover:text-purple-600 transition-colors">PRICING</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="w-10 h-10 rounded-full border-[1.5px] border-slate-300 flex items-center justify-center text-slate-700 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all font-bold shadow-sm"
            title="Sign In"
          >
            <User className="w-4 h-4" />
          </Link>
          <Link 
            href="/signup" 
            className="px-6 py-2.5 rounded-full border-[1.5px] border-slate-300 text-xs font-extrabold tracking-[0.15em] uppercase text-slate-800 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-20 relative max-w-7xl mx-auto w-full gap-12">
        
        {/* Left Column (Text & Buttons) */}
        <div className="flex-1 flex flex-col items-start max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#222] leading-[1.05] mb-8">
            Real-time <br />
            analytics for <br />
            your business
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
            Demola AI tracks your visitors, analyzes demographics, and provides actionable insights to help you scale your business globally.
          </p>

          {/* Buttons (using previous design style as requested) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link 
              href="/signup" 
              className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Start for free
            </Link>
            <Link 
              href="/contact" 
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-medium text-slate-800 border border-slate-300 hover:border-slate-500 hover:bg-slate-50 transition-all"
            >
              I need help
              <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <ArrowRight className="w-3 h-3 -rotate-45" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column (Video) */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Decorative background for the video */}
            <div className="absolute inset-0 bg-slate-200 rounded-[2rem] md:rounded-[3rem] transform rotate-3 scale-105 opacity-50" />
            
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white bg-white aspect-[4/5]">
              <video 
                src="/hero_header_video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

      </main>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white w-full border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#222] mb-4">How it works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Three simple steps to transform raw traffic into actionable intelligence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Install", desc: "Add our lightweight tracking snippet to your website in less than two minutes.", step: "01" },
              { title: "Track", desc: "Monitor daily visitors, active users, and audience demographics in real-time.", step: "02" },
              { title: "Grow", desc: "Use actionable data and geographic insights to optimize your global campaigns.", step: "03" }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 group-hover:bg-purple-100 transition-all">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 px-6 md:px-12 bg-[#FDF9F1] w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#222] mb-4">Built for every team</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Whether you're running marketing campaigns or building products, we've got you covered.</p>
          </div>
          
          <div className="space-y-24">
            {/* Sales */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 space-y-6">
                <div className="text-sm font-extrabold tracking-widest text-purple-600 uppercase">For Marketing Teams</div>
                <h3 className="text-4xl font-black tracking-tighter">Understand campaign performance instantly.</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Get live metrics on new visitors, active users, and track your daily and monthly growth trends. See exactly where your traffic is spiking in real-time.
                </p>
              </div>
              <div className="flex-1 w-full rounded-[2rem] border-[6px] border-white shadow-2xl overflow-hidden relative group">
                <img src="/marketing_mockup.png" alt="Marketing Dashboard" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            
            {/* Product */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
              <div className="flex-1 space-y-6">
                <div className="text-sm font-extrabold tracking-widest text-orange-500 uppercase">For Product Teams</div>
                <h3 className="text-4xl font-black tracking-tighter">Know exactly who your users are.</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Break down your audience demographics by gender, location, and device. Manage your user list and segment data by specific geographic regions.
                </p>
              </div>
              <div className="flex-1 w-full rounded-[2rem] border-[6px] border-white shadow-2xl overflow-hidden relative group">
                <img src="/audience_mockup.png" alt="Audience Dashboard" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 bg-slate-900 text-white w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Everything you need</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Powerful features packed into a beautifully simple interface.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Real-time Metrics", desc: "Lightning fast and highly accurate dashboard data." },
              { title: "Audience Demographics", desc: "Know exactly who your active users are." },
              { title: "Global Geography", desc: "Understand regional performance globally." },
              { title: "User Management", desc: "Keep track of clients and freelancers easily." }
            ].map((f, i) => (
              <div key={i} className="bg-slate-800 rounded-3xl p-8 hover:bg-slate-700 transition-colors">
                <div className="w-12 h-12 rounded-full bg-slate-700 mb-6" />
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 md:px-12 bg-white w-full border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#222] mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Start for free, upgrade when you need more power.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="rounded-[2rem] border border-slate-200 p-8 hover:shadow-xl transition-shadow bg-slate-50">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <div className="text-4xl font-black mb-6">Free</div>
              <ul className="space-y-4 mb-8 text-slate-600">
                <li>✓ 10k monthly visitors</li>
                <li>✓ Basic dashboards</li>
                <li>✓ 30-day data retention</li>
              </ul>
              <Link href="/signup" className="block text-center w-full py-4 rounded-full border-[1.5px] border-slate-300 text-sm font-extrabold tracking-[0.1em] uppercase text-slate-800 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all shadow-sm">Get Started</Link>
            </div>
            {/* Pro */}
            <div className="rounded-[2rem] border-2 border-purple-500 p-8 shadow-2xl relative bg-white transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-black mb-6">$29<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-slate-600">
                <li>✓ 100k monthly visitors</li>
                <li>✓ Advanced demographics</li>
                <li>✓ Unlimited data history</li>
                <li>✓ Export to CSV/PDF</li>
              </ul>
              <Link href="/signup" className="block text-center w-full py-4 rounded-full bg-purple-600 text-white text-sm font-extrabold tracking-[0.1em] uppercase hover:bg-purple-700 hover:shadow-lg transition-all shadow-md">Start Free Trial</Link>
            </div>
            {/* Enterprise */}
            <div className="rounded-[2rem] border border-slate-200 p-8 hover:shadow-xl transition-shadow bg-slate-50">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-black mb-6">Custom</div>
              <ul className="space-y-4 mb-8 text-slate-600">
                <li>✓ Unlimited visitors</li>
                <li>✓ Custom integrations</li>
                <li>✓ SSO & Advanced Security</li>
              </ul>
              <Link href="/contact" className="block text-center w-full py-4 rounded-full border-[1.5px] border-slate-300 text-sm font-extrabold tracking-[0.1em] uppercase text-slate-800 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 transition-all shadow-sm">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Partners Banner */}
      <div className="border-t border-slate-200/60 mt-auto mx-6 md:mx-12 mb-6 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-8">
          
          {/* Left Side: 50% Off Premium */}
          <div className="flex items-center gap-3 pl-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center bg-transparent">
              <div className="w-3.5 h-3.5 bg-slate-400 rounded-full" />
            </div>
            <span className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-slate-800">
              50% Off Premium
            </span>
          </div>

          {/* Right Side: Logos */}
          <div className="flex flex-wrap items-center gap-8 md:gap-20 opacity-75 grayscale pr-4">
            <div className="font-bold text-2xl md:text-3xl tracking-tighter">SHELLS</div>
            <div className="font-bold text-2xl md:text-3xl tracking-tighter flex items-center gap-2">
              <span className="text-3xl opacity-50">⚡</span> SmartFinder
            </div>
            <div className="font-bold text-2xl md:text-3xl tracking-tighter">Zoomerr</div>
          </div>

        </div>
      </div>
      
    </div>
  )
}
