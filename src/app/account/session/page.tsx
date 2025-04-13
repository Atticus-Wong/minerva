'use client';
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@/types/session";
import fetchSessions from "@/actions/fetchSessions"; // Import the fetch function
import { Button } from "@/components/ui/button"; // Import Button component
import { PlusCircle } from "lucide-react"; // Import an icon for the button
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components

export default function SessionPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sessions when the component mounts
  useEffect(() => {
    const loadSessions = async () => {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await fetchSessions();

      if (fetchError) {
        console.error("Error fetching sessions:", fetchError);
        setError("Failed to load sessions.");
      } else {
        setSessions(data || []);
      }
      setLoading(false);
    };

    loadSessions();
  }, []);

  const handleCreateNewSession = () => {
    // TODO: Implement logic to create a new session
    console.log("Create new session clicked");
    // Example: You might navigate to a new page or open a modal
    // router.push('/account/session/new');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Sessions</h1>
        <Button onClick={handleCreateNewSession}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Session
        </Button>
      </div>

      {/* Skeleton Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => ( // Show 3 skeleton cards
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <Card key={session.id} className="flex flex-col"> {/* Use Card component */}
                <CardHeader>
                  <CardTitle>{session.name || `Session ${session.session_id.substring(0, 6)}`}</CardTitle> {/* Display session name or truncated ID */}
                  <CardDescription>Type: {session.type}</CardDescription> {/* Use CardDescription for type */}
                </CardHeader>
                <CardContent className="flex-grow"> {/* Use CardContent for details */}
                  <p className="text-sm text-muted-foreground">
                    Created: {new Date(session.created_at).toLocaleDateString()}
                  </p>
                  {/* Add more details or links as needed */}
                  {/* Example: Link to view the session */}
                  {/* <Button variant="link" className="p-0 h-auto mt-2">View Session</Button> */}
                </CardContent>
                {/* Optional CardFooter */}
                {/* <CardFooter>
                  <p>Footer content</p>
                </CardFooter> */}
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center">No sessions found.</p> // Span across all columns if no sessions
          )}
        </div>
      )}
    </div>
  );
}