import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'

export default function AdminRedirectPage() {
  const token = cookies().get('token')?.value

  if (!token) redirect('/login')

  try {
    const user = verifyToken(token)
    if (user.role === 'admin') {
      redirect('dashboard')  // ✅ Redirect if verified
    } else {
      redirect('/unauthorized')
    }
  } catch {
    redirect('/login')
  }

  // fallback content not needed because redirect is synchronous
}
