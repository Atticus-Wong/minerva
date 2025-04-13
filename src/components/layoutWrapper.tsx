'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import React from 'react';

// Define the paths where the Navbar should be hidden
const HIDE_NAVBAR_PATHS = ['/configure-profile', '/login', '/account'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current path is one where the navbar should be hidden
  const shouldHideNavbar = HIDE_NAVBAR_PATHS.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}