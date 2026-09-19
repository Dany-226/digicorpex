import { handleDiagnostic, type MailEnvironment } from '../../lib/enquiries'
export function onRequestPost({ request, env }: { request: Request; env: MailEnvironment }) {
  return handleDiagnostic(request, env)
}
