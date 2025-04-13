'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Assuming you have a Label component
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js'; // Import Supabase User type

export default function ConfigureProfilePage() {
  const [lichessUsername, setLichessUsername] = useState('');
  const [chesscomUsername, setChesscomUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Redirect to login if no user is found
        router.push('/login'); // Adjust login path if needed
      } else {
        setUser(user);
        // Optionally pre-fill usernames if they exist in user_metadata or a profiles table
        // Example: setChesscomUsername(user.user_metadata?.chesscom_username || '');
      }
    };
    fetchUser();
  }, [supabase, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!user) {
      setError("User not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles') // Make sure 'profiles' is the correct table name
      .upsert({ // Use upsert: update if exists, insert if not
        id: user.id,
        lichess_username: lichessUsername || null, // Store null if empty
        chesscom_username: chesscomUsername || null, // Store null if empty
        updated_at: new Date().toISOString(), // Optional: track when the profile was updated
      }, {
        onConflict: 'id' // Specify the conflict target for upsert
      });


    setIsLoading(false);

    if (updateError) {
      console.error('Error updating profile:', updateError);
      setError(`Failed to save profile: ${updateError.message}`);
    } else {
      // Successfully saved, redirect the user
      router.push('/account'); // Redirect to account page or dashboard
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Configure Your Chess Profiles</CardTitle>
          <CardDescription>
            Enter your usernames to link your accounts. You can add one or both.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chesscom">Chess.com Username</Label>
              <Input
                id="chesscom"
                placeholder="e.g., MagnusCarlsen"
                value={chesscomUsername}
                onChange={(e) => setChesscomUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lichess">Lichess.org Username</Label>
              <Input
                id="lichess"
                placeholder="e.g., DrNykterstein"
                value={lichessUsername}
                onChange={(e) => setLichessUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Configuration'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}