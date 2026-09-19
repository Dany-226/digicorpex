import { handleDiagnostic } from '@/lib/enquiries'
// Local Next dev adapter. Production uses functions/api/diagnostic.ts.
export function POST(request: Request) {
  return handleDiagnostic(request, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    MAIL_TEST_MODE: process.env.MAIL_TEST_MODE,
  })
}
