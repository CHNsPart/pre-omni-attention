import Link from 'next/link'
import { Home, BarChart2, Users, Settings, HelpCircle } from 'lucide-react'

const menuItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Analytics', icon: BarChart2, href: '/dashboard/analytics' },
  { name: 'Users', icon: Users, href: '/dashboard/users' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export default function Sidebar() {
  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">MyApp</h2>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-4">
        <Link href="/help" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
          <HelpCircle className="h-5 w-5 mr-3" />
          Help & Support
        </Link>
      </div>
    </div>
  )
}