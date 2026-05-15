import { demoAuthUnauthorized, isDemoAuthEnabled, verifyBasicAuth } from '../lib/demo-auth'

interface Env {
  DEMO_USER?: string
  DEMO_PASSWORD?: string
}

export async function onRequest(context: {
  request: Request
  env: Env
  next: () => Promise<Response>
}): Promise<Response> {
  const { request, env, next } = context
  const user = env.DEMO_USER?.trim()
  const pass = env.DEMO_PASSWORD?.trim()

  if (!isDemoAuthEnabled(user, pass)) {
    return next()
  }

  if (verifyBasicAuth(request.headers.get('Authorization'), user!, pass!)) {
    return next()
  }

  return demoAuthUnauthorized()
}
