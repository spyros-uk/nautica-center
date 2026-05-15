const REALM = 'Nautica Center Demo'

function normalizeCredential(value: string | undefined): string {
  return value?.trim() ?? ''
}

export function isDemoAuthEnabled(user?: string, pass?: string): boolean {
  return Boolean(normalizeCredential(user) && normalizeCredential(pass))
}

export function verifyBasicAuth(
  authHeader: string | null,
  expectedUser: string,
  expectedPass: string,
): boolean {
  if (!authHeader) return false

  const [scheme, encoded] = authHeader.split(' ')
  if (scheme !== 'Basic' || !encoded) return false

  try {
    const decoded = atob(encoded)
    const colonIndex = decoded.indexOf(':')
    if (colonIndex === -1) return false

    const user = decoded.slice(0, colonIndex)
    const pass = decoded.slice(colonIndex + 1)
    return (
      user === normalizeCredential(expectedUser) &&
      pass === normalizeCredential(expectedPass)
    )
  } catch {
    return false
  }
}

export function demoAuthUnauthorized(): Response {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}"`,
    },
  })
}
