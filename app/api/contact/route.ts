import { handleContact } from '@/lib/enquiries'
// Local Next dev adapter. Production uses functions/api/contact.ts.
export function POST(request: Request) {
  return handleContact(request, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    MAIL_TEST_MODE: process.env.MAIL_TEST_MODE,
  })
}
