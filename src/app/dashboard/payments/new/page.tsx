"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { paymentSchema, type PaymentFormData } from "@/lib/validations/payment"
import { useData } from "@/lib/DataContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewPaymentPage() {
  const router = useRouter()
  const { addPayment } = useData()
  
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  })

  const onSubmit = (data: PaymentFormData) => {
    addPayment(data)
    router.push("/payments")
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Description</Label>
              <Input id="title" placeholder="e.g. Company Website Redesign" {...register("title")} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g. Project Payment" {...register("category")} />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" placeholder="e.g. 3/15/20" {...register("date")} />
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="e.g. 4000" {...register("amount")} />
                {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">Add Payment</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
