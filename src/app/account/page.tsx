'use client';
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader
}
  from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { usernameAtom, statsAtom, profileAtom, archivesAtom, gamesAtom } from "@/utils/atom";
import GameTable from "@/components/GameTable";
export default function account() {
  const [profile, setProfile] = useAtom(profileAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [archives, setArchives] = useAtom(archivesAtom);
  const [games, setGames] = useAtom(gamesAtom);

  useEffect(() => {
    const chessProfile = async (username: string) => {
      try {
        const res = await fetch(`/api/player/${username}`); // Add leading slash
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
      }
    }

    if (username) {
      chessProfile(username);
    }
  }, [refetch]);

  useEffect(() => {
    const chessStats = async (username: string) => {
      try {
        const response = await fetch(`/api/player/${username}/stats`)
        const data = await response.json()
        setStats(data)
      }
      catch (err) {
        console.log(err)
      }
    };
    chessStats(username);
  }, [refetch])

  useEffect(() => {
    const fetchGames = async (username: string) => {
      const response = await fetch(`/api/player/${username}/games/archives`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const dataArchives = await response.json();
      setArchives(dataArchives.archives)
    }

    fetchGames(username)
  }, [refetch])

  const win_rapid = stats?.chess_rapid?.record?.win ?? 0;
  const loss_rapid = stats?.chess_rapid?.record?.loss ?? 0;
  const draw_rapid = stats?.chess_rapid?.record?.draw ?? 0;
  const winPercentage_rapid = ((win_rapid / (win_rapid + loss_rapid + draw_rapid)) * 100).toFixed(2);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        if (!archives?.length) {
          console.log('No archives available');
          return;
        }

        const latestArchive = archives[archives.length - 1];

        const response = await fetch(latestArchive);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setGames(data.games || []);
      } catch (err) {
        console.error('Archive fetch error:', err);
      }
    }

    if (archives?.length > 0) {
      fetchGames();
    }
  }, [archives]); // Only depend on archives changing

  useEffect(() => {
    console.log(games)
  }, [games])

  const win_bu = stats?.chess_bullet?.record?.win ?? 0;
  const loss_bu = stats?.chess_bullet?.record?.loss ?? 0;
  const draw_bu = stats?.chess_bullet?.record?.draw ?? 0;
  const winPercentage_bu = ((win_bu / (win_bu + loss_bu + draw_bu)) * 100).toFixed(2);

  const win_bl = stats?.chess_blitz?.record?.win ?? 0;
  const loss_bl = stats?.chess_blitz?.record?.loss ?? 0;
  const draw_bl = stats?.chess_blitz?.record?.draw ?? 0;
  const winPercentage_bl = ((win_bl / (win_bl + loss_bl + draw_bl)) * 100).toFixed(2);

  return (
    <div className="justify-center flex items-center">
      <div className="max-w-[1440px] py-10 justify-center gap-3">
        <div className="flex items-center gap-4">
          <Input placeholder="Your chess.com username" className="w-64 shadow-sm" onChange={(e) => setUsername(e.target.value)} />
          <Button onClick={() => {
            setRefetch(!refetch)
          }}>Submit</Button>
        </div>
        {profile?.username && <h3 className="mt-4">{profile.username}'s Profile</h3>}
        <div className="flex items-cemter gap-3 justify-center mt-10">
          <div>
            <Card className="w-96 h-56">
              <CardHeader>
                <CardTitle><h3>Bullet</h3></CardTitle>
              </CardHeader>
              <CardContent>
                <p>Rating: {stats?.chess_bullet?.last?.rating}</p>
                <p>Wins: <span className="text-green-400">{stats?.chess_bullet?.record?.win}</span></p>
                <p>Losses: <span className="text-red-400">{stats?.chess_bullet?.record?.loss}</span></p>
                <p>Draws: <span className="text-gray-400">{stats?.chess_bullet?.record?.draw}</span></p>
                <p>Percentage: {winPercentage_bu}%</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="w-96 h-56">
              <CardHeader>
                <CardTitle><h3>Blitz</h3></CardTitle>
              </CardHeader>
              <CardContent>
                <p>Rating: {stats?.chess_blitz?.last?.rating}</p>
                <p>Wins: <span className="text-green-400">{stats?.chess_blitz?.record?.win}</span></p>
                <p>Losses: <span className="text-red-400">{stats?.chess_blitz?.record?.loss}</span></p>
                <p>Draws: <span className="text-gray-400">{stats?.chess_blitz?.record?.draw}</span></p>
                <p>Percentage: {winPercentage_bl}%</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="w-96 h-56">
              <CardHeader>
                <CardTitle><h3>Rapid</h3></CardTitle>
              </CardHeader>
              <CardContent>
                <p>Rating: {stats?.chess_rapid?.last?.rating}</p>
                <p>Wins: <span className="text-green-400">{stats?.chess_rapid?.record?.win}</span></p>
                <p>Losses: <span className="text-red-400">{stats?.chess_rapid?.record?.loss}</span></p>
                <p>Draws: <span className="text-gray-400">{stats?.chess_rapid?.record?.draw}</span></p>
                <p>Percentage: {winPercentage_rapid}%</p>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}