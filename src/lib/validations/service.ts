import * as z from "zod"

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(50),
  category: z.string().min(3, "Category is required").max(50),
  frequency: z.string().min(1, "Frequency is required (e.g., Monthly)"),
  amount: z.string().min(1, "Amount is required (e.g. 250)"),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
