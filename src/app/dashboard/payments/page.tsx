"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Trash2 } from "lucide-react"
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
import { Payment } from "@/types"
import { formatCurrency } from "@/lib/utils"

export default function PaymentsPage() {
  const { payments, deletePayment } = useData()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPayments = payments.filter(
    (payment) =>
      payment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Payments</h2>
        <Button asChild>
          <Link href="/payments/new">
            <Plus className="mr-2 h-4 w-4" />
            New Payment
          </Link>
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search payments..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPayments.map((payment) => (
          <Sheet key={payment.id}>
            <SheetTrigger asChild>
              <div 
                onClick={() => setSelectedPayment(payment)}
                className="cursor-pointer transition-transform hover:-translate-y-1"
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex justify-between items-start">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{payment.category}</p>
                      <p className="text-sm font-bold text-slate-800">{payment.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-medium">{payment.date}</p>
                      <p className="text-sm font-bold text-[var(--brand)]">{formatCurrency(payment.amount)}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>{selectedPayment?.title}</SheetTitle>
                <SheetDescription>{selectedPayment?.category}</SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Details</h4>
                  <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Date</span>
                      <span className="text-sm font-medium text-slate-900">{selectedPayment?.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Amount</span>
                      <span className="text-sm font-bold text-[var(--brand)]">{selectedPayment?.amount ? formatCurrency(selectedPayment.amount) : ""}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => {
                      if (selectedPayment) deletePayment(selectedPayment.id)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Payment
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ))}
        {filteredPayments.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
            No payments found. Try adjusting your search or create a new one.
          </div>
        )}
      </div>
    </div>
  )
}
