import { useState, useEffect } from 'react';

export interface PitchInfo {
  pitch_type: string;
  number_of_pitches: number;
  pitch_usage_percentage: number;
  average_speed: number;
  average_horizontal_break: number;
  average_vertical_break: number;
  average_spin_rate: number;
  average_exit_speed: number;
  average_launch_angle: number;
}

interface UsePitchDataResult {
  pitchData: PitchInfo[];
  isLoading: boolean;
  error: string | null;
}

export const usePitches = (pitcherId: number): UsePitchDataResult => {
  const [pitchData, setPitchData] = useState<PitchInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatData = (data: any[]): PitchInfo[] => {
    return data.map((item) => ({
      ...item,
      pitch_usage_percentage: parseFloat(item.pitch_usage_percentage.toFixed(2)),
      average_speed: parseFloat(item.average_speed.toFixed(2)),
      average_horizontal_break: parseFloat(item.average_horizontal_break.toFixed(2)),
      average_vertical_break: parseFloat(item.average_vertical_break.toFixed(2)),
      average_spin_rate: parseFloat(item.average_spin_rate.toFixed(2)),
      average_exit_speed: parseFloat(item.average_exit_speed.toFixed(2)),
      average_launch_angle: parseFloat(item.average_launch_angle.toFixed(2)),
    }));
  };

  useEffect(() => {
    const fetchPitchData = async () => {
      try {
        const response = await fetch(`/api/pitches/${pitcherId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const formattedData = formatData(data);
        setPitchData(formattedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPitchData();
  }, [pitcherId]);

  return { pitchData, isLoading, error };
};
