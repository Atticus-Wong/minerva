'use client';
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader
} from "@/components/ui/card";
import { useAtom } from "jotai";
import { statsAtom, profileAtom, archivesAtom, gamesAtom } from "@/utils/atom";
import GameTable from "@/components/GameTable";
import { createClient } from "@/utils/supabase/client";
import { User } from '@supabase/supabase-js';
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const [profile, setProfile] = useAtom(profileAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [archives, setArchives] = useAtom(archivesAtom);
  const [games, setGames] = useAtom(gamesAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedUsername, setFetchedUsername] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching user or no user logged in:", userError);
        setError("Could not load user data. Please log in.");
        setIsLoading(false);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('chesscom_username')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error("Error fetching Supabase profile:", profileError);
        if (profileError.code === 'PGRST116') {
          setError("Chess.com username not configured. Please configure your profile.");
        } else {
          setError("Failed to load profile data.");
        }
        setIsLoading(false);
        return;
      }

      if (profileData?.chesscom_username) {
        setFetchedUsername(profileData.chesscom_username);
      } else {
        setError("Chess.com username not found in profile. Please configure your profile.");
      }
    };

    fetchUserData();
  }, [supabase]);

  useEffect(() => {
    const fetchChessProfile = async (username: string) => {
      try {
        const res = await fetch(`/api/player/${username}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(`Failed to fetch Chess.com profile for ${username}.`);
      }
    };

    if (fetchedUsername) {
      fetchChessProfile(fetchedUsername);
    }
  }, [fetchedUsername, setProfile]);

  useEffect(() => {
    const fetchChessStats = async (username: string) => {
      try {
        const response = await fetch(`/api/player/${username}/stats`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Stats fetch error:', err);
        setError(`Failed to fetch Chess.com stats for ${username}.`);
      }
    };

    if (fetchedUsername) {
      fetchChessStats(fetchedUsername);
    }
  }, [fetchedUsername, setStats]);

  useEffect(() => {
    const fetchGameArchives = async (username: string) => {
      try {
        const response = await fetch(`/api/player/${username}/games/archives`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const dataArchives = await response.json();
        setArchives(dataArchives.archives || []);
      } catch (err) {
        console.error('Archives fetch error:', err);
        setError(`Failed to fetch Chess.com archives for ${username}.`);
      } finally {
        setIsLoading(false);
      }
    };

    if (fetchedUsername) {
      fetchGameArchives(fetchedUsername);
    } else {
      setIsLoading(false);
    }
  }, [fetchedUsername, setArchives]);

  useEffect(() => {
    const fetchLatestGames = async () => {
      try {
        if (!archives?.length) {
          return;
        }

        const latestArchiveUrl = archives[archives.length - 1];
        if (!latestArchiveUrl) return;

        const response = await fetch(latestArchiveUrl);
        if (!response.ok) throw new Error(`HTTP error fetching games! status: ${response.status}`);

        const data = await response.json();
        setGames(data.games || []);
      } catch (err) {
        console.error('Games fetch error:', err);
        setError("Failed to fetch recent games.");
      }
    };

    if (archives?.length > 0) {
      fetchLatestGames();
    }
  }, [archives, setGames]);

  const calculateWinPercentage = (wins: number, losses: number, draws: number): string => {
    const total = wins + losses + draws;
    if (total === 0) return "0.00";
    return ((wins / total) * 100).toFixed(2);
  };

  const win_rapid = stats?.chess_rapid?.record?.win ?? 0;
  const loss_rapid = stats?.chess_rapid?.record?.loss ?? 0;
  const draw_rapid = stats?.chess_rapid?.record?.draw ?? 0;
  const winPercentage_rapid = calculateWinPercentage(win_rapid, loss_rapid, draw_rapid);

  const win_bu = stats?.chess_bullet?.record?.win ?? 0;
  const loss_bu = stats?.chess_bullet?.record?.loss ?? 0;
  const draw_bu = stats?.chess_bullet?.record?.draw ?? 0;
  const winPercentage_bu = calculateWinPercentage(win_bu, loss_bu, draw_bu);

  const win_bl = stats?.chess_blitz?.record?.win ?? 0;
  const loss_bl = stats?.chess_blitz?.record?.loss ?? 0;
  const draw_bl = stats?.chess_blitz?.record?.draw ?? 0;
  const winPercentage_bl = calculateWinPercentage(win_bl, loss_bl, draw_bl);

  if (isLoading || !profile) {
    // Skeleton Loading State
    return (
      <div className="justify-center flex items-center">
        <div className="max-w-[1440px] py-10 justify-center gap-3 w-full px-4 md:px-8">
          <Skeleton className="h-8 w-1/3 mx-auto mb-6" /> {/* Skeleton for Title */}
          <div className="flex flex-wrap items-stretch gap-4 justify-center mt-10">
            {[...Array(3)].map((_, index) => ( // Create 3 skeleton cards
              <Card key={index} className="w-full sm:w-80 md:w-96 flex flex-col">
                <CardHeader>
                  <CardTitle><Skeleton className="h-6 w-20" /></CardTitle> {/* Skeleton for Card Title */}
                </CardHeader>
                <CardContent className="flex-grow space-y-2"> {/* Add space between skeleton lines */}
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Optional: Skeleton for Game Table */}
          {/* <div className="mt-10">
             <Skeleton className="h-6 w-1/4 mx-auto mb-4" />
             <Skeleton className="h-40 w-full" />
          </div> */}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="justify-center flex items-center">
      <div className="max-w-[1440px] py-10 justify-center gap-3 w-full px-4 md:px-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{profile?.username}'s Profile</h2>
        <div className="flex flex-wrap items-stretch gap-4 justify-center mt-10">
          <Card className="w-full sm:w-80 md:w-96 flex flex-col">
            <CardHeader>
              <CardTitle><h3>Bullet</h3></CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Rating: {stats?.chess_bullet?.last?.rating ?? 'N/A'}</p>
              <p>Wins: <span className="text-green-400">{win_bu}</span></p>
              <p>Losses: <span className="text-red-400">{loss_bu}</span></p>
              <p>Draws: <span className="text-gray-400">{draw_bu}</span></p>
              <p>Win Rate: {winPercentage_bu}%</p>
            </CardContent>
          </Card>

          <Card className="w-full sm:w-80 md:w-96 flex flex-col">
            <CardHeader>
              <CardTitle><h3>Blitz</h3></CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Rating: {stats?.chess_blitz?.last?.rating ?? 'N/A'}</p>
              <p>Wins: <span className="text-green-400">{win_bl}</span></p>
              <p>Losses: <span className="text-red-400">{loss_bl}</span></p>
              <p>Draws: <span className="text-gray-400">{draw_bl}</span></p>
              <p>Win Rate: {winPercentage_bl}%</p>
            </CardContent>
          </Card>

          <Card className="w-full sm:w-80 md:w-96 flex flex-col">
            <CardHeader>
              <CardTitle><h3>Rapid</h3></CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>Rating: {stats?.chess_rapid?.last?.rating ?? 'N/A'}</p>
              <p>Wins: <span className="text-green-400">{win_rapid}</span></p>
              <p>Losses: <span className="text-red-400">{loss_rapid}</span></p>
              <p>Draws: <span className="text-gray-400">{draw_rapid}</span></p>
              <p>Win Rate: {winPercentage_rapid}%</p>
            </CardContent>
          </Card>
        </div>

        {/* <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-center">Recent Games</h3>
          {games.length > 0 ? (
            <GameTable games={games} />
          ) : (
            <p className="text-center text-gray-500">No recent games found.</p>
          )}
        </div> */}
      </div>
    </div>
  );
}