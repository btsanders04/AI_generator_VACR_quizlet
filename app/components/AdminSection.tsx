// components/AdminSection.tsx
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AdminSection() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  if (!isAdmin) return null

  return (
    <Link 
      href="/image-uploader" 
      className="p-6 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2 text-blue-600">Image Management</h2>
      <p>Upload and organize aircraft images</p>
      <span className="inline-block mt-2 text-sm text-blue-600 font-medium">Administrative Tool</span>
    </Link>
  )
}