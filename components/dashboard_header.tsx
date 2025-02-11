import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function DashboardHeader() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input className="w-72 pl-8" placeholder="Search transactions, customers, subscriptions..." type="search" />
          </div>
          <Avatar>
            <AvatarImage src="https://v0.dev/placeholder-user.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

