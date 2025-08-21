"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ConnexionRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/auth/connexion')
  }, [router])
  return null
}
