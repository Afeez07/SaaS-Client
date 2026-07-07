import { signup } from '../login/actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, UserPlus } from "lucide-react"
import Link from "next/link"

export default async function SignupPage(props: {
  searchParams: Promise<{ error?: string }>
}) {
  const searchParams = await props.searchParams
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-orange-400 p-4 md:p-8 flex flex-col font-sans relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <Link href="/" className="flex items-center gap-2 mb-10 group">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-5 h-5 bg-purple-600 rounded-sm rotate-45" />
          </div>
          <span className="font-bold text-3xl tracking-tight text-white drop-shadow-md">Demola AI</span>
        </Link>
        
        <Card className="w-full max-w-md shadow-2xl border-white/20 bg-white/95 backdrop-blur-xl rounded-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <CardHeader className="text-center space-y-3 pb-8 pt-10">
            <CardTitle className="text-3xl font-bold text-slate-800 tracking-tight">Create an account</CardTitle>
            <p className="text-slate-500 font-medium">Start your 31-day free trial. No credit card required.</p>
          </CardHeader>
          <CardContent className="px-10 pb-10">
            <form className="space-y-5">
              {searchParams?.error && (
                <div className="p-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl font-medium animate-in slide-in-from-top-2">
                  {searchParams.error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-slate-900 font-medium"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-slate-900 font-medium font-mono tracking-widest"
                />
              </div>
              
              <div className="pt-6">
                <button 
                  formAction={signup}
                  className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-700 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg hover:shadow-xl hover:shadow-purple-500/30"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            </form>
            
            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-bold hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
