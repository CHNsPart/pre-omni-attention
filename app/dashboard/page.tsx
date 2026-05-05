// app/dashboard/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import Sidebar from '@/components/Sidebar'
import RecentSubmissions from '@/components/RecentSubmissions'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [user, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <p className="text-xl text-gray-600 mb-8">Welcome to your dashboard, {user}!</p>
        
        <h2 className="text-2xl font-semibold mb-4">Recent Submissions</h2>
        <RecentSubmissions />
      </main>
    </div>
  )
}