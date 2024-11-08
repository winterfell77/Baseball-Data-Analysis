'use client';

import React, { useState } from 'react';
import {
  Group,
  Select,
  Divider,
  ComboboxItem,
  OptionsFilter,
  Title,
  Container,
} from '@mantine/core';
import Header from '../../components/Header';
import PlayerTable from '@/src/components/PlayerTable';
import usePlayers from '@/src/hooks/usePlayers';
import Footer from '@/src/components/Footer';
import classes from '@/src/app/players/Players.module.css';

const players_required = [
  657277, 668678, 543037, 571945, 605135, 664285, 622491, 656605, 641154, 605400, 571578, 680686,
  669022, 663623,
];

export default function Players() {
  const { playersData } = usePlayers(players_required);
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
        selectedPlayer ? `${selectedPlayer.name_use} ${selectedPlayer.name_last}` : null
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
        (player) => `${player.name_use} ${player.name_last}` === playerName
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
    <div className={classes.appcontainer}>
      <Header />
      <Container>
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
            data={playersData.map((player) => `${player.name_use} ${player.name_last}`)}
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
        <Title mb="3rem">
          {selectedPlayerId ? `${selectedPlayerName}'s Pitching Table` : null}
        </Title>
      </Container>

      <PlayerTable playerId={selectedPlayerId ? Number(selectedPlayerId) : null} />

      <Footer />
    </div>
  );
}
