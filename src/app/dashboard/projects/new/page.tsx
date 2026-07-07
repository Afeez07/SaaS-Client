"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { projectSchema, type ProjectFormData } from "@/lib/validations/project"
import { useData } from "@/lib/DataContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProjectPage() {
  const router = useRouter()
  const { addProject } = useData()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      progress: 0,
    }
  })

  const onSubmit = (data: ProjectFormData) => {
    addProject(data)
    router.push("/projects")
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="e.g. Company Website Redesign" {...register("title")} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle / Client</Label>
              <Input id="subtitle" placeholder="e.g. companyname.com" {...register("subtitle")} />
              {errors.subtitle && <p className="text-sm text-red-500">{errors.subtitle.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Due Date</Label>
                <Input id="date" type="text" placeholder="MM/DD/YY" {...register("date")} />
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="e.g. $12,000" {...register("amount")} />
                {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="progress">Initial Progress (%)</Label>
              <Input id="progress" type="number" min="0" max="100" {...register("progress")} />
              {errors.progress && <p className="text-sm text-red-500">{errors.progress.message}</p>}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
