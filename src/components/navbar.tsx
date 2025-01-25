"use client"; // Required for client-side interactivity in Next.js

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react"; // Icon for mobile menu
import ThemeToggle from "./ThemeToggle";
export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b border-border max-w-[1440px] mx-auto px-32 sticky top-0">
        {/* Logo */}

        <Link href="/" className="text-lg font-semibold text-foreground">
          <h2>Minerva</h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 justify-center align-middle">
          <ThemeToggle />
          <Link href="/login" className="text-sm text-foreground hover:text-primary">
            <Button>Log in</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </nav>
  );
}