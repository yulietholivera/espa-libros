// /webapps/espa-libros/frontend/app/utils/auth.ts
export function saveToken(token: string) {
  localStorage.setItem("token", token)
}

export function getToken(): string | null {
  return localStorage.getItem("token")
}

export function clearToken() {
  localStorage.removeItem("token")
}

export function saveUser(user: any) {
  localStorage.setItem("usuario", JSON.stringify(user))
}

export function getUser(): any | null {
  try {
    return JSON.parse(localStorage.getItem("usuario") || 'null')
  } catch {
    return null
  }
}
