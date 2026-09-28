import { handleContact, type MailEnvironment } from '../../lib/enquiries'
export function onRequestPost({ request, env }: { request: Request; env: MailEnvironment }) {
  return handleContact(request, env)
}
