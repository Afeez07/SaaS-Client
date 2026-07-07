"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { serviceSchema, type ServiceFormData } from "@/lib/validations/service"
import { useData } from "@/lib/DataContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewServicePage() {
  const router = useRouter()
  const { addService } = useData()
  
  const { register, handleSubmit, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  })

  const onSubmit = (data: ServiceFormData) => {
    addService(data)
    router.push("/services")
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input id="title" placeholder="e.g. Google Ads Management" {...register("title")} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g. PPC / SEM" {...register("category")} />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Input id="frequency" placeholder="e.g. Monthly" {...register("frequency")} />
                {errors.frequency && <p className="text-sm text-red-500">{errors.frequency.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="e.g. 250" {...register("amount")} />
                {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">Add Service</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
