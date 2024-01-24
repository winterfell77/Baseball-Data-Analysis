'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Group, Select, Divider, ComboboxItem, OptionsFilter, Container } from '@mantine/core';
import Debug from 'debug';
import PlayerTable from '@/src/components/PlayerTable';
import usePlayers from '@/src/hooks/usePlayers';

const debug = Debug(`Nationals:src:app:players:page.jsx`);

const players_required = [
  657277, 668678, 543037, 571945, 605135, 664285, 622491, 656605, 641154, 605400, 571578, 680686,
  669022, 663623,
];

export default function Players() {
  const { playersData, isLoading, errors } = usePlayers(players_required);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState<string | null>(null);

  const handlePlayerIdChange = (playerId: string | null) => {
    if (playerId === null) {
      setSelectedPlayerId(null);
      setSelectedPlayerName(null);
    } else {
      setSelectedPlayerId(playerId);
      const selectedPlayer = playersData.find((player) => player.player_id.toString() === playerId);
      setSelectedPlayerName(
        selectedPlayer ? selectedPlayer.name_use + ' ' + selectedPlayer.name_last : null
      );
    }
  };

  const handlePlayerNameChange = (playerName: string | null) => {
    if (playerName === null) {
      setSelectedPlayerName(null);
      setSelectedPlayerId(null);
    } else {
      setSelectedPlayerName(playerName);
      const selectedPlayer = playersData.find(
        (player) => player.name_use + ' ' + player.name_last === playerName
      );
      setSelectedPlayerId(selectedPlayer ? selectedPlayer.player_id.toString() : null);
    }
  };
  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const filtered = (options as ComboboxItem[]).filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    );

    filtered.sort((a, b) => a.label.localeCompare(b.label));
    return filtered;
  };

  return (
    <>
      <Header />
      <Container size="800">
        <Group justify="center" gap="xl" grow mb="3rem">
          <Select
            radius="md"
            label="Choose Your Player's Id"
            placeholder="Select ID"
            data={players_required.map(String)}
            searchable
            nothingFoundMessage="Nothing found..."
            value={selectedPlayerId}
            onChange={handlePlayerIdChange}
            comboboxProps={{
              dropdownPadding: 10,
              transitionProps: { transition: 'pop', duration: 200 },
              shadow: 'md',
            }}
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
            allowDeselect={false}
            filter={optionsFilter}
            checkIconPosition="right"
          />
          <Select
            radius="md"
            label="Choose Your Player's Name"
            placeholder="Select Name"
            data={playersData.map((player) => player.name_use + ' ' + player.name_last)}
            searchable
            nothingFoundMessage="Nothing found..."
            value={selectedPlayerName}
            onChange={handlePlayerNameChange}
            comboboxProps={{
              dropdownPadding: 10,
              transitionProps: { transition: 'pop', duration: 200 },
              shadow: 'md',
            }}
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
            allowDeselect={false}
            filter={optionsFilter}
            checkIconPosition="right"
          />
        </Group>
        <Divider my="md" mb="3rem" />
      </Container>
      <PlayerTable playerId={selectedPlayerId ? Number(selectedPlayerId) : null} />
    </>
  );
}
