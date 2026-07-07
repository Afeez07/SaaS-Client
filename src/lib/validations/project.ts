import * as z from "zod"

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(50),
  subtitle: z.string().min(3, "Subtitle must be at least 3 characters").max(50),
  date: z.string().min(1, "Date is required"),
  amount: z.string().min(1, "Amount is required (e.g. $1,500)"),
  progress: z.coerce.number().min(0).max(100),
})

export type ProjectFormData = z.infer<typeof projectSchema>
