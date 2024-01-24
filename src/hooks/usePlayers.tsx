import { useState, useEffect } from 'react';
import Debug from 'debug';

const debug = Debug('Nationals:src:app:hooks:usePlayers.tsx');

type Player = {
  player_id: number;
  name_use: string;
  name_last: string;
};

export default function usePlayers(players: number[]) {
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>([]);

  async function fetchPlayerData(playerId: number): Promise<Player | null> {
    try {
      const response = await fetch(`/api/players/${playerId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        debug(err.message);
        return null; // Returning null to indicate a failed fetch
      } else {
        debug('An unknown error occurred');
        return null;
      }
    }
  }

  useEffect(() => {
    const fetchPlayersData = async () => {
      let fetchedErrors: string[] = []; // Explicitly defining the type as string[]
      const data: (Player | null)[] = await Promise.all(
        players.map(async (playerId) => {
          const result = await fetchPlayerData(playerId);
          if (result === null) {
            fetchedErrors.push(`Error fetching data for player ID: ${playerId}`);
          }
          return result;
        })
      );

      setPlayersData(data.filter((player): player is Player => player !== null));
      setErrors(fetchedErrors);
      setIsLoading(false);
    };

    fetchPlayersData();
  }, [players]);

  return { playersData, isLoading, errors };
}
