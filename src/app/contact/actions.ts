"use server"

import { Resend } from 'resend'

// We initialize Resend here. It will automatically pick up RESEND_API_KEY from the environment.
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!firstName || !lastName || !email || !message) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Demola AI <onboarding@resend.dev>', // resend.dev is allowed for testing without a domain
      to: ['hafisademola53@gmail.com'], // Must be the registered Resend account email on the free tier
      subject: `Enterprise Inquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Enterprise Inquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,
    })

    if (error) {
      console.error('Resend Error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Server Error:', error)
    return { success: false, error: error.message || 'Internal Server Error' }
  }
}
