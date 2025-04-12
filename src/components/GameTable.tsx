'use client';
import { useState, useEffect } from "react";
import { usernameAtom, yearAtom, monthAtom } from "@/utils/atom";
import { useAtom } from "jotai";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function GameTable() {
  const [archives, setArchives] = useState<any[]>([]);
  const [username, setUsername] = useAtom(usernameAtom);
  const [refetch, setRefetch] = useState<boolean>(false);
  useEffect(() => {
    const fetchGames = async (username: string) => {
      const response = await fetch(`api/player/${username}/archives`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const data = await response.json();
      console.log(data)

      setArchives(data)
      console.log(archives)
    }

    fetchGames(username)
  }, [refetch])
  
  return (
      <div className="mt-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => setRefetch(refetch!)}>Submit</Button>
        </div>
      </div>
  )
}
