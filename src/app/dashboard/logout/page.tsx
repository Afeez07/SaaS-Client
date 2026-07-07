"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, clear auth tokens here
    alert("Logged out successfully!")
    router.push("/")
  }, [router])

  return (
    <div className="flex h-full items-center justify-center p-12">
      <p className="text-slate-500">Logging out...</p>
    </div>
  )
}
