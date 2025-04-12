"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = '/';
    }
  };

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "";

    const name = user.user_metadata?.full_name || user.email || "";
    if (!name) return "";

    // For email addresses, use first letter
    if (name.includes('@')) {
      return name.charAt(0).toUpperCase();
    }

    // For full names, use first letter of first and last name
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <nav className="flex items-center justify-between py-2 px-2 bg-background border-b border-border max-w-[1440px] mx-auto px-32 sticky top-0">
      {/* Logo */}
      <Link href="/" className="text-lg font-semibold text-foreground">
        <h2>Minerva</h2>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4 justify-center align-middle">
        <ThemeToggle />

        {!loading && (
          user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full p-0 w-8 h-8">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                      alt={user.user_metadata?.full_name || user.email}
                    />
                    <AvatarFallback className="text-xs">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/account" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/chat" className="w-full cursor-pointer">
                    Talk to Minerva
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="text-sm text-foreground hover:text-primary">
              <Button variant="default">Log in</Button>
            </Link>
          )
        )}
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
            {!loading && (
              user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/account">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login">Log in</Link>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}