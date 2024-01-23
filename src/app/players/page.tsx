"use client"
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import { Group, Select } from "@mantine/core";
import Debug from "debug";

const debug = Debug(`Nationals:src:app:players:page.jsx`);

const players_required = [657277, 668678, 543037, 571945, 605135, 664285, 622491, 656605, 641154, 605400, 571578, 680686, 669022, 663623];

type Player = {
    player_id: number;
    name_use: string;
    name_last: string;
};

export default function Players() {
    const [playersData, setPlayersData] = useState<Player[]>([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
    const [selectedPlayerName, setSelectedPlayerName] = useState<string | null>(null);

    async function getPlayerData(playerId: number): Promise<Player | null> {
        try {
            const response = await fetch(`/api/players/${playerId}`);
            if (!response.ok) {
                debug(`Error: ${response.status}`);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching player data:', error);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data: (Player | null)[] = await Promise.all(players_required.map(getPlayerData));
            setPlayersData(data.filter((player): player is Player => player !== null));
        };

        fetchData();
    }, []);

    const handlePlayerIdChange = (playerId: string | null) => {
        if (playerId === null) {
            setSelectedPlayerId(null);
            setSelectedPlayerName(null);
        } else {
            setSelectedPlayerId(playerId);
            const selectedPlayer = playersData.find(player => player.player_id.toString() === playerId);
            setSelectedPlayerName(selectedPlayer ? selectedPlayer.name_use + " " + selectedPlayer.name_last : null);
        }
    };


    const handlePlayerNameChange = (playerName: string | null) => {
        if (playerName === null) {
            setSelectedPlayerName(null);
            setSelectedPlayerId(null);
        } else {
            setSelectedPlayerName(playerName);
            const selectedPlayer = playersData.find(player => (player.name_use + " " + player.name_last) === playerName);
            setSelectedPlayerId(selectedPlayer ? selectedPlayer.player_id.toString() : null);
        }
    };

    return (
        <>
            <Header />
            <Group justify="center" gap="xl" grow>
                <Select
                    radius="md"
                    label="Choose Your Player's Id"
                    placeholder="Select ID"
                    data={players_required.map(String)}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    value={selectedPlayerId}
                    onChange={handlePlayerIdChange}
                    comboboxProps={{ dropdownPadding: 10, transitionProps: { transition: 'pop', duration: 200 } }}
                    withScrollArea={false}
                    styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                />
                <Select
                    radius="md"
                    label="Choose Your Player's Name"
                    placeholder="Select Name"
                    data={playersData.map(player => player.name_use + " " + player.name_last)}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    value={selectedPlayerName}
                    onChange={handlePlayerNameChange}
                    comboboxProps={{ dropdownPadding: 10, transitionProps: { transition: 'pop', duration: 200 } }}
                    withScrollArea={false}
                    styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                />
            </Group>
        </>
    );
}
