import { useState, useEffect } from "react";

type Health = {status: string, uptime: number, db: string};


export default function App(){
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`).
    then(res => res.json()).
    then(data => setHealth(data)).
    catch(err => {
      console.error(err);
      setError(err.message);
    });
  }, [])
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 space-y-3">
        <h1 className="text-2xl font-semibold">Collab Editor</h1>
        {error && <p className="text-red-400">Server unreachable: {error}</p>}
        {!error && !health && <p className="text-slate-400">Checking server...</p>}
        {health && (
          <ul className="text-sm text-slate-300">
            <li>API: {health.status}</li>
            <li>Database: {health.db}</li>
            <li>Uptime: {health.uptime}s</li>
          </ul>
        )}
      </div>
    </main>
  );

}