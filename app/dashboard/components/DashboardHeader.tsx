"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Settings, LogOut, User, Moon, Sun } from "lucide-react"

export function DashboardHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, this would toggle the theme
  }

  return (
    <header className="bg-background-paper border-b border-neutral-light px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو در داشبورد..."
              className="w-full pl-4 pr-10 py-2 border border-neutral-light rounded-medium focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="علی احمدی" />
                  <AvatarFallback>ع.ا</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">علی احمدی</p>
                  <p className="text-xs leading-none text-muted-foreground">ali@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="ml-2 h-4 w-4" />
                <span>پروفایل</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="ml-2 h-4 w-4" />
                <span>تنظیمات</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="ml-2 h-4 w-4" />
                <span>خروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
