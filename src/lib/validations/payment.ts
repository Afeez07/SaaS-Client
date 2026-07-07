import * as z from "zod"

export const paymentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  category: z.string().min(3, "Category is required").max(50),
  date: z.string().min(1, "Date is required (e.g., 3/15/20)"),
  amount: z.string().min(1, "Amount is required (e.g., 4000)"),
})

export type PaymentFormData = z.infer<typeof paymentSchema>
