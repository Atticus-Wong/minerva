'use client';

import Link from 'next/link';
import { Instagram, Twitter, Github, Disc } from 'lucide-react'; // Import icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-8 mt-16 border-t">
      {/* Use flexbox for layout and justify-between on medium screens and up */}
      <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
        {/* About/Brand Section */}
        <div className="w-full md:w-auto"> {/* Adjust width as needed */}
          <h3 className="text-lg font-semibold text-foreground mb-2">Minerva</h3>
          <p className="text-sm">AI-Powered Chess Consulting</p>
          {/* Optional: Add a short description */}
        </div>

        {/* Links Section */}
        <div className="w-full md:w-auto"> {/* Adjust width as needed */}
          <h4 className="font-medium text-foreground mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li><Link href="/account" className="hover:text-foreground">Dashboard</Link></li>
            <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
            {/* Add more relevant links */}
            <li><Link href="/#faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>

        {/* Social & Contact Section */}
        <div className="w-full md:w-auto"> {/* Adjust width as needed */}
          <h4 className="font-medium text-foreground mb-2">Connect</h4>
          <div className="flex space-x-4 mb-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              <Twitter size={20} />
            </a>
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              <Github size={20} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              <Disc size={20} /> {/* Using Disc as a placeholder for Discord */}
            </a>
          </div>
          {/* Optional: Add contact email */}
          {/* <p className="text-sm">contact@minerva.ai</p> */}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1440px] mx-auto px-4 text-center text-xs mt-8 pt-4 border-t border-border/50">
        © {currentYear} Minerva. All rights reserved.
      </div>
    </footer>
  );
}