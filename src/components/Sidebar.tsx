'use client';
import Image from 'next/image';
import { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, User, Settings } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
export function AccountSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
      <Sidebar 
        className={`transition-all duration-100 overflow-hidden scrollbar-none ${isExpanded ? 'w-64' : 'w-16'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <SidebarHeader>
          <div className={`p-4 flex items-center ${isExpanded ? 'justify-between' : 'justify-center'}`}>
            <h2 className={`text-xl font-bold overflow-hidden transition-all ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
              Minerva
            </h2>
            <Image 
              src='/lichess.png'
              alt="logo"
              width={32}
              height={32}
              className="min-w-[32px]"
            />
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <nav className="space-y-2 p-2">
              <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md">
                <Home className="h-5 w-5 min-w-[20px]" />
                <span className={`transition-all ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Home</span>
              </Link>
              <Link href="/account" className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md">
                <User className="h-5 w-5 min-w-[20px]" />
                <span className={`transition-all ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Profile</span>
              </Link>
              <Link href="/settings" className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md">
                <Settings className="h-5 w-5 min-w-[20px]" />
                <span className={`transition-all ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Settings</span>
              </Link>
            </nav>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <div className="flex items-center gap-3 p-4">
            <ThemeToggle />
            {/* Conditionally render text based on expanded state */}
            {isExpanded && <p className="transition-all">Theme Mode</p>}
          </div>
        </SidebarFooter>
      </Sidebar>
  )
}