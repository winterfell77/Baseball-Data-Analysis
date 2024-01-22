"use client"

import React, { useState, useEffect } from 'react';

const PlayersCount = () => {
    const [playerCount, setPlayerCount] = useState(0);

    useEffect(() => {
        // Fetch players data from the Flask API
        fetch('/api/players')
            .then(response => response.json())
            .then(data => {
                // Set the number of players
                setPlayerCount(data.players.length);
            })
            .catch(error => {
                console.error('Error fetching player count:', error);
            });
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div>
            <h2>Number of Players</h2>
            <p>There are {playerCount} players in the database.</p>
        </div>
    );
};

export default PlayersCount;

